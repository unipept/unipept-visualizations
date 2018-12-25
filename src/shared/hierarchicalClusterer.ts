import Clusterer from "./clusterer";
import TreeNode from "./treeNode";
import DistanceMetric from "./distanceMetric";
import ClusterElement from "./clusterElement";
import Cluster from "./cluster";

export default class HierarchicalClusterer<T> implements Clusterer<T> {
    private readonly metric: DistanceMetric<T>;

    constructor(metric: DistanceMetric<T>) {
        this.metric = metric;
    }

    cluster(data: ClusterElement<T>[][], axis: "columns" | "rows"): TreeNode<T[]> {
        // TODO implement columns (for now only rows supported!)
        let distanceMatrix: number[][] = [];

        let clusters: Map<number, Cluster<T[]>> = new Map();

        // First we compute the distance matrix according to the given distance metric
        for (let i = 0; i < data.length; i++) {
            let row: number[] = [];
            for (let j = 0; j <= i; j++) {
                row.push(this.metric.getDistance(data[i], data[j]));
            }
            distanceMatrix.push(row);
            let mappedData: T[] = data[i].map((val) => val.extra);
            clusters.set(i, new Cluster<T[]>([mappedData], i, new TreeNode<T[]>(null, null, [mappedData])))
        }

        let done = 0;

        while (done != distanceMatrix.length - 1) {
            let smallestDistance = Infinity;
            let x = -1;
            let y = -1;
            for (let i of clusters.keys()) {
                for (let j of clusters.keys()) {
                    if (i != j) {
                        if (distanceMatrix[i][j] < smallestDistance) {
                            smallestDistance = distanceMatrix[i][j];
                            x = i;
                            y = j;
                        }                    }
                }
            }

            let xCluster = clusters.get(x);
            let yCluster = clusters.get(y);

            console.log(xCluster);
            console.log(yCluster);

            if (!xCluster || !yCluster) {
                throw "At least one cluster is invalid!";
            }

            xCluster.merge(yCluster);
            clusters.delete(y);

            ++done;
        }

        return clusters.values().next().value.treeNode;
    }
}
