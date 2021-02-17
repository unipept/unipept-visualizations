import DataNode, { DataNodeLike } from "./../../DataNode";

export default class SunburstPreprocessor {
    private static idCounter: number = 0;

    /**
     * Preprocesses the given Node data structure.
     *
     * @param data A node-like structure that should be converted to proper DataNode-objects and that should be prepared
     * for use in the Sunburst visualization.
     */
    public preprocessData(
        data: DataNodeLike
    ): DataNode {
        const children: DataNode[] = [];

        if (data.children) {
            for (const child of data.children) {
                children.push(this.preprocessData(child));
            }
        }

        if (children.length > 0 && data.count !== 0) {
            children.push(new DataNode(-1, "empty", [], data.count, data.selfCount));
        }

        return new DataNode(
            data.id || ++SunburstPreprocessor.idCounter,
            data.name || "",
            children,
            data.count,
            data.selfCount,
            data.extra
        );
    }
}
