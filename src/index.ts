import { BasicNode } from "./lib/basicNode";
import * as ColorPalette from "./lib/colorPalette";
import { Sunburst } from "./lib/sunburst";
import { ISunburstSettingsData, SunburstSettings } from "./lib/sunburstSettings";

const sunburst: (data: BasicNode, options?: ISunburstSettingsData) => HTMLDivElement | null
  = (data: BasicNode, options?: ISunburstSettingsData): HTMLDivElement | null =>
  new Sunburst(data, new SunburstSettings(options)).node();

export { ColorPalette, sunburst, Sunburst };
