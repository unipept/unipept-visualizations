/**
 * Interactive Sunburst
 */
import * as d3 from "d3";

import { BasicNode } from "./basicNode";
import { SunburstNode } from "./sunburstNode";
import { SunburstSettings } from "./sunburstSettings";

export class Sunburst {
  private readonly settings: SunburstSettings;
  sb: d3.Selection<SVGSVGElement, undefined, null, undefined>;

  // TODO: private readonly tooltip?:
  // TODO:   d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

  public constructor(data: BasicNode, options?: SunburstSettings) {
    this.settings = options || SunburstSettings.default();
    console.log("Options supplied: " + JSON.stringify(options));

    // TODO: if (this.settings.enableTooltips) {
    // TODO:   this.tooltip = this.initTooltip();
    // TODO: }

    this.sb = this.draw(SunburstNode.createNodes(data), this.initDrawing());
  }

  public node() {
    return this.sb.node();
  }

  // TODO: private initTooltip(): d3.Selection<HTMLDivElement, unknown, HTMLElement, any> {
  // TODO:   return d3.select("body")
  //     .append("div")
  //     .attr("id", this.element.id + "-tooltip")
  //     .attr("class", "tip")
  //     .style("position", "absolute")
  //     .style("z-index", "10")
  //     .style("visibility", "hidden")
  //     .style("background-color", "white")
  //     .style("padding", "2px")
  //     .style("border", "1px solid #dddddd")
  //     .style("border-radius", "3px;");
  // }

  private initDrawing(): d3.Selection<SVGSVGElement, undefined, null, undefined> {
    let node: d3.Selection<SVGSVGElement, undefined, null, undefined> =
      d3.create("svg")
        .attr("version", "1.1")
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`)
        .attr("width", this.settings.width)
        .attr("height", this.settings.height)
        .attr("overflow", "hidden")
        .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");
    node
      .append("style")
      .attr("type", "text/css")
      .html(".hidden{ visibility: hidden;}");
    node
      .append("g")
      .attr("transform",
        // Set origin to radius center
        `translate(${this.settings.radius}, ${this.settings.radius})`);

    return node;
  }

  private draw(data: SunburstNode,
    node: d3.Selection<SVGSVGElement, undefined, null, undefined>
  ): d3.Selection<SVGSVGElement, undefined, null, undefined> {
    const x: d3.ScaleLinear<number, number> = d3.scaleLinear()
      .range([0, Math.PI * 2]); // Use full circle
    const y: d3.ScaleLinear<number, number> = d3.scaleLinear()
      .domain([0, 1])
      .range([0, this.settings.radius]);

    const rootNode: d3.HierarchyNode<SunburstNode> = d3.hierarchy(data);
    rootNode.sum((n: SunburstNode): number => (n.size ? n.size : 0));

    // TODO: let image: d3.HierarchyRectangularNode < unknown > =
    d3.partition()
      .size([Math.PI * 2, this.settings.radius])
      (rootNode);

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
      .data(rootNode.descendants())
      .enter()
      .append("path")
      .attr("d", <any>arc);
    // TODO: ValueFn<SVGPathElement, HierarchyNode<SunburstNode>, any>

    return node;
  }
}
