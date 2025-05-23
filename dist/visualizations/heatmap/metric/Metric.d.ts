export interface Metric {
    /**
     * Returns a correlation or distance matrix based upon this metric. Note that the returned matrix is lower
     * triangular.
     *
     * @param matrix The input matrix for which some correlation of distance matrix should be calculated.
     * @return The distance between both values.
     */
    getDistance(matrix: number[][]): number[][];
}
