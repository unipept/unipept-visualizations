import { describe, it, expect } from "vitest";
import ColorUtils from "./../ColorUtils";
import ColorPalette from "./../ColorPalette";

describe("ColorUtils.brightness", () => {
    it("returns 0 for black and 255 for white", () => {
        expect(ColorUtils.brightness({ r: 0, g: 0, b: 0 })).toEqual(0);
        expect(ColorUtils.brightness({ r: 255, g: 255, b: 255 })).toEqual(255);
    });

    /**
     * The W3C formula (r * 0.299 + g * 0.587 + b * 0.114) weighs the channels
     * by how bright the eye perceives them, so a fully saturated channel on its
     * own is worth its coefficient times 255.
     */
    it("weighs a single channel by its W3C coefficient", () => {
        expect(ColorUtils.brightness({ r: 255, g: 0, b: 0 })).toBeCloseTo(76.245);
        expect(ColorUtils.brightness({ r: 0, g: 255, b: 0 })).toBeCloseTo(149.685);
        expect(ColorUtils.brightness({ r: 0, g: 0, b: 255 })).toBeCloseTo(29.07);
    });

    it("counts green as the brightest channel and blue as the darkest", () => {
        const red = ColorUtils.brightness({ r: 200, g: 0, b: 0 });
        const green = ColorUtils.brightness({ r: 0, g: 200, b: 0 });
        const blue = ColorUtils.brightness({ r: 0, g: 0, b: 200 });

        expect(green).toBeGreaterThan(red);
        expect(red).toBeGreaterThan(blue);
    });

    it("adds up the channels of a mixed color", () => {
        expect(ColorUtils.brightness({ r: 138, g: 110, b: 158 })).toBeCloseTo(123.844);
        expect(ColorUtils.brightness({ r: 46, g: 96, b: 147 })).toBeCloseTo(86.864);
    });

    it("returns the same value for every channel of a grey", () => {
        expect(ColorUtils.brightness({ r: 125, g: 125, b: 125 })).toBeCloseTo(125);
    });
});

describe("ColorUtils.getReadableColorFor", () => {
    it("returns light text on a dark background", () => {
        expect(ColorUtils.getReadableColorFor("#000000")).toEqual("#eee");
        expect(ColorUtils.getReadableColorFor("#2e6093")).toEqual("#eee");
        expect(ColorUtils.getReadableColorFor("rgb(0, 0, 0)")).toEqual("#eee");
        expect(ColorUtils.getReadableColorFor("navy")).toEqual("#eee");
    });

    it("returns dark text on a light background", () => {
        expect(ColorUtils.getReadableColorFor("#ffffff")).toEqual("#000");
        expect(ColorUtils.getReadableColorFor("#f9f0ab")).toEqual("#000");
        expect(ColorUtils.getReadableColorFor("rgb(255, 255, 255)")).toEqual("#000");
        expect(ColorUtils.getReadableColorFor("yellow")).toEqual("#000");
    });

    /**
     * The visualizations hand this function whatever notation their palette or
     * their colour scale produces: hex from the palettes, `rgb(...)` from d3
     * colour objects that were turned into a string.
     */
    it("gives the same answer for every notation of the same color", () => {
        const notations = ["#008000", "rgb(0, 128, 0)", "green", "hsl(120, 100%, 25.1%)"];

        for (const notation of notations) {
            expect(ColorUtils.getReadableColorFor(notation)).toEqual("#eee");
        }
    });

    it("accepts the three digit form of a hex color", () => {
        expect(ColorUtils.getReadableColorFor("#fff")).toEqual(ColorUtils.getReadableColorFor("#ffffff"));
        expect(ColorUtils.getReadableColorFor("#000")).toEqual(ColorUtils.getReadableColorFor("#000000"));
    });

    it("switches from light to dark text at a brightness of 125", () => {
        // The grey whose brightness is exactly 125 is on the dark text side,
        // because the comparison is a strict "less than".
        expect(ColorUtils.getReadableColorFor("rgb(125, 125, 125)")).toEqual("#000");
        expect(ColorUtils.getReadableColorFor("rgb(124, 124, 124)")).toEqual("#eee");
    });

    /**
     * d3 does not throw on a colour it cannot parse, so this is the fallback of
     * the brightness comparison rather than error handling. Pinned because the
     * palettes are configurable, which means anything a caller puts in a
     * settings object ends up here.
     */
    it("falls back to dark text for input that is not a color", () => {
        expect(ColorUtils.getReadableColorFor("not-a-colour")).toEqual("#000");
        expect(ColorUtils.getReadableColorFor("")).toEqual("#000");
        expect(ColorUtils.getReadableColorFor(undefined as unknown as string)).toEqual("#000");
        expect(ColorUtils.getReadableColorFor(null as unknown as string)).toEqual("#000");
    });

    it("returns one of its two text colors for every color of every palette", () => {
        const palettes = [
            ColorPalette.DEFAULT_COLORS,
            ColorPalette.FIXED_COLORS,
            ColorPalette.MATERIAL_DESIGN_COLORS
        ];

        for (const palette of palettes) {
            for (const color of palette) {
                expect(["#000", "#eee"]).toContain(ColorUtils.getReadableColorFor(color));
            }
        }
    });
});
