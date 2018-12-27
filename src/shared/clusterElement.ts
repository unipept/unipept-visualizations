export default class ClusterElement<T> {
    public readonly value: number;
    public readonly extra: T;

    constructor(value: number, extra: T) {
        this.value = value;
        this.extra = extra;
    }
}
