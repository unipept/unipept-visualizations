/**
 * Interactive Sunburst
 */

import { arc, ArrayLike, BaseType, create, EnterElement,
         hierarchy, HierarchyNode, HierarchyRectangularNode,
         HSLColor, interpolate, partition, PartitionLayout,
         rgb, RGBColor, scaleLinear, ScaleLinear, ScaleOrdinal,
         select, Selection, ValueFn } from "d3";
import * as R from "ramda";

import { BasicNode } from "./basicNode";
import { Breadcrumb } from "./breadcrumb";
import { averageColor, getReadableColorFor } from "./color";
import * as Data from "./data";
import { Node } from "./node";
import { Optional } from "./optional";
import * as Styles from "./styles";
import { SunburstNode } from "./sunburst/node";
import { SunburstSettings } from "./sunburst/settings";
import { Tooltip } from "./tooltip";


type HRN = HierarchyRectangularNode<Node>;
type HN = HierarchyNode<Node>;

/**
 * Generate a function for labeling breadcrumbs.
 */
const crumbText: (accessor: R.Lens) => ((node: HN) => string)
  = (accessor: R.Lens): ((node: HN) => string) =>
  (node: HN): string => {
    if (node.parent !== null) {
      const percentage: number
        = Math.round(Data.countRatio(node.data,
                                     node.parent.data, accessor) * 100);

      return `${node.data.name} is ${percentage}% of ${node.parent.data.name}`;
    }

    return "";
  };

/**
 * Generate a function for colouring nodes and breadcrumbs
 *  based on the supplied settings.
 */
const colorFromSettings: (settings: SunburstSettings) => (node: HN) => string
  = (settings: SunburstSettings): (node: HN) => string => {
    const DARKEN_FACTOR: number = 0.2;
    const nodeSize: (data: Node) => number
      = (data: Node): number => Data.count(data, settings.dataAccessor);

    const palette: ScaleOrdinal<string, string> = settings.colors();

    const color: (node: HN) => string
      = (node: HN): string => {
        if (node.data.name === "empty") {
          return "white";
        }

        if (node.children !== undefined) {
          const children: HN[] = node.children;
          children.sort((a: HN, b: HN): number =>
                        nodeSize(b.data) - nodeSize(a.data));
          const childColors: Array<Optional<RGBColor>> =
            children
            .slice(0, 2) // Only care about the largest 2 children
            .map((child: HN) => Optional.of(rgb(color(child))));

          return averageColor(childColors)
            .map((c: RGBColor | HSLColor) =>
                 c.darker(DARKEN_FACTOR)
                 .toString())
            .orElse("black");
        }

        // Zero children
        return palette(node.data.name);
      };

    return color;
  };

/**
 * A sunburst visualisation responsible for drawing and animating
 * a hierarchy of objects with a size (count) and their text labels.
 */
export class Sunburst {
  // Constants:
  public static readonly MIN_FONT_SIZE: number = 6;
  public static readonly MAX_FONT_SIZE: number = 12;
  public static readonly NODE_SIZE_THRESHOLD: number = 7;
  public static readonly FADED_NODE_OPACITY: number = 0.2;
  public static readonly VISIBLE_NODE_OPACITY: number = 1;
  public static readonly CHILD_INNER_RADIUS: number = 20;
  public static readonly LABEL_OFFSET: number = 4;

  public readonly LEVELS: number;
  public readonly DURATION: number;
  public readonly RADIUS: number;

  public readonly breadcrumb: Optional<Breadcrumb>;
  public readonly tooltip: Optional<Tooltip>;
  public readonly reroot?: (data: Node) => void;
  public readonly color: (data: HN) => string;

  /**
   * @param data The raw data to visualise.
   * @param options User supplied options. See [[SunburstSettings]] for details.
   */
  public constructor(data: BasicNode,
                     options: SunburstSettings = SunburstSettings.defaultSettings()) {
    this.LEVELS = options.levels;
    this.DURATION = options.duration;
    this.RADIUS = Math.min(options.width, options.height) / 2;
    this.reroot = options.rerootCallback;

    const svgNode: Selection<SVGSVGElement, undefined, null, undefined>
      = Sunburst.createSVG(options.width, options.height);
    this.color = colorFromSettings(options);

    select(options.parent)
      .append((): SVGSVGElement =>
              Optional.of(svgNode.node())
              .orElse(document.createElement("svg") as unknown as SVGSVGElement));

    const nodeData: HRN[]
      = Sunburst.initData(SunburstNode.createNodes(data), options.dataAccessor);
    const svgGroup: Selection<SVGGElement, undefined, null, undefined>
      = Sunburst.createDrawing(svgNode, this.RADIUS);

    const angularScale: ScaleLinear<number, number> = scaleLinear()
      .range([0, Math.PI * 2]); // Use full circle
    const radialScale: ScaleLinear<number, number> = scaleLinear()
      .domain([0, Data.outerRadialDomain(nodeData[0], options.levels)])
      .range([0, this.RADIUS]);

    const pathNodes: Selection<BaseType, HRN, SVGGElement, undefined>
      = svgGroup.selectAll("path")
      .data(nodeData);
    const textNodes: Selection<BaseType, HRN, SVGGElement, undefined>
      = svgGroup.selectAll("text")
      .data(nodeData);


    this.breadcrumb = options.enableBreadcrumbs
      ? Optional.of(new Breadcrumb(options.parent, options.className,
                                   this.color,
                                   (d: HN): void => {
                                     this.onClick(d, pathNodes,
                                                  angularScale, radialScale);
                                   },
                                   options.getTitleText,
                                   crumbText(options.dataAccessor)))
      : Optional.empty();

    // Display the root breadcrumb
    this.breadcrumb.ifPresent((b: Breadcrumb) => {
      b.update(nodeData[0]);
    });

    this.tooltip = options.enableTooltips
      ? Optional.of(new Tooltip(options.parent, options.className, options.getTooltip))
      : Optional.empty();

    this.draw(pathNodes, textNodes, options.levels, options.getLabel,
              angularScale, radialScale);
  }

  private static createArc(x: ScaleLinear<number, number>,
                           y: ScaleLinear<number, number>):
  ValueFn<SVGPathElement, HRN, string | null> {
    return arc<HRN>()
      .startAngle((d: HRN) => Math.max(0, Math.min(Math.PI * 2, x(d.x0))))
      .endAngle((d: HRN) => Math.max(0, Math.min(Math.PI * 2, x(d.x1))))
      .innerRadius((d: HRN) => Math.max(0, y(d.y0)))
      .outerRadius((d: HRN) => Math.max(0, y(d.y1)));
  }

  private static createSVG(width: number, height: number)
  : Selection<SVGSVGElement, undefined, null, undefined> {
    return create("svg")
      .attr("version", "1.1")
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", width)
      .attr("height", height)
      .attr("overflow", "hidden")
      .attr("role", "img")
      .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");
  }

  private static createDrawing(svg: Selection<SVGSVGElement, undefined, null, undefined>,
                               radius: number)
  : Selection<SVGGElement, undefined, null, undefined> {
    return svg.append("g")
      .attr("transform", `translate(${radius}, ${radius})`);
  }

  private static initData(data: SunburstNode, accessor: R.Lens): HRN[] {
    const rootNode: HierarchyNode<SunburstNode> = hierarchy(data);
    rootNode.sum((node: SunburstNode): number => R.view(accessor, node));

    const dataPartition: PartitionLayout<Node> = partition();

    return dataPartition(rootNode)
      .descendants();
  }

  /**
   * Mouse click handler
   */
  private onClick(datum: HN,
                  nodes: Selection<BaseType, HRN,
                  SVGGElement, undefined>,
                  angularScale: ScaleLinear<number, number>,
                  radialScale: ScaleLinear<number, number>): void {
    this.breadcrumb.ifPresent((b: Breadcrumb) => {
      b.update(datum);
    });

    if (this.reroot !== undefined) {
      this.reroot(datum.data);
    }

    this.animate(datum as HRN,
                 nodes, angularScale, radialScale);
  }

  /// All drawing and animation functions below this point.

  /**
   * Scaffolding for initially drawing paths and labels.
   */
  private draw(pathNodes: Selection<BaseType, HRN, SVGGElement, undefined>,
               textNodes: Selection<BaseType, HRN, SVGGElement, undefined>,
               levels: number,
               label: (data: Node) => string,
               angularScale: ScaleLinear<number, number>,
               radialScale: ScaleLinear<number, number>): void {
    this.drawPaths(pathNodes, levels, angularScale, radialScale);
    this.drawLabels(textNodes, levels, label, angularScale, radialScale);
  }

  /**
   * Draw SVG paths based on data and set up event handlers.
   */
  private drawPaths(pathNodes: Selection<BaseType, HRN, SVGGElement, undefined>,
                    levels: number,
                    angularScale: ScaleLinear<number, number>,
                    radialScale: ScaleLinear<number, number>): void {
    const tooltip: Optional<Tooltip> = this.tooltip;
    const opacity: Styles.IStyleConstraints
      = Styles.constraints({fadedOpacity: Sunburst.FADED_NODE_OPACITY,
                            visibleOpacity: Sunburst.VISIBLE_NODE_OPACITY});
    pathNodes
      .enter()
      .append("path")
      .attr("d", Sunburst.createArc(angularScale, radialScale))
      .attr("fill-rule", "evenodd")
      .style("fill", (datum: HRN): string => this.color(datum))
      .attr("fill-opacity", (datum: HRN): number =>
            Styles.node.opacity(datum, levels, opacity))
      .on("click", (d: HRN) => {
        this.onClick(d, pathNodes, angularScale, radialScale);
      })
      .each(function(node: HN): void {
        tooltip.ifPresent((tt: Tooltip) => {
          tt.mark(this, node.data);
        });
      });
  }

  /**
   * Arrange labels over paths that can contain them.
   */
  private drawLabels(textNodes: Selection<BaseType, HRN, SVGGElement, undefined>,
                     maxDepth: number,
                     label: (data: Node) => string,
                     angularScale: ScaleLinear<number, number>,
                     radialScale: ScaleLinear<number, number>): void {
    const style: Styles.IStyleConstraints
      = Styles.constraints({maxDepth,
                            labelOffset: Sunburst.LABEL_OFFSET,
                            areaThreshold: Sunburst.NODE_SIZE_THRESHOLD,
                            minFontSize: Sunburst.MIN_FONT_SIZE,
                            maxFontSize: Sunburst.MAX_FONT_SIZE});

    textNodes
      .enter()
      .append("text")
      .style("fill", (d: HN) => getReadableColorFor(this.color(d)))
      .style("fill-opacity", function(d: HRN): number {
        return Styles.label.opacity(d, angularScale, radialScale,
                                    this.getComputedTextLength(), style);
      })
      .style("font-family", "Helvetica, 'Super Sans', sans-serif")
      .style("pointer-events", "none")
      .attr("dy", ".2em")
      .attr("dx", (d: HRN) => Styles.label.offset(angularScale, d, style))
      .attr("transform", (d: HRN) =>
            Styles.label.transform(angularScale, radialScale, d))
      .attr("text-anchor", (d: HRN) => Styles.label.anchor(angularScale, d))
      .text((d: HN) => label(d.data))
      .style("font-size", (d: HRN): string =>
             Styles.label.fontSize(d, angularScale, radialScale, style));
  }

  /**
   * Animate SVG paths and text labels
   * This function is scaffolding for these animations.
   */
  private animate(parentNode: HRN,
                  nodes: Selection<BaseType, HRN, SVGGElement, undefined>,
                  angularScale: ScaleLinear<number, number>,
                  radialScale: ScaleLinear<number, number>): void {
    const paths: Selection<SVGPathElement, HRN, EnterElement, unknown>
      = nodes.enter()
      .selectAll("path");

    const labels: Selection<SVGTextElement, HRN, EnterElement, unknown>
      = nodes.enter()
      .selectAll("text");

    this.animatePaths(parentNode, paths, angularScale, radialScale);
    this.animateLabels(parentNode, labels, angularScale, radialScale);
  }

  /**
   * Work for animating paths occurs here.
   */
  private animatePaths(parentNode: HRN,
                       paths: Selection<SVGPathElement, HRN, EnterElement, unknown>,
                       angularScale: ScaleLinear<number, number>,
                       radialScale: ScaleLinear<number, number>): void {
    const maxDepth: number = parentNode.depth + this.LEVELS;
    const style: Styles.IStyleConstraints
      = Styles.constraints({fadedOpacity: Sunburst.FADED_NODE_OPACITY,
                            visibleOpacity: Sunburst.VISIBLE_NODE_OPACITY,
                           });
    const angle: (t: number) => number[]
      = interpolate(angularScale.domain(), [parentNode.x0, parentNode.x1]);
    const radius: (t: number) => number[]
      = interpolate(radialScale.domain(),
                    [parentNode.y0,
                     Data.outerRadialDomain(parentNode, this.LEVELS)]);
    const yr: (t: number) => number[]
      = interpolate(radialScale.range(),
                    [parentNode.depth > 0 ? Sunburst.CHILD_INNER_RADIUS : 0,
                     this.RADIUS]);

    paths.transition()
      .duration(this.DURATION)
      .attrTween("d",
                 function(child: HRN,
                          index: number,
                          groups: SVGPathElement[] | ArrayLike<SVGPathElement>):
                 (t: number) => string {
                   return (t: number): string =>
                     Optional.of(Sunburst.createArc(angularScale.domain(angle(t)),
                                                    radialScale.domain(radius(t))
                                                    .range(yr(t)))
                                 .call(this, child, index, groups))
                     .orElse("");
                 })
      .attr("class", (d: HRN) => d.depth >= maxDepth ? "arc toHide" : "arc")
      .attr("fill-opacity", (d: HRN) => Styles.node.opacity(d, maxDepth, style));
  }

  /**
   * Work for animating data labels occurs here.
   */
  private animateLabels(parentNode: HRN,
                        texts: Selection<SVGTextElement, HRN, EnterElement, unknown>,
                        angularScale: ScaleLinear<number, number>,
                        radialScale: ScaleLinear<number, number>): void {
    const maxDepth: number = parentNode.depth + this.LEVELS;
    const style: Styles.IStyleConstraints
      = Styles.constraints({maxDepth,
                            labelOffset: Sunburst.LABEL_OFFSET,
                            areaThreshold: Sunburst.NODE_SIZE_THRESHOLD,
                            minFontSize: Sunburst.MIN_FONT_SIZE,
                            maxFontSize: Sunburst.MAX_FONT_SIZE,
                           });

    texts.transition()
      .duration(this.DURATION)
      .style("visibility", (child: HRN): string =>
             Styles.displayableFromAncestor(parentNode, child, maxDepth)
             ? "visible" : "hidden")
      .attrTween("text-anchor", (d: HRN) =>
                 (): string => Styles.label.anchor(angularScale, d))
      .attrTween("dx", (child: HRN) =>
                 (): string => Styles.label.offset(angularScale, child, style))
      .attrTween("transform", (child: HRN) =>
                 (): string =>
                 Styles.label.transform(angularScale, radialScale, child))
      .on("end", function(child: HRN): void {
        select(this)
          .style("fill-opacity",
                 Styles.label.opacity(child, angularScale, radialScale,
                                      this.getComputedTextLength(), style))
          .style("font-size", Styles.label.fontSize(child, angularScale,
                                                    radialScale, style));
      });
  }
}
