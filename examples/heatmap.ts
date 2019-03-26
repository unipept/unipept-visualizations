import {Heatmap} from "../src/heatmap/heatmap";
import * as d3 from "d3";
import {HeatmapElement} from "../src/heatmap/typings";

d3.csv('data/dendrogram.csv')
    .then(function(data) {

        let grid = [];
        let rows: HeatmapElement[] = [];
        let cols: HeatmapElement[] = [];

        // First process the header row and create the columns that correspond with the given column headers
        for (let key in data[0]) {
            if (key !== 'Family' && data[0].hasOwnProperty(key)) {
                cols.push({
                    name: key
                })
            }
        }

        // Then process all rows (including the row-objects) and fill in the grid
        let maxValue = 0;
        for (let row of data) {
            let familyName: string | undefined = row.Family;

            if (!familyName) {
                throw "Unknown family name!";
            }

            rows.push({
                name: familyName
            });

            let rowValues = [];

            for (let col of cols) {
                // @ts-ignore
                let val = parseFloat(row[col.name]);
                rowValues.push({
                    value: val
                });

                if (val > maxValue) {
                    maxValue = val;
                }
            }

            grid.push(rowValues);
        }

        // Normalize all rows
        for (let i = 0; i < grid.length; i++) {
            grid[i] = grid[i].map(x => {
                return {
                    value: x.value / maxValue
                };
            })
        }

        let heatmapElement: HTMLElement | null = document.getElementById("heatmap");

        if (heatmapElement) {
            let heatmap = new Heatmap(heatmapElement, {
                rows: rows,
                columns: cols,
                values: grid
            });

            document.getElementById("cluster")!.addEventListener("click", () => {
                heatmap.cluster();
            });
        }
    });
