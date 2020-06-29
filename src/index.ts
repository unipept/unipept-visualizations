import { BasicNode } from "./lib/basicNode";
import * as ColorPalette from "./lib/colorPalette";
import { CSV, fromCSV } from "./lib/data";
import { Heatmap } from "./lib/heatmap";
import { HeatmapSettings } from "./lib/heatmap/settings";
import { Sunburst } from "./lib/sunburst";
import { SunburstSettings } from "./lib/sunburst/settings";

const sunburst: (data: BasicNode, options?: SunburstSettings) => Sunburst = (
  data: BasicNode,
  options?: SunburstSettings,
): Sunburst => new Sunburst(data, new SunburstSettings(options));

const heatmap: (data: CSV, options?: HeatmapSettings) => Heatmap = (
  data: CSV,
  options?: HeatmapSettings,
): Heatmap => new Heatmap(fromCSV(data), new HeatmapSettings(options));

export { ColorPalette, heatmap, sunburst, Sunburst };
