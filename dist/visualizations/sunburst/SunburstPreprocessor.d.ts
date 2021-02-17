import DataNode, { DataNodeLike } from "./../../DataNode";
import SunburstSettings from "./SunburstSettings";
export default class SunburstPreprocessor {
    /**
     * Preprocesses the given Node data structure.
     *
     * @param data A node-like structure that should be converted to proper DataNode-objects and that should be prepared
     * for use in the Sunburst visualization.
     * @param settings Settings that are applied to the Sunburst visualization.
     * @param idCount A counter that keeps track of which id's are already assigned to nodes. This counter is only used
     * to assign id's to nodes that don't already have an id.
     */
    preprocessData(data: DataNodeLike, settings: SunburstSettings, idCount?: number): DataNode;
}
