import TreeviewNode from "./TreeviewNode";

export default class TreeviewPreprocessor {
    public preprocessData(data: TreeviewNode | any): TreeviewNode {
        if (data instanceof TreeviewNode) {
            return data;
        } else {
            const children: TreeviewNode[] = data.children.map((c: any) => this.preprocessData(c));
            return new TreeviewNode(data.id, data.name, children, data.data);
        }
    }
}
