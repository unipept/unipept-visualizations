import Settings from "./../../Settings";
import DataNode from "./../../DataNode";
import ColorPalettes from "./../../color/ColorPalettes";

export default class SunburstSettings extends Settings {
    // Radius of the center sunburst node
    radius: number = 300;

    useFixedColors: boolean = false;

    colorPalette: string[] = ColorPalettes.DEFAULT_COLORS;

    // Color palette that should be used when the "use fixed colors" option is enabled
    fixedColorPalette: string[] = ColorPalettes.FIXED_COLORS;

    /**
     * Returns the value of the given data node that should be used to count the occurrences of this node.
     *
     * @param node
     */
    countAccessor: (node: DataNode) => number = (node: DataNode) => node.data.self_count;
}
