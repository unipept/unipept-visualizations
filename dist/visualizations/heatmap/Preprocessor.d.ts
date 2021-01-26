import HeatmapFeature from "./HeatmapFeature";
import HeatmapValue from "./HeatmapValue";
export default class Preprocessor {
    /**
     * Converts an array of feature labels into correct HeatmapFeature objects. These objects keep track of a name
     * and index for a feature.
     *
     * @param featureLabels All labels that should be converted to true HeatmapFeature objects.
     * @return An array with HeatmapFeature objects.
     */
    preprocessFeatures(featureLabels: string[]): HeatmapFeature[];
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
    preprocessValues(data: (number | HeatmapValue)[][], lowColor: string, highColor: string, colorValues: number): HeatmapValue[][];
    /**
     * Order all values in a map, per color.
     *
     * @param values All grid values for which we should determine a color.
     * @return A mapping between an HTML-color value and a list of [row, col] positions.
     */
    orderPerColor(values: HeatmapValue[][]): Map<string, [number, number][]>;
}
