import DataNode from "./../../DataNode";
import SunburstSettings from "./SunburstSettings";

export default class SunburstPreprocessor {
    /**
     * Preprocesses the given Node data structure.
     *
     * @param data
     */
    public preprocessData(data: DataNode, settings: SunburstSettings) {
        this.addEmptyChildren(data.children, settings.countAccessor(data), settings);
    }

    private addEmptyChildren(children: DataNode[], count: number, settings: SunburstSettings) {
        for (const child of children) {
            if (child.children !== undefined) {
                child.children = this.addEmptyChildren(child.children, settings.countAccessor(child), settings);
            }
        }

        if (children.length > 0 && count !== 0 && count !== undefined) {
            children.push(new DataNode(-1, "empty", [],{ count: count, self_count: count }));
        }

        return children;
    }
}
