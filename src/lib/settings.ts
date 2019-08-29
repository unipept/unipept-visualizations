/**
 * Settings for the visualisations
 */
import d3 from "d3";
import { Node } from "./node";
import { ColorPalette } from "./colorPalette";

export default abstract class Settings {
  height: number;             //visualization height
  width: number;              //visualization width

  enableTooltips: boolean;    //display tooltips on-mouse-over

  abstract className: string; //the visualization class: for styling

  constructor(height?: number, width?: number, enableTooltips?: boolean) {
    this.height = height || 800;
    this.width = width || 800;
    this.enableTooltips = enableTooltips || true;
  }
}

export interface SunburstSettingsData extends Settings {
  radius?: number;
  levels?: number;
  duration?: number;

  enableBreadcrumbs?: boolean;
  breadcrumbWidth?: number;

  colors?: (data: Node) => d3.ScaleOrdinal<string, string>;

  getLevel?: (data: Node) => number;
  getLabel?: (data: Node) => string;

  countAccessor?: (data: Node) => number;
  rerootCallback?: (data: Node) => void;

  getTooltipTitle?: (data: Node) => string;
  getTooltipText?: (data: Node) => string;
  getTitleText?: (this: SunburstSettings, data: Node) => string;
}

export class SunburstSettings extends Settings {
  /// Public data members
  public readonly className = "unipept-sunburst";

  public readonly radius: number;
  public readonly levels: number;
  public readonly duration: number;

  public readonly enableBreadcrumbs: boolean;
  public readonly breadcrumbWidth: number;

  public readonly colors: (data: Node) => d3.ScaleOrdinal<string, string>;
  public readonly countAccessor: (data: Node) => number;
  public readonly rerootCallback: ((data: Node) => void) | undefined;

  public readonly getLevel: (data: Node) => number;
  public readonly getLabel: (data: Node) => string;

  public readonly getTooltipTitle: (data: Node) => string;
  public readonly getTooltipText: (data: Node) => string;
  public readonly getTitleText: (this: SunburstSettings, data: Node) => string;

  ///Private (default) methods
  public static defaultCountAccessor(data: Node): number {
    return data.data.count;
  };

  public defaultTooltip(data: Node): string {
    return `<h3 class='tip-title'>${this.defaultTooltipTitle(data)}</h3>` +
      `<p>${this.defaultTooltipText(data)}</p>`;
  };

  public defaultTooltipTitle(data: Node): string {
    return data.name;
  };

  public defaultTooltipText(data: Node): string {
    return `${data.data.count} hits`;
  };

  public defaultLevel(data: Node): number {
    return data.getDepth();
  }

  public static defaultLabel(data: Node): string {
    return data.name === "empty" ? "" : data.name;
  }

  public static defaultTitleText(data: Node): string {
    return SunburstSettings.defaultLabel(data);
  }


  // Ctor and factories
  constructor(settings?: SunburstSettingsData) {
    super(settings && settings.height,
      settings && settings.width,
      settings && settings.enableTooltips);

    //TODO: debug what's going on in the test here
    // console.log(JSON.stringify(settings));
    // console.log(settings && settings.enableTooltips || "default");

    this.radius = settings && settings.radius || 300;
    this.levels = settings && settings.levels || 4;
    this.duration = settings && settings.duration || 1000;

    this.enableBreadcrumbs = settings && settings.enableBreadcrumbs || true;
    this.breadcrumbWidth = settings && settings.breadcrumbWidth || 200;

    this.colors = settings && settings.colors || ColorPalette.sunburstColors;

    this.getLevel = settings && settings.getLevel || this.defaultLevel;
    this.getLabel = settings && settings.getLabel || SunburstSettings.defaultLabel;

    this.countAccessor = settings && settings.countAccessor
      || SunburstSettings.defaultCountAccessor;
    this.rerootCallback = settings && settings.rerootCallback || undefined;

    this.getTooltipTitle = settings && settings.getTooltipTitle
      || this.defaultTooltipTitle;
    this.getTooltipText = settings && settings.getTooltipText
      || this.defaultTooltipText;
    this.getTitleText = settings && settings.getTitleText
      || SunburstSettings.defaultTitleText;
  }

  public static default(): SunburstSettings {
    return new SunburstSettings({ width: 600, height: 600 } as SunburstSettingsData);
  }
}
