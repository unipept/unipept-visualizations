import { copy } from "../../math";
import { Node } from "../../node";
import { Metric } from "../metric/metric";

import { Cluster } from "./cluster";
import { Clusterer } from "./clusterer";


export class UPGMAClusterer implements Clusterer {
  public readonly metric: Metric;

  /**
   * @param metric A distance metric that's used for the clustering performed by this class.
   */
  public constructor(metric: Metric) {
    this.metric = metric;
  }

  /**
   * This function returns the root of a dendrogram, based upon the given dataset.
   * The clustering is performed on a distance matrix, which is calculated using the
   * metric, defined in the constructor of this class.
   *
   * @param data A matrix containing data elements that should be clustered.
   *            The elements are either clustered on row or column similarity.
   */
  public cluster(data: number[][]): Node {
    if (data.length === 0) {
      return new Node({});
    }

    // All clusters that exist in a current step.
    const clusters: Map<number, Cluster>
      = new Map(data.map((v: number[], i: number) => [i, new Cluster(new Node({data: v}), i)]));


    // Now we need to compute a distance matrix.
    // A distance matrix needs a matrix with raw values to be calculated.
    // We thus need to convert the input into a value matrix, before proceeding.

    // Compute the distance matrix!
    let distanceMatrix: number[][] = this.metric.getDistance(data);

    // Start the UPGMA iterations. Loop until only 1 cluster remains.
    let done: number = 0;
    while (done !== distanceMatrix.length - 1) {
      // Look for the smallest value in the distance matrix.
      let smallestDistance: number = Infinity;
      let x: number = -1;
      let y: number = -1;
      for (const i of clusters.keys()) {
        for (const j of clusters.keys()) {
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
      const xCluster: Cluster | undefined = clusters.get(x);
      const yCluster: Cluster | undefined = clusters.get(y);

      const nodeHeight: number = smallestDistance / 2;

      if (!xCluster || !yCluster) {
        throw new Error("At least one cluster is invalid!");
      }

      // Recalculate distance from this cluster to other clusters (Use average distance)
      const updatedDistanceMatrix: number[][] = copy(distanceMatrix);
      // Cluster.keys() returns a reference to every cluster at the current step
      for (const j of clusters.keys()) {
        if (j !== x && j !== y) {
          // Our matrix is lower triangular (because it is symmetric).
          // This means we should extract the value from the right part of the matrix.
          const xDistance: number = (j > x ? distanceMatrix[j][x] : distanceMatrix[x][j]);
          const yDistance: number = (j > y ? distanceMatrix[j][y] : distanceMatrix[y][j]);

          // Recalculate the distance between the new, merged cluster and all other clusters.
          const temp: number = (xCluster.size() * xDistance + yCluster.size() * yDistance)
            / (xCluster.size() + yCluster.size());
          if (j > x) {
            updatedDistanceMatrix[j][x] = temp;
          } else {
            updatedDistanceMatrix[x][j] = temp;
          }
        }
      }

      distanceMatrix = updatedDistanceMatrix;

      // Merge both new clusters.
      // The height of the tree in the dendrogram associated with this merger, is
      // Equal to the distance between clusterY and clusterX in the distanceMatrix, divided by 2.
      xCluster.merge(yCluster, nodeHeight);
      clusters.delete(y);
      done += 1;
    }

    return clusters.values()
      .next().value.treeNode;
  }
}
