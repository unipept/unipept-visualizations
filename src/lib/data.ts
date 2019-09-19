/**
 * Defines utility functions for manipulating the input data
 */

/**
 * Extract a branch from the tree as a list, head first, input node last
 */
import { HierarchyNode, HierarchyRectangularNode } from "d3";

import { Node } from "./node";
import { Optional } from "./optional";


const branch: (data: HierarchyNode<Node>,
               next: (node: HierarchyNode<Node>) => HierarchyNode<Node> | null)
  => Array<HierarchyNode<Node>>
  = (data: HierarchyNode<Node>,
     next: (node: HierarchyNode<Node>) => HierarchyNode<Node> | null): Array<HierarchyNode<Node>> => {
    const result: Array<HierarchyNode<Node>> = [];
    let tree: HierarchyNode<Node> | null = data;
    while (tree) {
      result.unshift(tree);
      tree = next(tree);
    }

    return result;
  };

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

const maxY: (datum: HierarchyRectangularNode<Node>) => number
  = (datum: HierarchyRectangularNode<Node>): number =>
  datum.children ? Math.max(...datum.children.map(maxY)) : datum.y0 + datum.height;

// Calculates if p is an ancestor of c
const ancestorOf: (check: HierarchyNode<Node>,
                   child: HierarchyNode<Node>) => Optional<number>
  = (check: HierarchyNode<Node>,
     child: HierarchyNode<Node>): Optional<number> => {
    if (check === child) {
      return Optional.of(0);
    }

    if (check.children) {
      const childDepth: Array<Optional<number>> =
        check.children
        .map((c: HierarchyNode<Node>): Optional<number> =>
             ancestorOf(c, child))
        .filter((d: Optional<number>): boolean => d.isPresent());

      if (childDepth.length === 0) {
        return Optional.empty();
      }

      return childDepth[0].map((depth: number) => depth + 1);
    }

    return Optional.empty();
  };

export { ancestorOf, branch, count, countRatio, maxY };
