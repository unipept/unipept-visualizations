import Settings from "./../../Settings";
import DataNode from "./../../DataNode";
export default class SunburstSettings extends Settings {
    /**
     * Radius size of the sunburst visualization (in pixels).
     */
    radius: number;
    /**
     * Amount of pixels that are reserved for the breadcrumbs (to the right of the sunburst visualization itself).
     */
    breadcrumbWidth: number;
    /**
     * Classname that's internally used for the object.
     */
    className: string;
    /**
     * Should the colors that are used to mark nodes be based upon the label-names? (I.e. if this is enabled, all nodes
     * with the same label, will receive the same color).
     */
    useFixedColors: boolean;
    /**
     * Default color palette that should be used for the node colors. Use one of the predefined palettes from the
     * ColorPalette-class if you don't feel inspired.
     */
    colorPalette: string[];
    /**
     * Color palette that should be used if the useFixedColors option is enabled.
     */
    fixedColorPalette: string[];
    /**
     * Should breadcrumbs be shown to the right of the sunburst visualization?
     */
    enableBreadcrumbs: boolean;
    /**
     * With how many levels can the user interact in the sunburst visualization?
     */
    levels: number;
    /**
     * Returns the value of the given data node that should be used to count the occurrences of this node.
     *
     * @param node The node for which the count value should be returned.
     */
    countAccessor: (node: DataNode) => number;
    /**
     * Callback that's called whenever the user clicks on a node in the visualization.
     */
    rerootCallback: (node: DataNode) => void;
    /**
     * How long should the sunburst visualization animation take (in milliseconds)?
     */
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
