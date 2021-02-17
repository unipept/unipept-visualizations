import { scaleOrdinal, schemeCategory10, HierarchyPointLink } from "d3";

import Settings from "./../../Settings";
import TreeviewNode from "./TreeviewNode";

const defaultColorScale = scaleOrdinal(schemeCategory10);

export default class TreeviewSettings extends Settings {
    minNodeSize: number = 2;
    maxNodeSize: number = 105;

    enableExpandOnClick: boolean = true;
    enableAutoExpand: boolean = false;
    autoExpandValue: number = 0.8;
    levelsToExpand: number = 2;

    enableRightClick: boolean = false;

    enableInnerArcs: boolean = true;
    enableLabels: boolean = true;

    nodeDistance: number = 180;

    animationDuration: number = 1000;

    nodeFillColor: (d: TreeviewNode) => string = (d: TreeviewNode) => {
        if (d.isSelected()) {
            return d.children.length > 0 ? d.getColor() || "#aaa" : "#fff";
        } else {
            return "#aaa";
        }
    }

    nodeStrokeColor: (d: TreeviewNode) => string =
        (d: TreeviewNode) => d.isSelected() ? (d.getColor() || "#aaa") : "#aaa";

    linkStrokeColor: (d: HierarchyPointLink<TreeviewNode>) => string =
        (d: HierarchyPointLink<TreeviewNode>) => d.source.data.isSelected() ? d.target.data.getColor() : "#aaa";

    colorProvider: (d: TreeviewNode) => string = (d: TreeviewNode) => defaultColorScale(d.name);

    getLabel: (d: TreeviewNode) => string = (d: TreeviewNode) => d.name;

    /**
     * Returns the html to use as tooltip for current mouse position. This tooltip provides information to the user
     * about the node that's currently hovered by the mouse cursor.
     *
     * @param value Current node that's being hovered by the mouse cursor.
     * @return A valid HTML-string that represents a tooltip.
     */
    getTooltip: (
        value: TreeviewNode,
    ) => string = (value: TreeviewNode) => {
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
    getTooltipTitle: (value: TreeviewNode) => string = (value: TreeviewNode) => value.name;

    /**
     * Returns text that's being used for the body of a tooltip. This tooltip provides information to the user about
     * the node that's currently hovered by the mouse cursor.
     **
     * @param x Current value for the node that's being hovered by the mouse cursor.
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipText: (x: TreeviewNode) => string = (x: TreeviewNode) => `${x.count} hits`;
}
