/**
 * Interactive Sunburst
 */
import d3 from "d3";
import { BasicNode } from "./basicNode";
import { SunburstSettings } from "./settings";
import { SunburstNode } from "./sunburstNode";


export class Sunburst {
  private readonly element: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  private readonly settings: SunburstSettings;

  constructor(element: string, data: BasicNode, options?: SunburstSettings) {
    this.element = d3.select(element);
    this.settings = options || SunburstSettings.default()

    this.draw(SunburstNode.createNodes(data));
  }

  private draw(_data: SunburstNode): void {
    throw new Error("Method not implemented.");
  }
}
