export default class TreeNode<T> {
    public readonly leftChild: TreeNode<T> | null;
    public readonly rightChild: TreeNode<T> | null;
    public readonly values: T[];
    public readonly height: number;

    // Keep track of which ID's are already assigned to TreeNode's.
    public static currentID = 0;
    // ID used for constructing graphs.
    public readonly id: string;

    constructor(leftChild: TreeNode<T> | null, rightChild: TreeNode<T> | null, values: T[], height: number) {
        this.leftChild = leftChild;
        this.rightChild = rightChild;
        this.values = values;
        this.height = height;
        this.id = TreeNode.currentID.toString();
        TreeNode.currentID++;
    }
}
