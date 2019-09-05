/* Javascript Math library is very limited
 * This file defines useful functions beyond those in Math.*
 */


/**
 * Computes the sum of numbers in an array
 */
export function sum(data: number[]): number {
  return data.reduce((a: number, b: number) => a + b, 0);
}

/**
 * Computes the arithmetic mean of numbers in an array
 */
export function arithmeticMean(data: number[]): number {
  return sum(data) / data.length;
}

/**
 * Transposes an input 2D Array
 */
export function transpose<T>(matrix: T[][]): T[][] {
  return matrix[0].map((_: T, i: number) => matrix.map((row: T[]) => row[i]));
}
