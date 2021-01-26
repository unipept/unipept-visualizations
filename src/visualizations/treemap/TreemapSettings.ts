import { HierarchyRectangularNode } from "d3";

import Settings from "./../../Settings";
import DataNode from "./../../DataNode";

export default class TreemapSettings extends Settings {
    className: string = "treemap";

    levels: number | undefined = undefined;

    labelHeight: number = 10;

    colorRoot: string = "#104B7D";

    colorLeaf: string = "#fdffcc";

    colorBreadcrumbs: string = "#FF8F00";

    /**
     * Callback that's called whenever the user clicks on a node in the visualization.
     */
    rerootCallback: (node: DataNode) => void = () => {};

    getBreadcrumbTooltip: (d: DataNode) => string = (d: DataNode) => d.name;

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

    getLabel: (x: DataNode) => string = (x: DataNode) => x.name;

    getLevel: (x: HierarchyRectangularNode<DataNode>) => number = (x: HierarchyRectangularNode<DataNode>) =>  x.depth;
}
