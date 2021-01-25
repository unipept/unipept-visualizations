import Settings from "./../../Settings";
import DataNode from "./../../DataNode";
export default class TreemapSettings extends Settings {
    className: string;
    levels: number | undefined;
    labelHeight: number;
    colorRoot: string;
    colorLeaf: string;
    colorBreadcrumbs: string;
    /**
     * Callback that's called whenever the user clicks on a node in the visualization.
     */
    rerootCallback: (node: DataNode) => void;
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
    getLabel: (x: DataNode) => string;
}
