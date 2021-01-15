import Settings from "./../../Settings";
import DataNode from "./../../DataNode";
export default class SunburstSettings extends Settings {
    radius: number;
    useFixedColors: boolean;
    colorPalette: string[];
    fixedColorPalette: string[];
    /**
     * Returns the value of the given data node that should be used to count the occurrences of this node.
     *
     * @param node
     */
    countAccessor: (node: DataNode) => number;
}
