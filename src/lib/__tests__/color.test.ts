import { rgb } from "d3";

import { brightness, getReadableColorFor } from "../color";
import { Optional } from "../optional";

test("brightness to be stable", () => {
  expect(brightness(Optional.of(rgb(0, 0, 0))).get()).toBeCloseTo(0);
  expect(brightness(Optional.of(rgb(1, 1, 1))).get()).toBeCloseTo(1);
  expect(brightness(Optional.of(rgb(0.5, 0.5, 0.5))).get()).toBeCloseTo(0.5);
});

test("readableColor to return white for dark colors", () => {
  expect(getReadableColorFor("black")).toEqual("#fff");
  expect(getReadableColorFor("#000")).toEqual("#fff");
});

test("readableColor to return black for white colors", () => {
  expect(getReadableColorFor("white")).toEqual("#000");
  expect(getReadableColorFor("#fff")).toEqual("#000");
});

