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

    public merge(other: Cluster<T> ) {
        this.elements.push(...other.elements);
        this.treeNode = new TreeNode<T>(this.treeNode, other.treeNode, this.elements.slice());
    }
}
