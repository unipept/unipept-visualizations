import { HierarchyPointLink } from "d3";
import Settings from "./../../Settings";
import TreeviewNode from "./TreeviewNode";
export default class TreeviewSettings extends Settings {
    minNodeSize: number;
    maxNodeSize: number;
    enableExpandOnClick: boolean;
    enableAutoExpand: boolean;
    autoExpandValue: number;
    levelsToExpand: number;
    enableRightClick: boolean;
    enableInnerArcs: boolean;
    enableLabels: boolean;
    nodeDistance: number;
    animationDuration: number;
    nodeFillColor: (d: TreeviewNode) => string;
    nodeStrokeColor: (d: TreeviewNode) => string;
    linkStrokeColor: (d: HierarchyPointLink<TreeviewNode>) => string;
    colorProvider: (d: TreeviewNode) => string;
    getLabel: (d: TreeviewNode) => string;
    /**
     * Returns the html to use as tooltip for current mouse position. This tooltip provides information to the user
     * about the node that's currently hovered by the mouse cursor.
     *
     * @param value Current node that's being hovered by the mouse cursor.
     * @return A valid HTML-string that represents a tooltip.
     */
    getTooltip: (value: TreeviewNode) => string;
    /**
     * Returns text that's being used for the title of a tooltip. This tooltip provides information to the user about
     * the node that's currently hovered by the mouse cursor.
     *
     * This function returns the row and column title of the currently selected value by default.
     *
     * @param value Current node that's being hovered by the mouse cursor.
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipTitle: (value: TreeviewNode) => string;
    /**
     * Returns text that's being used for the body of a tooltip. This tooltip provides information to the user about
     * the node that's currently hovered by the mouse cursor.
     **
     * @param x Current value for the node that's being hovered by the mouse cursor.
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipText: (x: TreeviewNode) => string;
}
