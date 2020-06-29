import { max } from "d3";
import { flatten } from "ramda";

import { BasicNode, emptyBasicNode } from "./basicNode";

export class Node implements BasicNode {
  public readonly data: number | number[] = 0;
  public readonly name: string = "";
  public readonly children: Node[] = [];
  public parent?: Node;

  public constructor(node: object = emptyBasicNode()) {
    Object.assign(this, node);
  }

  [propName: string]: any;

  // Sets a property for a node and all its children
  public setRecursiveProperty(property: string, value: any): void {
    this[property] = value;
    if (this.children) {
      this.children.forEach((c: Node) => {
        c.setRecursiveProperty(property, value);
      });
    }
  }

  // Returns true if a node is a leaf
  public isLeaf(): boolean {
    if (this.children.length === 0) {
      return true;
    }

    return false;
  }

  // Returns the height of the tree below this node
  public height(): number {
    if (this.isLeaf()) {
      return 0;
    }

    return (max(this.children, (c: Node) => c.height()) as number) + 1;
  }

  // Returns the depth of the tree above this node
  public depth(): number {
    if (this.parent === undefined) {
      return 0;
    }

    return this.parent.depth() + 1;
  }

  /**
   * @return A preorder traversal of the tree with `this` as the root
   */
  public preorder(): readonly Node[] {
    return flatten([this, this.children.map((c: Node) => c.preorder())]);
  }

  /**
   * Reorder tree: Sort and reorder a dendrogram by the smallest value
   *
   * This function sorts a dendrogram object based on
   * the smallest distance in its subtrees, recursively.
   * The cluster with the smallest distance is placed on the left
   * side of branch. When a leaf merged with a cluster, the leaf is
   * placed on the right side.
   */
  public dendsort(): Node {
    if (this.isLeaf()) {
      return new Node(this);
    }

    const left: Node = this.children[0].dendsort();
    const right: Node = this.children[1].dendsort();

    if ((left.data as number) <= (right.data as number)) {
      return new Node({ ...this, children: [left, right] });
    } else {
      return new Node({ ...this, children: [right, left] });
    }
  }

  public static new(node: BasicNode = emptyBasicNode()): Node {
    return new Node(node);
  }

  public static createNode<E extends Node>(
    node: BasicNode,
    nodeConstructor: (arg: BasicNode) => E,
  ): E {
    if (node.children) {
      node.children = node.children.map((n: BasicNode) =>
        Node.createNode(n, nodeConstructor),
      );
    }

    return nodeConstructor.call(undefined, node);
  }
}
