/**
 * Interactive Sunburst
 */
import * as d3 from "d3";

import { BasicNode } from "./basicNode";
import { Breadcrumb } from "./breadcrumb";
import { averageColor, getReadableColorFor } from "./color";
import * as Data from "./data";
import { arcLength, interval, rad2deg } from "./math";
import { Node } from "./node";
import { Optional } from "./optional";
import { SunburstNode } from "./sunburstNode";
import { SunburstSettings } from "./sunburstSettings";
import { generateId } from "./utils";

const crumbText: (accessor: (data: Node) => number) => ((node: d3.HierarchyNode<Node>) => string)
  = (accessor: (data: Node) => number): ((node: d3.HierarchyNode<Node>) => string) =>
    (node: d3.HierarchyNode<Node>): string => {
      if (node.parent) {
        const percentage: number
          = Data.countRatio(node.data, node.parent.data, accessor)
          .map((r: number): number => r * 100)
          .orElse(NaN);

        return `${node.data.name} is ${Math.round(percentage)}% of ${node.parent.data.name}`;
      }

      return "No parent!";
    };

const colorFromSettings: (settings: SunburstSettings) => (node: d3.HierarchyNode<Node>) => string
  = (settings: SunburstSettings): (node: d3.HierarchyNode<Node>) => string => {
    const nodeSize: (data: Node) => number
      = (data: Node): number => Data.count(data, settings.countAccessor);

    const palette: d3.ScaleOrdinal<string, string> = settings.colors();

    const color: (node: d3.HierarchyNode<Node>) => string
      = (node: d3.HierarchyNode<Node>): string => {
      if (node.data.name === "empty") {
        return "white";
      }

      if (node.children) {
        const children: Array<d3.HierarchyNode<SunburstNode>> = node.children;
        children.sort((a: d3.HierarchyNode<SunburstNode>,
                       b: d3.HierarchyNode<SunburstNode>): number =>
                      nodeSize(b.data) - nodeSize(a.data));
        const childColors: Array<Optional<d3.RGBColor>> =
          children
          .slice(0, 2) // Only care about the largest 2 children
          .map((child: d3.HierarchyNode<SunburstNode>) =>
               Optional.of(d3.rgb(color(child))));

        if (children.length === 1) { // Single child
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
      return palette(node.data.name);
    };

    return color;
  };


export class Sunburst {
  // Constants:
  public static readonly DARKEN: number = 0.05;
  public static readonly TOOLTIP_TOP_PADDING: number = -5;
  public static readonly TOOLTIP_LEFT_PADDING: number = 15;
  public static readonly MIN_FONT_SIZE: number = 6;
  public static readonly MAX_FONT_SIZE: number = 12;
  public static readonly NODE_SIZE_THRESHOLD: number = 8;
  public static readonly FADED_NODE_OPACITY: number = 0.2;
  public static readonly VISIBLE_NODE_OPACITY: number = 1;
  public static readonly CHILD_INNER_RADIUS: number = 20;
  public static readonly LABEL_OFFSET: number = 4;

  public static readonly tooltipMode: {IN: string; MOVE: string; OUT: string} = {
    IN: "in",
    MOVE: "move",
    OUT: "out",
  };


  public readonly settings: SunburstSettings;
  public readonly id: string;

  public readonly tooltipNode: d3.Selection<HTMLDivElement, undefined, null, undefined>;

  public readonly pathNodes:
    d3.Selection<d3.BaseType, d3.HierarchyRectangularNode<SunburstNode>, SVGGElement, undefined>;
  public readonly textNodes:
    d3.Selection<d3.BaseType, d3.HierarchyRectangularNode<SunburstNode>, SVGGElement, undefined>;

  public readonly breadcrumb?: Breadcrumb;

  public readonly angularScale: d3.ScaleLinear<number, number>;
  public readonly radialScale: d3.ScaleLinear<number, number>;

  public readonly color: (data: d3.HierarchyNode<Node>) => string;

  public constructor(data: BasicNode, options?: SunburstSettings) {
    this.settings = options || SunburstSettings.default();
    this.id = generateId();

    const topNode: d3.Selection<HTMLElement, undefined, HTMLElement, undefined>
      = d3.select(this.settings.parent);
    const svgNode: d3.Selection<SVGSVGElement, undefined, null, undefined>
      = Sunburst.createSVG(this.settings.width, this.settings.height);
    this.tooltipNode = this.createTooltip();
    this.color = colorFromSettings(this.settings);

    if (this.settings.enableBreadcrumbs) {
      this.breadcrumb = new Breadcrumb(this.settings.parent, this.settings.className,
                                       this.color,
                                       (d: d3.HierarchyNode<Node>): void => this.onClick(d),
                                       this.settings.getTitleText,
                                       crumbText(this.settings.countAccessor));
    }

    topNode.append((): HTMLDivElement =>
                   Optional.of(this.tooltipNode.node())
                   .orElse(document.createElement("div")));
    topNode.append((): SVGSVGElement =>
                   Optional.of(svgNode.node())
                   .orElse(document.createElement("svg") as unknown as SVGSVGElement));

    const nodeData: Array<d3.HierarchyRectangularNode<SunburstNode>>
      = Sunburst.initData(SunburstNode.createNodes(data));
    const svgGroup: d3.Selection<SVGGElement, undefined, null, undefined>
      = Sunburst.createDrawing(svgNode, this.settings.radius);

    this.angularScale = d3.scaleLinear()
      .range([0, Math.PI * 2]); // Use full circle
    this.radialScale = d3.scaleLinear()
      .domain([0, Data.outerRadialDomain(nodeData[0], this.settings.levels)])
      .range([0, this.settings.radius]);


    this.pathNodes = svgGroup.selectAll("path")
      .data(nodeData);
    this.textNodes = svgGroup.selectAll("text")
      .data(nodeData);

    this.draw(this.settings.levels, this.settings.getLabel);
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

  private static createSVG(width: number, height: number)
  : d3.Selection<SVGSVGElement, undefined, null, undefined> {
    return d3.create("svg")
      .attr("version", "1.1")
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", width)
      .attr("height", height)
      .attr("overflow", "hidden")
      .attr("role", "img")
      .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");
  }

  private static createDrawing(svg: d3.Selection<SVGSVGElement, undefined, null, undefined>,
                               radius: number): d3.Selection<SVGGElement, undefined, null, undefined> {
    return svg.append("g")
      .attr("transform", `translate(${radius}, ${radius})`);
  }

  private static initData(data: SunburstNode): Array<d3.HierarchyRectangularNode<SunburstNode>> {
    const rootNode: d3.HierarchyNode<SunburstNode> = d3.hierarchy(data);
    rootNode.sum((n: SunburstNode): number => (n.size ? n.size : 0));

    const partition: d3.PartitionLayout<SunburstNode> = d3.partition();

    return partition(rootNode)
      .descendants();
  }

  private draw(levels: number,
               label: (data: Node) => string): void {
    this.drawPaths(levels);
    this.drawTextLabels(levels, label);
  }

  private drawPaths(levels: number): void {
    this.pathNodes
      .enter()
      .append("path")
      .attr("d", Sunburst.createArc(this.angularScale, this.radialScale))
      .attr("fill-rule", "evenodd")
      .style("fill", (datum: d3.HierarchyRectangularNode<SunburstNode>): string =>
             this.color(datum))
      .attr("fill-opacity", (datum: d3.HierarchyRectangularNode<SunburstNode>): number =>
            Sunburst.nodeOpacity(datum, levels))
      .on("click", (d: d3.HierarchyRectangularNode<SunburstNode>) => {
        this.onClick(d);
      })
      .on("mouseover", (d: d3.HierarchyNode<SunburstNode>) =>
          this.tooltip(d, Sunburst.tooltipMode.IN))
      .on("mousemove", (d: d3.HierarchyNode<SunburstNode>) =>
          this.tooltip(d, Sunburst.tooltipMode.MOVE))
      .on("mouseout", (d: d3.HierarchyNode<SunburstNode>) =>
          this.tooltip(d, Sunburst.tooltipMode.OUT));
  }

  private drawTextLabels(maxLevel: number,
                         label: (data: Node) => string): void {
    const angularScale: d3.ScaleLinear<number, number> = this.angularScale;
    const radialScale: d3.ScaleLinear<number, number> = this.radialScale;

    this.textNodes
      .enter()
      .append("text")
      .style("fill", (d: d3.HierarchyNode<SunburstNode>) => getReadableColorFor(this.color(d)))
      .style("fill-opacity", function(d: d3.HierarchyRectangularNode<SunburstNode>): number {
        return Sunburst.labelOpacity(d, angularScale, radialScale,
                                     this.getComputedTextLength(), maxLevel);
      })
      .style("font-family", "Helvetica, 'Super Sans', sans-serif")
      .style("pointer-events", "none")
      .attr("dy", ".2em")
      .attr("dx", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
            Sunburst.labelOffset(this.angularScale, d))
      .attr("transform", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
            Sunburst.labelTransform(this.angularScale, this.radialScale, d))
      .attr("text-anchor", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
            Sunburst.labelAnchor(this.angularScale, d))
      .text((d: d3.HierarchyNode<SunburstNode>) => label(d.data))
      .style("font-size", (d: d3.HierarchyRectangularNode<SunburstNode>): string =>
             Sunburst.labelFontSize(d, this.angularScale, this.radialScale));
  }

  private static labelFontSize(d: d3.HierarchyRectangularNode<SunburstNode>,
                               angularScale: d3.ScaleLinear<number, number>,
                               radialScale: d3.ScaleLinear<number, number>): string {
    const angle: number = angularScale(d.x1) - angularScale(d.x0);
    const radius: number = Math.max(2, radialScale(d.y0));
    const angularSpace: number = arcLength(radius, angle);
    const size: number = interval(angularSpace, Sunburst.MIN_FONT_SIZE, Sunburst.MAX_FONT_SIZE);

    return `${size}px`;
  }

  private static nodeOpacity(d: d3.HierarchyRectangularNode<SunburstNode>,
                             threshold: number): number {
    return d.depth >= threshold
      ? Sunburst.FADED_NODE_OPACITY
      : Sunburst.VISIBLE_NODE_OPACITY;
  }

  private static labelOpacity(d: d3.HierarchyRectangularNode<SunburstNode>,
                              angularScale: d3.ScaleLinear<number, number>,
                              radialScale: d3.ScaleLinear<number, number>,
                              labelLength: number,
                              maxDepth: number): number {
    const radialSpace: number = radialScale(d.y1) - radialScale(d.y0);

    if ((d.depth < maxDepth) && ((labelLength + Sunburst.LABEL_OFFSET) < radialSpace)) {
      const area: number = (angularScale(d.x1) - angularScale(d.x0)) * radialSpace;

      return area < Sunburst.NODE_SIZE_THRESHOLD ? 0 : 1;
    }

    return 0;
  }

  private static labelAnchor(scale: d3.ScaleLinear<number, number>,
                             d: d3.HierarchyRectangularNode<SunburstNode>): string {
    return scale((d.x0 + d.x1) / 2) > Math.PI ? "end" : "start";
  }

  private static labelOffset(scale: d3.ScaleLinear<number, number>,
                             d: d3.HierarchyRectangularNode<SunburstNode>): string {
    return scale((d.x0 + d.x1) / 2) > Math.PI
      ? `-${Sunburst.LABEL_OFFSET}px` : `${Sunburst.LABEL_OFFSET}px`;
  }

  private static labelTransform(angularScale: d3.ScaleLinear<number, number>,
                                radialScale: d3.ScaleLinear<number, number>,
                                d: d3.HierarchyRectangularNode<SunburstNode>): string {
    const direction: number = rad2deg(angularScale((d.x0 + d.x1) / 2)) - 90;
    const radius: number = radialScale(d.y0);

    return `rotate(${direction}) translate(${radius}) rotate(${direction > 90 ? -180 : 0})`;
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

  private onClick(datum: d3.HierarchyNode<SunburstNode>): void {
    if (this.breadcrumb) {
      this.breadcrumb.update(datum);
    }

    if (this.settings.rerootCallback) {
      this.settings.rerootCallback(datum.data);
    }

    this.animate(datum as d3.HierarchyRectangularNode<SunburstNode>);
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
                       [parentNode.y0,
                        Data.outerRadialDomain(parentNode, this.settings.levels)]);
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
                 (): string => Sunburst.labelTransform(angularScale, radialScale, child))
      .on("end", function(child: d3.HierarchyRectangularNode<SunburstNode>): void {
        d3.select(this)
          .style("fill-opacity",
                 Sunburst.labelOpacity(child, angularScale, radialScale,
                                       this.getComputedTextLength(), maxLevel))
          .style("font-size",
                 Sunburst.labelFontSize(child, angularScale, radialScale));
      });
  }

  private static isDisplayable(ancestor: d3.HierarchyNode<SunburstNode>,
                               child: d3.HierarchyNode<SunburstNode>,
                               maxLevel: number): boolean {
    return child.depth < maxLevel
      && Data.ancestorOf(ancestor, child)
      .orElse(Infinity) < maxLevel;
  }
}
