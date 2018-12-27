import {HeatmapData, HeatmapElement, HeatmapValue} from "typings"
import * as d3 from "d3";
import HeatmapSettings from "./heatmapSettings";
import Clusterer from "../shared/clusterer";
import HierarchicalClusterer from "../shared/hierarchicalClusterer";
import EuclidianDistanceMetric from "../shared/euclidianDistanceMetric";
import ClusterElement from "../shared/clusterElement";
import TreeNode from "../shared/treeNode";

export class Heatmap {
    private element: string;
    private settings: HeatmapSettings;

    // We need to be both able to fast index the array of elements and find an element by id. That's why both a Map
    // and an array are kept in memory.
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
        let clusterer = new HierarchicalClusterer<HeatmapValue>(new EuclidianDistanceMetric<HeatmapValue>());
        let mappedValues = this.values.map((row) => row.map((el) => new ClusterElement<HeatmapValue>(el.value, el)));

        let rowResult = clusterer.cluster(mappedValues, "rows");

        // Now we perform a depth first search on the result in order to find the order of the values
        let rowOrder: number[] = [];
        this.determineOrder(rowResult, rowOrder, this.rowMap, this.rows, (x: HeatmapValue) => {
            let id = x.rowId;

            if (!id) {
                throw "An invalid row was encountered!";
            }

            return id;
        });

        let columnResult = clusterer.cluster(mappedValues, "columns");

        let columnOrder: number[] = [];
        this.determineOrder(columnResult, columnOrder, this.columnMap, this.columns, (x: HeatmapValue) => {
            let id = x.columnId;

            if (!id) {
                throw "An invalid column was encountered!";
            }

            return id;
        });


        // Swap rows and columns
        let newValues: HeatmapValue[][] = [];
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
                .duration(1000)
                .attr("y", (d) => newLocation * squareWidth + newLocation * this.settings.squarePadding);

            d3.select(".row-label-" + row.id)
                .transition()
                .duration(1000)
                .attr("y",  (d) => (squareWidth + this.settings.squarePadding) * newLocation + textCenter);
        }

        let textStart = squareWidth * this.rows.length + this.settings.squarePadding * (this.rows.length - 1) + this.settings.visualizationTextPadding;

        // Then animate the columns in the same way
        for (let i = 0; i < this.columns.length; i++) {
            let newLocation = columnOrder.indexOf(i);
            let column = this.columns[i];

            d3.selectAll(".column-" + column.id)
                .transition()
                .delay(1000)
                .duration(1000)
                .attr("x", (d) => newLocation * squareWidth + newLocation * this.settings.squarePadding);

            d3.selectAll(".column-label-" + column.id)
                .transition()
                .delay(1000)
                .duration(1000)
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

    private determineOrder(treeNode: TreeNode<HeatmapValue[]>, order: number[], elementMap: Map<string, HeatmapElement>, elements: HeatmapElement[], idExtractor: (val: HeatmapValue) => string) {
        if (!treeNode.leftChild && !treeNode.rightChild) {
            let id = idExtractor(treeNode.values[0][0]);

            if (!id) {
                return;
            }

            let el = elementMap.get(id);

            if (!el) {
                return;
            }

            order.push(elements.indexOf(el));
        }

        if (treeNode.leftChild) {
            this.determineOrder(treeNode.leftChild, order, elementMap, elements, idExtractor);
        }

        if (treeNode.rightChild) {
            this.determineOrder(treeNode.rightChild, order, elementMap, elements, idExtractor);
        }
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
            .attr("class", (d, i) => `row-label-${this.rows[i].id}`);
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
            .attr("class", (d, i) => `column-label-${this.columns[i].id}`);
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
