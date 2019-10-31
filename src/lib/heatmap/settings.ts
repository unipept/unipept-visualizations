import * as R from "ramda";

import { Settings } from "../settings";
import { Node } from "../node";


export class HeatmapSettings extends Settings {
  public static readonly DEFAULT_DURATION: number = 2000;

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

  // Total speed of the reordering animations used in this visualization, should be given in milliseconds (ms).
  duration: number = HeatmapSettings.DEFAULT_DURATION;

  /***** FUNCTIONS *****/

  dataAccessor: R.Lens = R.lensProp("value");

  // Text that's displayed inside a tooltip.
  // This is equal to the current cell's value by default.
  getTooltipText: (data: Node) => string
    = (data: Node) => `score: ${(R.view(this.dataAccessor, data) as number * 100).toFixed(2)}%`;

  public constructor(settings?: object) {
    super();
    Object.assign(this, settings);
  }

  public static defaultSettings(): HeatmapSettings {
    return new HeatmapSettings();
  }
}
