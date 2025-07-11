import { default as TreeNode } from '../cluster/TreeNode';

export interface Reorderer {
    /**
     * Reorders the given dendrogram with root according to a specific heuristic or algorithm.
     *
     * @param root The root node of the dendrogram that should be reordered.
     */
    reorder(root: TreeNode): TreeNode;
}
