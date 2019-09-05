/**
 * Interactive Sunburst
 */
import * as d3 from "d3";

import { BasicNode } from "./basicNode";
import { SunburstNode } from "./sunburstNode";
import { SunburstSettings } from "./sunburstSettings";

export class Sunburst {
  private readonly settings: SunburstSettings;
  private readonly svg: d3.Selection<SVGSVGElement, undefined, null, undefined>;
  private readonly colourPalette: d3.ScaleOrdinal<string, string>

  // TODO: private readonly tooltip?:
  // TODO:   d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

  public constructor(data: BasicNode, options?: SunburstSettings) {
    this.settings = options || SunburstSettings.default();

    // TODO: if (this.settings.enableTooltips) {
    // TODO:   this.tooltip = this.initTooltip();
    // TODO: }

    this.svg = this.createSVG();
    this.colourPalette = this.settings.colors();

    this.draw(SunburstNode.createNodes(data), this.createDrawing());
  }

  public node(): SVGSVGElement | null {
    return this.svg.node();
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

  private createSVG(): d3.Selection<SVGSVGElement, undefined, null, undefined> {
    return d3.create("svg")
      .attr("version", "1.1")
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`)
      .attr("width", this.settings.width)
      .attr("height", this.settings.height)
      .attr("overflow", "hidden")
      .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");
  }

  private createDrawing(): d3.Selection<SVGGElement, undefined, null, undefined> {
    // Set origin to radius center
    return this.svg.append("g")
      .attr("transform",
        `translate(${this.settings.radius}, ${this.settings.radius})`);
  }

  private draw(data: SunburstNode,
    node: d3.Selection<SVGGElement, undefined, null, undefined>,
  ): void {

    const x: d3.ScaleLinear<number, number> = d3.scaleLinear()
      .range([0, Math.PI * 2]); // Use full circle
    const y: d3.ScaleLinear<number, number> = d3.scaleLinear()
      .domain([0, 1])
      .range([0, this.settings.radius]);

    const rootNode: d3.HierarchyNode<SunburstNode> = d3.hierarchy(data);
    rootNode.sum((n: SunburstNode): number => (n.size ? n.size : 0));

    const partition: d3.PartitionLayout<SunburstNode> = d3.partition();
    // partition.size([Math.PI * 2, this.settings.radius]);
    // (rootNode);

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
      .data(partition(rootNode).descendants())
      .enter()
      .append("path")
      .attr("d", <any>arc) // TODO: ValueFn<SVGPathElement, HierarchyNode<SunburstNode>, any>
      .attr("fill-rule", "evenodd")
      .style("fill", (datum: d3.HierarchyRectangularNode<SunburstNode>): string => {
        const colornode: d3.HierarchyNode<SunburstNode> | null =
          (datum.children ? datum : datum.parent);
        return this.colourPalette((colornode != null ? colornode.data.name : ""))
      });
  }
}
