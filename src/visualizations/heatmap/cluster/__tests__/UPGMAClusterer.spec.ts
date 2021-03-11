import UPGMAClusterer from "./../UPGMAClusterer";
import EuclidianDistanceMetric from "./../../metric/EuclidianDistanceMetric";
import ClusterElement from "./../ClusterElement";
import TreeNode from "./../TreeNode";

describe("UPGMAClusterer", () => {
    it("should cluster the provided data as expected", () => {
        const upgmaClusterer = new UPGMAClusterer(new EuclidianDistanceMetric());

        const elements = [
            new ClusterElement([1.0, 2.0, 3.0, 4.0, 5.0], 1),
            new ClusterElement([1.1, 2.1, 3.1, 4.1, 5.1], 2),
            new ClusterElement([7, 8, 9, 10, 11], 3),
            new ClusterElement([3, 4, 5, 6, 7], 4),
            new ClusterElement([3.5, 4.5, 5.5, 6.5, 7.5], 5)
        ];

        // For the data provided above, we expect the following clustering to be performed:
        // 1 and 2 are closest together, so they should be clustered first
        // 4 and 5 are then the two closest items, so they form a second cluster
        // Then {4, 5} will be merged with {1, 2}
        // Finally {1, 2, 4, 5}  will be merged with 3

        const clusters = upgmaClusterer.cluster(elements);

        type PrintableNode = {
            leftChild: PrintableNode | null,
            rightChild: PrintableNode | null,
            id: number[],
        }

        // Helper function that extracts the children and id for each node. This will help in converting the nodes to
        // a printable format that's used for the Jest snapshot.
        function mapToIds(root: TreeNode): PrintableNode {
            const output: PrintableNode = {
                leftChild: null,
                rightChild: null,
                id: []
            };

            if (root.leftChild) {
                output.leftChild = mapToIds(root.leftChild);
            }

            if (root.rightChild) {
                output.rightChild = mapToIds(root.rightChild);
            }

            output.id = root.values.map(v => v.id);

            return output;
        }

        expect(mapToIds(clusters)).toMatchSnapshot();
    });
});
