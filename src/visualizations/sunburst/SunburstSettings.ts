import Settings from "./../../Settings";
import DataNode from "./../../DataNode";
import ColorPalettes from "./../../color/ColorPalettes";

export default class SunburstSettings extends Settings {
    // Radius of the center sunburst node
    radius: number = 300;

    breadcrumbWidth: number = 200;

    /**
     * Classname that's internally used for the object.
     */
    className: string = 'sunburst';

    useFixedColors: boolean = false;

    colorPalette: string[] = ColorPalettes.DEFAULT_COLORS;

    // Color palette that should be used when the "use fixed colors" option is enabled
    fixedColorPalette: string[] = ColorPalettes.FIXED_COLORS;

    enableBreadcrumbs: boolean = true;

    /**
     * Returns the value of the given data node that should be used to count the occurrences of this node.
     *
     * @param node
     */
    countAccessor: (node: DataNode) => number = (node: DataNode) => node.data.self_count;

    rerootCallback: (node: DataNode) => void = () => {};

    levels: number = 4;

    // How lang should the animation take (in milliseconds)
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
    getTooltipText: (x: DataNode) => string = (x: DataNode) => `${x.data.count} hits`;

    getLabel: (x: DataNode) => string = (x: DataNode) => x.name === "empty" ? "" : x.name;

    getTitleText: (x: DataNode) => string = this.getLabel;
}
