/*
 * A priority qeueue that works with Nodes.
 * Based on https://github.com/gkz/es-collections
 */

/* eslint-disable require-jsdoc, no-param-reassign */

const comp = (a, b) => b.data.count - a.data.count;

function heapify(data) {
    for (let i = Math.floor((data.length - 2) / 2); i >= 0; i--) {
        sink(data, i);
    }
    return data;
}

function bubbleUp(data, index) {
    const value = data[index];

    while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        const parent = data[parentIndex];
        if (comp(value, parent) < 0) {
            data[index] = parent;
        } else {
            break;
        }
        index = parentIndex;
    }
    data[index] = value;
    return index;
}

function sink(data, index) {
    const value = data[index];
    const size = data.length;

    while (2 * index + 1 < size) {
        let targetIndex = 2 * index + 1;
        if (targetIndex < size - 1
            && comp(data[targetIndex + 1], data[targetIndex]) < 0) {
            targetIndex++;
        }
        if (comp(value, data[targetIndex]) <= 0) {
            break;
        }
        data[index] = data[targetIndex];
        index = targetIndex;
    }
    data[index] = value;
    return index;
}


export default class MaxCountHeap {
    constructor(iterable = []) {
        this._data = heapify(Array.from(iterable));
    }
    add(item) {
        this._data.push(item);
        bubbleUp(this._data, this.size - 1);
        return this;
    }
    peek() {
        return this._data[0];
    }
    remove() {
        const output = this._data[0];
        if (this.size > 1) {
            this._data[0] = this._data.pop();
            sink(this._data, 0);
        } else {
            this._data.pop();
        }
        return output;
    }
    clear() {
        this._data = [];
    }
    get size() {
        return this._data.length;
    }
}
