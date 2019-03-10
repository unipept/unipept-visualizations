import Metric from "./metric";
import ClusterElement from "../cluster/clusterElement";

export default class EuclidianDistanceMetric implements Metric {
    getDistance(matrix: number[][]): number[][] {
        let output: number[][] = [];

        for (let i = 0; i < matrix.length; i++) {
            let row: number[] = [];
            for (let j = 0; j <= i; j++) {
                row.push(this.calculateEuclideanDistance(matrix[i], matrix[j]))
            }
            output.push(row);
        }

        return output;
    }

    private calculateEuclideanDistance(value1: number[], value2: number[]) {
        if (value1.length != value2.length) {
            throw "Euclidian distance can only be calculated for 2 equally sized input arrays!";
        }

        let powers = 0;
        for (let i = 0; i < value1.length; i++) {
            powers += Math.pow(value2[i] - value1[i], 2);
        }

        return Math.sqrt(powers);
    }
}
