/**
 * Settings for the Sunburst visualization
 */

import d3 from "d3";

import { ColorPalette } from "../color";
import * as Data from "../data";
import { Node } from "../node";
import { Settings } from "../settings";

export interface ISunburstSettingsData extends Settings {
  parent: string; // A CSS selector for where to place this sunburst.

  radius: number; // Radius of the visualisation.
  levels: number; // The number of levels to display.
  duration: number; // The animation duration

  enableBreadcrumbs: boolean; // Set to 'true' to display breadcrumbs.

  colors(): d3.ScaleOrdinal<string, string>;

  getLevel(data: Node): number;
  getLabel(data: Node): string;

  countAccessor(data: Node): number;
  rerootCallback(data: Node): void;

  getTooltip(data: Node): string;
  getTooltipTitle(data: Node): string;
  getTooltipText(data: Node): string;
  getTitleText(this: SunburstSettings, data: Node): string;
}

export class SunburstSettings extends Settings {
  /// Constants
  public static readonly DEFAULT_LEVELS: number = 4;
  public static readonly DEFAULT_DURATION: number = 1000;

  /// Public data members
  public readonly className: string = "unipept-sunburst";

  public readonly parent: string = "unipept-sunburst";
  public readonly radius: number = Math.min(this.width, this.height) / 2;
  public readonly levels: number = SunburstSettings.DEFAULT_LEVELS;
  public readonly duration: number = SunburstSettings.DEFAULT_DURATION;

  public readonly enableBreadcrumbs: boolean = true;

  public readonly colors: () => d3.ScaleOrdinal<string, string>
    = ColorPalette.sunburstColors;

  public readonly countAccessor: (data: Node) => number
    = (data: Node): number => data.data as number

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
  public constructor(settings?: ISunburstSettingsData) {
    super(settings !== undefined ? settings.height : undefined,
          settings !== undefined ? settings.width : undefined,
          settings !== undefined ? settings.enableTooltips : undefined);

    Object.assign(this, settings);
  }

  public static default(): SunburstSettings {
    return new SunburstSettings({ width: 600, height: 600 } as ISunburstSettingsData);
  }
}
