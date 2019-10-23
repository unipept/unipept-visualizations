export default class ClusterElement {
    public readonly values: number[];
    public readonly id: string;

    constructor(values: number[], id: string) {
        this.values = values;
        this.id = id;
    }
}
