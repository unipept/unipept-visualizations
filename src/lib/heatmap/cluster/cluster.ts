import { Node } from "../../node";

export class Cluster {
  public readonly treeNode: Node;
  public readonly height: number;

  public constructor(treeNode: Node, height: number) {
    this.treeNode = treeNode;
    this.height = height;
  }

  public size(): number {
    if (this.treeNode.children) {
      return this.treeNode.children.length;
    }

    return 0;
  }

  /**
   * Merge 2 clusters with each other and create the associated nodes of the dendrogram.
   *
   * @param other The other cluster with whom this one needs to be merged.
   * @param height The height of the dendrogram at which the clustering occurs.
   */
  public merge(other: Cluster, height: number): Cluster {
    return new Cluster(new Node({children: [this.treeNode, other.treeNode],
                                 data: (this.treeNode.data as number[]).slice()}),
                       height);
  }
}
