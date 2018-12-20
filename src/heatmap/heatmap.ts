import {HeatmapData, HeatmapElement, HeatmapValue} from "typings"
import * as d3 from "d3";
import HeatmapSettings from "./heatmapSettings";

export default class Heatmap {
    private element: string;
    private settings: HeatmapSettings;

    private rows: HeatmapElement[];
    private columns: HeatmapElement[];
    private values: HeatmapValue[][];

    private readonly MARGIN = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };

    constructor(element: string, data: HeatmapData, options: HeatmapSettings = new HeatmapSettings()) {
        this.element = element;

        this.rows = this.preprocessFeatures(data.rows);
        this.columns = this.preprocessFeatures(data.columns);
        this.values = this.preprocessValues(data.values);

        this.settings = options;

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
     * Preprocess an array of features. This function sanitizes the user input by filling in the optional parts (if
     * they're missing). Id's are generated using the index of each element in the array.
     *
     * @param data
     */
    private preprocessFeatures(data: HeatmapElement[]): HeatmapElement[] {
        return data.map((val: HeatmapElement, idx: number, arr: HeatmapElement[]) => {
            if (!val.id) {
                val.id = idx.toString();
            }

            return val;
        });
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

    }

    /**
     * Determines the dimensions of one square based upon the current width and height-settings and the amount of rows
     * and columns currently set to be visualized.
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

        vis.append("g")
            .data([{a: 1, b: 2}, 2, 3])
            .enter()
            .append("rect")
            .attr("x", d => 50)
            .attr("y", d => 50)
            .attr("width", d => 50)
            .attr("heigh", d => 50);
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
            .attr("y", (d, i) => (squareWidth + this.settings.squarePadding) * i + textCenter);
    }

    private redrawColumnTitles(vis: d3.Selection<SVGSVGElement, {}, HTMLElement, any>) {
        let squareWidth = this.determineSquareWidth();
        let textStart = squareWidth * (this.rows.length + 1) + this.settings.squarePadding + this.rows.length + this.settings.visualizationTextPadding;

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
    }
}
