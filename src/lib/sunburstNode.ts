/**
 * //TODO: docs
 */
import { BasicNode, emptyBasicNode } from "./basicNode";
import { Node } from "./node";

export class SunburstNode extends Node {
  constructor(node: BasicNode = emptyBasicNode()) {
    super(node);
  }

  static new(node: BasicNode = emptyBasicNode()): SunburstNode {
    return new SunburstNode(node);
  }

  static createNodes(node: BasicNode): SunburstNode {
    return Node.createNode(node, SunburstNode.new);
  }
}
