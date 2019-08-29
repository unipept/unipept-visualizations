import { emptyBasicNode, BasicNode } from "./basicNode";
import { max as d3Max } from "d3-array";

export type NodeData = {
  count: number;
}

export class Node implements BasicNode {

  public data: NodeData = { count: 0 };
  public name: string = "";
  public children?: this[];
  public _children?: this[];
  public _height?: number;
  public _depth?: number;
  public parent?: Node;

  constructor(node: BasicNode = emptyBasicNode()) {
    Object.assign(this, node);
  }

  // sets a property for a node and all its children
  setRecursiveProperty(property: string, value: any): void {
    this[property] = value;
    if (this.children) {
      this.children.forEach(c => {
        c.setRecursiveProperty(property, value);
      });
    } else if (this._children) {
      this._children.forEach(c => {
        c.setRecursiveProperty(property, value);
      });
    }
  }

  // Returns true if a node is a leaf
  isLeaf(): boolean {
    if (!this.children && !this._children) {
      return true;
    }
    if (this.children && this.children.length === 0) {
      return true;
    }
    if (this._children && this._children.length === 0) {
      return true;
    }
    return false;
  }

  getHeight(): number {
    if (this._height === undefined) {
      if (this.isLeaf()) {
        this._height = 0;
      } else {
        this._height = d3Max(this.children as Node[], (c: Node) => c.getHeight()) as number + 1;
      }
    }
    return this._height;
  }

  getDepth(): number {
    if (this._depth === undefined) {
      if (this.parent === undefined) {
        this._depth = 0;
      } else {
        this._depth = this.parent.getDepth() + 1;
      }
    }
    return this._depth;
  }

  static new(node: BasicNode = emptyBasicNode()): Node {
    return new Node(node);
  }

  static createNode<E extends Node>(node: BasicNode, nodeConstructor: (BasicNode) => E): E {
    if (node.children) {
      node.children = node.children.map(
        n => Node.createNode(n, nodeConstructor)
      );
    }
    return nodeConstructor.call(null, node);
  }
}
