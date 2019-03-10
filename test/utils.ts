import TreeNode from "../src/cluster/treeNode";

export default class Utils {
    /**
     * This function compares two dendrogram's topology. Corresponding nodes of both should have the same height and
     * all left/right children of a node should be equal between both trees.
     *
     * @param firstRoot Root of the first dendrogram
     * @param secondRoot Root of the second dendrogram
     */
     static compareDendrograms(firstRoot: TreeNode<number[]> | null, secondRoot: TreeNode<number[]> | null) {
        if (firstRoot) {
            expect(secondRoot != null).toBe(true);
        }

        if (firstRoot && secondRoot) {
            // An error margin of 1% is set for the height comparison, as these are floating point numbers
            expect(firstRoot.height * 0.99 <= secondRoot.height && secondRoot.height <= firstRoot.height * 1.01).toBe(true);

            if (firstRoot.leftChild) {
                this.compareDendrograms(firstRoot.leftChild, secondRoot.leftChild);
            } else {
                expect(secondRoot.leftChild == null).toBe(true);
            }

            if (firstRoot.rightChild) {
                this.compareDendrograms(firstRoot.rightChild, secondRoot.rightChild);
            } else {
                expect(secondRoot.rightChild == null).toBe(true);
            }
        }
    };
}
