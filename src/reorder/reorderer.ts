import TreeNode from "../cluster/treeNode";

export default interface Reorderer<T> {
    /**
     * Reorders the given dendrogram with root according to a specific heuristic or algorithm.
     *
     * @param root The root node of the dendrogram that should be reordered.
     */
    reorder(root: TreeNode<T>): TreeNode<T>;
}
