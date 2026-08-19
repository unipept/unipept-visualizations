import { describe, it, expect } from "vitest";
import { rgb } from "d3";
import ColorPalette from "./../ColorPalette";

const palettes: [string, string[]][] = [
    ["DEFAULT_COLORS", ColorPalette.DEFAULT_COLORS],
    ["FIXED_COLORS", ColorPalette.FIXED_COLORS],
    ["MATERIAL_DESIGN_COLORS", ColorPalette.MATERIAL_DESIGN_COLORS]
];

describe.each(palettes)("ColorPalette.%s", (_name: string, palette: string[]) => {
    it("is not empty", () => {
        expect(palette.length).toBeGreaterThan(0);
    });

    /**
     * The visualizations pass these strings straight to d3 and to the DOM. d3
     * returns NaN channels instead of throwing for a string it cannot read, so
     * an unparsable colour would silently render as black.
     */
    it("only contains colors that d3 can parse", () => {
        for (const color of palette) {
            const parsed = rgb(color);
            expect(
                [parsed.r, parsed.g, parsed.b].every((channel: number) => !Number.isNaN(channel)),
                `${color} is not a color d3 can parse`
            ).toBeTruthy();
        }
    });

    /**
     * The palettes are walked in order, one colour per node, so a duplicate
     * would give two unrelated nodes the same colour before the palette is
     * exhausted.
     */
    it("does not contain the same color twice", () => {
        expect(new Set(palette).size).toEqual(palette.length);
    });
});

describe("ColorPalette", () => {
    it("keeps its palettes separate", () => {
        expect(ColorPalette.DEFAULT_COLORS).not.toEqual(ColorPalette.FIXED_COLORS);
        expect(ColorPalette.DEFAULT_COLORS).not.toEqual(ColorPalette.MATERIAL_DESIGN_COLORS);
        expect(ColorPalette.FIXED_COLORS).not.toEqual(ColorPalette.MATERIAL_DESIGN_COLORS);
    });
});
