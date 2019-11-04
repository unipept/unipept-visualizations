import { BasicNode, emptyBasicNode } from "../basicNode";
import { Node } from "../node";

/**
 * A HeatmapElement denotes the name of a row / column, an optional ID and can comprise any combination of extra
 * information.
 */
export interface HeatmapElement {
    id?: string,
    name: string,
    idx?: number,
    extras?: any
}

/**
 * A HeatmapValue denotes a single datapoint in a matrix of input values. The rowId and columnId fields of this value
 * will be filled in by the Heatmap itself (based upon the current row/column this value is situated in).
 */
export interface HeatmapValue {
    value: number,
    rowId?: string,
    columnId?: string
}

export class HeatmapNode extends Node {
  public readonly value: number = 0;

  public constructor(node: BasicNode = emptyBasicNode()) {
    super(node);
    Object.assign(this, node);
  }

  public static new(node: BasicNode = emptyBasicNode()): HeatmapNode {
    return new HeatmapNode(node);
  }

  public static createNodes<N extends BasicNode>(nodes: N): HeatmapNode {
    return Node.createNode(nodes, (node: BasicNode) => new HeatmapNode(node));
  }
}


/**
 * HeatmapData represents the full container of all data needed for a Heatmap to visualise.
 */
export interface HeatmapData {
    rows: HeatmapElement[],
    columns: HeatmapElement[],
    values: HeatmapValue[][] | number[][]
}
