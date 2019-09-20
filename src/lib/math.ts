/* Javascript Math library is very limited
 * This file defines useful functions beyond those in Math.*
 */

import { Optional } from "./optional";


/**
 * Computes the sum of numbers in an array
 */
const sum: (data: number[]) => number
  = (data: number[]): number => (data ? data.reduce((a: number, b: number) => a + b, 0) : 0);

/**
 * Computes the arithmetic mean of numbers in an array
 */
const arithmeticMean: (data: number[]) => Optional<number>
  = (data: number[]): Optional<number> =>
  Optional.of(data.length ? (sum(data) / data.length) : undefined);

/**
 * Transposes an input 2D Array
 */
const transpose: <T>(matrix: T[][]) => T[][]
  = <T>(matrix: T[][]): T[][] => {
    if (matrix.length) {
      return matrix[0].map((_: T, i: number) => matrix.map((row: T[]) => row[i]));
    }

    return matrix;
  };

const rad2deg: (rad: number) => number
  = (rad: number): number => rad * (180 / Math.PI);

export { arithmeticMean, rad2deg, sum, transpose };
