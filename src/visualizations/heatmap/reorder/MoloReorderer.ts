import { Reorderer } from "./Reorderer.js";
import TreeNode from "../cluster/TreeNode.js";

/**
 * This class uses the MOLO heuristics described in ftp://ftp.esat.kuleuven.be/sista/ida/reports/14-133.pdf to reorder
 * a given dendrogram.
 *
 * @author Pieter Verschaffelt
 */
export default class MoloReorderer implements Reorderer {
    // Map a node onto it's minimum distance between previous merges.
    private nodeMinMap: Map<TreeNode, number> = new Map();

    reorder(root: TreeNode): TreeNode {
        this.nodeMinMap.clear();
        return this.sortMinimum(root);
    }

    private sortMinimum(root: TreeNode): TreeNode {
        if (!root.leftChild || !root.rightChild) {
            return root;
        }

        const leftTree: TreeNode = root.leftChild;
        const rightTree: TreeNode = root.rightChild;

        const leftSingleton: boolean = !leftTree.leftChild && !leftTree.rightChild;
        const rightSingleton: boolean = !rightTree.leftChild && !rightTree.rightChild;

        if (leftSingleton && rightSingleton) {
            this.nodeMinMap.set(root, root.height);
        } else if (!leftSingleton && rightSingleton) {
            const sorted: TreeNode = this.sortMinimum(leftTree);
            root.leftChild = sorted;

            const sortedMin = this.nodeMinMap.get(sorted);

            if (sortedMin === undefined) {
                throw "The recursive call to sort the left subtree did not yield a minimum value.";
            }

            this.nodeMinMap.set(root, Math.min(root.height, sortedMin));
        } else if (leftSingleton && !rightSingleton) {
            const sorted: TreeNode = this.sortMinimum(rightTree);
            root.leftChild = sorted;
            root.rightChild = leftTree;

            const sortedMin = this.nodeMinMap.get(sorted);

            if (sortedMin === undefined) {
                throw "The recursive call to sort the right subtree did not yield a minimum value.";
            }

            this.nodeMinMap.set(root, Math.min(root.height, sortedMin));
        } else  {
            // Both trees are non-leaves
            const leftSorted: TreeNode = this.sortMinimum(leftTree);
            const rightSorted: TreeNode = this.sortMinimum(rightTree);

            const leftMin = this.nodeMinMap.get(leftSorted);
            const rightMin = this.nodeMinMap.get(rightSorted);

            if (leftMin === undefined || rightMin === undefined) {
                throw "One of the recursive calls to sort a subtree did not yield a minimum value.";
            }

            if (leftMin <= rightMin) {
                root.leftChild = leftSorted;
                root.rightChild = rightSorted;
            } else {
                root.leftChild = rightSorted;
                root.rightChild = leftSorted;
            }

            this.nodeMinMap.set(root, Math.min(root.height, leftMin, rightMin));
        }

        return root;
    }
}
