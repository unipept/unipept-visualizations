import UPGMAClusterer from "../src/shared/UPGMAClusterer";
import EuclidianDistanceMetric from "../src/shared/euclidianDistanceMetric";
import ClusterElement from "../src/shared/clusterElement";
import TestDataGenerator from "./testDataGenerator";
import TreeNode from "../src/shared/treeNode";
import {HeatmapElement, HeatmapValue} from "../src/heatmap/typings";

/**
 * The topology of the output dendrogram was created by hand, and needs to match the one calculated by the
 * UPGMAClusterer.
 */
let getExpectedSmallDendrogram = function() {
    // First make leaf nodes
    let a: TreeNode<number[]> = new TreeNode<number[]>(null, null, [], 0);
    let b: TreeNode<number[]> = new TreeNode<number[]>(null, null, [], 0);
    let c: TreeNode<number[]> = new TreeNode<number[]>(null, null, [], 0);
    let d: TreeNode<number[]> = new TreeNode<number[]>(null, null, [], 0);
    let e: TreeNode<number[]> = new TreeNode<number[]>(null, null, [], 0);

    // Now connect all leafs as they were merged
    let ab: TreeNode<number[]> = new TreeNode<number[]>(b, a, [], 0.1);
    let ed: TreeNode<number[]> = new TreeNode<number[]>(e, d, [], 0.25);
    let cba: TreeNode<number[]> = new TreeNode<number[]>(c, ab, [], 0.77);
    let root: TreeNode<number[]> = new TreeNode<number[]>(ed, cba, [], 1.036);

    return root;
};

/**
 * This function compares two dendrogram's topology. Corresponding nodes of both
 *
 * @param firstRoot Root of the first dendrogram
 * @param secondRoot Root of the second dendrogram
 */
let compareDendrograms = function(firstRoot: TreeNode<number[]> | null, secondRoot: TreeNode<number[]> | null) {
    if (firstRoot) {
        expect(secondRoot != null).toBe(true);
    }

    if (firstRoot && secondRoot) {
        // An error margin of 1% is set for the height comparison, as these are floating point numbers
        expect(firstRoot.height * 0.99 <= secondRoot.height && secondRoot.height <= firstRoot.height * 1.01).toBe(true);

        if (firstRoot.leftChild) {
            compareDendrograms(firstRoot.leftChild, secondRoot.leftChild);
        }

        if (firstRoot.rightChild) {
            compareDendrograms(firstRoot.rightChild, secondRoot.rightChild);
        }
    }
};

it('should produce dendrograms with correct topology', () => {
    let dataGenerator = new TestDataGenerator();
    let originalData: number[][] = dataGenerator.getSmall2DDataSet();
    let data: ClusterElement<number>[][] = originalData.map((row: number[]) => row.map((el: number) => new ClusterElement<number>(el, 0)));
    let clusterer = new UPGMAClusterer<number>(new EuclidianDistanceMetric());

    let actualDendroRoot: TreeNode<number[]> = clusterer.cluster(data, "rows");
    let expectedDendroRoot: TreeNode<number[]> = getExpectedSmallDendrogram();

    compareDendrograms(actualDendroRoot, expectedDendroRoot);
});

