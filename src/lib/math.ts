/* Javascript Math library is very limited
 * This file defines useful functions beyond those in Math.*
 */
import { sum } from "ramda";

import { Optional } from "./optional";



/**
 * Computes the arithmetic mean of numbers in an array
 */
const arithmeticMean: (data: number[]) => Optional<number>
  = (data: number[]): Optional<number> =>
  data.length > 0 ? Optional.of(sum(data) / data.length) : Optional.empty();

/**
 * Transposes an input 2D Array
 */
const transpose: <T>(matrix: T[][]) => T[][]
  = <T>(matrix: T[][]): T[][] => {
    if (matrix.length > 0) {
      return matrix[0].map((_: T, i: number) => matrix.map((row: T[]) => row[i]));
    }

    return matrix;
  };

/**
 * Compute all the combinations of 'r' values from an array
 * Returns an array containing nCr tuples of length r
 */
const combinations: <T>(data: T[], r: number) => T[][]
  = <T>(data: T[], r: number): T[][] => {
    if ((data.length === r) || (data.length === 1)) {
      return [data];
    }

    if (r === 1) {
      return data.map((v: T): T[] => [v]);
    }

    return combinations(data.slice(1), r - 1)
      .map((C: T[]): T[] => [data[0]].concat(C))
      .concat(combinations(data.slice(1), r));
  };


const copy: <T>(matrix: T[][]) => T[][]
  = <T>(matrix: T[][]): T[][] => matrix.map((inner: T[]) => inner.slice());

const rad2deg: (rad: number) => number
  = (rad: number): number => rad * (180 / Math.PI);

const deg2rad: (deg: number) => number
  = (deg: number): number => (deg * Math.PI) / 180;

const arcLength: (radius: number, angle: number) => number
  = (radius: number, angle: number): number => radius * angle;

export { arcLength, arithmeticMean, combinations, copy, deg2rad,
         rad2deg, transpose };
