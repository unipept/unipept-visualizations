import { arithmeticMean, combinations, range, transpose } from "../math";
import { Optional } from "../optional";


test("average of empty array", () => {
  expect(arithmeticMean([])).toEqual(Optional.empty());
});

test("average of valid array", () => {
  expect(arithmeticMean([1, 2, 3])).toEqual(Optional.of(2));
});

test("Matrix transpose", () => {
  expect(transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]))
    .toEqual([[1, 4, 7, 10], [2, 5, 8, 11], [3, 6, 9, 12]]);
});

test("Transpose empty matrix", () => {
  expect(transpose([])).toEqual([]);
});

test("5 Combine 1", () => {
  expect(combinations([0, 1, 2, 3, 4], 1))
    .toEqual([[0], [1], [2], [3], [4]]);
});

test("5 Combine 5", () => {
  expect(combinations([0, 1, 2, 3, 4], 5))
    .toEqual([[0, 1, 2, 3, 4]]);
});

test("5 Combine 2", () => {
  expect(combinations([0, 1, 2, 3, 4], 2))
    .toEqual([[0,1], [0,2], [0,3], [0,4],
              [1,2], [1,3], [1,4],
              [2,3], [2,4],
              [3,4]]);
});

test("5 Combine 4", () => {
  expect(combinations([0, 1, 2, 3, 4], 4))
    .toEqual([[0,1,2,3],
              [0,1,2,4],
              [0,1,3,4],
              [0,2,3,4],
              [1,2,3,4]]);
});

test("4 Combine 3", () => {
  expect(combinations([0, 1, 2, 3], 3))
    .toEqual([[0,1,2],
              [0,1,3],
              [0,2,3],
              [1,2,3]]);
});

test("Generate a list from a range", () => {
  expect([...range(1,5)])
    .toEqual([1,2,3,4,5]);
});
