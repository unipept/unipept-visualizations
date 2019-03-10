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
    let a: TreeNode<number[]> = new TreeNode<number[]>(null, null, [], 0);
    let b: TreeNode<number[]> = new TreeNode<number[]>(null, null, [], 0);
    let c: TreeNode<number[]> = new TreeNode<number[]>(null, null, [], 0);
    let d: TreeNode<number[]> = new TreeNode<number[]>(null, null, [], 0);
    let e: TreeNode<number[]> = new TreeNode<number[]>(null, null, [], 0);

    let ab: TreeNode<number[]> = new TreeNode<number[]>(a, b, [], 0.1);
    let de: TreeNode<number[]> = new TreeNode<number[]>(d, e, [], 0.25);
    let abc: TreeNode<number[]> = new TreeNode<number[]>(ab, c, [], 0.77);
    let root: TreeNode<number[]> = new TreeNode<number[]>(abc, de, [], 1.036);

    return root;
};

it('should correctly reorder dendrograms', () => {
    let dataGenerator = new TestDataGenerator();
    let originalData: number[][] = dataGenerator.getSmall2DDataSet();
    let data: ClusterElement<number>[][] = originalData.map((row: number[]) => row.map((el: number) => new ClusterElement<number>(el, 0)));
    let clusterer = new UPGMAClusterer<number>(new EuclidianDistanceMetric());

    let actualDendroRoot: TreeNode<number[]> = clusterer.cluster(data, "rows");
    let molo: Reorderer<number[]> = new MoloReorderer();
    let reorderedDendroRoot = molo.reorder(actualDendroRoot);
    let expectedDendroRoot = getExpectedSmallDendrogram();

    Utils.compareDendrograms(reorderedDendroRoot, expectedDendroRoot);
});
