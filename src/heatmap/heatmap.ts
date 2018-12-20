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

    public reset() {

    }

    private preprocessFeatures(data: HeatmapElement[]): HeatmapElement[] {
        return data.map((val: HeatmapElement, idx: number, arr: HeatmapElement[]) => {
            if (!val.id) {
                val.id = idx.toString();
            }

            return val;
        });
    }

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

    private initCSS() {

    }

    private redraw() {
        $(this.element).empty();

        let vis = d3.select(this.element)
            .append("svg")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", `0 0 ${this.settings.width + this.MARGIN.right + this.MARGIN.left} ${this.settings.height + this.MARGIN.top + this.MARGIN.bottom}`)
            .attr("width", this.settings.width + this.MARGIN.right + this.MARGIN.left)
            .attr("height", this.settings.height + this.MARGIN.top + this.MARGIN.bottom)
            .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");

        vis.append("g")
            .data([{a: 1, b: 2}, 2, 3])
            .enter()
            .append("rect")
            .attr("x", d => 50)
            .attr("y", d => 50)
            .attr("width", d => 50)
            .attr("heigh", d => 50);
    }
}
