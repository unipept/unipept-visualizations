/**
 * Defines utility functions for manipulating the input data
 */

import { HierarchyNode, HierarchyRectangularNode } from "d3";

import { Node } from "./node";
import { Optional } from "./optional";

/**
 * Sum the "size" of this node and all of its children
 */
const count: (datum: Node, counter: (d: Node) => number) => number
  = (datum: Node, counter: (d: Node) => number): number => {
    if (datum.children !== undefined) {
      return datum.children.map((v: Node): number => count(v, counter))
        .reduce(((a: number, b: number): number => a + b), 0);
    }

    return counter(datum);
  };

/**
 * Compute a ratio of sizes between two nodes
 *  as count(numerator) / count(denominator).
 */
const countRatio: (numerator: Node, denominator: Node, counter: (d: Node) => number) => number
  = (numerator: Node, denominator: Node, counter: (d: Node) => number): number =>
  count(numerator, counter) / count(denominator, counter);

/**
 * Find the largest radial size within a hierarchy
 * @param datum The top of the hierarchy to search.
 */
const maxRadius: (datum: HierarchyRectangularNode<Node>) => number
  = (datum: HierarchyRectangularNode<Node>): number =>
  datum.children !== undefined
  ? Math.max(...datum.children.map(maxRadius))
  : datum.y0 + (datum.y1 - datum.y0);

/**
 * Compute the outer limit of the radial domain based on the levels
 *  of the hierarchy to display.
 */
const outerRadialDomain: (datum: HierarchyRectangularNode<Node>, levels: number) => number
  = (datum: HierarchyRectangularNode<Node>, levels: number): number =>
  Math.min(maxRadius(datum),
           datum.y0 + levels * (datum.y1 - datum.y0));

/**
 * Calculates if check is an ancestor of child.
 * If so, how many levels between them.
 */
const ancestorOf: (check: HierarchyNode<Node>,
                   child: HierarchyNode<Node>) => Optional<number>
  = (check: HierarchyNode<Node>,
     child: HierarchyNode<Node>): Optional<number> => {
    if (check.depth === child.depth) {
      if (check === child) { // tslint:disable-line
        return Optional.of(0);
      }

      return Optional.empty();
    }

    if ((child.depth > check.depth)
        && check.children !== undefined
        && child.parent !== null) {
      return ancestorOf(check, child.parent)
        .map((d: number) => d + 1);
    }

    return Optional.empty();
  };

/**
 * 1 dimensional array with axis labels
 */
class Series<T> {
  public readonly data: {[k: string]: T} = {};
  public readonly index: string[];

  public constructor(data: T[], index?: string[]) {
    let realIndex: string[];

    if (index === undefined) {
      realIndex = new Array(data.length);
      for (let i: number = 0; i < data.length; i += 1) {
        realIndex[i] = `${i}`;
      }
    } else {
      realIndex = index;
    }

    for (let i: number = 0; i < data.length; i += 1) {
      this.data[realIndex[i]] = data[i];
    }

    this.index = realIndex;
  }

  public format(): string {
    const width: number
      = Math.max(...this.index.map((i: string): number => i.length));

    return this.index
      .map((i: string): string =>
           `${i.padEnd(width, " ")}\t${JSON.stringify(this.data[i])}`)
      .join("\n");
  }
}

class DataFrame<T> {
  public readonly data: {[k: string]: Series<T>} = {};
  public readonly index: string[];

  public constructor(data: Array<Series<T>>, index?: string[]) {
    let realIndex: string[];

    if (index === undefined) {
      realIndex = new Array(data.length);
      for (let i: number = 0; i < data.length; i += 1) {
        realIndex[i] = `${i}`;
      }
    } else {
      realIndex = index;
    }

    for (let i: number = 0; i < data.length; i += 1) {
      this.data[realIndex[i]] = data[i];
    }

    this.index = realIndex;
  }

  public columns(): string[] {
    return this.index;
  }

  public rows(): string[] {
    const distinct: (value: string, index: number, self: string[]) => boolean
      = (value: string, index: number, self: string[]): boolean =>
      self.indexOf(value) === index;
    const allColumns: string[] = this.index.flatMap((i: string): string[] =>
                                                    this.data[i].index);

    return allColumns.filter(distinct);
  }

  public format(): string {
    const rowNames: string[] = this.rows();
    const colWidth: number[] = this.index.map((name: string): number =>
                                              name.length);
    const rowWidth: number
      = Math.max(...rowNames.map((i: string): number => i.length + 1));

    const rowName: (name: string) => string
      = (name: string): string => `${name.padEnd(rowWidth, " ")} `;

    const header: string
      = `${"".padEnd(rowWidth, " ")} ${this.index.join(" ")}`;

    const table: string = rowNames
      .map((row: string): string =>
           rowName(row) + this.index
           .map((col: string, i: number): string =>
                JSON.stringify(this.data[col].data[row])
                .padStart(colWidth[i], " "))
           .join(" "))
      .join("\n");

    return `${header}\n${table}`;
  }
}

export { ancestorOf, count, countRatio, DataFrame, Series, outerRadialDomain };
