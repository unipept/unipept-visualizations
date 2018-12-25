import Clusterer from "./clusterer";
import TreeNode from "./treeNode";
import DistanceMetric from "./distanceMetric";

export default class HierarchicalClusterer implements Clusterer {
    cluster(data: number[][], metric: DistanceMetric, axis: "columns" | "rows"): TreeNode {
        // TODO implement columns (for now only rows supported!)
        let distanceMatrix: number[][] = [];

        // First we compute the distance matrix according to the given distance metric
        for (let i = 0; i < data.length; i++) {
            let row = [];
            for (let j = 0; j <= i; j++) {
                row.push(metric.getDistance(data[i], data[j]));
            }
            distanceMatrix.push(row);
        }

        console.log(distanceMatrix);

        return new TreeNode(null, null);
    }
}
