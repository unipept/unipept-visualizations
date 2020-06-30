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
  public readonly value: R.Lens;
  public readonly hm: DataFrame<Node>;
  public readonly cellShape: [number, number];
  public readonly metricFn: Metric;
  public readonly clusterFn: Cluster;

  public constructor(data: DataFrame<Node>,
                     options: HeatmapSettings = HeatmapSettings.defaults()) {
    this.value = R.lens(options.dataAccessor, options.dataModifier);

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
    for (const [col, coli] of this.hm.columns()
         .map((c: string, i: number) => [c, i])) {
      svg.selectAll("svg")
        .data(this.hm.column(col as string)
              .asArray())
        .enter()
        .append("rect")
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
      .attr("class", (d: string): string => `column-label-${d}`)
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

  public cluster(what: "all" | "columns" | "rows" | "none"): void {
    if (what === "none") {
      return;
    }

    const raw = this.hm.map((n: Node): number => n.data as number);

    if (what == "columns") {
      const cluster: Node = this.clusterFn(distanceMatrix(raw, this.metricFn));
      const relabel = cluster
        .dendsort()
        .preorder()
        .filter((n: Node) => n.isLeaf())
        .map((n: Node) => n.name);
      console.log(raw.columns());
      console.log(relabel);
    }

    // Compute distances over rows
    if (what == "rows") {
      const cluster: Node
        = this.clusterFn(distanceMatrix(raw.transpose(), this.metricFn));
      cluster.dendsort();
    }
  }

    /**
     * Cluster the data found in the Heatmap according to the default clustering algorithm.
     * @param toCluster One of "all", "columns" or "rows". "All" denotes that clustering on both the rows and columns
     * should be performed. "Columns" denotes that clustering should only be clustered on the columns only. "Rows"
     * denotes that the clustering is performed on the rows only.
     */
    // public cluster(toCluster: "all" | "columns" | "rows" | "none" = "all") {
    //     let clusterer = new UPGMAClusterer(new EuclidianDistanceMetric());

    //     let molo: Reorderer = new MoloReorderer();

    //     //@ts-ignore
    //     let rowOrder: number[] = Array.apply(null, {length: this.rows.length}).map(Number.call, Number);
    //     if (toCluster === "all" || toCluster === "rows") {
    //         // Create a new ClusterElement for every row that exists. This ClusterElement keeps track of an array of numbers that correspond to a row's values.
    //         let rowElements: ClusterElement[] = this.rows.map((el, idx) => new ClusterElement(this.values[idx].filter(val => val.rowId == el.id).map(x => x.value), el.id!));
    //         // Now we perform a depth first search on the result in order to find the order of the values
    //         rowOrder = this.determineOrder(molo.reorder(clusterer.cluster(rowElements)), (id: string) => this.rowMap.get(id)!.idx!);
    //     }

    //     //@ts-ignore
    //     let columnOrder: number[] = Array.apply(null, {length: this.rows.length}).map(Number.call, Number);
    //     if (toCluster === "all" || toCluster === "columns") {
    //         // Create a new ClusterElement for every column that exists.
    //         let columnElements: ClusterElement[] = this.columns.map((el, idx) => new ClusterElement(this.values.map(col => col[idx].value), el.id!));
    //         columnOrder = this.determineOrder(clusterer.cluster(columnElements), (id: string) => this.columnMap.get(id)!.idx!);
    //     }

    //     let newValues = [];
    //     // Swap rows and columns
    //     for (let row of rowOrder) {
    //         let newRow: HeatmapValue[] = [];
    //         for (let column of columnOrder) {
    //             newRow.push(this.values[row][column]);
    //         }
    //         newValues.push(newRow);
    //     }
    //     this.values = newValues;

    //     let squareWidth = this.determineSquareWidth();
    //     let textCenter = Math.max((squareWidth - this.settings.fontSize) / 2, 0);

    //     // First animate the rows
    //     for (let i = 0; i < this.rows.length; i++) {
    //         let newLocation = rowOrder.indexOf(i);
    //         let row = this.rows[i];

    //         d3.selectAll(".row-" + row.id)
    //             .transition()
    //             .duration(this.settings.animationSpeed / 2)
    //             .attr("y", (d) => newLocation * squareWidth + newLocation * this.settings.squarePadding);

    //         d3.select(".row-label-" + row.id)
    //             .transition()
    //             .duration(this.settings.animationSpeed / 2)
    //             .attr("y",  (d) => (squareWidth + this.settings.squarePadding) * newLocation + textCenter);
    //     }

    //     let textStart = squareWidth * this.rows.length + this.settings.squarePadding * (this.rows.length - 1) + this.settings.visualizationTextPadding;

    //     // Then animate the columns in the same way
    //     for (let i = 0; i < this.columns.length; i++) {
    //         let newLocation = columnOrder.indexOf(i);
    //         let column = this.columns[i];

    //         d3.selectAll(".column-" + column.id)
    //             .transition()
    //             .delay(toCluster === "all" ? this.settings.animationSpeed / 2 : 0)
    //             .duration(this.settings.animationSpeed / 2)
    //             .attr("x", (d) => newLocation * squareWidth + newLocation * this.settings.squarePadding);

    //         d3.selectAll(".column-label-" + column.id)
    //             .transition()
    //             .delay(toCluster === "all" ? this.settings.animationSpeed / 2 : 0)
    //             .duration(this.settings.animationSpeed / 2)
    //             .attr("x", (d) => (squareWidth + this.settings.squarePadding) * newLocation + textCenter)
    //             .attr("transform", (d) => `rotate(90, ${(squareWidth + this.settings.squarePadding) * newLocation + textCenter}, ${textStart})`);
    //     }

    //     let newRows: HeatmapElement[] = [];
    //     for (let rowIdx of rowOrder) {
    //         newRows.push(this.rows[rowIdx]);
    //     }
    //     this.rows = newRows;

    //     let newColumns: HeatmapElement[] = [];
    //     for (let colIdx of columnOrder) {
    //         newColumns.push(this.columns[colIdx]);
    //     }
    //     this.columns = newColumns;
    // }

    // public setFullScreen(fullscreen: boolean) {
    //     // the delay is because the event fires before we're in fullscreen
    //     // so the height en width functions don't give a correct result
    //     // without the delay
    //     setTimeout(() => {
    //         let size = this.settings.width;
    //         if (fullscreen) {
    //             size = Math.min(window.innerWidth - 44, window.innerHeight - 250);
    //         }
    //         for (let el of this.element.getElementsByTagName("svg")) {
    //             el.style.width = size.toString();
    //             el.style.height = size.toString();
    //         }
    //     }, 1000);
    // }

    // /**
    //  * Extracts a linear order from a dendrogram by following all branches up to leaves in a depth-first ordering.
    //  *
    //  * @param treeNode Root of a dendrogram for which a linear leaf ordering needs to be extracted.
    //  * @param idxExtractor Function that, given an HeatmapElement's id is able to retrieve an index associated with that
    //  *        element.
    //  */
    // private determineOrder(treeNode: TreeNode, idxExtractor: (x: string) => number): number[] {
    //     if (!treeNode.leftChild && !treeNode.rightChild) {
    //         return [idxExtractor(treeNode.values[0].id)];
    //     }

    //     let left: number[] = [];
    //     if (treeNode.leftChild) {
    //         left = this.determineOrder(treeNode.leftChild, idxExtractor);
    //     }

    //     let right: number[] = [];
    //     if (treeNode.rightChild) {
    //         right = this.determineOrder(treeNode.rightChild, idxExtractor);
    //     }

    //     return left.concat(right);
    // }

    // /**
    //  * Preprocess an array of features. This function sanitizes the user input by filling in the optional parts (if
    //  * they're missing). Id's are generated using the index of each element in the array.
    //  *
    //  * @param data
    //  */
    // private preprocessFeatures(data: HeatmapElement[]): Map<string, HeatmapElement> {
    //     let output: Map<string, HeatmapElement> = new Map<string, HeatmapElement>();

    //     for (let idx = 0; idx < data.length; idx++) {
    //         let val = data[idx];

    //         if (!val.id) {
    //             val.id = idx.toString();
    //         }

    //         val.idx = idx;
    //         output.set(val.id, val);
    //     }

    //     return output;
    // }

    // /**
    //  * Preprocess the actual value objects that are to be plotted. This function sanitizes the user input by filling in
    //  * the optional parts.
    //  *
    //  * @param data
    //  */
    // private preprocessValues(data: HeatmapValue[][] | number[][]): HeatmapValue[][] {
    //     let values: HeatmapValue[][] = [];
    //     for (let i = 0; i < data.length; i++) {
    //         let row = data[i];

    //         let rowValues: HeatmapValue[] = [];
    //         for (let j = 0; j < row.length; j++) {
    //             let value = row[j];
    //             if (typeof value === "number") {
    //                 rowValues.push({
    //                     rowId: this.rows[i].id,
    //                     columnId: this.columns[j].id,
    //                     value: value
    //                 });
    //             } else {
    //                 if (!value.rowId) {
    //                     value.rowId = this.rows[i].id;
    //                 }

    //                 if (!value.columnId) {
    //                     value.columnId = this.columns[j].id;
    //                 }

    //                 rowValues.push(value);
    //             }
    //         }

    //         values.push(rowValues);
    //     }
    //     return values;
    // }

    // /**
    //  * Append all Heatmap-specific styling to the document to which we render this information.
    //  */
    // private initCSS() {
    //     let elementClass = this.settings.className;

    //     this.element.className += " " + elementClass;

    //     let document: Document | null = this.element.ownerDocument;
    //     if (document != null) {
    //         let head: HTMLHeadElement = document.head;
    //         let style: HTMLStyleElement = document.createElement("style");
    //         style.type = "text/css";

    //         style.innerHTML = `
    //                 .${elementClass} {
    //                     font-family: Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif;
    //                 }
    //             `;

    //         head.appendChild(style);
    //     } else {
    //         throw "No parent document for the given element has been set!";
    //     }
    // }

    // /**
    //  * Determines the dimensions of one square based upon the current width and height-settings and the amount of rows
    //  * and columns currently set to be visualized.
    //  */
    // private determineSquareWidth() {
    //     let visualizationWidth = this.settings.width - this.settings.textWidth - (this.columns.length - 1) * this.settings.squarePadding;
    //     let visualizationHeight = this.settings.height - this.settings.textHeight - (this.rows.length - 1) * this.settings.squarePadding;

    //     let squareWidth = Math.floor(visualizationWidth / this.columns.length);
    //     let squareHeight = Math.floor(visualizationHeight / this.rows.length);

    //     return Math.min(squareWidth, squareHeight, this.settings.maximumSquareWidth)
    // }

    // /**
    //  * Redraw the complete Heatmap and clear the view first.
    //  */
    // private redraw() {
    //     this.element.innerHTML = "";

    //     let squareWidth = this.determineSquareWidth();
    //     let height = this.rows.length * (squareWidth + this.settings.squarePadding) + this.settings.textHeight;
    //     let width = this.columns.length * (squareWidth + this.settings.squarePadding) + this.settings.textWidth;

    //     let vis = d3.select("#" + this.element.id)
    //         .append("svg")
    //         .attr("xmlns", "http://www.w3.org/2000/svg")
    //         .attr("viewBox", `0 0 ${width + this.MARGIN.right + this.MARGIN.left} ${height + this.MARGIN.top + this.MARGIN.bottom}`)
    //         .attr("width", width + this.MARGIN.right + this.MARGIN.left)
    //         .attr("height", height + this.MARGIN.top + this.MARGIN.bottom)
    //         .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif")
    //         .style("font-size", this.settings.fontSize);

    //     this.redrawGrid(vis);
    //     this.redrawRowTitles(vis);
    //     this.redrawColumnTitles(vis);
    // }

    // private redrawGrid(vis: d3.Selection<SVGSVGElement, {}, HTMLElement, any>) {
    //     let squareWidth = this.determineSquareWidth();
    //     let interpolator = d3.interpolateLab(d3.lab("#EEEEEE"), d3.lab("#1565C0"));

    //     for (let row = 0; row < this.rows.length; row++) {
    //         vis.selectAll("svg")
    //             .data(this.values[row])
    //             .enter()
    //             .append("rect")
    //             .attr("x", (d, i) => i * squareWidth + i * this.settings.squarePadding)
    //             .attr("y", (d, i) => row * squareWidth + row * this.settings.squarePadding)
    //             .attr("width", d => squareWidth)
    //             .attr("height", d => squareWidth)
    //             .attr("fill", d => interpolator(d.value))
    //             .attr("class", (d, i) => `row-${this.rows[row].id} column-${this.columns[i].id}`)
    //             .on("mouseover", (d, i) => this.tooltipIn(d, i))
    //             .on("mousemove", (d, i) => this.tooltipMove(d, i))
    //             .on("mouseout", (d, i) => this.tooltipOut(d, i));
    //     }
    // }

    // private redrawRowTitles(vis: d3.Selection<SVGSVGElement, {}, HTMLElement, any>) {
    //     let squareWidth = this.determineSquareWidth();
    //     let textStart = squareWidth * this.columns.length + this.settings.squarePadding * (this.columns.length - 1) + this.settings.visualizationTextPadding;

    //     let textCenter = Math.max((squareWidth - this.settings.fontSize) / 2, 0);

    //     vis.selectAll("svg")
    //         .data(this.rows)
    //         .enter()
    //         .append("text")
    //         .text(d => d.name)
    //         .attr("dominant-baseline", "hanging")
    //         .attr("x", textStart)
    //         .attr("y", (d, i) => (squareWidth + this.settings.squarePadding) * i + textCenter)
    //         .attr("class", (d, i) => `row-label-${this.rows[i].id}`)
    //         .append("title")
    //         .text(d => d.name);
    // }

    // private redrawColumnTitles(vis: d3.Selection<SVGSVGElement, {}, HTMLElement, any>) {
    //     let squareWidth = this.determineSquareWidth();
    //     let textStart = squareWidth * this.rows.length + this.settings.squarePadding * (this.rows.length - 1) + this.settings.visualizationTextPadding;

    //     let textCenter = Math.max((squareWidth - this.settings.fontSize) / 2, 0);

    //     vis.selectAll("svg")
    //         .data(this.columns)
    //         .enter()
    //         .append("text")
    //         .text(d => d.name)
    //         .attr("text-anchor", "start")
    //         .attr("x",(d, i) => (squareWidth + this.settings.squarePadding) * i + textCenter)
    //         .attr("y", textStart)
    //         .attr("transform", (d, i) => `rotate(90, ${(squareWidth + this.settings.squarePadding) * i + textCenter}, ${textStart})`)
    //         .attr("class", (d, i) => `column-label-${this.columns[i].id}`)
    //         .append("title")
    //         .text(d => d.name);
    // }

    // private initTooltip() {
    //     return d3.select("body")
    //         .append("div")
    //         .attr("id", this.element.id + "-tooltip")
    //         .attr("class", "tip")
    //         .style("position", "absolute")
    //         .style("z-index", "10")
    //         .style("visibility", "hidden")
    //         .style("background-color", "white")
    //         .style("padding", "5px")
    //         .style("border", "1px solid #dddddd")
    //         .style("border-radius", "3px");
    // }

    // private tooltipIn(d: HeatmapValue, i: number) {
    //     if (!this.settings.enableTooltips || this.tooltip == null || !d.rowId || !d.columnId) {
    //         return;
    //     }

    //     if (!d.rowId || !d.columnId) {
    //         throw "A value with an invalid rowId or columnId was encountered.";
    //     }

    //     // Find the row and column that belong to the given HeatmapValue. These are looked up by the id's contained in
    //     // the value.
    //     let row = this.rowMap.get(d.rowId);
    //     let column = this.columnMap.get(d.columnId);

    //     if (!row || !column) {
    //         throw "A row or column with a specific ID does not exist.";
    //     }

    //     this.tooltip.html(this.settings.getTooltip(d, row, column))
    //         .style("top", (d3.event.pageY - 5) + "px")
    //         .style("left", (d3.event.pageX + 15) + "px")
    //         .style("visibility", "visible");
    // }

    // private tooltipMove(d: HeatmapValue, i: number) {
    //     if (!this.settings.enableTooltips || !this.tooltip) {
    //         return;
    //     }

    //     this.tooltip.style("top", (d3.event.pageY - 5) + "px")
    //         .style("left", (d3.event.pageX + 15) + "px");
    // }

    // private tooltipOut(d: HeatmapValue, i: number) {
    //     if (!this.settings.enableTooltips || !this.tooltip) {
    //         return;
    //     }

    //     this.tooltip.style("visibility", "hidden");
    // }
}
