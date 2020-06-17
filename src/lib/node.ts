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

    return max(this.children, (c: Node) => c.height()) as number + 1;
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

  public static new(node: BasicNode = emptyBasicNode()): Node {
    return new Node(node);
  }

  public static createNode<E extends Node>(node: BasicNode, nodeConstructor: (arg: BasicNode) => E): E {
    if (node.children) {
      node.children = node.children.map(
        (n: BasicNode) => Node.createNode(n, nodeConstructor),
      );
    }

    return nodeConstructor.call(undefined, node);
  }
}
