/**
 * Interactive Sunburst
 */
import d3 from "d3";
//import $ from "jquery";

import { BasicNode } from "./basicNode";
import { SunburstSettings } from "./sunburstSettings";
import { SunburstNode } from "./sunburstNode";


export class Sunburst {
  private readonly element: Element;
  private readonly settings: SunburstSettings;
  private readonly svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  // private readonly tooltip?:
  //   d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

  constructor(element: Element, data: BasicNode, options?: SunburstSettings) {
    this.element = element;
    this.settings = options || SunburstSettings.default()

    // if (this.settings.enableTooltips) {
    //   this.tooltip = this.initTooltip();
    // }

    this.svg = this.initDrawing();

    this.draw(SunburstNode.createNodes(data));
  }

  // private initTooltip(): d3.Selection<HTMLDivElement, unknown, HTMLElement, any> {
  //   return d3.select("body")
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

  private initDrawing(): d3.Selection<SVGSVGElement, unknown, null, undefined> {
    let draw = d3.select(this.element)
      .append("svg")
      .attr("version", "1.1")
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`)
      .attr("width", this.settings.width)
      .attr("height", this.settings.height)
      .attr("overflow", "hidden")
      .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");
    draw.append("style")
      .attr("type", "text/css")
      .html(".hidden{ visibility: hidden;}");
    draw.append("g")
      .attr("transform", "translate(" + this.settings.radius
        + "," + this.settings.radius + ")"); // set origin to radius center

    return draw;
  }

  private draw(data: SunburstNode): void {
    let x = d3.scaleLinear().range([0, 2 * Math.PI]); // use full circle
    let y = d3.scaleLinear().domain([0, 1]).range([0, this.settings.radius]);

    let rootNode = d3.hierarchy(data);
    let image: d3.HierarchyRectangularNode<unknown> = d3.partition()
      .size([2.0 * Math.PI, this.settings.radius])
      (rootNode);

    let arc: d3.Arc<any, d3.DefaultArcObject> = d3.arc()
      .startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.startAngle))))
      .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.endAngle))))
      // prevent y-calculation on 0
      .innerRadius(d => Math.max(0, d.innerRadius ? y(d.innerRadius) : d.innerRadius))
      .outerRadius(d => Math.max(0, y(d.outerRadius)) + 1);

    // image(rootNode);

    // let arc = d3.arc()
    //   .startAngle(function(d: d3.DefaultArcObject) { return Math.max(0, Math.min(2.0 * Math.PI, x(d.startAngle))); })

    this.svg.selectAll("path")
      .data(rootNode.descendants())
      .enter()
      .append("path")
      .attr("d", <any>arc); //ValueFn<SVGPathElement, HierarchtNode<SunburstNode>>
  }
}
