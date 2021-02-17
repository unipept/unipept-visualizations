import DataNode, { DataNodeLike } from "./../../DataNode";

export default class TreemapPreprocessor {
    private static idCounter: number = 0;

    public preprocessData(node: DataNodeLike): DataNode {
        const children: DataNode[] = [];

        if (node.children) {
            for (const child of node.children) {
                children.push(this.preprocessData(child));
            }
        }

        return new DataNode(
            node.id || ++TreemapPreprocessor.idCounter,
            node.name || "",
            children,
            node.count,
            node.selfCount,
            node.extra
        );
    }
}
