import TreeNode from "./treeNode";
import Metric from "../metric/metric";
import ClusterElement from "./clusterElement";

export default interface Clusterer {
    cluster(data: ClusterElement[]): TreeNode;
}
