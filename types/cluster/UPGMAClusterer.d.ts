import Clusterer from "./Clusterer";
import TreeNode from "./TreeNode";
import Metric from "../metric/Metric";
import ClusterElement from "./ClusterElement";
export default class UPGMAClusterer implements Clusterer {
    private readonly metric;
    /**
     * @param metric A distance metric that's used for the clustering performed by this class.
     */
    constructor(metric: Metric);
    /**
     * This function returns the root of a dendrogram, based upon the given dataset. The clustering is performed on
     * a distance matrix, which is calculated using the metric, defined in the constructor of this class.
     *
     * @param data A matrix containing data elements that should be clustered. The elements are either clustered on row
     *        or column similarity.
     */
    cluster(data: ClusterElement[]): TreeNode;
    private copyDistanceMatrix;
}
