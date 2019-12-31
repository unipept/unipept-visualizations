import {HeatmapElement, HeatmapValue} from "../heatmap/input";
import { ClusterElement } from "./clusterElement";

export class TreeNode {
    private _leftChild: TreeNode | null;
    private _rightChild: TreeNode | null;
    public readonly values: ClusterElement[];
    public readonly height: number;

    // Keep track of which ID's are already assigned to TreeNode's.
    public static currentID = 0;
    // ID used for constructing graphs.
    public readonly id: string;

    constructor(leftChild: TreeNode | null, rightChild: TreeNode | null, values: ClusterElement[], height: number) {
        this._leftChild = leftChild;
        this._rightChild = rightChild;
        this.values = values;
        this.height = height;
        this.id = TreeNode.currentID.toString();
        TreeNode.currentID++;
    }


    get leftChild(): TreeNode | null {
        return this._leftChild;
    }

    set leftChild(value: TreeNode | null) {
        this._leftChild = value;
    }

    get rightChild(): TreeNode | null {
        return this._rightChild;
    }

    set rightChild(value: TreeNode | null) {
        this._rightChild = value;
    }
}
