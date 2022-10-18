import Settings from "./../../Settings";
import ColorPalette from "./../../color/ColorPalette";

export default class StackedPercentageBarplotSettings extends Settings {
    /**
     * Default color palette that should be used for the node colors. Use one of the predefined palettes from the
     * ColorPalette-class if you don't feel inspired.
     */
    colorPalette: string[] = ColorPalette.DEFAULT_COLORS;

    /**
     * The maximum amount of items that are rendered on one bar. The top 4 of all items will be shown, together with a
     * 5th item that represents the remaining items (that have not been categorized in any of these categories yet).
     */
    maxItemsPerBar: number = 5;
}
