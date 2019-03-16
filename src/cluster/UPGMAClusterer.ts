import Clusterer from "./clusterer";
import TreeNode from "./treeNode";
import Metric from "../metric/metric";
import ClusterElement from "./clusterElement";
import Cluster from "./cluster";
import metric from "../metric/metric";

export default class UPGMAClusterer implements Clusterer {
    private readonly metric: Metric;

    /**
     * @param metric A distance metric that's used for the clustering performed by this class.
     */
    constructor(metric: Metric) {
        this.metric = metric;
    }

    /**
     * This function returns the root of a dendrogram, based upon the given dataset. The clustering is performed on
     * a distance matrix, which is calculated using the metric, defined in the constructor of this class.
     *
     * @param data A matrix containing data elements that should be clustered. The elements are either clustered on row
     *        or column similarity.
     */
    cluster(data: ClusterElement[]): TreeNode {
        // All clusters that exist in a current step.
        let clusters: Map<number, Cluster> = new Map();

        // Now we need to compute a distance matrix. A distance matrix needs a matrix with raw values to be calculated.
        // We thus need to convert the input into a value matrix, before proceeding.
        let valueMatrix: number[][] = [];
        for (let i = 0; i < data.length; i++) {
            let row: number[] = data[i].values;
            clusters.set(i, new Cluster([data[i]], i, new TreeNode(null, null, [data[i]], 0)));
            valueMatrix.push(row);
        }

        // Compute the distance matrix!
        let distanceMatrix: number[][] = this.metric.getDistance(valueMatrix);

        // Start the UPGMA iterations. Loop until only 1 cluster remains.
        let done: number = 0;
        while (done != distanceMatrix.length - 1) {
            // Look for the smallest value in the distance matrix.
            let smallestDistance = Infinity;
            let x = -1;
            let y = -1;
            for (let i of clusters.keys()) {
                for (let j of clusters.keys()) {
                    if (i > j) {
                        if (distanceMatrix[i][j] < smallestDistance) {
                            smallestDistance = distanceMatrix[i][j];
                            x = i;
                            y = j;
                        }
                    }
                }
            }

            // Get the cluster objects corresponding to the closest distance found.
            let xCluster = clusters.get(x);
            let yCluster = clusters.get(y);

            let nodeHeight: number = smallestDistance / 2;

            if (!xCluster || !yCluster) {
                throw "At least one cluster is invalid!";
            }

            // Recalculate distance from this cluster to other clusters (Use average distance)
            let updatedDistanceMatrix: number[][] = this.copyDistanceMatrix(distanceMatrix);
            // Cluster.keys() returns a reference to every cluster at the current step
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

                    // Recalculate the distance between the new, merged cluster and all other clusters.
                    let temp = (xCluster.elements.length * xDistance + yCluster.elements.length * yDistance) / (xCluster.elements.length + yCluster.elements.length);
                    if (j > x) {
                        updatedDistanceMatrix[j][x] = temp;
                    } else {
                        updatedDistanceMatrix[x][j] = temp;
                    }
                }
            }

            distanceMatrix = updatedDistanceMatrix;

            // Merge both new clusters. The height of the TreeNode in the dendrogram associated with this merger, is
            // equal to the distance between clusterY and clusterX in the distanceMatrix, divided by 2.
            xCluster.merge(yCluster, nodeHeight);
            clusters.delete(y);
            ++done;
        }

        return clusters.values().next().value.treeNode;
    }

    private copyDistanceMatrix(distanceMatrix: number[][]): number[][] {
        let output: number[][] = [];

        for (let i = 0; i < distanceMatrix.length; i++) {
            let current: number[] = [];
            let row = distanceMatrix[i];
            for (let j = 0; j < row.length; j++) {
                current.push(row[j]);
            }
            output.push(current);
        }

        return output;
    }
}
