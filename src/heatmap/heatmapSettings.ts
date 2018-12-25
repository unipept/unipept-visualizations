import Settings from "../settings";
import {HeatmapElement, HeatmapValue} from "./typings";

export default class HeatmapSettings extends Settings {
    /***** VALUES *****/

    // Amount of pixels that are allowed to be occupied by the labels of the rows.
    textWidth: number = 100;

    // Amount of pixels that are allowed to be occupied by the labels of the columns.
    textHeight: number = 100;

    // The maximum dimension of one square.
    maximumSquareWidth: number = 50;

    // Space between the squares in the grid (0 for no padding)
    squarePadding: number = 2;

    // Space between the visualization grid itself and rendering the labels (in pixels). This space is applied to both
    // the rows and columns labels.
    visualizationTextPadding = 5;

    // Size of text used in the visualization (for row and column labels)
    fontSize: number = 12;

    className = 'heatmap';

    /***** FUNCTIONS *****/

    // Returns the html to use as tooltip for a cell. Is called with a HeatmapValue that represents the current cell
    // and the row and column objects associated with the highlighted cell as parameters. By default, the
    // result of getTooltipTitle is used in a header and getTooltipText is used in a paragraph tag.
    getTooltip: (cell: HeatmapValue, row: HeatmapElement, column: HeatmapElement) => string = (cell: HeatmapValue, row: HeatmapElement, column: HeatmapElement) => {
        return `<b class='tip-title'>${this.getTooltipTitle(cell, row, column)}</b><br>${this.getTooltipText(cell)}`
    };

    getTooltipTitle: (x: HeatmapValue, row: HeatmapElement, column: HeatmapElement) => string = (x: HeatmapValue, row: HeatmapElement, column: HeatmapElement) => {
        return `${column.name ? column.name : ''}${column.name ? ' - ' : ''}${row.name ? row.name : ''}`;
    };

    // Text that's displayed inside a tooltip. This is equal to the current cell's value by default.
    getTooltipText: (x: HeatmapValue) => string = (x: HeatmapValue) => {
        return (x.value * 100).toString() + '%';
    };
}
