import Clusterer from "./clusterer";
import TreeNode from "./treeNode";
import Metric from "../metric/metric";
import ClusterElement from "./clusterElement";
import Cluster from "./cluster";

export default class UPGMAClusterer<T> implements Clusterer<T> {
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
     * @param axis The axis against which the clustering should be performed. When given "columns", the elements to be
     *        clustered are considered to be the columns, otherwise the rows are seen as the elements-to-be-clustered.
     */
    cluster(data: ClusterElement<T>[][], axis: "columns" | "rows"): TreeNode<T[]> {
        // When the given axis is columns, the input data needs to be transposed. The rest of the following algorithm
        // works identically for columns or rows.
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

        // A map containing all clusters that are produced during the algorithm.
        let clusters: Map<number, Cluster<T[]>> = new Map();

        // Construct a matrix only containing the values from the given input matrix.
        let valueMatrix: number[][] = [];
        // First we compute the distance matrix according to the given distance metric.
        for (let i = 0; i < data.length; i++) {
            let row: number[] = [];
            for (let j = 0; j < data[i].length; j++) {
                row.push(data[i][j].value);
            }
            valueMatrix.push(row);
            let mappedData: T[] = data[i].map((val) => val.extra);
            // Every item starts in a singleton cluster initially.
            clusters.set(i, new Cluster<T[]>([mappedData], i, new TreeNode<T[]>(null, null, [mappedData], 0)));
        }

        // Effectively compute the distance matrix.
        let distanceMatrix = this.metric.getDistance(valueMatrix);
        let done = 0;

        // Then we keep adding the 2 closest clusters together until there is only one cluster left. During this process
        // a dendrogram is built. This dendrogram is what is returned eventually by this method.
        while (done != distanceMatrix.length - 1) {
            // Compute the distance between all pairs of nodes
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
            // TODO optimize this here! A copy is not necessary here
            let updatedDistanceMatrix: number[][] = this.copyDistanceMatrix(distanceMatrix);
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
