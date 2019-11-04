import { BasicNode, emptyBasicNode } from "../basicNode";
import { Node } from "../node";

/**
 * A [[Node]] specialised for the sunburst visualisation
 */
export class SunburstNode extends Node {
  public readonly size?: number;

  public constructor(node: BasicNode = emptyBasicNode()) {
    super(node);
  }

  public static new(node: BasicNode = emptyBasicNode()): SunburstNode {
    return new SunburstNode(node);
  }

  public static createNodes<N extends BasicNode>(nodes: N): SunburstNode {
    return Node.createNode(nodes, (node: BasicNode) => new SunburstNode(node));
  }
}
