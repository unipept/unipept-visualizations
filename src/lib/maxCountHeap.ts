/** 
 * A priority queue that works with Nodes.
 * Based on https://github.com/gkz/es-collections
 */
export class MaxCountHeap<E> {
  private data: E[];

  constructor(iterable: E[] = []) {
    this.data = MaxCountHeap.heapify(Array.from(iterable));
  }

  add(item: E): MaxCountHeap<E> {
    this.data.push(item);
    MaxCountHeap.bubbleUp(this.data, this.size - 1);
    return this;
  }

  peek(): E {
    return this.data[0];
  }

  remove(): E {
    const output = this.data[0];
    if (this.size > 1) {
      this.data[0] = this.data.pop() as E;
      MaxCountHeap.sink(this.data, 0);
    } else {
      this.data.pop();
    }
    return output;
  }

  clear(): void {
    this.data = [];
  }

  get size(): number {
    return this.data.length;
  }

  static heapify<E>(data: E[]): E[] {
    for (let i = Math.floor((data.length - 2) / 2); i >= 0; i--) {
      MaxCountHeap.sink(data, i);
    }
    return data;
  }

  static bubbleUp<E>(data: E[], index: number): number {
    let i = index;
    const value = data[i];

    while (i > 0) {
      const parentIndex = Math.floor((i - 1) / 2);
      const parent = data[parentIndex];
      if (MaxCountHeap.comp(value, parent) < 0) {
        data[i] = parent;
      } else {
        break;
      }
      i = parentIndex;
    }
    data[index] = value;
    return index;
  }

  static sink<E>(data: E[], index: number): number {
    const value = data[index];
    const size = data.length;
    let i = index;

    while (2 * i + 1 < size) {
      let targetIndex = 2 * i + 1;
      if (targetIndex < size - 1
        && MaxCountHeap.comp(data[targetIndex + 1], data[targetIndex]) < 0) {
        targetIndex++;
      }
      if (MaxCountHeap.comp(value, data[targetIndex]) <= 0) {
        break;
      }
      data[index] = data[targetIndex];
      i = targetIndex;
    }
    data[i] = value;
    return i;
  }

  static comp(a, b): number {
    return b.data.count - a.data.count;
  }
}
