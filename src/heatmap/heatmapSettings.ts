import Settings from "../settings";
import {HeatmapElement, HeatmapValue} from "./typings";

export default class HeatmapSettings extends Settings {
    /***** VALUES *****/

    // Amount of pixels that are allowed to be occupied by the text of the rows.
    textWidth: number = 100;

    // Amount of pixels that are allowed to be occupied by the text of the columns.
    textHeight: number = 100;

    // The maximum dimension of one square.
    maximumSquareWidth: number = 50;

    // Space between the squares in the grid (0 for no padding)
    squarePadding: number = 2;

    // Space between the visualization grid itself and rendering the titles (in pixels)
    visualizationTextPadding = 5;

    // Size of text used in the visualization (for row and column titles)
    fontSize: number = 12;

    /***** FUNCTIONS *****/

    // Returns the html to use as tooltip for a cell. Is called with a HeatmapValue that represents the current cell
    // and the row and column objects associated with the highlighted cell as parameters. By default, the
    // result of getTooltipTitle is used in a header and getTooltipText is used in a paragraph tag.
    getTooltip: (cell: HeatmapValue, row: HeatmapElement, column: HeatmapElement) => string = (cell: HeatmapValue, row: HeatmapElement, column: HeatmapElement) => {
        return `<h3 class='tip-title'>${this.getTooltipTitle(cell, row, column)}</h3><p>${this.getTooltipText(cell)}</p>`
    };

    getTooltipTitle: (x: HeatmapValue, row: HeatmapElement, column: HeatmapElement) => string = (x: HeatmapValue, row: HeatmapElement, column: HeatmapElement) => {
        return `${row.name ? row.name : ''}${row.name ? ' <> ' : ''}${column.name ? column.name : ''}`;
    };

    // Text that's displayed inside a tooltip. This is equal to the current cell's value by default.
    getTooltipText: (x: HeatmapValue) => string = (x: HeatmapValue) => {
        return x.value.toString();
    };
}
