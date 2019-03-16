import {HeatmapElement, HeatmapValue} from "../heatmap/typings";
import ClusterElement from "./clusterElement";

export default class TreeNode {
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

    /**
     * Convert this tree and all of it's children to the Newic-format.
     *
     * @param: idExtractor Function that extract's the name from a given node's id.
     */
    public toNewic(nameExtractor: (id: string) => string): string {
        let output: string = "";

        if (!this.leftChild && !this.rightChild) {
            return nameExtractor(this.values[0].id) + ":" + this.height;
        }

        output += '(';

        if (this.leftChild) {
            output += this.leftChild.toNewic(nameExtractor) + ',';
        }

        if (this.rightChild) {
            output += this.rightChild.toNewic(nameExtractor);
        }

        output += ')' + this.id + ':' + this.height;

        return output;
    }

    /**
     * Convert this tree and all of it's children to the dot GraphViz-format.
     */
    public toGraphViz(nameExtractor: (id: string) => string): string {
        let root: TreeNode | undefined = this;

        let output = 'digraph dendrogram {\n';
        let labels = '';
        let edges = '';

        let toCheck: TreeNode[] = [root];
        while (toCheck.length > 0) {
            root = toCheck.shift();

            if (!root) {
                break;
            }

            if (!root.leftChild && !root.rightChild) {
                labels += `    ${root.id} [label="${nameExtractor(root.values[0].id)}"];\n`;
            } else {
                labels += `    ${root.id} [label="${root.id}"];\n`;
            }



            if (root.leftChild) {
                edges += `    ${root.id} -> ${root.leftChild.id};\n`;
                toCheck.push(root.leftChild);
            }

            if (root.rightChild) {
                edges += `    ${root.id} -> ${root.rightChild.id};\n`;
                toCheck.push(root.rightChild);
            }
        }
        output += labels + edges + '}';
        return output;
    }
}
