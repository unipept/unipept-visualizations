/**
 * Interactive Sunburst
 */
import * as d3 from "d3";

import { BasicNode } from "./basicNode";
import { averageColor } from "./color";
import * as Data from "./data";
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

  private readonly colourPalette: d3.ScaleOrdinal<string, string>;

  // Constants:
  private static readonly DARKEN: number = 0.05;

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

    this.draw(SunburstNode.createNodes(data), this.createDrawing());
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

  private draw(data: SunburstNode,
               node: d3.Selection<SVGGElement, undefined, null, undefined>): void {

    const x: d3.ScaleLinear<number, number> = d3.scaleLinear()
      .range([0, Math.PI * 2]); // Use full circle
    const y: d3.ScaleLinear<number, number> = d3.scaleLinear()
      .domain([0, 1])
      .range([0, this.settings.radius]);

    const rootNode: d3.HierarchyNode<SunburstNode> = d3.hierarchy(data);
    rootNode.sum((n: SunburstNode): number => (n.size ? n.size : 0));

    const partition: d3.PartitionLayout<SunburstNode> = d3.partition();

    const arc: d3.Arc<SVGPathElement, d3.HierarchyRectangularNode<SunburstNode>> =
      d3.arc<d3.HierarchyRectangularNode<SunburstNode>>()
        .startAngle((d: d3.HierarchyRectangularNode<SunburstNode>) =>
          Math.max(0, Math.min(Math.PI * 2, x(d.x0))))
        .endAngle((d: d3.HierarchyRectangularNode<SunburstNode>) =>
          Math.max(0, Math.min(Math.PI * 2, x(d.x1))))
        .innerRadius((d: d3.HierarchyRectangularNode<SunburstNode>) =>
          Math.max(0, y(d.y0)))
        .outerRadius((d: d3.HierarchyRectangularNode<SunburstNode>) =>
          Math.max(0, y(d.y1)));

    node.selectAll("path")
      .data(partition(rootNode)
        .descendants())
      .enter()
      .append("path")
      .attr("d", <any>arc) // TODO: ValueFn<SVGPathElement, HierarchyNode<SunburstNode>, any>
      .attr("fill-rule", "evenodd")
      .style("fill", (datum: d3.HierarchyRectangularNode<SunburstNode>): string =>
             this.color(datum))
      .on("click", (d: d3.HierarchyNode<SunburstNode>) => this.onClick(d));
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

  private updateBreadcrumbs(data: d3.HierarchyNode<SunburstNode>): void {
    const crumbs: Array<d3.HierarchyNode<SunburstNode>>
      = Data.branch(data, (node: d3.HierarchyNode<SunburstNode>) => node.parent)
      .slice(1);

    const parentSettings: SunburstSettings = this.settings;

    this.breadcrumbNode.select("ul").selectAll(".crumb").remove();
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
        + `${Math.round(100 * this.nodeSizeRatio(node.data, node.parent.data))}% of `
        + `${node.parent.data.name}`;
    }

    return "";
  }
}
