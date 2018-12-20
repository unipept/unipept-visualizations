import {HeatmapData, HeatmapElement, HeatmapValue} from "typings"
import * as d3 from "d3";
import HeatmapSettings from "./heatmapSettings";

export class Heatmap {
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

    }

    /**
     * Redraw the complete Heatmap and clear the view first.
     */
    private redraw() {
        $(this.element).empty();

        let visualizationWidth = this.settings.width - this.settings.textWidth;
        let visualizationHeight = this.settings.height - this.settings.textHeight;

        let squareWidth = Math.floor(visualizationWidth / this.columns.length);
        let squareHeight = Math.floor(visualizationHeight / this.rows.length);

        let interpolator = d3.interpolateHsl(d3.hsl("yellow"), d3.hsl("red"));

        let vis = d3.select(this.element)
            .append("svg")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", `0 0 ${this.settings.width + this.MARGIN.right + this.MARGIN.left} ${this.settings.height + this.MARGIN.top + this.MARGIN.bottom}`)
            .attr("width", this.settings.width + this.MARGIN.right + this.MARGIN.left)
            .attr("height", this.settings.height + this.MARGIN.top + this.MARGIN.bottom)
            .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");

        for (let row = 0; row < this.values.length; row++) {
            vis.selectAll("svg")
                .data(this.values[row])
                .enter()
                .append("rect")
                .attr("x", (d, i) => i * squareWidth)
                .attr("y", (d, i) => row * squareHeight)
                .attr("width", d => squareWidth)
                .attr("height", d => squareHeight)
                .attr("fill", d => interpolator(d.value));
        }
    }
}
