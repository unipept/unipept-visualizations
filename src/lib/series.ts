import * as R from "ramda";

/**
 * 1 dimensional array with axis labels
 */
class Series<T> {
  public readonly data: { [k: string]: T } = {};
  public readonly index: string[];

  public static empty<U>(): Series<U> {
    return new Series<U>([]);
  }

  public static concat<U>(xs: Array<Series<U>>): Series<U> {
    const data = R.reduce(
      R.mergeWith(R.defaultTo),
      {},
      R.map(R.prop("data"), xs),
    );
    return new Series<U>(R.values(data), R.keys(data));
  }

  public constructor(data: readonly T[], index?: readonly string[]) {
    const realIndex: readonly string[] = R.defaultTo(
      R.map(R.toString, R.range(0, data.length)),
    )(index);

    this.data = R.zipObj(realIndex, data);
    this.index = R.slice(0, data.length, realIndex);
  }

  public asArray(): T[] {
    return this.index.map((i: string): T => this.data[i]);
  }

  public append(x: Series<T>): Series<T> {
    return new Series(
      this.asArray().concat(x.asArray()),
      this.index.concat(x.index));
  }

  public at(i: string): T {
    return this.data[i];
  }

  public format(): string {
    const width: number = Math.max(
      ...this.index.map((i: string): number => i.length),
    );

    return this.index
      .map(
        (i: string): string =>
        `${i.padEnd(width, " ")}\t${JSON.stringify(this.data[i])}`)
      .join("\n");
  }

  public iat(i: number): T {
    return this.data[this.index[i]];
  }

  public map<U>(f: (value: T) => U): Series<U> {
    return new Series(
      this.index.map((n: string) => f(this.data[n])),
      this.index,
    );
  }

  public max(lens: R.Lens): R.Ord {
    return R.reduce(
      R.max,
      R.view(lens, R.values(this.data)[0]),
      R.map((i: string): R.Ord => R.view(lens, this.data[i]), this.index));
  }

  public min(lens: R.Lens): R.Ord {
    return R.reduce(
      R.min,
      R.view(lens, R.values(this.data)[0]),
      R.map((i: string): R.Ord => R.view(lens, this.data[i]), this.index));
  }

  /**
   * Return the row label of the first occurence of the maximum value.
   * @param lens A lens focused on an orderable value within T.
   */
  public idxmax(lens: R.Lens): [string, T] {
    const reducer: (
      a: [string, T],
      b: [string, T],
    ) => [string, T] = R.maxBy((el: [string, T]) => R.view(lens, el[1]));
    const data = R.toPairs(this.data);
    return R.reduce(reducer, data[0], data);
  }

  /**
   * Return the row label of the first occurence of the minimum value.
   * @param lens A lens focused on an orderable value within T.
   */
  public idxmin(lens: R.Lens): [string, T] {
    const reducer: (
      a: [string, T],
      b: [string, T],
    ) => [string, T] = R.minBy((el: [string, T]) => R.view(lens, el[1]));
    const data = R.toPairs(this.data);
    return R.reduce(reducer, data[0], data);
  }

  /**
   * Return a copy of this Series with the given labels dropped
   * @param labels The labels to drop from this series
   * @return A new Series with `labels` dropped
   */
  public drop(labels: string | string[]): Series<T> {
    const newIndex = this.index.filter((idx: string) => {
      if (typeof labels === "string") {
        return idx !== labels;
      }

      return !labels.includes(idx);
    });

    return new Series(
      newIndex.map((idx: string): T => this.data[idx]),
      newIndex,
    );
  }

  /**
   * Returns the ordered list of (axis) labels for this series
   */
  public labels(): string[] {
    return this.index.slice();
  }

  /**
   * Modify a value and/or a label
   * @param label The label in this Series to modify
   * @param value A function that modifies the value at this label. The result of the function
   *              will be the new value at this label.
   * @param newlabel The replacement label
   * @returns a new Series with the specified modifications
   */
  public modify(
    label: string,
    value: (v: T) => T,
    newlabel?: string,
  ): Series<T> {
    const labels = this.labels().map((l: string) =>
      newlabel && l === label ? newlabel : l,
    );
    return new Series(
      this.index.map((idx: string) => {
        if (idx === label) {
          return value(this.data[idx]);
        }

        return this.data[idx];
      }),
      labels,
    );
  }

  public split(label: string): [Series<T>, Series<T>] {
    const idx = this.index.indexOf(label);
    if (idx === -1) {
      return [new Series<T>([]), new Series<T>([])];
    }

    const fst = this.index.slice(0, idx);
    const snd = this.index.slice(idx + 1, this.index.length);

    return [
      new Series(
        fst.map((l: string) => this.data[l]),
        fst,
      new Series(snd.map((l: string) => this.data[l]), snd)];
  }

  public shape(): number {
    return this.index.length;
  }

  public reorder(newIndex: string[]): Series<T> {
    const constrainedIndex: string[] = newIndex.filter(
      (i: string): boolean => this.index.indexOf(i) > -1,
    );

    return new Series(
      constrainedIndex.map((i: string): T => this.data[i]),
      constrainedIndex);
  }
}

export { Series };
