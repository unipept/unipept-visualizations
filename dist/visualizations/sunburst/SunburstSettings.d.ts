import Settings from "./../../Settings";
import DataNode from "./../../DataNode";
export default class SunburstSettings extends Settings {
    radius: number;
    breadcrumbWidth: number;
    /**
     * Classname that's internally used for the object.
     */
    className: string;
    useFixedColors: boolean;
    colorPalette: string[];
    fixedColorPalette: string[];
    enableBreadcrumbs: boolean;
    /**
     * Returns the value of the given data node that should be used to count the occurrences of this node.
     *
     * @param node
     */
    countAccessor: (node: DataNode) => number;
    rerootCallback: (node: DataNode) => void;
    levels: number;
    animationDuration: number;
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
    getTitleText: (x: DataNode) => string;
}
