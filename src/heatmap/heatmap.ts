import * as d3 from "d3";
import HeatmapSettings from "./heatmapSettings";
import UPGMAClusterer from "../cluster/UPGMAClusterer";
import EuclidianDistanceMetric from "../metric/euclidianDistanceMetric";
import ClusterElement from "../cluster/clusterElement";
import TreeNode from "../cluster/treeNode";
import {HeatmapData, HeatmapElement, HeatmapValue} from "./typings";
import Reorderer from "../reorder/reorderer";
import MoloReorderer from "../reorder/moloReorderer";

export class Heatmap {
    private element: string;
    private settings: HeatmapSettings;

    // We need to be both able to fast index the array of elements and find an element by id. That's why both a Map
    // and an array are kept in memory for the rows and columns.
    private rowMap: Map<string, HeatmapElement>;
    private rows: HeatmapElement[];
    private columnMap: Map<string, HeatmapElement>;
    private columns: HeatmapElement[];
    private values: HeatmapValue[][];

    private tooltip: d3.Selection<HTMLDivElement, {}, HTMLElement, any> | null = null;

    private readonly MARGIN = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    constructor(element: string, data: HeatmapData, options: HeatmapSettings = new HeatmapSettings()) {
        this.element = element;

        this.rowMap = this.preprocessFeatures(data.rows);
        this.rows = Array.from(this.rowMap.values());
        this.columnMap = this.preprocessFeatures(data.columns);
        this.columns = Array.from(this.columnMap.values());
        this.values = this.preprocessValues(data.values);

        this.settings = options;

        if (this.settings.enableTooltips) {
            this.tooltip = this.initTooltip();
        }

        this.initCSS();
        this.redraw();
    }

    /**
     * Reset the complete view to it's initial state with the options and data passed in the constructor.
     */
    public reset() {
        this.redraw();
    }

    /**
     * Cluster the data found in the Heatmap according to the default clustering algorithm.
     */
    public cluster() {
        let clusterer = new UPGMAClusterer(new EuclidianDistanceMetric());
        // Create a new ClusterElement for every row that exists. This ClusterElement keeps track of an array of numbers that correspond to a row's values.
        let rowElements: ClusterElement[] = this.rows.map((el, idx) => new ClusterElement(this.values[idx].filter(val => val.rowId == el.id).map(x => x.value), el.id!));

        let molo: Reorderer = new MoloReorderer();
        let temp = clusterer.cluster(rowElements);
        let start = performance.now();
        let rowResult = molo.reorder(temp);
        let end = performance.now();
        console.log("MOLO took: " + (end - start) + "ms");
        console.log(rowResult.toNewic((id: string) => this.rowMap.get(id)!.name));

        // Now we perform a depth first search on the result in order to find the order of the values
        let rowOrder: number[] = this.determineOrder(rowResult, (id: string) => this.rowMap.get(id)!.idx!);


        // Create a new ClusterElement for every column that exists.
        let columnElements: ClusterElement[] = this.columns.map((el, idx) => new ClusterElement(this.values.map(col => col[idx].value), el.id!));
        let columnResult = molo.reorder(clusterer.cluster(columnElements));
        console.log(columnResult.toNewic((id: string) => this.columnMap.get(id)!.name));

        let columnOrder: number[] = this.determineOrder(columnResult, (id: string) => this.columnMap.get(id)!.idx!);


        let newValues = [];
        // Swap rows and columns
        for (let row of rowOrder) {
            let newRow: HeatmapValue[] = [];
            for (let column of columnOrder) {
                newRow.push(this.values[row][column]);
            }
            newValues.push(newRow);
        }
        this.values = newValues;

        let squareWidth = this.determineSquareWidth();
        let textCenter = Math.max((squareWidth - this.settings.fontSize) / 2, 0);

        // First animate the rows
        for (let i = 0; i < this.rows.length; i++) {
            let newLocation = rowOrder.indexOf(i);
            let row = this.rows[i];

            d3.selectAll(".row-" + row.id)
                .transition()
                .duration(this.settings.animationSpeed / 2)
                .attr("y", (d) => newLocation * squareWidth + newLocation * this.settings.squarePadding);

            d3.select(".row-label-" + row.id)
                .transition()
                .duration(this.settings.animationSpeed / 2)
                .attr("y",  (d) => (squareWidth + this.settings.squarePadding) * newLocation + textCenter);
        }

        let textStart = squareWidth * this.rows.length + this.settings.squarePadding * (this.rows.length - 1) + this.settings.visualizationTextPadding;

        // Then animate the columns in the same way
        for (let i = 0; i < this.columns.length; i++) {
            let newLocation = columnOrder.indexOf(i);
            let column = this.columns[i];

            d3.selectAll(".column-" + column.id)
                .transition()
                .delay(this.settings.animationSpeed / 2)
                .duration(this.settings.animationSpeed / 2)
                .attr("x", (d) => newLocation * squareWidth + newLocation * this.settings.squarePadding);

            d3.selectAll(".column-label-" + column.id)
                .transition()
                .delay(this.settings.animationSpeed / 2)
                .duration(this.settings.animationSpeed / 2)
                .attr("x", (d) => (squareWidth + this.settings.squarePadding) * newLocation + textCenter)
                .attr("transform", (d) => `rotate(90, ${(squareWidth + this.settings.squarePadding) * newLocation + textCenter}, ${textStart})`);
        }

        let newRows: HeatmapElement[] = [];
        for (let rowIdx of rowOrder) {
            newRows.push(this.rows[rowIdx]);
        }
        this.rows = newRows;

        let newColumns: HeatmapElement[] = [];
        for (let colIdx of columnOrder) {
            newColumns.push(this.columns[colIdx]);
        }
        this.columns = newColumns;
    }

    /**
     * Extracts a linear order from a dendrogram by following all branches up to leaves in a depth-first ordering.
     *
     * @param treeNode Root of a dendrogram for which a linear leaf ordering needs to be extracted.
     * @param idxExtractor Function that, given an HeatmapElement's id is able to retrieve an index associated with that
     *        element.
     */
    private determineOrder(treeNode: TreeNode, idxExtractor: (x: string) => number): number[] {
        if (!treeNode.leftChild && !treeNode.rightChild) {
            return [idxExtractor(treeNode.values[0].id)];
        }

        let left: number[] = [];
        if (treeNode.leftChild) {
            left = this.determineOrder(treeNode.leftChild, idxExtractor);
        }

        let right: number[] = [];
        if (treeNode.rightChild) {
            right = this.determineOrder(treeNode.rightChild, idxExtractor);
        }

        return left.concat(right);
    }

    /**
     * Preprocess an array of features. This function sanitizes the user input by filling in the optional parts (if
     * they're missing). Id's are generated using the index of each element in the array.
     *
     * @param data
     */
    private preprocessFeatures(data: HeatmapElement[]): Map<string, HeatmapElement> {
        let output: Map<string, HeatmapElement> = new Map<string, HeatmapElement>();

        for (let idx = 0; idx < data.length; idx++) {
            let val = data[idx];

            if (!val.id) {
                val.id = idx.toString();
            }

            val.idx = idx;
            output.set(val.id, val);
        }

        return output;
    }

    /**
     * Preprocess the actual value objects that are to be plotted. This function sanitizes the user input by filling in
     * the optional parts.
     *
     * @param data
     */
    private preprocessValues(data: HeatmapValue[][] | number[][]): HeatmapValue[][] {
        let values: HeatmapValue[][] = [];
        for (let i = 0; i < data.length; i++) {
            let row = data[i];

            let rowValues: HeatmapValue[] = [];
            for (let j = 0; j < row.length; j++) {
                let value = row[j];
                if (typeof value === "number") {
                    rowValues.push({
                        rowId: this.rows[i].id,
                        columnId: this.columns[j].id,
                        value: value
                    });
                } else {
                    if (!value.rowId) {
                        value.rowId = this.rows[i].id;
                    }

                    if (!value.columnId) {
                        value.columnId = this.columns[j].id;
                    }

                    rowValues.push(value);
                }
            }

            values.push(rowValues);
        }
        return values;
    }

    /**
     * Append all Heatmap-specific styling to the document to which we render this information.
     */
    private initCSS() {
        let elementClass = this.settings.className;

        $(this.element).addClass(elementClass);
        $("<style>").prop("type", "text/css")
            .html(
                `
                    .${elementClass} {
                        font-family: Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif;
                        width: ${this.settings.width}px;
                    }
                `)
    }

    /**
     * Determines the dimensions of one square based upon the current width and height-settings and the amount of rows
     * and columns currently set to be visualized.
     */
    private determineSquareWidth() {
        let visualizationWidth = this.settings.width - this.settings.textWidth - (this.columns.length - 1) * this.settings.squarePadding;
        let visualizationHeight = this.settings.height - this.settings.textHeight - (this.rows.length - 1) * this.settings.squarePadding;

        let squareWidth = Math.floor(visualizationWidth / this.columns.length);
        let squareHeight = Math.floor(visualizationHeight / this.rows.length);

        return Math.min(squareWidth, squareHeight, this.settings.maximumSquareWidth)
    }

    /**
     * Redraw the complete Heatmap and clear the view first.
     */
    private redraw() {
        $(this.element).empty();

        let vis = d3.select(this.element)
            .append("svg")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", `0 0 ${this.settings.width + this.MARGIN.right + this.MARGIN.left} ${this.settings.height + this.MARGIN.top + this.MARGIN.bottom}`)
            .attr("width", this.settings.width + this.MARGIN.right + this.MARGIN.left)
            .attr("height", this.settings.height + this.MARGIN.top + this.MARGIN.bottom)
            .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif")
            .style("font-size", this.settings.fontSize);

        this.redrawGrid(vis);
        this.redrawRowTitles(vis);
        this.redrawColumnTitles(vis);
    }

    private redrawGrid(vis: d3.Selection<SVGSVGElement, {}, HTMLElement, any>) {
        let squareWidth = this.determineSquareWidth();
        // TODO change this to CieLAB color space
        let interpolator = d3.interpolateHsl(d3.hsl("#EEEEEE"), d3.hsl("#1565C0"));

        for (let row = 0; row < this.rows.length; row++) {
            vis.selectAll("svg")
                .data(this.values[row])
                .enter()
                .append("rect")
                .attr("x", (d, i) => i * squareWidth + i * this.settings.squarePadding)
                .attr("y", (d, i) => row * squareWidth + row * this.settings.squarePadding)
                .attr("width", d => squareWidth)
                .attr("height", d => squareWidth)
                .attr("fill", d => interpolator(d.value))
                .attr("class", (d, i) => `row-${this.rows[row].id} column-${this.columns[i].id}`)
                .on("mouseover", (d, i) => this.tooltipIn(d, i))
                .on("mousemove", (d, i) => this.tooltipMove(d, i))
                .on("mouseout", (d, i) => this.tooltipOut(d, i));
        }
    }

    private redrawRowTitles(vis: d3.Selection<SVGSVGElement, {}, HTMLElement, any>) {
        let squareWidth = this.determineSquareWidth();
        let textStart = squareWidth * this.columns.length + this.settings.squarePadding * (this.columns.length - 1) + this.settings.visualizationTextPadding;

        let textCenter = Math.max((squareWidth - this.settings.fontSize) / 2, 0);

        vis.selectAll("svg")
            .data(this.rows)
            .enter()
            .append("text")
            .text(d => d.name)
            .attr("dominant-baseline", "hanging")
            .attr("x", textStart)
            .attr("y", (d, i) => (squareWidth + this.settings.squarePadding) * i + textCenter)
            .attr("class", (d, i) => `row-label-${this.rows[i].id}`)
            .append("title")
            .text(d => d.name);
    }

    private redrawColumnTitles(vis: d3.Selection<SVGSVGElement, {}, HTMLElement, any>) {
        let squareWidth = this.determineSquareWidth();
        let textStart = squareWidth * this.rows.length + this.settings.squarePadding * (this.rows.length - 1) + this.settings.visualizationTextPadding;

        let textCenter = Math.max((squareWidth - this.settings.fontSize) / 2, 0);

        vis.selectAll("svg")
            .data(this.columns)
            .enter()
            .append("text")
            .text(d => d.name)
            .attr("text-anchor", "start")
            .attr("x",(d, i) => (squareWidth + this.settings.squarePadding) * i + textCenter)
            .attr("y", textStart)
            .attr("transform", (d, i) => `rotate(90, ${(squareWidth + this.settings.squarePadding) * i + textCenter}, ${textStart})`)
            .attr("class", (d, i) => `column-label-${this.columns[i].id}`)
            .append("title")
            .text(d => d.name);
    }

    private initTooltip() {
        return d3.select("body")
            .append("div")
            .attr("id", $(this.element).attr('id') + "-tooltip")
            .attr("class", "tip")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("background-color", "white")
            .style("padding", "5px")
            .style("border", "1px solid #dddddd")
            .style("border-radius", "3px");
    }

    private tooltipIn(d: HeatmapValue, i: number) {
        if (!this.settings.enableTooltips || this.tooltip == null || !d.rowId || !d.columnId) {
            return;
        }

        if (!d.rowId || !d.columnId) {
            throw "A value with an invalid rowId or columnId was encountered.";
        }

        // Find the row and column that belong to the given HeatmapValue. These are looked up by the id's contained in
        // the value.
        let row = this.rowMap.get(d.rowId);
        let column = this.columnMap.get(d.columnId);

        if (!row || !column) {
            throw "A row or column with a specific ID does not exist.";
        }

        this.tooltip.html(this.settings.getTooltip(d, row, column))
            .style("top", (d3.event.pageY - 5) + "px")
            .style("left", (d3.event.pageX + 15) + "px")
            .style("visibility", "visible");
    }

    private tooltipMove(d: HeatmapValue, i: number) {
        if (!this.settings.enableTooltips || !this.tooltip) {
            return;
        }

        this.tooltip.style("top", (d3.event.pageY - 5) + "px")
            .style("left", (d3.event.pageX + 15) + "px");
    }

    private tooltipOut(d: HeatmapValue, i: number) {
        if (!this.settings.enableTooltips || !this.tooltip) {
            return;
        }

        this.tooltip.style("visibility", "hidden");
    }
}
