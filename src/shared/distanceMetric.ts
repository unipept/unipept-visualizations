import ClusterElement from "./clusterElement";

export default interface DistanceMetric<T> {
    /**
     * Returns the distance between value1 and value2 measured according to this object's specific metric.
     *
     * @param value1
     * @param value2
     * @return The distance between both values.
     */
    getDistance(value1: ClusterElement<T>[], value2: ClusterElement<T>[]): number;
}
