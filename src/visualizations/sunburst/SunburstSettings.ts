import Settings from "./../../Settings";
import DataNode, { DataNodeLike } from "./../../DataNode";
import ColorPalette from "./../../color/ColorPalette";

export default class SunburstSettings extends Settings {
    /**
     * Radius size of the sunburst visualization (in pixels).
     */
    radius: number = 300;

    /**
     * Amount of pixels that are reserved for the breadcrumbs (to the right of the sunburst visualization itself).
     */
    breadcrumbWidth: number = 200;

    /**
     * Classname that's internally used for the object.
     */
    className: string = 'sunburst';

    /**
     * Should the colors that are used to mark nodes be based upon the label-names? (I.e. if this is enabled, all nodes
     * with the same label, will receive the same color).
     */
    useFixedColors: boolean = false;

    /**
     * Default color palette that should be used for the node colors. Use one of the predefined palettes from the
     * ColorPalette-class if you don't feel inspired.
     */
    colorPalette: string[] = ColorPalette.DEFAULT_COLORS;

    /**
     * Color palette that should be used if the useFixedColors option is enabled.
     */
    fixedColorPalette: string[] = ColorPalette.FIXED_COLORS;

    /**
     * Should breadcrumbs be shown to the right of the sunburst visualization?
     */
    enableBreadcrumbs: boolean = true;

    /**
     * With how many levels can the user interact in the sunburst visualization?
     */
    levels: number = 4;

    /**
     * Returns the value of the given data node that should be used to count the occurrences of this node.
     *
     * @param node The node for which the count value should be returned.
     */
    selfCountAccessor: (node: DataNodeLike) => number = (node: DataNodeLike) => node.data.self_count;

    countAccessor: (node: DataNodeLike) => number = (node: DataNodeLike) => node.data.count;

    /**
     * Callback that's called whenever the user clicks on a node in the visualization.
     */
    rerootCallback: (node: DataNode) => void = () => {};

    /**
     * How long should the sunburst visualization animation take (in milliseconds)?
     */
    animationDuration: number = 1000;

    /**
     * Returns the html to use as tooltip for current mouse position. This tooltip provides information to the user
     * about the node that's currently hovered by the mouse cursor.
     *
     * @param value Current node that's being hovered by the mouse cursor.
     * @return A valid HTML-string that represents a tooltip.
     */
    getTooltip: (
        value: DataNode,
    ) => string = (value: DataNode) => {
        return `
            <style>
                .tooltip {
                    padding: 10px;
                    border-radius: 5px; 
                    background: rgba(0, 0, 0, 0.8); 
                    color: #fff;
                }
                
                .tooltip div,a {
                    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
                }
                
                .tooltip div {
                    font-weight: bold;
                }
            </style>
            <div class="tooltip">
                <div>
                    ${this.getTooltipTitle(value)}
                </div>
                <a>
                    ${this.getTooltipText(value)}
                </a>
            </div>
        `
    };

    /**
     * Returns text that's being used for the title of a tooltip. This tooltip provides information to the user about
     * the node that's currently hovered by the mouse cursor.
     *
     * This function returns the row and column title of the currently selected value by default.
     *
     * @param value Current node that's being hovered by the mouse cursor.
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipTitle: (value: DataNode,) => string = (value: DataNode) => value.name;

    /**
     * Returns text that's being used for the body of a tooltip. This tooltip provides information to the user about
     * the node that's currently hovered by the mouse cursor.
     **
     * @param x Current value for the node that's being hovered by the mouse cursor.
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipText: (x: DataNode) => string = (x: DataNode) => `${this.countAccessor(x.data.count)} hits`;

    getLabel: (x: DataNode) => string = (x: DataNode) => x.name === "empty" ? "" : x.name;

    getTitleText: (x: DataNode) => string = this.getLabel;
}
