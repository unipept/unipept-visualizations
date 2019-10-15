/**
 * Interactive Sunburst
 */
import * as d3 from "d3";

import { BasicNode } from "./basicNode";
import { Breadcrumb } from "./breadcrumb";
import { averageColor, getReadableColorFor } from "./color";
import * as Data from "./data";
import { Node } from "./node";
import { Optional } from "./optional";
import * as Styles from "./styles";
import { SunburstNode } from "./sunburstNode";
import { SunburstSettings } from "./sunburstSettings";
import { Tooltip, TooltipEvent } from "./tooltip";
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

      return "";
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

const tooltipTextFromSettings: (settings: SunburstSettings) => (node: d3.HierarchyNode<Node>) => string
  = (settings: SunburstSettings): (node: d3.HierarchyNode<Node>) => string =>
  (node: d3.HierarchyNode<Node>): string => settings.getTooltip(node.data);

export class Sunburst {
  // Constants:
  public static readonly DARKEN: number = 0.2;
  public static readonly MIN_FONT_SIZE: number = 6;
  public static readonly MAX_FONT_SIZE: number = 12;
  public static readonly NODE_SIZE_THRESHOLD: number = 7;
  public static readonly FADED_NODE_OPACITY: number = 0.2;
  public static readonly VISIBLE_NODE_OPACITY: number = 1;
  public static readonly CHILD_INNER_RADIUS: number = 20;
  public static readonly LABEL_OFFSET: number = 4;

  public readonly settings: SunburstSettings;
  public readonly id: string;

  public readonly pathNodes:
    d3.Selection<d3.BaseType, d3.HierarchyRectangularNode<SunburstNode>, SVGGElement, undefined>;
  public readonly textNodes:
    d3.Selection<d3.BaseType, d3.HierarchyRectangularNode<SunburstNode>, SVGGElement, undefined>;

  public readonly breadcrumb: Optional<Breadcrumb>;
  public readonly tooltip: Optional<Tooltip>;

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
    this.color = colorFromSettings(this.settings);

    topNode.append((): SVGSVGElement =>
                   Optional.of(svgNode.node())
                   .orElse(document.createElement("svg") as unknown as SVGSVGElement));

    this.breadcrumb
      = Optional.of(this.settings.enableBreadcrumbs
                    ? (new Breadcrumb(this.settings.parent, this.settings.className,
                                      this.color,
                                      (d: d3.HierarchyNode<Node>): void => this.onClick(d),
                                      this.settings.getTitleText,
                                      crumbText(this.settings.countAccessor)))
                    : undefined);

    this.tooltip
      = Optional.of(this.settings.enableTooltips
                    ? (new Tooltip(this.settings.parent, this.settings.className,
                                   tooltipTextFromSettings(this.settings)))
                    : undefined);


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
            Styles.node.opacity(datum, levels,
                                Styles.constraints({fadedOpacity: Sunburst.FADED_NODE_OPACITY,
                                                    visibleOpacity: Sunburst.VISIBLE_NODE_OPACITY})))
      .on("click", (d: d3.HierarchyRectangularNode<SunburstNode>) => {
        this.onClick(d);
      })
      .on("mouseover", (d: d3.HierarchyNode<SunburstNode>) =>
          this.tooltip.ifPresent((tt: Tooltip) => tt.update(d, TooltipEvent.IN)))
      .on("mousemove", (d: d3.HierarchyNode<SunburstNode>) =>
          this.tooltip.ifPresent((tt: Tooltip) => tt.update(d, TooltipEvent.MOVE)))
      .on("mouseout", (d: d3.HierarchyNode<SunburstNode>) =>
          this.tooltip.ifPresent((tt: Tooltip) => tt.update(d, TooltipEvent.OUT)));
  }

  private drawTextLabels(maxDepth: number,
                         label: (data: Node) => string): void {
    const angularScale: d3.ScaleLinear<number, number> = this.angularScale;
    const radialScale: d3.ScaleLinear<number, number> = this.radialScale;

    this.textNodes
      .enter()
      .append("text")
      .style("fill", (d: d3.HierarchyNode<SunburstNode>) => getReadableColorFor(this.color(d)))
      .style("fill-opacity", function(d: d3.HierarchyRectangularNode<SunburstNode>): number {
        return Styles.label.opacity(d, angularScale, radialScale, this.getComputedTextLength(),
                                    Styles.constraints({maxDepth,
                                                        labelOffset: Sunburst.LABEL_OFFSET,
                                                        areaThreshold: Sunburst.NODE_SIZE_THRESHOLD}));
      })
      .style("font-family", "Helvetica, 'Super Sans', sans-serif")
      .style("pointer-events", "none")
      .attr("dy", ".2em")
      .attr("dx", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
            Styles.label.offset(this.angularScale, d,
                                Styles.constraints({labelOffset: Sunburst.LABEL_OFFSET})))
      .attr("transform", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
            Styles.label.transform(this.angularScale, this.radialScale, d))
      .attr("text-anchor", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
            Styles.label.anchor(this.angularScale, d))
      .text((d: d3.HierarchyNode<SunburstNode>) => label(d.data))
      .style("font-size", (d: d3.HierarchyRectangularNode<SunburstNode>): string =>
             Styles.label.fontSize(d, this.angularScale, this.radialScale,
                                   Styles.constraints({minFontSize: Sunburst.MIN_FONT_SIZE,
                                                       maxFontSize: Sunburst.MAX_FONT_SIZE})));
  }

  private onClick(datum: d3.HierarchyNode<SunburstNode>): void {
    this.breadcrumb.ifPresent((b: Breadcrumb) => b.update(datum));

    if (this.settings.rerootCallback) {
      this.settings.rerootCallback(datum.data);
    }

    this.animate(datum as d3.HierarchyRectangularNode<SunburstNode>);
  }

  private animate(parentNode: d3.HierarchyRectangularNode<SunburstNode>): void {
    const angularScale: d3.ScaleLinear<number, number> = this.angularScale;
    const radialScale: d3.ScaleLinear<number, number> = this.radialScale;
    const maxDepth: number = parentNode.depth + this.settings.levels;

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
            d.depth >= maxDepth ? "arc toHide" : "arc")
      .attr("fill-opacity", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
            Styles.node.opacity(d, maxDepth,
                                Styles.constraints({fadedOpacity: Sunburst.FADED_NODE_OPACITY,
                                                    visibleOpacity: Sunburst.VISIBLE_NODE_OPACITY})));

    texts.transition()
      .duration(this.settings.duration)
      .style("visibility", (child: d3.HierarchyRectangularNode<SunburstNode>): string =>
             Styles.displayableFromAncestor(parentNode, child, maxDepth) ? "visible" : "hidden")
      .attrTween("text-anchor", (d: d3.HierarchyRectangularNode<SunburstNode>) =>
                 (): string => Styles.label.anchor(this.angularScale, d))
      .attrTween("dx", (child: d3.HierarchyRectangularNode<SunburstNode>) =>
                 (): string =>
                 Styles.label.offset(this.angularScale, child,
                                     Styles.constraints({labelOffset: Sunburst.LABEL_OFFSET})))
      .attrTween("transform", (child: d3.HierarchyRectangularNode<SunburstNode>) =>
                 (): string => Styles.label.transform(angularScale, radialScale, child))
      .on("end", function(child: d3.HierarchyRectangularNode<SunburstNode>): void {
        d3.select(this)
          .style("fill-opacity",
                 Styles.label.opacity(child, angularScale, radialScale,
                                      this.getComputedTextLength(),
                                      Styles.constraints({maxDepth,
                                                          labelOffset: Sunburst.LABEL_OFFSET,
                                                          areaThreshold: Sunburst.NODE_SIZE_THRESHOLD})))
          .style("font-size",
                 Styles.label.fontSize(child, angularScale, radialScale,
                                       Styles.constraints({minFontSize: Sunburst.MIN_FONT_SIZE,
                                                           maxFontSize: Sunburst.MAX_FONT_SIZE})));
      });
  }
}
