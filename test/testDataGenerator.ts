import ClusterElement from "../src/shared/clusterElement";
import * as d3 from "d3";

export default class TestDataGenerator {
    public getSmall2DDataSet(): number[][] {
        let data: number[][] = [];
        data.push([1, 1]);
        data.push([1, 1.2]);
        data.push([2.5, 0.75]);
        data.push([3, 2]);
        data.push([3, 2.5]);

        return data;
    }

    // public getLargeMultiDimensionalDataSet(): number[][] {
    //
    // }
}
