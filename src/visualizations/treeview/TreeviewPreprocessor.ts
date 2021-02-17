import TreeviewNode from "./TreeviewNode";
import { DataNodeLike } from "./../../DataNode";

export default class TreeviewPreprocessor {
    private static idCounter: number = 0;

    public preprocessData(data: DataNodeLike): TreeviewNode {
        const children: TreeviewNode[] = [];

        if (data.children) {
            for (const child of data.children) {
                children.push(this.preprocessData(child));
            }
        }

        return new TreeviewNode(
            data.id || ++TreeviewPreprocessor.idCounter,
            data.name || "",
            children,
            data.count,
            data.selfCount,
            data.extra
        );
    }
}
