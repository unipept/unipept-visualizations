/**
 * Interactive Sunburst
 */
import * as d3 from "d3";
//import assert from "assert";

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

  private angularScale: d3.ScaleLinear<number, number>;
  private radialScale: d3.ScaleLinear<number, number>;

  private readonly nodeData: Array<d3.HierarchyRectangularNode<SunburstNode>>;

  private readonly colourPalette: d3.ScaleOrdinal<string, string>;

  // Constants:
  private static readonly DARKEN: number = 0.05;
  private static readonly TOOLTIP_TOP_PADDING: number = -5;
  private static readonly TOOLTIP_LEFT_PADDING: number = 15;
  private static readonly MIN_FONT_SIZE: number = 12;
  private static readonly WIDTH_THRESHOLD: number = 3.5;
  private static readonly FADED_NODE_OPACITY: number = 0.2;
  private static readonly VISIBLE_NODE_OPACITY: number = 1;
  private static readonly CHILD_INNER_RADIUS: number = 20;

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

    this.colourPalette = this.settings.colors();

    this.nodeData = Sunburst.initData(SunburstNode.createNodes(data));
    const svgGroup: d3.Selection<SVGGElement, undefined, null, undefined> = this.createDrawing();

    this.angularScale = d3.scaleLinear()
      .range([0, Math.PI * 2]); // Use full circle
    this.radialScale = d3.scaleLinear()
      .domain([0, Data.outerRadialDomain(this.nodeData[0], this.settings.levels)])
      .range([0, this.settings.radius]);


    this.pathNodes = svgGroup.selectAll("path")
      .data(this.nodeData);
    this.textNodes = svgGroup.selectAll("text")
      .data(this.nodeData);

    // TODO: iterate data and extract text length for yScale

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

  private static createArc(x: d3.ScaleLinear<number, number>,
                           y: d3.ScaleLinear<number, number>):
  d3.ValueFn<SVGPathElement, d3.HierarchyRectangularNode<SunburstNode>, string | null> {
    return d3.arc<d3.HierarchyRectangularNode<SunburstNode>>()
        .startAngle((d: d3.HierarchyRectangularNode<SunburstNode>) =>
                    Math.max(0, Math.min(Math.PI * 2, x(d.x0))))
        .endAngle((d: d3.HierarchyRectangularNode<SunburstNode>) =>
                  Math.max(0, Math.min(Math.PI * 2, x(d.x1))))
        .innerRadius((d: d3.HierarchyRectangularNode<SunburstNode>) =>
                     Math.max(0, y(d.y0)))
        .outerRadius((d: d3.HierarchyRectangularNode<SunburstNode>) =>
                     Math.max(0, y(d.y1)));
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

  private static initData(data: SunburstNode): Array<d3.HierarchyRectangularNode<SunburstNode>> {
    const rootNode: d3.HierarchyNode<SunburstNode> = d3.hierarchy(data);
    rootNode.sum((n: SunburstNode): number => (n.size ? n.size : 0));

    const partition: d3.PartitionLayout<SunburstNode> = d3.partition();

    return partition(rootNode)
      .descendants();
  }

  private draw(): void {
    this.drawPaths();
    this.drawTextLabels();
  }

  private drawPaths(): void {
    this.pathNodes
      .enter()
      .append("path")
      .attr("d", Sunburst.createArc(this.angularScale, this.radialScale))
      .attr("fill-rule", "evenodd")
      .style("fill", (datum: d3.HierarchyRectangularNode<SunburstNode>): string =>
             this.color(datum))
      .attr("fill-opacity", (datum: d3.HierarchyRectangularNode<SunburstNode>): number =>
            Sunburst.nodeOpacity(datum, this.settings.levels))
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
      .style("fill-opacity", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
             this.labelOpacity(d, this.settings.levels))
      .style("font-family", "Helvetica, 'Super Sans', sans-serif")
      .style("pointer-events", "none")
      .attr("dy", ".2em")
      .attr("dx", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
            Sunburst.labelOffset(this.angularScale, d))
      .attr("transform", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
            Sunburst.labelTransform(this.angularScale, this.radialScale, d))
      .attr("text-anchor", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
            Sunburst.labelAnchor(this.angularScale, d))
      .text((d: d3.HierarchyNode<SunburstNode>) => this.settings.getLabel(d.data))
      .style("font-size", (d: d3.HierarchyNode<SunburstNode>) =>
             this.labelFontSize(d));
  }

  private static nodeOpacity(d: d3.HierarchyRectangularNode<SunburstNode>,
                             threshold: number): number {
    return d.depth >= threshold
      ? Sunburst.FADED_NODE_OPACITY
      : Sunburst.VISIBLE_NODE_OPACITY;
  }

  private labelOpacity(d: d3.HierarchyRectangularNode<SunburstNode>,
                       threshold: number): number {
    if (d.depth < threshold) {
      return (this.angularScale(d.x1 - d.x0)
              * (this.radialScale(d.y1 - d.y0))) < Sunburst.WIDTH_THRESHOLD ? 0 : 1;
    }

    return 0;
  }

  private static labelAnchor(scale: d3.ScaleLinear<number, number>,
                             d: d3.HierarchyRectangularNode<SunburstNode>): string {
    return scale((d.x0 + d.x1) / 2) > Math.PI ? "end" : "start";
  }

  private static labelOffset(scale: d3.ScaleLinear<number, number>,
                             d: d3.HierarchyRectangularNode<SunburstNode>): string {
    return scale((d.x0 + d.x1) / 2) > Math.PI ? "-4px" : "4px";
  }

  private static labelTransform(angularScale: d3.ScaleLinear<number, number>,
                                radialScale: d3.ScaleLinear<number, number>,
                                d: d3.HierarchyRectangularNode<SunburstNode>): string {
    const direction: number = rad2deg(angularScale((d.x0 + d.x1) / 2)) - 90;
    const radius: number = radialScale(d.y0);

    return `rotate(${direction}) translate(${radius}) rotate(${direction > 90 ? -180 : 0})`;
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

  private animate(parentNode: d3.HierarchyRectangularNode<SunburstNode>): void {
    const angularScale: d3.ScaleLinear<number, number> = this.angularScale;
    const radialScale: d3.ScaleLinear<number, number> = this.radialScale;
    const maxLevel: number = parentNode.depth + this.settings.levels;

    const paths: d3.Selection<SVGPathElement, d3.HierarchyRectangularNode<SunburstNode>,
                              d3.EnterElement, unknown>
      = this.pathNodes.enter()
      .selectAll("path");

    const texts: d3.Selection<SVGTextElement, d3.HierarchyRectangularNode<SunburstNode>,
    d3.EnterElement, unknown>
      = this.pathNodes.enter()
      .selectAll("text");

    const angle: (t: number) => number[]
      = d3.interpolate(angularScale.domain(),
                       [parentNode.x0, parentNode.x1]);
    const radius: (t: number) => number[]
      = d3.interpolate(radialScale.domain(),
                       [parentNode.y0, Data.outerRadialDomain(parentNode, this.settings.levels)]);
    const yr: (t: number) => number[]
      = d3.interpolate(radialScale.range(),
                       [parentNode.depth > 0 ? Sunburst.CHILD_INNER_RADIUS : 0,
                        this.settings.radius]);

    paths.transition()
      .duration(this.settings.duration)
      .attrTween("d", function(child: d3.HierarchyRectangularNode<SunburstNode>,
                               index: number,
                               groups: SVGPathElement[] | d3.ArrayLike<SVGPathElement>):
                 (t: number) => string {
        return (t: number): string =>
            Optional.of(Sunburst.createArc(angularScale.domain(angle(t)),
                                           radialScale.domain(radius(t))
                                           .range(yr(t)))
                        .call(this, child, index, groups))
            .orElse("");
      })
      .attr("class", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
            d.depth >= maxLevel ? "arc toHide" : "arc")
      .attr("fill-opacity", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
            Sunburst.nodeOpacity(d, maxLevel));



    texts.transition()
      .duration(this.settings.duration)
      .style("visibility", (child: d3.HierarchyRectangularNode<SunburstNode>): string =>
             Sunburst.isDisplayable(parentNode, child, maxLevel) ? "visible" : "hidden")
      .attrTween("text-anchor", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
                 (): string => Sunburst.labelAnchor(this.angularScale, d))
      .attrTween("dx", (child: d3.HierarchyRectangularNode<SunburstNode>) =>
                 (): string => Sunburst.labelOffset(this.angularScale, child))
      .attrTween("transform", (child: d3.HierarchyRectangularNode<SunburstNode>) =>
                 (): string => Sunburst.labelTransform(this.angularScale,
                                                       this.radialScale,
                                                       child))
      .style("fill-opacity", (child: d3.HierarchyRectangularNode<SunburstNode>): number =>
             this.labelOpacity(child, maxLevel));
  }

  private static isDisplayable(ancestor: d3.HierarchyNode<SunburstNode>,
                               child: d3.HierarchyNode<SunburstNode>,
                               maxLevel: number): boolean {
    return child.depth < maxLevel
      && Data.ancestorOf(ancestor, child)
      .orElse(Infinity) < maxLevel;
  }

  private updateBreadcrumbs(data: d3.HierarchyNode<SunburstNode>): void {
    const crumbs: Array<d3.HierarchyNode<SunburstNode>> =
      data.ancestors()
      .reverse()
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
