import SunburstSettings from "./SunburstSettings";
import DataNode from "./../../DataNode";
export default class Sunburst {
    private element;
    private data;
    private settings;
    private tooltip;
    private breadCrumbs;
    private colorCounter;
    constructor(element: HTMLElement, data: DataNode, options?: SunburstSettings);
    private fillOptions;
    private redraw;
    private click;
    /**
     * Calculates the color of an arc based on the color of his children.
     *
     * @param d The node for which we want the color.
     * @return string The calculated color in HTML color representation.
     */
    private color;
    /**
     * Color generation function that iterates over a fixed list of colors.
     *
     * @return string HTML-representation of the generated color
     */
    private getColor;
    private createArc;
}
