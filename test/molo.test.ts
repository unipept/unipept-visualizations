import TestDataGenerator from "./testDataGenerator";
import ClusterElement from "../src/cluster/clusterElement";
import UPGMAClusterer from "../src/cluster/UPGMAClusterer";
import EuclidianDistanceMetric from "../src/metric/euclidianDistanceMetric";
import TreeNode from "../src/cluster/treeNode";
import Reorderer from "../src/reorder/reorderer";
import MoloReorderer from "../src/reorder/moloReorderer";
import Utils from "./utils";

let getExpectedSmallDendrogram = function() {
    // First create the leaf nodes
    let a: TreeNode = new TreeNode(null, null, [], 0);
    let b: TreeNode = new TreeNode(null, null, [], 0);
    let c: TreeNode = new TreeNode(null, null, [], 0);
    let d: TreeNode = new TreeNode(null, null, [], 0);
    let e: TreeNode = new TreeNode(null, null, [], 0);

    let ab: TreeNode = new TreeNode(a, b, [], 0.1);
    let de: TreeNode = new TreeNode(d, e, [], 0.25);
    let abc: TreeNode = new TreeNode(ab, c, [], 0.77);
    let root: TreeNode = new TreeNode(abc, de, [], 1.036);

    return root;
};

it('should correctly reorder dendrograms', () => {
    let dataGenerator = new TestDataGenerator();
    let originalData: number[][] = dataGenerator.getSmall2DDataSet();
    let data: ClusterElement[] = originalData.map((row: number[]) => new ClusterElement(row, "0"));
    let clusterer = new UPGMAClusterer(new EuclidianDistanceMetric());

    let actualDendroRoot: TreeNode = clusterer.cluster(data);
    let molo: Reorderer = new MoloReorderer();
    let reorderedDendroRoot = molo.reorder(actualDendroRoot);
    let expectedDendroRoot = getExpectedSmallDendrogram();

    Utils.compareDendrograms(reorderedDendroRoot, expectedDendroRoot);
});
