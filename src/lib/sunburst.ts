/**
 * Interactive Sunburst
 */
import * as d3 from "d3";

import { BasicNode } from "./basicNode";
import { averageColor, getReadableColorFor } from "./color";
import * as Data from "./data";
import { rad2deg } from "./math";
import { Optional } from "./optional";
import { SunburstNode } from "./sunburstNode";
import { SunburstSettings } from "./sunburstSettings";
import { generateId } from "./utils";


export class Sunburst {
  private readonly settings: SunburstSettings;
  private readonly id: string;

  private readonly topNode: d3.Selection<HTMLDivElement, undefined, null, undefined>;
  private readonly svgNode: d3.Selection<SVGSVGElement, undefined, null, undefined>;
  private readonly tooltipNode: d3.Selection<HTMLDivElement, undefined, null, undefined>;
  private readonly breadcrumbNode: d3.Selection<HTMLDivElement, undefined, null, undefined>;

  private readonly pathNodes:
    d3.Selection<d3.BaseType, d3.HierarchyRectangularNode<SunburstNode>, SVGGElement, undefined>;
  private readonly textNodes:
    d3.Selection<d3.BaseType, d3.HierarchyRectangularNode<SunburstNode>, SVGGElement, undefined>;

  private xScale: d3.ScaleLinear<number, number>;
  private yScale: d3.ScaleLinear<number, number>;

  private readonly nodeData: Array<d3.HierarchyRectangularNode<SunburstNode>>;

  private readonly colourPalette: d3.ScaleOrdinal<string, string>;

  // Constants:
  private static readonly DARKEN: number = 0.05;
  private static readonly TOOLTIP_TOP_PADDING: number = -5;
  private static readonly TOOLTIP_LEFT_PADDING: number = 15;
  private static readonly MIN_FONT_SIZE: number = 12;
  private static readonly WIDTH_THRESHOLD: number = 3.5;

  private static readonly tooltipMode: {IN: string; MOVE: string; OUT: string} = {
    IN: "in",
    MOVE: "move",
    OUT: "out",
  };

  public constructor(data: BasicNode, options?: SunburstSettings) {
    this.settings = options || SunburstSettings.default();
    this.id = generateId();

    this.topNode = d3.create("div")
      .attr("id", `${this.id}-${this.settings.className}`);
    this.svgNode = this.createSVG();
    this.tooltipNode = this.createTooltip();
    this.breadcrumbNode = this.createBreadcrumbs();

    this.topNode.append((): HTMLDivElement =>
                        Optional.of(this.tooltipNode.node())
                        .orElse(document.createElement("div")));
    this.topNode.append((): SVGSVGElement =>
                        Optional.of(this.svgNode.node())
                        .orElse(document.createElement("svg") as unknown as SVGSVGElement));
    this.topNode.append((): HTMLDivElement =>
                        Optional.of(this.breadcrumbNode.node())
                        .orElse(document.createElement("div")));

    this.xScale = d3.scaleLinear()
      .range([0, Math.PI * 2]); // Use full circle
    this.yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([0, this.settings.radius]);


    this.colourPalette = this.settings.colors();

    this.nodeData = this.initData(SunburstNode.createNodes(data));
    const svgGroup: d3.Selection<SVGGElement, undefined, null, undefined>
      = this.createDrawing();

    this.pathNodes = svgGroup.selectAll("path")
      .data(this.nodeData);
    this.textNodes = svgGroup.selectAll("text")
      .data(this.nodeData);

    this.draw();
  }

  private nodeSize(n: SunburstNode): number {
    return Data.count(n, this.settings.countAccessor);
  }

  private nodeSizeRatio(n: SunburstNode, d: SunburstNode): number {
    return Data.countRatio(n, d, this.settings.countAccessor)
      .orElse(NaN);
  }


  public node(): HTMLDivElement | null {
    return this.topNode.node();
  }

  private createBreadcrumbs(): d3.Selection<HTMLDivElement, undefined, null, undefined> {
    const bc: d3.Selection<HTMLDivElement, undefined, null, undefined>
      = d3.create("div")
      .attr("id", `${this.id}-breadcrumbs`)
      .classed("sunburst-breadcrumbs", true);
    bc.append("ul")
      .attr("id", `${this.id}-breadcrumbs-list`);

    return bc;
  }

  private createTooltip(): d3.Selection<HTMLDivElement, undefined, null, undefined> {
    return d3.create("div")
      .attr("id", `${this.id}-tooltip`)
      .attr("class", "tip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("padding", "2px")
      .style("border", "1px solid #dddddd")
      .style("border-radius", "3px;");
  }

  private createSVG(): d3.Selection<SVGSVGElement, undefined, null, undefined> {
    return d3.create("svg")
      .attr("version", "1.1")
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`)
      .attr("width", this.settings.width)
      .attr("height", this.settings.height)
      .attr("overflow", "hidden")
      .attr("role", "img")
      .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");
  }

  private createDrawing(): d3.Selection<SVGGElement, undefined, null, undefined> {
    // Set origin to radius center
    return this.svgNode
      .append("g")
      .attr("transform",
            `translate(${this.settings.radius}, ${this.settings.radius})`);
  }

  private initData(data: SunburstNode): Array<d3.HierarchyRectangularNode<SunburstNode>> {
    const rootNode: d3.HierarchyNode<SunburstNode> = d3.hierarchy(data);
    rootNode.sum((n: SunburstNode): number => (n.size ? n.size : 0));

    const partition: d3.PartitionLayout<SunburstNode> = d3.partition();

    // TODO: iterate data and extract text length for yScale
    return partition(rootNode)
      .descendants();
  }

  private draw(): void {
    this.drawPaths();
    this.drawTextLabels();
  }

  private drawPaths(): void {
    const arc: d3.ValueFn<SVGPathElement, d3.HierarchyRectangularNode<SunburstNode>, string | null> =
      d3.arc<d3.HierarchyRectangularNode<SunburstNode>>()
        .startAngle((d: d3.HierarchyRectangularNode<SunburstNode>) =>
                    Math.max(0, Math.min(Math.PI * 2, this.xScale(d.x0))))
        .endAngle((d: d3.HierarchyRectangularNode<SunburstNode>) =>
                  Math.max(0, Math.min(Math.PI * 2, this.xScale(d.x1))))
        .innerRadius((d: d3.HierarchyRectangularNode<SunburstNode>) =>
                     Math.max(0, this.yScale(d.y0)))
        .outerRadius((d: d3.HierarchyRectangularNode<SunburstNode>) =>
                     Math.max(0, this.yScale(d.y1)));

    this.pathNodes
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", (datum: d3.HierarchyRectangularNode<SunburstNode>): string =>
             this.color(datum))
      .on("click", (d: d3.HierarchyRectangularNode<SunburstNode>) => {
        this.onClick(d);
        this.animate(d);
      })
      .on("mouseover", (d: d3.HierarchyNode<SunburstNode>) =>
          this.tooltip(d, Sunburst.tooltipMode.IN))
      .on("mousemove", (d: d3.HierarchyNode<SunburstNode>) =>
          this.tooltip(d, Sunburst.tooltipMode.MOVE))
      .on("mouseout", (d: d3.HierarchyNode<SunburstNode>) =>
          this.tooltip(d, Sunburst.tooltipMode.OUT));
  }

  private drawTextLabels(): void {
    this.textNodes
      .enter()
      .append("text")
      .style("fill", (d: d3.HierarchyNode<SunburstNode>) => getReadableColorFor(this.color(d)))
      .style("fill-opacity", (d: d3.HierarchyRectangularNode<SunburstNode>) => this.labelVisible(d))
      .style("font-family", "Helvetica, 'Super Sans', sans-serif")
      .style("pointer-events", "none")
      .attr("dy", ".2em")
      .attr("dx", (d: d3.HierarchyRectangularNode<SunburstNode>) => this.labelOffset(d))
      .attr("transform", (d: d3.HierarchyRectangularNode<SunburstNode>) => this.labelTransform(d))
      .attr("text-anchor", (d: d3.HierarchyRectangularNode<SunburstNode>) => this.labelAnchor(d))
      .text((d: d3.HierarchyNode<SunburstNode>) => this.settings.getLabel(d.data))
      .style("font-size", (d: d3.HierarchyNode<SunburstNode>) =>
             this.labelFontSize(d));
    console.log(this.nodeData
                .map(d => new Object({val: this.xScale(d.x1 - d.x0) * this.yScale(d.y1 - d.y0), name: d.data.name}))
                .sort((a: any, b: any) => a.val - b.val));
  }

  private labelVisible(d: d3.HierarchyRectangularNode<SunburstNode>): number {
    return (this.xScale(d.x1 - d.x0)
            * (this.yScale(d.y1 - d.y0))) < Sunburst.WIDTH_THRESHOLD ? 0 : 1;
  }

  private labelAnchor(d: d3.HierarchyRectangularNode<SunburstNode>): string {
    return this.xScale((d.x0 + d.x1) / 2) > Math.PI ? "end" : "start";
  }

  private labelOffset(d: d3.HierarchyRectangularNode<SunburstNode>): string {
    return this.xScale((d.x0 + d.x1) / 2) > Math.PI ? "-4px" : "4px";
  }

  private labelTransform(d: d3.HierarchyRectangularNode<SunburstNode>): string {
    const x: number = rad2deg(this.xScale((d.x0 + d.x1) / 2)) - 90;
    const y: number = this.yScale(d.y0);

    return `rotate(${x}) translate(${y}) rotate(${x > 90 ? -180 : 0})`;
  }

  private labelFontSize(d: d3.HierarchyNode<SunburstNode>): string {
    const height: number = this.settings.radius / this.settings.levels;

    return `${Math.floor(Math.min((height / d.height * 10) + 1, Sunburst.MIN_FONT_SIZE))}px`;
  }

  private tooltip(d: d3.HierarchyNode<SunburstNode>, mode: string): void {
    if (!this.settings.enableTooltips) {
      return;
    }

    switch (mode) {
      case Sunburst.tooltipMode.IN:
        this.tooltipNode
          .html(this.settings.getTooltip(d.data))
          .style("top", `${d3.event.pageY + Sunburst.TOOLTIP_TOP_PADDING}px`)
          .style("left", `${d3.event.pageX + Sunburst.TOOLTIP_LEFT_PADDING}px`)
          .style("visibility", "visible");
        break;

      case Sunburst.tooltipMode.MOVE:
        this.tooltipNode
          .style("top", `${d3.event.pageY + Sunburst.TOOLTIP_TOP_PADDING}px`)
          .style("left", `${d3.event.pageX + Sunburst.TOOLTIP_LEFT_PADDING}px`);
        break;

      case Sunburst.tooltipMode.OUT:
        this.tooltipNode.style("visibility", "hidden");
        break;

      default:
    }
  }

  private color(datum: d3.HierarchyNode<SunburstNode>): string {
    if (datum.data.name === "empty") {
      return "white";
    }

    if (datum.children) {
      const children: Array<d3.HierarchyNode<SunburstNode>> = datum.children;
      children.sort((a: d3.HierarchyNode<SunburstNode>,
                     b: d3.HierarchyNode<SunburstNode>): number =>
                    this.nodeSize(b.data) - this.nodeSize(a.data));
      const childColors: Array<Optional<d3.RGBColor>> =
        children
        .slice(0, 2) // Only care about the largest 2 children
        .map((child: d3.HierarchyNode<SunburstNode>) =>
             Optional.of(d3.rgb(this.color(child))));

      if (datum.children.length === 1) { // Single child
        return childColors[0].map((c: d3.RGBColor) =>
                                  c.darker(Sunburst.DARKEN)
                                  .toString())
          .orElse("black");
      }

      return averageColor(childColors)
        .map((c: d3.RGBColor | d3.HSLColor) => c.toString())
        .orElse("black");
    }

    // Zero children
    return this.colourPalette(datum.data.name);
  }

  private onClick(datum: d3.HierarchyNode<SunburstNode>): void {
    if (this.settings.enableBreadcrumbs) {
      this.updateBreadcrumbs(datum);
    }

    if (this.settings.rerootCallback) {
      this.settings.rerootCallback(datum.data);
    }
  }

  private animate(datum: d3.HierarchyRectangularNode<SunburstNode>): void {
    const maxLevel: number = datum.depth + this.settings.levels;

    this.pathNodes
      .transition()
      .duration(this.settings.duration)
      .attr("class", (d: d3.HierarchyRectangularNode<SunburstNode>) => {
        console.log(d);

        return d.depth > maxLevel ? "arc toHide" : "arc";
      })
      .attr("fill-opacity", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
            d.depth >= maxLevel ? 0.2 : 1);

    this.textNodes
      .style("visibility", (child: d3.HierarchyRectangularNode<SunburstNode>): string =>
          Sunburst.isDisplayable(datum, child, maxLevel) ? "visible" : "none")
      .style("fill-opacity", (child: d3.HierarchyNode<SunburstNode>): number =>
             Sunburst.isDisplayable(datum, child, maxLevel) ? 1 : 0);
  }

  private static isDisplayable(ancestor: d3.HierarchyNode<SunburstNode>,
                               child: d3.HierarchyNode<SunburstNode>,
                               maxLevel: number): boolean {
    return child.depth < maxLevel
      || Data.ancestorOf(ancestor, child)
      .orElse(Infinity) < maxLevel;
  }

  private updateBreadcrumbs(data: d3.HierarchyNode<SunburstNode>): void {
    const crumbs: Array<d3.HierarchyNode<SunburstNode>>
      = Data.branch(data, (node: d3.HierarchyNode<SunburstNode>) => node.parent)
      .slice(1);

    const parentSettings: SunburstSettings = this.settings;

    this.breadcrumbNode.select("ul")
      .selectAll(".crumb")
      .remove();

    const bc: d3.Selection<d3.BaseType, d3.HierarchyNode<SunburstNode>, d3.BaseType, undefined>
      = this.breadcrumbNode.select("ul")
      .selectAll(".crumb")
      .data(crumbs);

    bc.enter()
      .append("li")
      .on("click", (d: d3.HierarchyNode<SunburstNode>) => this.onClick(d))
      .classed("crumb", true)
      .attr("title",
            (d: d3.HierarchyNode<SunburstNode>) => parentSettings.getTitleText(d.data))
      .html((d: d3.HierarchyNode<SunburstNode>) => this.crumb(d))
      .style("background-color", (d: d3.HierarchyNode<SunburstNode>) => this.color(d));

    bc.exit()
      .remove();
  }

  private crumb(node: d3.HierarchyNode<SunburstNode>): string {
    const c: HTMLParagraphElement | null = d3.create("p")
      .classed("breadcrumb-name", true)
      .text(`${node.data.name}`)
      .append("p")
      .classed("breadcrumb-data", true)
      .text(() => this.crumbText(node))
      .node();

    return (c === null) ? "" : c.innerHTML;
  }

  private crumbText(node: d3.HierarchyNode<SunburstNode>): string {
    if (node.parent) {
      return `${node.data.name} is `
        + `${Math.round(this.nodeSizeRatio(node.data, node.parent.data) * 100)}% of `
        + `${node.parent.data.name}`;
    }

    return "";
  }
}
