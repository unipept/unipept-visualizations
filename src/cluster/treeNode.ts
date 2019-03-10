export default class TreeNode<T> {
    private _leftChild: TreeNode<T> | null;
    private _rightChild: TreeNode<T> | null;
    public readonly values: T[];
    public readonly height: number;

    // Keep track of which ID's are already assigned to TreeNode's.
    public static currentID = 0;
    // ID used for constructing graphs.
    public readonly id: string;

    constructor(leftChild: TreeNode<T> | null, rightChild: TreeNode<T> | null, values: T[], height: number) {
        this._leftChild = leftChild;
        this._rightChild = rightChild;
        this.values = values;
        this.height = height;
        this.id = TreeNode.currentID.toString();
        TreeNode.currentID++;
    }


    get leftChild(): TreeNode<T> | null {
        return this._leftChild;
    }

    set leftChild(value: TreeNode<T> | null) {
        this._leftChild = value;
    }

    get rightChild(): TreeNode<T> | null {
        return this._rightChild;
    }

    set rightChild(value: TreeNode<T> | null) {
        this._rightChild = value;
    }
}
