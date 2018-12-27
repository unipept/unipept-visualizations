import DistanceMetric from "./distanceMetric";
import ClusterElement from "./clusterElement";

export default class EuclidianDistanceMetric<T> implements DistanceMetric<T> {
    getDistance(value1: ClusterElement<T>[], value2: ClusterElement<T>[]): number {
        if (value1.length != value2.length) {
            throw "Euclidian distance can only be calculated for 2 equally sized input arrays!";
        }

        let powers = 0;
        for (let i = 0; i < value1.length; i++) {
            powers += Math.pow(value2[i].value - value1[i].value, 2);
        }

        return Math.sqrt(powers);
    }
}
