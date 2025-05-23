import { HierarchyPointLink } from 'd3';
import { default as Settings } from './../../Settings';
import { default as TreeviewNode } from './TreeviewNode';

export default class TreeviewSettings extends Settings {
    /**
     * Size (in pixels) that should be associated to nodes with the lowest possible count value.
     */
    minNodeSize: number;
    /**
     * Size (in pixels) that should be associated to nodes with the maximum possible count value.
     */
    maxNodeSize: number;
    /**
     * Should a subtree be expanded / collapse when it's root has been clicked?
     */
    enableExpandOnClick: boolean;
    /**
     * Should a heuristic be used to expand the most important branches when loading the initial visualization.
     * If a number is supplied, that number will be used as parameter for the heuristic, a higher value causes
     * more expansion.
     */
    enableAutoExpand: boolean;
    /**
     * Value that's used to tweak the auto-expand heuristic of the visualization. Increase to expand more.
     */
    autoExpandValue: number;
    /**
     * The number of levels to expand after clicking on a node and when loading the initial visualization.
     */
    levelsToExpand: number;
    /**
     * Should the tree reroot when right clicking a node?
     */
    enableRightClick: boolean;
    /**
     * Should inner arcs be shown?
     */
    enableInnerArcs: boolean;
    /**
     * Should labels (containing the node's names) be shown, next to the nodes?
     */
    enableLabels: boolean;
    /**
     * The horizontal distance (in pixels) between nodes.
     */
    nodeDistance: number;
    /**
     * Time the animation should last (in milliseconds).
     */
    animationDuration: number;
    /**
     * Amount of levels deep in the true for which the color should be set explicitly. This parameter determines up
     * until which point in the tree the colorProvider function will be called. By default only the direct children of
     * the root node (at level 1) are distinctly colored.
     */
    colorProviderLevels: number;
    /**
     * Function that returns a color to use as a fill color.
     *
     * @param d The TreeviewNode for which the node fill color should be returned.
     * @return The color that should be used as a fill color for a node.
     */
    nodeFillColor: (d: TreeviewNode) => string;
    /**
     * Function that returns a color to use as a stroke color for a node.
     *
     * @param d The TreeviewNode for which the stroke color should be returned.
     * @return The color that should be used as a stroke color for a node.
     */
    nodeStrokeColor: (d: TreeviewNode) => string;
    /**
     * Function that returns a color to use as a stroke for a link (a connection between two nodes).
     *
     * @param l The link for which the stroke color should be determined. A link contains both a source and target node.
     * @return The color that should be used as a stroke color for the given link.
     */
    linkStrokeColor: (l: HierarchyPointLink<TreeviewNode>) => string;
    /**
     * Function that returns the color that should be used for a specific node. This actually corresponds to the
     * specific color scale that should be used for this visualization. Note that this function will only be called for
     * nodes up until the level in the tree specified by the parameter "colorProviderLevels".
     *
     * @param d A TreeviewNode for which the corresponding color should be computed.
     * @param level The depth in the tree at which this node is situated.
     * @return The color associated with the given node.
     */
    colorProvider: (d: TreeviewNode, level?: number) => string;
    /**
     * Returns the label that should be displayed for a specific node (the label corresponds to the text shown in the
     * visualization on top of a node).
     *
     * @param d Node for which the label should be rendered.
     * @return The label text, exactly as it should be used by the visualization.
     */
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
