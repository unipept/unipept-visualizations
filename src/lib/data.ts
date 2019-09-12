/**
 * Defines utility functions for manipulating the input data
 */

/**
 * Extract a branch from the tree as a list, head first, input node last
 */
import { HierarchyNode } from "d3";

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

export { branch, count, countRatio };
