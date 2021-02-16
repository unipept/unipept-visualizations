export default class MaxCountHeap<T> {
    constructor(
        private readonly data: T[] = [],
        private comparator: (a: T, b: T) => number
    ) {
        this.heapify();
    }

    public add(item: T): void {
        this.data.push(item);
        this.bubbleUp(this.data.length - 1);
    }

    public peek(): T {
        return this.data[0];
    }

    public remove(): T {
        const output = this.data[0];

        if (this.data.length > 1) {
            this.data[0] = this.data.pop()!;
            this.sink(0);
        } else {
            this.data.pop();
        }

        return output;
    }

    public clear(): void {
        this.data.splice(0, this.data.length);
    }

    public size(): number {
        return this.data.length;
    }

    private heapify() {
        for (let i = Math.floor((this.data.length - 2) / 2); i >= 0; i--) {
            this.sink(i);
        }
    }

    private bubbleUp(index: number): number {
        const value = this.data[index];

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.data[parentIndex];

            if (this.comparator(value, parent) < 0) {
                this.data[index] = parent;
            } else {
                break;
            }

            index = parentIndex;
        }

        this.data[index] = value;
        return index;
    }

    private sink(index: number): number {
        const value = this.data[index];
        const size = this.data.length;

        while (2 * index + 1 < size) {
            let targetIndex = 2 * index + 1;
            if (targetIndex < size - 1 && this.comparator(this.data[targetIndex + 1], this.data[targetIndex]) < 0) {
                targetIndex++;
            }

            if (this.comparator(value, this.data[targetIndex]) <= 0) {
                break;
            }

            this.data[index] = this.data[targetIndex];
            index = targetIndex;
        }

        this.data[index] = value;
        return index;
    }
}
