import { HierarchyRectangularNode } from 'd3';
import { default as Settings } from './../../Settings';
import { default as DataNode } from './../../DataNode';

export default class TreemapSettings extends Settings {
    /**
     * Classname that's associated to the element that's used to render this treemap in.
     */
    className: string;
    /**
     * The maximum depth of the data object. By default the actual depth is used.
     */
    levels: number | undefined;
    /**
     * The height (in pixels) of the breadcrumb bar.
     */
    labelHeight: number;
    /**
     * Color of the root.
     */
    colorRoot: string;
    /**
     * Color of the leaves.
     */
    colorLeaf: string;
    /**
     * Color of the breadcrumb bar.
     */
    colorBreadcrumbs: string;
    /**
     * Callback that's called whenever the user clicks on a node in the visualization.
     */
    rerootCallback: (node: DataNode) => void;
    /**
     * Function that returns a string to use as tooltip for the breadcrumbs. Is called with a node as parameter.
     * By default, the name attribute of the node is used.
     *
     * @param d A DataNode for which we need to corresponding breadcrumb title
     * @return The breadcrumb title for the given DataNode.
     */
    getBreadcrumbTooltip: (d: DataNode) => string;
    /**
     * Returns the html to use as tooltip for current mouse position. This tooltip provides information to the user
     * about the node that's currently hovered by the mouse cursor.
     *
     * @param value Current node that's being hovered by the mouse cursor.
     * @return A valid HTML-string that represents a tooltip.
     */
    getTooltip: (value: DataNode) => string;
    /**
     * Returns text that's being used for the title of a tooltip. This tooltip provides information to the user about
     * the node that's currently hovered by the mouse cursor.
     *
     * This function returns the row and column title of the currently selected value by default.
     *
     * @param value Current node that's being hovered by the mouse cursor.
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipTitle: (value: DataNode) => string;
    /**
     * Returns text that's being used for the body of a tooltip. This tooltip provides information to the user about
     * the node that's currently hovered by the mouse cursor.
     **
     * @param x Current value for the node that's being hovered by the mouse cursor.
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipText: (x: DataNode) => string;
    /**
     * Returns the label that should be displayed for a specific node (the label corresponds to the text shown in the
     * visualization on top of a rectangle).
     *
     * @param x Node for which the label should be rendered.
     * @return The label text, exactly as it should be used by the visualization.
     */
    getLabel: (x: DataNode) => string;
    /**
     * Function that returns the depth of a node (used for determining the color). Is called with a node as parameter.
     * By default the actual depth is used.
     *
     * @param x Node for which the depth should be computed.
     * @return The depth that's associated with the given node.
     */
    getLevel: (x: HierarchyRectangularNode<DataNode>) => number;
}
