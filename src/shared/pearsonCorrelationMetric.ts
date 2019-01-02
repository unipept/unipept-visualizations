import Metric from "./metric";
import ClusterElement from "./clusterElement";

export default class PearsonCorrelationMetric<T> implements Metric {
    getDistance(matrix: number[][]): number[][] {
        // for (let i = 0; i < matrix.length; i++) {
        //     let row: number[] = [];
        //     for (let j = 0; j <= i; j++) {
        //         row.push(this.metric.getDistance())
        //     }
        // }

        throw "Not implemented yet!";
    }

    private getPearsonCorrelationBetween2Samples(value1: number[], value2: number[]) {

    }
}
