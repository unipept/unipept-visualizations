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

  public max(lens: R.Lens): number {
    return Math.max(...this.index.map((i: string): number => R.view(lens, this.data[i])));
  }
}

export { Series };
