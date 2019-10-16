/* Javascript Math library is very limited
 * This file defines useful functions beyond those in Math.*
 */

import { Optional } from "./optional";


/**
 * Computes the sum of numbers in an array
 */
const sum: (data: number[]) => number
  = (data: number[]): number => data.reduce((a: number, b: number) => a + b, 0);

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

const rad2deg: (rad: number) => number
  = (rad: number): number => rad * (180 / Math.PI);

const deg2rad: (deg: number) => number
  = (deg: number): number => (deg * Math.PI) / 180;

const interval: (value: number, min: number, max: number) => number
  = (value: number, min: number, max: number): number =>
  Math.max(Math.min(value, max), min);

const arcLength: (radius: number, angle: number) => number
  = (radius: number, angle: number): number => radius * angle;

export { arcLength, arithmeticMean, deg2rad, interval, rad2deg, sum, transpose };
