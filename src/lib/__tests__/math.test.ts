import { sum, arithmeticMean, transpose } from "../math";

test("sum empty array", () => {
  expect(sum([])).toEqual(0);
});

test("sum valid array", () => {
  expect(sum([1, 2, 3])).toEqual(6);
});

test("average of empty array", () => {
  expect(arithmeticMean([])).toEqual(NaN);
});

test("average of valid array", () => {
  expect(arithmeticMean([1, 2, 3])).toEqual(2);
});

test("Matrix transpose", () => {
  expect(transpose([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]))
    .toEqual([[1, 4, 7, 10], [2, 5, 8, 11], [3, 6, 9, 12]]);
});

