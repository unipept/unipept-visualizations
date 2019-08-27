import { emptyBasicNode, BasicNode } from "./basicNode";
import { Node } from "./node";

type countAccessorFunction = (n: TreeviewNode) => number;
type nodeData = {
  count?: number;
}

export class TreeviewNode extends Node {

  public static countAccessor?: countAccessorFunction;
  public static levelsToExpand = 2;

  public data: nodeData = {};
  public x0?: number;
  public y0?: number;
  public color?: string;

  constructor(node: BasicNode = emptyBasicNode()) {
    super(node);
    this.setCount();
  }

  static new(node: BasicNode = emptyBasicNode()): TreeviewNode {
    return new TreeviewNode(node);
  }

  static createNodes(node: BasicNode): TreeviewNode {
    return Node.createNode(node, TreeviewNode.new);
  }

  setCount(): void {
    if (TreeviewNode.countAccessor === undefined) {
      throw new Error("Count accessor was not defined");
    }
    if (TreeviewNode.countAccessor(this)) {
      this.data.count = TreeviewNode.countAccessor(this);
    } else if (this.children) {
      this.data.count = this.children.reduce((sum, c) => sum + (c.data.count as number), 0);
    } else {
      this.data.count = 0;
    }
  }

  setSelected(value): void {
    this.setRecursiveProperty("selected", value);
  }

  // collapse everything
  collapseAll(): void {
    if (this.children && this.children.length === 0) {
      delete this.children;
    }
    if (this.children) {
      this._children = this.children;
      this._children.forEach(c => {
        c.collapseAll();
      });
      delete this.children;
    }
  }

  // Collapses a node
  collapse(): void {
    if (this.children) {
      this._children = this.children;
      delete this.children;
    }
  }

  expandAll(): void {
    this.expand(100);
  }

  // Expands a node and its children
  expand(i: number = TreeviewNode.levelsToExpand): void {
    if (i > 0) {
      if (this._children) {
        this.children = this._children;
        delete this._children;
      }
      if (this.children) {
        this.children.forEach(c => {
          c.expand(i - 1);
        });
      }
    }
  }
}