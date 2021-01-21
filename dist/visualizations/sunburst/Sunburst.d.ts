import * as d3 from "d3";
import SunburstSettings from "./SunburstSettings";
import DataNode from "./../../DataNode";
declare type HRN<T> = d3.HierarchyRectangularNode<T>;
export default class Sunburst {
    private element;
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
    constructor(element: HTMLElement, data: DataNode, options?: SunburstSettings);
    reset(): void;
    private fillOptions;
    private maxY;
    private redraw;
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
     * Defines what happens after a node is clicked.
     *
     * @param d The data object of the clicked arc
     */
    private click;
    setBreadcrumbs(d: HRN<DataNode>): void;
}
export {};
