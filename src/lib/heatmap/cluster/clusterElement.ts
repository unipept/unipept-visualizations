import { INodeData } from "../../node";

export class ClusterElement implements INodeData {
  public readonly count: number = 0;
  public readonly values: number[];
  public readonly id: string;

  public constructor(values: number[], id: string) {
    this.values = values;
    this.id = id;
  }
}
