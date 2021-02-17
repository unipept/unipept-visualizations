import DataNode, { DataNodeLike } from "./../../DataNode";
import SunburstSettings from "./SunburstSettings";

export default class SunburstPreprocessor {
    /**
     * Preprocesses the given Node data structure.
     *
     * @param data A node-like structure that should be converted to proper DataNode-objects and that should be prepared
     * for use in the Sunburst visualization.
     * @param settings Settings that are applied to the Sunburst visualization.
     * @param count Count of the root node (which was passed as the first argument to this function).
     * @param idCount A counter that keeps track of which id's are already assigned to nodes. This counter is only used
     * to assign id's to nodes that don't already have an id.
     */
    public preprocessData(
        data: DataNodeLike,
        settings: SunburstSettings,
        count: number = settings.selfCountAccessor(data),
        idCount: number = 0
    ): DataNode {
        const children: DataNode[] = [];

        if (data.children) {
            for (const child of data.children) {
                const createdChild = this.preprocessData(child, settings, settings.selfCountAccessor(child), idCount++);
                children.push(createdChild);
            }
        }

        if (children.length > 0 && count !== 0 && count !== undefined) {
            children.push(new DataNode(-1, "empty", [],{}));
        }

        return new DataNode(data.id || idCount, data.name || "", children, data.data);
    }
}
