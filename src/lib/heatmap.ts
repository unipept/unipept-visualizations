import * as d3 from "d3";
import * as R from "ramda";

import { Node } from "./node";
import { DataFrame } from "./data";
import { HeatmapSettings } from "./heatmap/settings";
import { Optional } from "./optional";
import { Tooltip } from "./tooltip";
import { distanceMatrix, Metric } from "./metric";
import { Cluster } from "./cluster";

export class Heatmap {
  private hm: DataFrame<Node>;

  public readonly value: R.Lens;
  public readonly cellShape: [number, number];
  public readonly animateDuration: number;
  public readonly padding: number;
  public readonly textPadding: number;
  public readonly fontSize: number;
  public readonly metricFn: Metric;
  public readonly clusterFn: Cluster;

  public constructor(data: DataFrame<Node>,
                     options: HeatmapSettings = HeatmapSettings.defaults()) {
    this.value = R.lens(options.dataAccessor, options.dataModifier);

    this.animateDuration = options.duration;
    this.padding = options.padding;
    this.textPadding = options.textPadding;
    this.fontSize = options.fontSize;

    this.hm = data.normalise(this.value);

    this.cellShape = Heatmap.cellShape(options, this.hm.shape());

    this.metricFn = options.metric;
    this.clusterFn = options.cluster;

    const tooltip: Optional<Tooltip> = options.enableTooltips
      ? Optional.of(new Tooltip(options.parent, options.className, options.getTooltip))
      : Optional.empty();

    const svgNode: d3.Selection<SVGSVGElement, undefined, null, undefined>
      = Heatmap.createSVG(options.width, options.height);

    d3.select(options.parent)
      .append((): SVGSVGElement =>
              Optional.of(svgNode.node())
              .orElse(document.createElement("svg") as unknown as SVGSVGElement));

    this.draw(svgNode, tooltip, options);
  }

  public draw(svg: d3.Selection<SVGSVGElement, undefined, null, undefined>,
              tooltip: Optional<Tooltip>,
              options: HeatmapSettings): void {
    this.drawGrid(svg, tooltip, options);
    this.drawLabels(svg, options);
  }

  public drawGrid(svg: d3.Selection<SVGSVGElement, undefined, null, undefined>,
                  tooltip: Optional<Tooltip>,
                  options: HeatmapSettings): void {
    const colourInterpolator: (t: number) => string
      = d3.interpolateLab(d3.lab(options.colorScale[0]), d3.lab(options.colorScale[1]));
    const rowNames = this.hm.rows();
    for (const [col, coli] of this.hm.columns().map((c: string, i: number) => [c, i])) {
      svg.selectAll("svg")
        .data(this.hm.column(col as string)
              .asArray())
        .enter()
        .append("rect")
        .attr("class", (_: Node, i: number) => `row-${rowNames[i]} col-${col}`)
        .attr("x", () => (coli as number) * this.cellShape[0]
              + (coli as number) * options.padding)
        .attr("y", (_: Node, i: number) => i * this.cellShape[1] + i * options.padding)
        .attr("width", () => this.cellShape[0])
        .attr("height", () => this.cellShape[1])
        .attr("fill", (d: Node) => colourInterpolator(R.view(this.value, d)))
        .each(function (d: Node): void {
          tooltip.ifPresent((tt: Tooltip) => tt.mark(this, d));
        });
    }
  }

  public drawLabels(svg: d3.Selection<SVGSVGElement, undefined, null, undefined>,
                    options: HeatmapSettings): void {
    const hmShape: [number, number] = this.hm.shape();
    const textStart: [number, number]
      = [this.cellShape[0] * hmShape[1]
         + options.padding * (hmShape[1] - 1) + options.textPadding,
         this.cellShape[1] * hmShape[0]
         + options.padding * (hmShape[0] - 1) + options.textPadding];
    const centre: [number, number]
      = [Math.max((this.cellShape[1] - options.fontSize) / 2, 0),
         Math.max((this.cellShape[0] - options.fontSize) / 2, 0)];
    const cell: [number, number]
      = [this.cellShape[1] + options.padding,
         this.cellShape[0] + options.padding];

    // Rows
    svg.selectAll("svg")
      .data(this.hm.rows())
      .enter()
      .append("text")
      .text(R.identity)
      .attr("dominant-baseline", "hanging")
      .attr("x", textStart[0])
      .attr("y", (_: string, i: number): number => cell[0] * i + centre[0])
      .attr("class", (d: string): string => `row-label-${d}`)
      .append("title")
      .text(R.identity);

    // Columns
    svg.selectAll("svg")
      .data(this.hm.columns())
      .enter()
      .append("text")
      .text(R.identity)
      .attr("text-anchor", "start")
      .attr("x", (_: string, i: number): number => cell[1] * i + centre[1])
      .attr("y", textStart[1])
      .attr("transform", (_: string, i: number): string =>
            `rotate(90, ${cell[1] * i + centre[1]}, ${textStart[1]})`)
      .attr("class", (d: string): string => `col-label-${d}`)
      .append("title")
      .text(R.identity);
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

  // [width, height]
  public static cellShape(options: HeatmapSettings,
                          hm: [number, number]): [number, number] {
    const width: number = options.width - options.textWidth
      - (hm[1] * options.padding);
    const height: number = options.height - options.textHeight
      - (hm[0] * options.padding);
    const shape: [number, number]
      = [Math.max(options.maxCellSize, Math.floor(width / hm[1])),
         Math.min(options.maxCellSize, Math.floor(height / hm[0]))];

    if (options.cellShape === undefined) {
      return shape;
    }

    return options.cellShape(shape);
  }

  public animateRows(labels: string[], delay: number): void {
    const centre = Math.max((this.cellShape[1] - this.fontSize) / 2, 0);
    const cell = this.cellShape[1] + this.padding;

    labels.forEach((label: string, i: number) => {
      d3.selectAll(`.row-${label}`)
        .transition()
        .delay(delay)
        .duration(this.animateDuration / 2)
        .attr("y", () => i * this.cellShape[1] + i * this.padding);

      d3.selectAll(`.row-label-${label}`)
        .transition()
        .delay(delay)
        .duration(this.animateDuration / 2)
        .attr("y", (): number => cell * i + centre);
    });
  }

  public animateCols(labels: string[]): void {
    const hmShape = this.hm.shape();
    const textStart =
      this.cellShape[1] * hmShape[0] + this.padding * (hmShape[0] - 1) + this.textPadding;
    const centre = Math.max((this.cellShape[0] - this.fontSize) / 2, 0);
    const cell = this.cellShape[0] + this.padding;

    labels.forEach((label: string, i: number) => {
      d3.selectAll(`.col-${label}`)
        .transition()
        .duration(this.animateDuration / 2)
        .attr("x", () => i * this.cellShape[0] + i * this.padding);

      d3.selectAll(`.col-label-${label}`)
        .transition()
        .duration(this.animateDuration / 2)
        .attr("x", (): number => cell * i + centre)
        .attr("transform", (): string =>
          `rotate(90, ${cell * i + centre}, ${textStart})`);
    });
  }

  public reorderLabels(data: DataFrame<number>): string[] {
    const cluster: Node = this.clusterFn(distanceMatrix(data, this.metricFn));
    return cluster
      .dendsort()
      .preorder()
      .filter((n: Node) => n.isLeaf())
      .map((n: Node) => n.name);
  }

  public cluster(what: "all" | "columns" | "rows" | "none"): void {
    if (what === "none") {
      return;
    }

    const raw = this.hm.map((n: Node): number => n.data as number);
    const delay = what === "all" ? this.animateDuration / 2 : 0;

    if (what == "columns" || what == "all") {
      const relabel = this.reorderLabels(raw);
      this.hm = this.hm.reorderColumns(relabel);
      this.animateCols(relabel);
      console.log(relabel);
    }

    if (what == "rows" || what == "all") {
      const relabel = this.reorderLabels(raw.transpose());
      this.hm = this.hm.reorderRows(relabel);
      this.animateRows(relabel, delay);
    }
  }
}
