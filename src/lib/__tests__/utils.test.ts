import { brightness, getReadableColorFor, stringHash } from "../utils";
import { rgb } from "d3-color";

test("hash for a string to be stable", () => {
    const text = "this is a string";
    expect(stringHash(text)).toMatchInlineSnapshot("-1853110172");
});

test("brightness to be stable", () => {
    expect(brightness(rgb(0, 0, 0))).toBeCloseTo(0);
    expect(brightness(rgb(1, 1, 1))).toBeCloseTo(1);
    expect(brightness(rgb(0.5, 0.5, 0.5))).toBeCloseTo(0.5);
});

test("readableColor to return white for dark colors", () => {
    expect(getReadableColorFor("black")).toEqual("#fff");
    expect(getReadableColorFor("#000")).toEqual("#fff");
});

test("readableColor to return black for white colors", () => {
    expect(getReadableColorFor("white")).toEqual("#000");
    expect(getReadableColorFor("#fff")).toEqual("#000");
}); 
