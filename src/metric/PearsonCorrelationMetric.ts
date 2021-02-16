import Metric from "./Metric";

export default class PearsonCorrelationMetric implements Metric {
    getDistance(matrix: number[][]): number[][] {
        let output: number[][] = [];

        for (let i = 0; i < matrix.length; i++) {
            let row: number[] = [];
            for (let j = 0; j <= i; j++) {
                row.push(this.getPearsonCorrelationBetween2Samples(matrix[i], matrix[j]));
            }
            output.push(row);
        }

        return output;
    }

    private getPearsonCorrelationBetween2Samples(x: number[], y: number[]) {
        let sum = (a: number, b: number) => a + b;
        let xMean = x.reduce(sum, 0) / x.length;
        let yMean = y.reduce(sum, 0) / y.length;

        let numerator = 0;
        let denominator = 0;

        for (let i = 0; i < x.length; i++) {
            numerator += (x[i] - xMean) * (y[i] - yMean);
            denominator += Math.sqrt(Math.pow((x[i] - xMean), 2)) * Math.sqrt(Math.pow((y[i] - yMean), 2));
        }

        return 1 - numerator / denominator;
    }
}
