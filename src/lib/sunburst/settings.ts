/**
 * Settings for the Sunburst visualization
 */

import d3 from "d3";

import { ColorPalette } from "../color";
import * as Data from "../data";
import { Node } from "../node";
import { Settings } from "../settings";

export class SunburstSettings extends Settings {
  /// Constants
  public static readonly DEFAULT_LEVELS: number = 4;
  public static readonly DEFAULT_DURATION: number = 1000;

  /// Public data members
  public readonly className: string = "unipept-sunburst";

  public readonly parent: string = "unipept-sunburst";
  public readonly levels: number = SunburstSettings.DEFAULT_LEVELS;
  public readonly duration: number = SunburstSettings.DEFAULT_DURATION;

  public readonly enableBreadcrumbs: boolean = true;

  public readonly colors: () => d3.ScaleOrdinal<string, string>
    = ColorPalette.sunburstColors;

  public readonly countAccessor: (data: Node) => number
    = (data: Node): number => data.data.count

  public readonly rerootCallback?: (data: Node) => void = undefined;

  public readonly getLevel: (data: Node) => number
    = (data: Node): number => data.getDepth()

  public readonly getLabel: (data: Node) => string
    = (data: Node): string => data.name === "empty" ? "" : data.name

  public readonly getTooltipTitle: (data: Node) => string
    = (data: Node): string => data.name

  public readonly getTooltipText: (data: Node) => string
    = (data: Node): string => `${Data.count(data, this.countAccessor)} hits`

  public readonly getTooltip: (data: Node) => string
    = (data: Node): string =>
    `<h3 class='tip-title'>${this.getTooltipTitle(data)}</h3>`
    + `<p>${this.getTooltipText(data)}</p>`

  public readonly getTitleText: (data: Node) => string
    = (data: Node): string => this.getLabel(data)


  // Ctor and factory
  public constructor(settings?: object) {
    super();
    Object.assign(this, settings);
  }

  public static defaultSettings(): SunburstSettings {
    return new SunburstSettings({ width: 600, height: 600 });
  }
}
