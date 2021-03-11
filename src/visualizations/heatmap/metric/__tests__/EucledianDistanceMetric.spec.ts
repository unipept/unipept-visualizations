import TestDataGenerator from "./../../../../test/TestDataGenerator";
import EuclidianDistanceMetric from "./../EuclidianDistanceMetric";

describe("EuclidianDistanceMetric", () => {
    it('should produce lower triangular matrices', () => {
        const dataGenerator: TestDataGenerator = new TestDataGenerator();
        const data: number[][] = dataGenerator.generateSmall2DDataset();

        const euclideanMetric: EuclidianDistanceMetric = new EuclidianDistanceMetric();
        const distanceMatrix: number[][] = euclideanMetric.getDistance(data);

        for (let i: number = 0; i < distanceMatrix.length; i++) {
            expect(distanceMatrix[i].length).toBe(i + 1);
        }
    });

    it('should correctly calculate euclidean distances for small 2D dataset', () => {
        const dataGenerator: TestDataGenerator = new TestDataGenerator();
        const data: number[][] = dataGenerator.generateSmall2DDataset();

        const euclideanMetric: EuclidianDistanceMetric = new EuclidianDistanceMetric();
        const distanceMatrix: number[][] = euclideanMetric.getDistance(data);

        expect(distanceMatrix).toMatchSnapshot();
    });
});
