import Settings from "../settings";

export default class HeatmapSettings extends Settings {
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
}
