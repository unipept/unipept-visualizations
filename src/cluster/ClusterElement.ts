export default class ClusterElement {
    public readonly values: number[];
    public readonly id: number;

    constructor(values: number[], id: number) {
        this.values = values;
        this.id = id;
    }
}
