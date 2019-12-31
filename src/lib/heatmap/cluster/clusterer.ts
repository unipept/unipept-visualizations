import { Node } from "../../node";

export interface Clusterer {
    cluster(data: number[][]): Node;
}
