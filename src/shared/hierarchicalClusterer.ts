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
        if (axis == "columns") {
            let newData: ClusterElement<T>[][] = [];

            // Transpose input array!
            for (let i = 0; i < data[0].length; i++) {
                let row: ClusterElement<T>[] = [];
                for (let j = 0; j < data.length; j++) {
                    row.push(data[j][i]);
                }
                newData.push(row);
            }

            data = newData;
        }

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
                        }
                    }
                }
            }

            let xCluster = clusters.get(x);
            let yCluster = clusters.get(y);

            if (!xCluster || !yCluster) {
                throw "At least one cluster is invalid!";
            }

            // Recalculate distance from this cluster to other clusters (Use average distance)
            for (let j of clusters.keys()) {
                if (j != x && j != y) {
                    // Our matrix is lower triangular (because it is symmetric). This means we should extract the value
                    // from the right part of the matrix.
                    let xDistance;
                    if (j > x) {
                        xDistance = distanceMatrix[j][x]
                    } else {
                        xDistance = distanceMatrix[x][j]
                    }

                    let yDistance;
                    if (j > y) {
                        yDistance = distanceMatrix[j][y]
                    } else {
                        yDistance = distanceMatrix[y][j]
                    }

                    let temp = (xCluster.elements.length * xDistance + yCluster.elements.length * yDistance) / (xCluster.elements.length + yCluster.elements.length);
                    if (j > x) {
                        distanceMatrix[j][x] = temp;
                    } else {
                        distanceMatrix[x][j] = temp;
                    }
                }
            }

            xCluster.merge(yCluster);
            clusters.delete(y);

            ++done;
        }

        return clusters.values().next().value.treeNode;
    }
}
