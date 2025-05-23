import TreeNode from "./TreeNode";
import ClusterElement from "./ClusterElement";

export interface Clusterer {
    cluster(data: ClusterElement[]): TreeNode;
}
