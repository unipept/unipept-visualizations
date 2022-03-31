import TestDataGenerator from "./../../../../test/TestDataGenerator";
import PearsonCorrelationMetric from "./../PearsonCorrelationMetric";

describe("PearsonCorrelationMetric", () => {
    it("should produce lower triangular matrices", () => {
        const dataGenerator: TestDataGenerator = new TestDataGenerator();
        const data: number[][] = dataGenerator.generateSmall2DDataset();

        const pearsonMetric: PearsonCorrelationMetric = new PearsonCorrelationMetric();
        const distanceMatrix: number[][] = pearsonMetric.getDistance(data);

        for (let i: number = 0; i < distanceMatrix.length; i++) {
            expect(distanceMatrix[i].length).toBe(i + 1);
        }
    });

    it("should correctly calculate pearson correlation distances for small 2D dataset", () => {
        const dataGenerator: TestDataGenerator = new TestDataGenerator();
        const data: number[][] = dataGenerator.generateSmall2DDataset();

        const pearsonMetric: PearsonCorrelationMetric = new PearsonCorrelationMetric();
        const distanceMatrix: number[][] = pearsonMetric.getDistance(data);

        expect(distanceMatrix).toMatchSnapshot();
    });
});
