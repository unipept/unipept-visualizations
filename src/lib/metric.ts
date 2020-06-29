import * as R from "ramda";

import { DataFrame } from "./data";
import { combinations } from "./math";
import { Series } from "./series";

/**
 * Computes a "distance" between 2 vectors of equal dimmensions.
 * Precondition: x.length === y.length
 *
 * @param xs A row from the input matrix (@see `distanceMatrix`)
 * @param ys @see `xs`.
 */
type Metric = (xs: number[], ys: number[]) => number;

/**
 * Returns a correlation or distance matrix based upon a metric.
 *  Note that the returned matrix is lower triangular.
 *  Distances are computed column wise on the input matrix.
 *
 * @param matrix The input for which some correlation of distance matrix is calculated.
 * @return The distance between both values.
 */
const distanceMatrix: (data: DataFrame<number>, metric: Metric) => DataFrame<number>
  = (data: DataFrame<number>, metric: Metric): DataFrame<number> => {
    const idxs: string[][] = combinations(data.columns(), 2);

    const d = idxs.map(([i, j]: string[]): [string, string, number] =>
      [i, j, metric(data.column(i).asArray(), data.column(j).asArray())]);

    const makeSeries =
      (data: Array<number | string>, index: Array<number | string>): Series<number> => {
        return new Series<number>(data as number[], index as string[]);
      };

    const cols = R.toPairs(R.groupBy(R.head, d));
    const colNames = R.map(R.head, cols);
    const series = R.map(([_, vals]) =>
      R.apply(makeSeries, R.reverse(R.tail(R.transpose(vals)))), cols);

    return new DataFrame<number>(series, colNames);
  };

/**
 * Equation for centered pearson correlation from
 * https://www.rdocumentation.org/packages/amap/versions/0.8-18/topics/Dist
 * Given by:
 * 1 - corr(x,y), where
 * corr(x, y) = \frac{\sum_i{x_i y_i} - \frac{1}{n}\sum_i{x_i}\sum_i{y_i}}{\sqrt{\left(\sum_i{x_i^2} - \bar{x}^2\right)\left(\sum_i{y_i^2} - \bar{y}^2\right)}}
 */
const centeredPearsonCorrelation: Metric = (xs: number[], ys: number[]): number => {
  const xSumSqCentered = R.sum(R.map((x: number) => (x - R.mean(xs)) ** 2, xs));
  const ySumSqCentered = R.sum(R.map((y: number) => (y - R.mean(ys)) ** 2, ys));

  const prod = R.map(([x,y]) => x * y, R.zip(xs, ys)) as number[];
  const numerator = R.sum(prod) - (R.sum(xs) * R.sum(ys)) / xs.length;
  const denominator = Math.sqrt(xSumSqCentered * ySumSqCentered);

  if ( numerator !== denominator) {
    return 1 - (numerator / denominator);
  } else {
    return 0;
  }
};

/**
 * Euclidean distance between 2 points
 * Defined by \sqrt{\sum_i \left( x_i - y_i \right)^2}
 */
const euclideanDistance: Metric = (xs: number[], ys: number[]): number =>
  Math.sqrt(R.sum(R.zip(xs, ys)
    .map(([x, y]: [number, number]) => (x - y) ** 2)))

export { centeredPearsonCorrelation, distanceMatrix, euclideanDistance, Metric };
