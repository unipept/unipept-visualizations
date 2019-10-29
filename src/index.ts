import { BasicNode } from "./lib/basicNode";
import * as ColorPalette from "./lib/colorPalette";
import { Sunburst } from "./lib/sunburst";
import { SunburstSettings } from "./lib/sunburst/settings";

const sunburst: (data: BasicNode, options?: SunburstSettings) => Sunburst
  = (data: BasicNode, options?: SunburstSettings): Sunburst =>
  new Sunburst(data, new SunburstSettings(options));

export { ColorPalette, sunburst, Sunburst };
