/**
 * Settings for the Sunburst visualization
 */

import d3 from "d3";

import { ColorPalette } from "./colorPalette";
import { Node } from "./node";
import { Settings } from "./settings";

export interface ISunburstSettingsData extends Settings {
  radius: number;
  levels: number;
  duration: number;

  enableBreadcrumbs: boolean;
  breadcrumbWidth: number;

  colors(data: Node): d3.ScaleOrdinal<string, string>;

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
  public static DEFAULT_RADIUS: number = 300;
  public static DEFAULT_LEVELS: number = 4;
  public static DEFAULT_DURATION: number = 1000;
  public static DEFAULT_BREADCRUMB_WIDTH: number = 200;

  /// Public data members
  public readonly className: string = "unipept-sunburst";

  public readonly radius: number = SunburstSettings.DEFAULT_RADIUS;
  public readonly levels: number = SunburstSettings.DEFAULT_LEVELS;
  public readonly duration: number = SunburstSettings.DEFAULT_DURATION;

  public readonly enableBreadcrumbs: boolean = true;
  public readonly breadcrumbWidth: number = SunburstSettings.DEFAULT_BREADCRUMB_WIDTH;

  public colors: (data: Node) => d3.ScaleOrdinal<string, string>
    = ColorPalette.sunburstColors;
  public readonly countAccessor: (data: Node) => number
    = SunburstSettings.defaultCountAccessor;
  public readonly rerootCallback?: (data: Node) => void = undefined;

  public readonly getLevel: (data: Node) => number = SunburstSettings.defaultLevel;
  public readonly getLabel: (data: Node) => string = SunburstSettings.defaultLabel;

  public readonly getTooltip: (data: Node) => string = SunburstSettings.defaultTooltip;
  public readonly getTooltipTitle: (data: Node) => string = SunburstSettings.defaultTooltipTitle;
  public readonly getTooltipText: (data: Node) => string = SunburstSettings.defaultTooltipText;
  public readonly getTitleText: (data: Node) => string = SunburstSettings.defaultTitleText;

  /// Private (default) methods
  public static defaultCountAccessor(data: Node): number {
    return data.data.count;
  }

  public static defaultTooltip(data: Node): string {
    return `<h3 class='tip-title'>${SunburstSettings.defaultTooltipTitle(data)}</h3>` +
      `<p>${SunburstSettings.defaultTooltipText(data)}</p>`;
  }

  public static defaultTooltipTitle(data: Node): string {
    return data.name;
  }

  public static defaultTooltipText(data: Node): string {
    return `${data.data.count} hits`;
  }

  public static defaultLevel(data: Node): number {
    return data.getDepth();
  }

  public static defaultLabel(data: Node): string {
    return data.name === "empty" ? "" : data.name;
  }

  public static defaultTitleText(data: Node): string {
    return SunburstSettings.defaultLabel(data);
  }


  // Ctor and factories
  public constructor(settings?: ISunburstSettingsData) {
    super(settings && settings.height,
      settings && settings.width,
      settings && settings.enableTooltips);

    Object.assign(this, settings);
  }

  public static default(): SunburstSettings {
    return new SunburstSettings({ width: 600, height: 600 } as ISunburstSettingsData);
  }
}
