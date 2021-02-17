import TreeviewNode from "./TreeviewNode";

export default class TreeviewPreprocessor {
    public preprocessData(data: TreeviewNode | any): TreeviewNode {
        // TODO FIX
        return new TreeviewNode(12, "x", [], 0, 0);
        // if (data instanceof TreeviewNode) {
        //     return data;
        // } else {
        //     const children: TreeviewNode[] = data.children.map((c: any) => this.preprocessData(c));
        //     return new TreeviewNode(data.id, data.name, children, data.data);
        // }
    }
}
