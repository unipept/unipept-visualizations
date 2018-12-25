export default interface DistanceMetric {
    /**
     * Returns the distance between value1 and value2 measured according to this object's specific metric.
     *
     * @param value1
     * @param value2
     * @return The distance between both values.
     */
    getDistance(value1: number[], value2: number[]): number;
}
