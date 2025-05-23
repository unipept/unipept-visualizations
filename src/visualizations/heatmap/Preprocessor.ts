import {HeatmapFeature} from "./HeatmapFeature";
import {HeatmapValue} from "./HeatmapValue";
import * as d3 from "d3";

export default class Preprocessor {
    /**
     * Converts an array of feature labels into correct HeatmapFeature objects. These objects keep track of a name
     * and index for a feature.
     *
     * @param featureLabels All labels that should be converted to true HeatmapFeature objects.
     * @return An array with HeatmapFeature objects.
     */
    preprocessFeatures(featureLabels: string[]): HeatmapFeature[] {
        return Object.entries(featureLabels).map(([idx, feature]) => {
            return {
                name: feature,
                idx: Number.parseInt(idx)
            }
        });
    }

    /**
     * Convert the data grid consisting of numbers into valid HeatmapValue-objects. The order from the input grid is
     * retained in the output grid. A color will be computed for each distinct value. Only a specific amount of colors
     * will be generated, as determined by the colorValues parameter.
     *
     * @param data A grid of numbers that needs to be converted to proper HeatmapValue-objects.
     * @param lowColor Color value that should be used for low values
     * @param highColor Color value that should be used for high values
     * @param colorValues How many discrete color values should be generated?
     * @return A two-dimensional grid of HeatmapValue objects.
     */
    preprocessValues(
        data: (number | HeatmapValue)[][],
        lowColor: string,
        highColor: string,
        colorValues: number
    ): HeatmapValue[][] {
        const interpolator = d3.interpolateLab(d3.lab(lowColor), d3.lab(highColor));

        const x = d3.scaleLinear().domain([0, 1]).range([0, 1]);
        const ticks = x.ticks(colorValues);
        const quantizeScale = d3.scaleQuantize().domain([0, 1]).range(ticks);

        return Object.entries(data).map(([rowIdx, row]) => Object.entries(row).map(([colIdx, value]) => {
            if (typeof value === "number") {
                const quantizedValue = quantizeScale(value);

                if (quantizedValue === undefined) {
                    throw new Error("Invalid heatmap value given: " + value);
                }

                return {
                    value: value as number,
                    rowId: Number.parseInt(rowIdx),
                    columnId: Number.parseInt(colIdx),
                    color: interpolator(quantizedValue)
                };
            } else {
                return value;
            }
        }));
    }

    /**
     * Order all values in a map, per color.
     *
     * @param values All grid values for which we should determine a color.
     * @return A mapping between an HTML-color value and a list of [row, col] positions.
     */
    orderPerColor(values: HeatmapValue[][]): Map<string, [number, number][]> {
        const output = new Map<string, [number, number][]>();

        for (let rowIdx = 0; rowIdx < values.length; rowIdx++) {
            for (let colIdx = 0; colIdx < values[rowIdx].length; colIdx++) {
                const colorString = values[rowIdx][colIdx].color;

                if (!output.has(colorString)) {
                    output.set(colorString, []);
                }

                output.get(colorString)?.push([rowIdx, colIdx]);
            }
        }

        return output;
    }
}
