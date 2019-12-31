export interface Metric {
    /**
     * Returns a correlation or distance matrix based upon a metric.
     *  Note that the returned matrix is lower triangular.
     *
     * @param matrix The input for which some correlation of distance matrix is calculated.
     * @return The distance between both values.
     */
    getDistance(matrix: number[][]): number[][];
}
