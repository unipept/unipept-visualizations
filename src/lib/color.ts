import { hsl, rgb } from "d3";

import * as ColorPalette from "./colorPalette";
import { arithmeticMean, transpose } from "./math";
import { Optional } from "./optional";

type OptionalColor = Optional<d3.RGBColor | d3.HSLColor>;

const COLOUR_MAX_VALUE: number = 255;
const BRIGHTNESS_RED_FACTOR: number = 0.299;
const BRIGHTNESS_GREEN_FACTOR: number = 0.587;
const BRIGHTNESS_BLUE_FACTOR: number = 0.114;

/**
 * Returns the brightness of an rgb-color
 * from: http:// www.w3.org/WAI/ER/WD-AERT/#color-contrast
 *
 * @param rgb rgb color to calculate the brightness from
 */
const brightness: (color: OptionalColor) => Optional<number>
  = (color: OptionalColor): Optional<number> =>
  color.map((c: d3.RGBColor | d3.HSLColor): number => {
    const rgbColor: d3.RGBColor = c.rgb();

    return rgbColor.r * BRIGHTNESS_RED_FACTOR
      + rgbColor.g * BRIGHTNESS_GREEN_FACTOR
      + rgbColor.b * BRIGHTNESS_BLUE_FACTOR;
  });

/**
 * Returns the readable text color based on the brightness of a given backgroud color
 *
 * @param color hex value of a color
 */
const getReadableColorFor: (color: string, cutoff?: number) => string
  = ((color: string, cutoff: number = 125): string => {
    const value: number = brightness(Optional.of(rgb(color)))
      .orElse(COLOUR_MAX_VALUE);

    return (value < cutoff ? "#fff" : "#000");
  });

const readableText: (color: string) => d3.RGBColor
  = (color: string): d3.RGBColor => {
    const alternatives: d3.RGBColor[] = [rgb("black"), rgb("white")];
    const cr: number[] = alternatives.map((fg: d3.RGBColor) => contrastRatio(rgb(color), fg));

    return alternatives[cr.reduce((lowest: number, next: number, index: number) =>
                                  (next < cr[lowest]) ? index : lowest,
                                  0)];
  };

/**
 *
 * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 * 
 */
const contrastRatio: (c: d3.ColorCommonInstance, d: d3.ColorCommonInstance) => number
  = (c: d3.ColorCommonInstance, d: d3.ColorCommonInstance): number => {
    return (hsl(c).l + 0.05) / (hsl(d).l + 0.05);
  };


/**
 * Computes an average color from a series of colors.
 * Note: Naively computing an average results in incorrect visual perception
 *       of the resulting average color.
 * Formula: sum(squared components)/# of components
 */
const averageColor: (colours: OptionalColor[]) => OptionalColor
  = (colours: OptionalColor[]): OptionalColor => {
    const rgbColour: number[]
      = transpose(colours.map((c: OptionalColor): number[] =>
                              c.map((clr: d3.RGBColor | d3.HSLColor): number[] => {
                                const localClr: d3.RGBColor = clr.rgb();

                                return [localClr.r * localClr.r,
                                        localClr.g * localClr.g,
                                        localClr.b * localClr.b];
                              })
                              .orElse([]))
                  .filter((v: number[]): boolean => v.length !== 0))
      .map((channel: number[]): number => arithmeticMean(channel)
           .map((v: number) => Math.sqrt(v))
           .orElse(NaN))
      .filter((channel: number): boolean => !isNaN(channel));

    if (rgbColour.length === 3) {
      return Optional.of(rgb(rgbColour[0], rgbColour[1], rgbColour[2]));
    }

    return Optional.empty();
  };

export { brightness, ColorPalette, getReadableColorFor,
         averageColor, OptionalColor, contrastRatio, readableText };
