import ClusterElement from "./ClusterElement";
import TreeNode from "./TreeNode";
export default class Cluster {
    elements: ClusterElement[];
    index: number;
    treeNode: TreeNode;
    constructor(elements: ClusterElement[], index: number, treeNode: TreeNode);
    /**
     * Merge 2 clusters with each other and create the associated nodes of the dendrogram.
     *
     * @param other The other cluster with whom this one needs to be merged.
     * @param height The height of the dendrogram at which the clustering occurs.
     */
    merge(other: Cluster, height: number): void;
}
