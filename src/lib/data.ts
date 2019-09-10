/**
 * Defines utility functions for manipulating the input data
 */

/**
 * Extract a branch from the tree as a list, head first, input node last
 */
import { HierarchyNode } from "d3";

import { Node } from "./node";


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

const countRatio: (datum: Node) => number
  = (datum: Node): number => datum.data.count
    / ((datum.parent === undefined) ? 1 : datum.parent.data.count);

export { branch, countRatio };
