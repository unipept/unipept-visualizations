/**
 * Settings for the visualisations
 */
import * as R from "ramda";

import { Node } from "./node";

export abstract class Settings {
  public static DEFAULT_SIZE: number = 800;

  // The visualization class (used for styling)
  public readonly abstract className: string;

  // A CSS selector for where the visualisation should attach
  public readonly parent: string;

  public readonly height: number;             // Visualization height
  public readonly width: number;              // Visualization width

  public readonly enableTooltips: boolean;    // Display tooltips on-mouse-over

  public readonly dataAccessor: R.Lens;

  public readonly getTooltip: (data: Node) => string
    = (data: Node): string =>
    `<h3 class="tip-title">${this.getTooltipTitle(data)}</h3>`
    + `<p class="tip-text">${this.getTooltipText(data)}</p>`

  public readonly getTooltipTitle: (data: Node) => string
    = (data: Node): string => data.name

  public readonly getTooltipText: (data: Node) => string
    = (data: Node): string => data.name

  public constructor(parent?: string, height?: number, width?: number,
                     enableTooltips?: boolean, dataAccessor?: R.Lens) {
    this.parent = parent !== undefined ? parent : "";
    this.height = height !== undefined ? height : Settings.DEFAULT_SIZE;
    this.width = width !== undefined ? width : Settings.DEFAULT_SIZE;
    this.enableTooltips = enableTooltips === undefined ? true : enableTooltips;
    this.dataAccessor = dataAccessor === undefined ? R.lensPath(["data", "count"]) : dataAccessor;
  }
}
