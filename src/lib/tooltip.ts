/**
 * A tooltip that follows the mouse cursor.
 */
import * as d3 from "d3";

import { domClass } from "./dom";
import { Node } from "./node";


/**
 * Generate a function that writes tooltip text
 * If a function that does so is `supplied` just return that,
 * otherwise generate placeholder text.
 */
const createTooltip: (supplied?: (data: Node) => string) => ((data: Node) => string)
  = (supplied?: (data: Node) => string): ((data: Node) => string) =>
  (supplied !== undefined
   ? supplied
   : (data: Node): string => `{placeholder: ${data.name}}`);

/**
 * A generic tooltip that follows the mouse cursor.
 * This tooltip can be styled by user generated CSS.
 */
export class Tooltip {
  // Constants
  public static readonly TOP_PADDING: number = -5;
  public static readonly LEFT_PADDING: number = 15;

  /**
   * The HTML node within which this tooltip will render.
   */
  public readonly parent: d3.Selection<HTMLDivElement, undefined, HTMLElement, undefined>;

  /**
   * Generate a predictable class name for tooltip HTML nodes.
   */
  public readonly genClassName: (name: string) => string;

  /**
   * Write tooltip text.
   */
  public readonly tooltip: (data: Node) => string;

  /**
   * @param attach The parent node to all tooltip generated nodes.
   * @param tooltip An optional function to generate tooltip text.
   */
  public constructor(attach: string, classPrefix?: string,
                     tooltip?: (data: Node) => string) {
    const attachTo: d3.Selection<HTMLElement, undefined, HTMLElement, undefined>
      = d3.select(attach);

    this.genClassName = domClass(classPrefix);
    this.tooltip = createTooltip(tooltip);

    this.parent = attachTo.append("div")
      .classed(this.genClassName("tip"), true)
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("padding", "2px")
      .style("border", "1px solid #dddddd")
      .style("border-radius", "3px;");
  }

  /**
   * Update the tooltip DOM based on mouse events.
   * This method is generally used internally.
   */
  public update(data: Node, event: MouseEvent): void {
    switch (event.type) {
      case "mouseover":
        this.parent
          .html(() => this.tooltip(data))
          .style("top", `${event.pageY + Tooltip.TOP_PADDING}px`)
          .style("left", `${event.pageX + Tooltip.LEFT_PADDING}px`)
          .style("visibility", "visible");
        break;

      case "mousemove":
        this.parent
          .style("top", `${event.pageY + Tooltip.TOP_PADDING}px`)
          .style("left", `${event.pageX + Tooltip.LEFT_PADDING}px`);
        break;

      case "mouseout":
        this.parent.style("visibility", "hidden");
        break;

      default:
    }
  }

  /**
   * Mark a given `element` as displaying a tooltip with data provided
   * by `node`.
   */
  public mark(element: SVGElement | HTMLElement, data: Node): void {
    element.addEventListener("mouseover", (event: Event) => {
      this.update(data, event as MouseEvent);
    });

    element.addEventListener("mousemove", (event: Event) => {
      this.update(data, event as MouseEvent);
    });

    element.addEventListener("mouseout", (event: Event) => {
      this.update(data, event as MouseEvent);
    });
  }

}
