import TreeNode from "./treeNode";
import DistanceMetric from "./distanceMetric";
import ClusterElement from "./clusterElement";

export default interface Clusterer<T> {
    cluster(data: ClusterElement<T>[][], axis: "columns" | "rows"): TreeNode<T[]>;
}
