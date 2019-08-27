import { rgb } from "d3-color";

/**
 * Calculates a numeric hash value of a string
 * 
 * @param s string to calculate a hash from
 */
export function stringHash(s: string): number {
  return s.split("").reduce(function (a, b) {
    const c = ((a << 5) - a) + b.charCodeAt(0);
    return c & c;
  }, 0);
}

/**
 * Returns the brightness of an rgb-color
 * from: http:// www.w3.org/WAI/ER/WD-AERT/#color-contrast
 * 
 * @param rgb rgb color to calculate the brightness from
 */
export function brightness(rgb: d3.RGBColor): number {
  return rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
}

/**
 * Returns the readable text color based on the brightness of a given backgroud color
 * 
 * @param color hex value of a color
 */
export function getReadableColorFor(color: string): string {
  let textColor = "#000";
  try {
    textColor = brightness(rgb(color)) < 125 ? "#fff" : "#000";
  } catch (err) { /* go on */ }
  return textColor;
}

export function functor(v: Function | any): Function {
  return typeof v === "function" ? v : function () { return v; };
}