import DistanceMetric from "./distanceMetric";

export default class EuclidianDistanceMetric implements DistanceMetric {
    getDistance(value1: number[], value2: number[]): number {
        if (value1.length != value2.length) {
            throw "Euclidian distance can only be calculated for 2 equally sized input arrays!";
        }

        let powers = 0;
        for (let i = 0; i < value1.length; i++) {
            powers += Math.pow(value2[i] - value1[i], 2);
        }

        return Math.sqrt(powers);
    }
}
