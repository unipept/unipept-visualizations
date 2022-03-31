export default class TestDataGenerator {
    public generateSmall2DDataset(): number[][] {
        let data: number[][] = [];
        data.push([1, 1]);
        data.push([1, 1.2]);
        data.push([2.5, 0.75]);
        data.push([3, 2]);
        data.push([3, 2.5]);

        return data;
    }
}
