import TreeNode from "./TreeNode";
import ClusterElement from "./ClusterElement";
export default interface Clusterer {
    cluster(data: ClusterElement[]): TreeNode;
}
