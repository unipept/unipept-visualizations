import { BasicNode } from "./lib/basicNode";
import * as ColorPalette from "./lib/colorPalette";
import { Sunburst } from "./lib/sunburst";
import { ISunburstSettingsData, SunburstSettings } from "./lib/sunburst/settings";

const sunburst: (data: BasicNode, options?: ISunburstSettingsData) => Sunburst
  = (data: BasicNode, options?: ISunburstSettingsData): Sunburst =>
  new Sunburst(data, new SunburstSettings(options));

export { ColorPalette, sunburst, Sunburst };

