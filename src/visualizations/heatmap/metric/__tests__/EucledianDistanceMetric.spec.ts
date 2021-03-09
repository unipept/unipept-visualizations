import TestDataGenerator from "./../../../../test/TestDataGenerator";
import EuclidianDistanceMetric from "./../EuclidianDistanceMetric";

it('should produce lower triangular matrices', () => {
    let dataGenerator: TestDataGenerator = new TestDataGenerator();
    let data: number[][] = dataGenerator.generateSmall2DDataset();

    let euclideanMetric: EuclidianDistanceMetric = new EuclidianDistanceMetric();
    let distanceMatrix: number[][] = euclideanMetric.getDistance(data);

    for (let i: number = 0; i < distanceMatrix.length; i++) {
        expect(distanceMatrix[i].length).toBe(i + 1);
    }
});

it('should correctly calculate euclidean distances for small 2D dataset', () => {
    let dataGenerator: TestDataGenerator = new TestDataGenerator();
    let data: number[][] = dataGenerator.generateSmall2DDataset();

    let euclideanMetric: EuclidianDistanceMetric = new EuclidianDistanceMetric();
    let distanceMatrix: number[][] = euclideanMetric.getDistance(data);

    for (let i: number = 0; i < distanceMatrix.length; i++) {
        for (let j: number = 0; j <= i; j++) {
            expect(distanceMatrix[i][j]).toBe(Math.sqrt(Math.pow(data[i][0] - data[j][0], 2) + Math.pow(data[i][1] - data[j][1], 2)))
        }
    }
});
