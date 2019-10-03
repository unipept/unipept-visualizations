/**
 * Defines utility functions for manipulating the input data
 */

/**
 * Extract a branch from the tree as a list, head first, input node last
 */
import { HierarchyNode, HierarchyRectangularNode } from "d3";

import { Node } from "./node";
import { Optional } from "./optional";

const count: (datum: Node, counter: (d: Node) => number) => number
  = (datum: Node, counter: (d: Node) => number): number => {
    if (datum.children) {
      return datum.children.map((v: Node): number => count(v, counter))
        .reduce(((a: number, b: number): number => a + b), 0);
    }

    return counter(datum);
  };

const countRatio: (numerator: Node, denominator: Node, counter: (d: Node) => number) => Optional<number>
  = (numerator: Node, denominator: Node, counter: (d: Node) => number): Optional<number> =>
  Optional.of((numerator === undefined || denominator === undefined)
              ? undefined
              : (count(numerator, counter) / count(denominator, counter)));

const maxRadius: (datum: HierarchyRectangularNode<Node>) => number
  = (datum: HierarchyRectangularNode<Node>): number =>
  datum.children ? Math.max(...datum.children.map(maxRadius)) : datum.y0 + (datum.y1 - datum.y0);

const outerRadialDomain: (datum: HierarchyRectangularNode<Node>, levels: number) => number
  = (datum: HierarchyRectangularNode<Node>, levels: number): number =>
  Math.min(maxRadius(datum),
           datum.y0 + levels * (datum.y1 - datum.y0));

// Calculates if check is an ancestor of child.
// If so, how many levels between them
const ancestorOf: (check: HierarchyNode<Node>,
                   child: HierarchyNode<Node>) => Optional<number>
  = (check: HierarchyNode<Node>,
     child: HierarchyNode<Node>): Optional<number> => {
    if (check.depth === child.depth) {
      if (check === child) {
        return Optional.of(0);
      }

      return Optional.empty();
    }

    if ((child.depth > check.depth) && check.children && child.parent) {
      return ancestorOf(check, child.parent)
        .map((d: number) => d + 1);
    }

    return Optional.empty();
  };

export { ancestorOf, count, countRatio, outerRadialDomain };
