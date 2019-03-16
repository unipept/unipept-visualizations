import UPGMAClusterer from "../src/cluster/UPGMAClusterer";
import EuclidianDistanceMetric from "../src/metric/euclidianDistanceMetric";
import ClusterElement from "../src/cluster/clusterElement";
import TestDataGenerator from "./testDataGenerator";
import TreeNode from "../src/cluster/treeNode";
import Utils from "./utils";

/**
 * The topology of the output dendrogram was created by hand, and needs to match the one calculated by the
 * UPGMAClusterer.
 */
let getExpectedSmallDendrogram = function() {
    // First create the leaf nodes
    let a: TreeNode = new TreeNode(null, null, [], 0);
    let b: TreeNode = new TreeNode(null, null, [], 0);
    let c: TreeNode = new TreeNode(null, null, [], 0);
    let d: TreeNode = new TreeNode(null, null, [], 0);
    let e: TreeNode = new TreeNode(null, null, [], 0);

    // Now connect all leafs as they were merged
    let ab: TreeNode = new TreeNode(b, a, [], 0.1);
    let ed: TreeNode = new TreeNode(e, d, [], 0.25);
    let cba: TreeNode = new TreeNode(c, ab, [], 0.77);
    let root: TreeNode = new TreeNode(ed, cba, [], 1.036);

    return root;
};

let getExpectedLargeDendrogram = function() {

};

it('should produce dendrograms with correct topology', () => {
    let dataGenerator = new TestDataGenerator();
    let originalData: number[][] = dataGenerator.getSmall2DDataSet();
    let data: ClusterElement[] = originalData.map((row: number[]) => new ClusterElement(row, "0"));
    let clusterer = new UPGMAClusterer(new EuclidianDistanceMetric());

    let actualDendroRoot: TreeNode = clusterer.cluster(data);
    let expectedDendroRoot: TreeNode = getExpectedSmallDendrogram();

    Utils.compareDendrograms(actualDendroRoot, expectedDendroRoot);
});

