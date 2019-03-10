import ClusterElement from "./clusterElement";
import TreeNode from "./treeNode";

export default class Cluster<T> {
    public elements: T[];
    public index: number;
    public treeNode: TreeNode<T>;

    constructor(elements: T[], index: number, treeNode: TreeNode<T>) {
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
    public merge(other: Cluster<T>, height: number) {
        this.elements.push(...other.elements);
        this.treeNode = new TreeNode<T>(this.treeNode, other.treeNode, this.elements.slice(), height);
    }
}
