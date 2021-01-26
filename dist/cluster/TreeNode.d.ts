import ClusterElement from "./ClusterElement";
export default class TreeNode {
    private _leftChild;
    private _rightChild;
    readonly values: ClusterElement[];
    readonly height: number;
    static currentID: number;
    readonly id: number;
    constructor(leftChild: TreeNode | null, rightChild: TreeNode | null, values: ClusterElement[], height: number);
    get leftChild(): TreeNode | null;
    set leftChild(value: TreeNode | null);
    get rightChild(): TreeNode | null;
    set rightChild(value: TreeNode | null);
    /**
     * Convert this tree and all of it's children to the Newic-format.
     *
     * @param: idExtractor Function that extract's the name from a given node's id.
     */
    toNewick(nameExtractor: (id: number) => string): string;
    /**
     * Convert this tree and all of it's children to the dot GraphViz-format.
     */
    toGraphViz(nameExtractor: (id: number) => string): string;
}
