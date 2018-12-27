export default class TreeNode<T> {
    public readonly leftChild: TreeNode<T> | null;
    public readonly rightChild: TreeNode<T> | null;
    public readonly values: T[];

    constructor(leftChild: TreeNode<T> | null, rightChild: TreeNode<T> | null, values: T[]) {
        this.leftChild = leftChild;
        this.rightChild = rightChild;
        this.values = values;
    }
}
