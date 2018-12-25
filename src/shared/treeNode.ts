export default class TreeNode {
    public readonly leftChild: TreeNode | null;
    public readonly rightChild: TreeNode | null;

    constructor(leftChild: TreeNode | null, rightChild: TreeNode | null) {
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}
