import { BasicNode } from "./lib/basicNode";
import { Sunburst } from "./lib/sunburst";
import { ISunburstSettingsData, SunburstSettings } from "./lib/sunburstSettings";

const sunburst = (data: BasicNode, options?: ISunburstSettingsData): SVGElement | null =>
  new Sunburst(data, new SunburstSettings(options)).node();

export { sunburst };
