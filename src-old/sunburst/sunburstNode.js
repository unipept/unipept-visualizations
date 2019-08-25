import Node from "../shared/node";

export default class SunburstNode extends Node {
    static new(node = {}) {
        return new SunburstNode(node);
    }

    static createNode(node) {
        return Node.createNode(node, SunburstNode.new);
    }
}
