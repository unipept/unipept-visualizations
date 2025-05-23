import { default as DataNode, DataNodeLike } from './../../DataNode';

export default class SunburstPreprocessor {
    private static idCounter;
    /**
     * Preprocesses the given Node data structure.
     *
     * @param data A node-like structure that should be converted to proper DataNode-objects and that should be prepared
     * for use in the Sunburst visualization.
     */
    preprocessData(data: DataNodeLike): DataNode;
}
