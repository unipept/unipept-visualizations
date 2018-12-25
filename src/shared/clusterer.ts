import TreeNode from "./treeNode";
import DistanceMetric from "./distanceMetric";

export default interface Clusterer {
    cluster(data: number[][], metric: DistanceMetric, axis: "columns" | "rows"): TreeNode;
}
