import { default as Settings } from './../../Settings';
import { default as DataNode } from './../../DataNode';

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
     * How long should the sunburst visualization animation take (in milliseconds)?
     */
    animationDuration: number;
    /**
     * Callback that's called whenever the user clicks on a node in the visualization.
     */
    rerootCallback: (node: DataNode) => void;
    /**
     * Returns the hash that's used to determine which color should be assigned to this datanode. The hash should be
     * a number. Hash should be the same for all nodes to which the same color should be assigned.
     *
     * @param node The DataNode for which the current hash should be returned.
     */
    fixedColorHash: (node: DataNode) => number;
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
     *
     * @param x Current value for the node that's being hovered by the mouse cursor.
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipText: (x: DataNode) => string;
    /**
     * Returns the label that should be displayed for a specific node (the label corresponds to the text shown in the
     * visualization on top of an arc).
     *
     * @param x Node for which the label should be rendered.
     * @return The label text, exactly as it should be used by the visualization.
     */
    getLabel: (x: DataNode) => string;
    /**
     * Returns the label or title text that's associated to a breadcrumb for a specific node.
     *
     * @param x Node for which the label / title text should be rendered.
     * @return The title that should be associated with a breadcrumb for the given node.
     */
    getTitleText: (x: DataNode) => string;
}
