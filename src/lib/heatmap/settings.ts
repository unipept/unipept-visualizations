import * as R from "ramda";

import { BasicNode } from "../basicNode";
import { Node } from "../node";
import { Settings } from "../settings";

import { HeatmapNode } from "./node";


export class HeatmapSettings extends Settings {
  public static readonly DEFAULT_DURATION: number = 2000;

  /***** VALUES *****/
  // Amount of pixels that are allowed to be occupied by the labels of the rows.
  public readonly textWidth: number = 100;

  // Amount of pixels that are allowed to be occupied by the labels of the columns.
  public readonly textHeight: number = 100;

  // The maximum dimension of one square.
  public readonly maxCellSize: number = 50;

  // Space between the squares in the grid (0 for no padding)
  public readonly padding: number = 2;

  // Space between the visualization grid itself and rendering the labels (in pixels). This space is applied to both
  // the rows and columns labels.
  public readonly textPadding: number = 5;

  // Size of text used in the visualization (for row and column labels)
  public readonly fontSize: number = 12;

  public readonly className: string = "heatmap";

  public readonly colorScale: string[] = ["#EEEEEE", "#1565C0"];

  // Total speed of the reordering animations used in this visualization, should be given in milliseconds (ms).
  public readonly duration: number = HeatmapSettings.DEFAULT_DURATION;

  /***** FUNCTIONS *****/

  /**
   * Final adjustment to the shape of heatmap cells.
   * This defaults to making cells square on the shortest side.
   * @param request The requested shape [width, height] that may
   *                be modified by this function
   * @return A tuple of [width, height] for heatmap cells.
   */
  public readonly cellShape?: (request: [number, number]) => [number, number]
    = (request: [number, number]): [number, number] => {
      const size: number = Math.min(...request);

      return [size, size];
    }

  public readonly dataAccessor: (data: Node) => number
    = (data: Node): number => (data as HeatmapNode).value

  public readonly dataModifier: (value: number, data: Node) => HeatmapNode =
    (value: number, data: Node): HeatmapNode =>
    new HeatmapNode({...(data as HeatmapNode), value} as unknown as BasicNode)

  // Text that's displayed inside a tooltip.
  // This is equal to the current cell's value by default.
  public readonly getTooltipText: (data: Node) => string
    = (data: Node) => {
      const lens: R.Lens = R.lens(this.dataAccessor, this.dataModifier);

      return `score: ${(R.view(lens, data) as number * 100).toFixed(2)}%`;
    }

  public constructor(settings?: object) {
    super();
    Object.assign(this, settings);
  }

  public static defaults(): HeatmapSettings {
    return new HeatmapSettings();
  }
}
