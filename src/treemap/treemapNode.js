import Node from "../shared/node";

export default class TreemapNode extends Node {
    static new(node = {}) {
        return new TreemapNode(node);
    }

    static createNode(node) {
        return Node.createNode(node, TreemapNode.new);
    }
}
