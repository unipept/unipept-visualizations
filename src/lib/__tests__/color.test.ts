import { rgb } from "d3";

import { averageColor, brightness, getReadableColorFor, OptionalColor } from "../color";
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

test("Averaging colour", () => {
  const colours: OptionalColor[] = [Optional.of(rgb(255, 0, 0)),
                                    Optional.of(rgb(0, 255, 0))];
  const result: OptionalColor = averageColor(colours);
  expect(result.isPresent()).toEqual(true);

  const colourResult: d3.RGBColor | d3.HSLColor = result.orElse(rgb(0,0,0)).rgb();
  expect(colourResult.r).toBeCloseTo(180.312);
  expect(colourResult.g).toBeCloseTo(180.312);
  expect(colourResult.b).toBeCloseTo(0.0);
});

test("Average a single colour", () => {
  const colours: OptionalColor[] = [Optional.of(rgb(125, 126, 127))];
  const result: d3.RGBColor
    = averageColor(colours).map((c: d3.RGBColor | d3.HSLColor) => c.rgb()).orElse(rgb(0, 0, 0));
  expect(result.r).toBeCloseTo(125);
  expect(result.g).toBeCloseTo(126);
  expect(result.b).toBeCloseTo(127);
});

test("Average a single valid colour and multiple empty colours", () => {
  const colours: OptionalColor[] = [Optional.empty(),
                                    Optional.of(rgb(125, 126, 127)),
                                    Optional.empty()];
  const result: d3.RGBColor
    = averageColor(colours).map((c: d3.RGBColor | d3.HSLColor) => c.rgb()).orElse(rgb(0, 0, 0));
  expect(result.r).toBeCloseTo(125);
  expect(result.g).toBeCloseTo(126);
  expect(result.b).toBeCloseTo(127);
});

test("Average no colours", () => {
  const colours: OptionalColor[] = [Optional.empty(), Optional.empty(), Optional.empty()];

  expect(averageColor(colours)).toEqual(Optional.empty());
});
