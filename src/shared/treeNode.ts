export default class TreeNode<T> {
    public readonly leftChild: TreeNode<T> | null;
    public readonly rightChild: TreeNode<T> | null;
    public readonly values: T[];
    // ID used for constructing graphs (this is not guaranteed to be 100% unique)
    public readonly id: string;

    constructor(leftChild: TreeNode<T> | null, rightChild: TreeNode<T> | null, values: T[]) {
        this.leftChild = leftChild;
        this.rightChild = rightChild;
        this.values = values;
        this.id = Math.floor((Math.random() * 65536)).toString();
    }
}
