import ClusterElement from "./ClusterElement";
import TreeNode from "./TreeNode";

export default class Cluster {
    public elements: ClusterElement[];
    public index: number;
    public treeNode: TreeNode;

    constructor(elements: ClusterElement[], index: number, treeNode: TreeNode) {
        this.elements = elements;
        this.index = index;
        this.treeNode = treeNode;
    }

    /**
     * Merge 2 clusters with each other and create the associated nodes of the dendrogram.
     *
     * @param other The other cluster with whom this one needs to be merged.
     * @param height The height of the dendrogram at which the clustering occurs.
     */
    public merge(other: Cluster, height: number) {
        this.elements.push(...other.elements);
        this.treeNode = new TreeNode(this.treeNode, other.treeNode, this.elements.slice(), height);
    }
}
