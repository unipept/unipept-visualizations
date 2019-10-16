/**
 * Settings for the visualisations
 */

export abstract class Settings {
  public static DEFAULT_SIZE: number = 800;

  public readonly height: number;             // Visualization height
  public readonly width: number;              // Visualization width

  public readonly enableTooltips: boolean;    // Display tooltips on-mouse-over

  public readonly abstract className: string; // The visualization class: for styling

  public constructor(height?: number, width?: number, enableTooltips?: boolean) {
    this.height = height !== undefined ? height : Settings.DEFAULT_SIZE;
    this.width = width !== undefined ? width : Settings.DEFAULT_SIZE;
    this.enableTooltips = enableTooltips === undefined ? true : enableTooltips;
  }
}
