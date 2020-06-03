import * as R from "ramda";

/**
 * 1 dimensional array with axis labels
 */
class Series<T> {
  public readonly data: {[k: string]: T} = {};
  public readonly index: string[];

  public constructor(data: T[], index?: string[]) {
    let realIndex: string[];

    if (index === undefined) {
      realIndex = new Array(data.length);
      for (let i: number = 0; i < data.length; i += 1) {
        realIndex[i] = `${i}`;
      }
    } else {
      realIndex = index;
    }

    for (let i: number = 0; i < data.length; i += 1) {
      this.data[realIndex[i]] = data[i];
    }

    this.index = realIndex;
  }

  public asArray(): T[] {
    return this.index.map((i: string): T => this.data[i]);
  }

  public at(i: string): T {
    return this.data[i];
  }

  public format(): string {
    const width: number
      = Math.max(...this.index.map((i: string): number => i.length));

    return this.index
      .map((i: string): string =>
           `${i.padEnd(width, " ")}\t${JSON.stringify(this.data[i])}`)
      .join("\n");
  }

  public iat(i: number): T {
    return this.data[this.index[i]];
  }

  public map<U>(f: (value: T) => U): Series<U> {
    return new Series(this.index.map((n: string) => f(this.data[n])), this.index);
  }

  public max(lens: R.Lens): R.Ord {
    return R.reduce(R.max,
                    R.view(lens, R.values(this.data)[0]),
                    R.map((i: string): R.Ord => R.view(lens, this.data[i]), this.index));
  }

  public min(lens: R.Lens): R.Ord {
    return R.reduce(R.min,
                    R.view(lens, R.values(this.data)[0]),
                    R.map((i: string): R.Ord => R.view(lens, this.data[i]), this.index));
  }

  /**
   * Return the row label of the first occurence of the maximum value.
   * @param lens A lens focused on an orderable value within T.
   */
  public idxmax(lens: R.Lens): [string, T] {
    const reducer: (a: [string, T], b: [string, T]) => [string, T]
      = R.maxBy((el: [string, T]) => R.view(lens, el[1]));
    const data = R.toPairs(this.data);
    return R.reduce(reducer, data[0], data);
  }

  /**
   * Return the row label of the first occurence of the minimum value.
   * @param lens A lens focused on an orderable value within T.
   */
  public idxmin(lens: R.Lens): [string, T] {
    const reducer: (a: [string, T], b: [string, T]) => [string, T]
      = R.minBy((el: [string, T]) => R.view(lens, el[1]));
    const data = R.toPairs(this.data);
    return R.reduce(reducer, data[0], data);
  }

  public reorder(newIndex: string[]): Series<T> {
    const constrainedIndex: string[]
      = newIndex.filter((i: string): boolean => this.index.indexOf(i) > -1);

    return new Series(constrainedIndex.map((i: string): T => this.data[i]),
                      constrainedIndex);
  }
}

export { Series };
