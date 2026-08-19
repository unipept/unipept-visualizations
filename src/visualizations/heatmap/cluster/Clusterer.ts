import TreeNode from "./TreeNode.js";
import ClusterElement from "./ClusterElement.js";

export interface Clusterer {
    cluster(data: ClusterElement[]): TreeNode;
}
