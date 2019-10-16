/**
 * A tooltip that follows the mouse cursor.
 */
import * as d3 from "d3";

import { domClass } from "./dom";
import { Node } from "./node";


const createTooltip: (supplied?: (node: d3.HierarchyNode<Node>) => string) => ((node: d3.HierarchyNode<Node>) => string)
  = (supplied?: (node: d3.HierarchyNode<Node>) => string): ((node: d3.HierarchyNode<Node>) => string) =>
  (supplied !== undefined
   ? supplied
   : (node: d3.HierarchyNode<Node>): string => `{placeholder: ${node.data.name}}`);

export class Tooltip {
  // Constants
  public static readonly TOP_PADDING: number = -5;
  public static readonly LEFT_PADDING: number = 15;


  public readonly parent: d3.Selection<HTMLDivElement, undefined, HTMLElement, undefined>;

  // Functions
  public readonly genClassName: (name: string) => string;
  public readonly tooltip: (node: d3.HierarchyNode<Node>) => string;

  public constructor(attach: string, classPrefix?: string,
                     tooltip?: (node: d3.HierarchyNode<Node>) => string) {
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

  public update(node: d3.HierarchyNode<Node>, event: MouseEvent): void {
    switch (event.type) {
      case "mouseover":
        this.parent
          .html(() => this.tooltip(node))
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

  public add(element: SVGPathElement | HTMLElement,
             node: d3.HierarchyNode<Node>): void {
    element.addEventListener("mouseover", (event: Event) => {
      this.update(node, event as MouseEvent);
    });

    element.addEventListener("mousemove", (event: Event) => {
      this.update(node, event as MouseEvent);
    });

    element.addEventListener("mouseout", (event: Event) => {
      this.update(node, event as MouseEvent);
    });
  }

}
