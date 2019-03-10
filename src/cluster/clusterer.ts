import TreeNode from "./treeNode";
import Metric from "../metric/metric";
import ClusterElement from "./clusterElement";

export default interface Clusterer<T> {
    cluster(data: ClusterElement<T>[][], axis: "columns" | "rows"): TreeNode<T[]>;
}
