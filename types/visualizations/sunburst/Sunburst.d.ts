import SunburstSettings from "./SunburstSettings";
import DataNode from "./../../DataNode";
import "core-js/stable";
import "regenerator-runtime/runtime";
export default class Sunburst {
    private readonly element;
    private readonly settings;
    private readonly data;
    private tooltip;
    private breadCrumbs;
    private colorCounter;
    private currentMaxLevel;
    private xScale;
    private yScale;
    private path;
    private text;
    private arc;
    private visGElement;
    private arcData;
    private textData;
    private previousRoot;
    constructor(element: HTMLElement, data: DataNode, options?: SunburstSettings);
    reset(): void;
    private fillOptions;
    private maxY;
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
    private initCss;
    /**
     * Interpolate the scales! Defines new scales based on the clicked item.
     *
     * @param d The clicked item
     * @return new scales
     */
    private arcTween;
    private tooltipIn;
    private tooltipMove;
    private tooltipOut;
    /**
     * Compute the amount of vertical space that's available for text (i.e. the maximum text height) for a specific node
     * in the sunburst visualization.
     *
     * @param d The node in the sunburst visualization for which the vertical space should be computed.
     * @return The available vertical space in pixels.
     */
    private computeAvailableSpace;
    /**
     * Defines what happens after a node is clicked.
     *
     * @param d The data object of the clicked arc
     */
    private click;
    private renderArcs;
    private renderText;
    private setBreadcrumbs;
}
