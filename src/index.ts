import { csvParse } from "d3";

import { BasicNode } from "./lib/basicNode";
import * as ColorPalette from "./lib/colorPalette";
import { fromCSV } from "./lib/data";
import { Heatmap } from "./lib/heatmap";
import { HeatmapSettings } from "./lib/heatmap/settings";
import { Sunburst } from "./lib/sunburst";
import { SunburstSettings } from "./lib/sunburst/settings";

const sunburst: (data: BasicNode, options?: SunburstSettings) => Sunburst
  = (data: BasicNode, options?: SunburstSettings): Sunburst =>
  new Sunburst(data, new SunburstSettings(options));

const heatmap: (data: string, options?: HeatmapSettings) => Heatmap
  = (data: string, options?: HeatmapSettings): Heatmap =>
  new Heatmap(fromCSV(csvParse(data)), new HeatmapSettings(options));

export { ColorPalette, heatmap, sunburst, Sunburst };
