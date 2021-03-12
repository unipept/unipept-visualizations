import { rgb } from "d3";

export default class ColorUtils {
    /*
     * Returns the readable text color based on the brightness of a given background color.
     */
    public static getReadableColorFor(color: string) {
        let textColor = "#000";
        try {
            textColor = ColorUtils.brightness(rgb(color)) < 125 ? "#eee" : "#000";
        } catch (err) { /* go on */ }
        return textColor;
    }

    /*
     * Returns the brightness of an rgb-color.
     * from: http:// www.w3.org/WAI/ER/WD-AERT/#color-contrast
     */
    public static brightness({ r, g, b }: {r: number, g: number, b: number}): number {
        return r * 0.299 + g * 0.587 + b * 0.114;
    }
}
