export default class MaxCountHeap<T> {
    private readonly data;
    private comparator;
    constructor(data: T[], comparator: (a: T, b: T) => number);
    add(item: T): void;
    peek(): T;
    remove(): T;
    clear(): void;
    size(): number;
    private heapify;
    private bubbleUp;
    private sink;
}
