/**
 * A basic breadcrumb trail
 */
import * as d3 from "d3";

import { getReadableColorFor } from "./color";
import { domClass } from "./dom";
import { Node } from "./node";

/**
 * Given some settings, bake a function that generates HTML for a breadcrumb.
 */
const createCrumb: (
  genClassName: (name: string) => string,
  text?: (node: d3.HierarchyNode<Node>) => string,
  color?: (node: d3.HierarchyNode<Node>) => string,
) => (node: d3.HierarchyNode<Node>) => string = (
  genClassName: (name: string) => string,
  text?: (node: d3.HierarchyNode<Node>) => string,
  color?: (node: d3.HierarchyNode<Node>) => string): (node: d3.HierarchyNode<Node>) => string => {
  const bcNameClass: string = genClassName("breadcrumb-name");
  const description: (node: d3.HierarchyNode<Node>) => string = (
    node: d3.HierarchyNode<Node>,
  ): string => (text !== undefined ? text(node) : "");
  const clr: (node: d3.HierarchyNode<Node>) => string = (
    node: d3.HierarchyNode<Node>,
  ): string => {
    const c: string = color !== undefined ? color(node) : "black";

    return c;
  };

  return (node: d3.HierarchyNode<Node>): string =>
    `<span class="${bcNameClass}" title="${description(
      node,
    )}" style="color: ${getReadableColorFor(clr(node))}">${
      node.data.name
    }</span>`;
};

/**
 * Interface for creating unstyled breadcrumb trails from visualised data.
 */
export class Breadcrumb {
  // Constants
  public static readonly DEFAULT_COLOUR: string = "#000";
  public static readonly CRUMB_CLASS: string = "crumb";

  // The <div> element in which the breadcrumb trail is rendered.
  public readonly parent: d3.Selection<
    HTMLDivElement,
    undefined,
    HTMLElement,
    undefined
  >;

  // Utility functions
  public readonly crumb: (node: d3.HierarchyNode<Node>) => string;
  public readonly genClassName: (name: string) => string;
  public readonly colour?: (node: d3.HierarchyNode<Node>) => string;
  public readonly onClick?: (node: d3.HierarchyNode<Node>) => void;
  public readonly title?: (data: Node) => string;

  /**
   * Constructor
   * @param attach A CSS selector for the HTML node within which breadcrumbs will
   *               be rendered.
   * @param classPrefix An optional prefix for all breadcrumb element class attributes
   * @param colour An optional function to colour a breadcrumb.
   * @param onClick An optional callback for the click event.
   * @param title An optional function to set the breadcrumb HTML title attribute.
   * @param text An optional function to set the descriptive text within a breadcrumb.
   */
  public constructor(
    attach: string,
    classPrefix?: string,
    colour?: (node: d3.HierarchyNode<Node>) => string,
    onClick?: (node: d3.HierarchyNode<Node>) => void,
    title?: (data: Node) => string,
    text?: (node: d3.HierarchyNode<Node>) => string,
  ) {
    const attachTo: d3.Selection<
      HTMLElement,
      undefined,
      HTMLElement,
      undefined
    > = d3.select(attach);

    this.colour = colour;
    this.onClick = onClick;
    this.title = title;
    this.genClassName = domClass(classPrefix);
    this.crumb = createCrumb(this.genClassName, text, colour);
    this.parent = attachTo
      .append("div")
      .classed(this.genClassName("breadcrumbs"), true);

    this.parent
      .append("ul")
      .classed(this.genClassName("breadcrumbs-list"), true);
  }

  /**
   * Update the rendered breadcrumbs with `data` as as the node deepest
   * in the hierarchy.
   */
  public update(data: d3.HierarchyNode<Node>): void {
    const crumbClass: string = this.genClassName(Breadcrumb.CRUMB_CLASS);
    const capClass: (name: string) => string = (name: string): string =>
      `${crumbClass}-${name}`;

    const crumbData: Array<d3.HierarchyNode<Node>> = data.ancestors().reverse();

    this.parent.select("ul").selectAll(`.${crumbClass}`).remove();

    const bc: d3.Selection<
      d3.BaseType,
      d3.HierarchyNode<Node>,
      d3.BaseType,
      undefined
    > = this.parent.select("ul").selectAll(`.${crumbClass}`).data(crumbData);

    const allCrumbs: d3.Selection<
      HTMLLIElement,
      d3.HierarchyNode<Node>,
      d3.BaseType,
      undefined
    > = bc
      .enter()
      .append("li")
      .classed(crumbClass, true)
      .attr("title", (d: d3.HierarchyNode<Node>): string =>
        this.title !== undefined ? this.title(d.data) : "")
      )
      .html((d: d3.HierarchyNode<Node>): string => this.crumb(d))
      .style("background-color", (d: d3.HierarchyNode<Node>): string =>
        this.colour !== undefined
          ? this.colour(d)
          : Breadcrumb.DEFAULT_COLOUR)
      .on("click", (d: d3.HierarchyNode<Node>): void => {
        if (this.onClick !== undefined) {
          this.onClick(d);
        }
      });

    allCrumbs
      .filter((_d: d3.HierarchyNode<Node>, i: number) => i === 0)
      .classed(`${capClass("first")}`, true);

    allCrumbs
      .filter(
        (_d: d3.HierarchyNode<Node>, i: number) => i === allCrumbs.size() - 1,
      )
      .classed(`${capClass("last")}`, true);

    bc.exit().remove();
  }
}
