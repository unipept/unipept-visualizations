/**
 * Defines utility functions for manipulating the input data
 * Also defines a rudimentary "Data Frame"
 */

import { HierarchyNode, HierarchyRectangularNode, DSVRowArray, DSVRowString } from "d3";
import * as R from "ramda";

import { Node } from "./node";
import { Optional } from "./optional";
import { Series } from "./series";

/**
 * Sum the "size" of this node and all of its children
 */
const count: (datum: Node, counter: (d: Node) => number) => number
  = (datum: Node, counter: (d: Node) => number): number => {
    if (datum.children !== undefined) {
      return datum.children.map((v: Node): number => count(v, counter))
        .reduce(((a: number, b: number): number => a + b), 0);
    }

    return counter(datum);
  };

/**
 * Compute a ratio of sizes between two nodes
 *  as count(numerator) / count(denominator).
 */
const countRatio: (numerator: Node, denominator: Node, counter: R.Lens) => number
  = (numerator: Node, denominator: Node, counter: R.Lens): number =>
    count(numerator, counter) / count(denominator, counter);

/**
 * Find the largest radial size within a hierarchy
 * @param datum The top of the hierarchy to search.
 */
const maxRadius: (datum: HierarchyRectangularNode<Node>) => number
  = (datum: HierarchyRectangularNode<Node>): number =>
    datum.children !== undefined
      ? Math.max(...datum.children.map(maxRadius))
      : datum.y0 + (datum.y1 - datum.y0);

/**
 * Compute the outer limit of the radial domain based on the levels
 *  of the hierarchy to display.
 */
const outerRadialDomain: (datum: HierarchyRectangularNode<Node>, levels: number) => number
  = (datum: HierarchyRectangularNode<Node>, levels: number): number =>
    Math.min(maxRadius(datum),
      datum.y0 + levels * (datum.y1 - datum.y0));

/**
 * Calculates if check is an ancestor of child.
 * If so, how many levels between them.
 */
const ancestorOf: (check: HierarchyNode<Node>,
  child: HierarchyNode<Node>) => Optional<number>
  = (check: HierarchyNode<Node>,
    child: HierarchyNode<Node>): Optional<number> => {
    if (check.depth === child.depth) {
      if (check === child) { // tslint:disable-line
        return Optional.of(0);
      }

      return Optional.empty();
    }

    if ((child.depth > check.depth)
      && check.children !== undefined
      && child.parent !== null) {
      return ancestorOf(check, child.parent)
        .map((d: number) => d + 1);
    }

    return Optional.empty();
  };


/**
 * A rudimentary DataFrame (a la R and Python Pandas)
 * This dataframe is column major-order. It is meant to
 * be used internally by Unipept Visualisations, implementation
 * details such as access through Ramda Lenses should not
 * be revealed to the user.
 *
 * A dataframe is a mapping of column names to [[Series]].
 * DataFrame<number> =>
 * { "column A": Series<number>,
 *   "column B": Series<number>
 * }
 * The `index` is an ordered list of the column labels.
 * Each column (Series) need not be the same size, but
 * shared series (row) labels will form a row.
 */
class DataFrame<T> {
  public readonly data: { [k: string]: Series<T> } = {};
  public readonly index: string[];

  /**
   * Build a dataframe from a list of series
   *
   * @param data The data to be contained in the frame
   * @param index (optional) column index
   */
  public constructor(data: Array<Series<T>>, index?: string[]) {
    const realIndex: string[] = index ? index : data.map((_, i) => `${i}`);

    this.data = R.fromPairs(R.zip(realIndex, data));
    this.index = realIndex;
  }

  /**
   * Access a value in the dataframe by row and column label
   *
   * @param row The label of the row to access
   * @param column The label of the column to access
   * @return The value being accessed
   */
  public at(row: string, column: string): T {
    return this.data[column].at(row);
  }

  /**
   * Slice the Dataframe by a single column
   *
   * @param label The column label to slice
   * @return the colunm data
   */
  public column(label: string): Series<T> {
    if (this.index.includes(label)) {
      return this.data[label];
    }

    const size = Math.max(0, ...this.index.map((label: string) => this.data[label].shape()));

    return new Series(new Array(size), this.rows());
  }

  /**
   * Return all column labels
   */
  public columns(): string[] {
    return this.index;
  }

  /**
   * Access a value in the dataframe by row and column index
   *
   * @param row The index of the row to access
   * @param column The index of the column to access
   * @return The value being accessed
   */
  public iat(row: number, column: number): T {
    return this.data[this.index[column]].iat(row);
  }

  /**
   * Slice the Dataframe by a single row
   *
   * @param label The row label to slice
   * @return the row data
   */
  public row(label: string): Series<T> {
    return new Series(this.index.map((i: string) => this.data[i].at(label)), this.columns());
  }

  /**
   * Return all row labels
   */
  public rows(): string[] {
    const distinct: (value: string, index: number, self: string[]) => boolean
      = (value: string, index: number, self: string[]): boolean =>
        self.indexOf(value) === index;

    const allColumns: string[] =
      this.index.reduce((acc: string[], i: string) =>
                        acc.concat(this.data[i].index),
                        []);

    return allColumns.filter(distinct);
  }

  /**
   * Format this dataframe into a string for display
   */
  public format(): string {
    const toFormat: DataFrame<string> = this.map((v: T): string => JSON.stringify(v));
    const rowNames: string[] = this.rows();
    const colWidth: number[] = this.index
      .map((col: string): number =>
        Math.max(...[col.length]
                 .concat(toFormat.data[col].asArray()
                         .concat(["undefined"])
                         .map((v: string) => v.length))));
    const rowWidth: number
      = Math.max(...rowNames.map((i: string): number => i.length + 1));

    const rowName: (name: string) => string
      = (name: string): string => `${name.padEnd(rowWidth, " ")} `;

    const colHeadings: string[] =
      this.index.map((col: string, i: number) => col.padStart(colWidth[i], " "));
    const header: string
      = `${"".padEnd(rowWidth, " ")} ${colHeadings.join(" ")}`;

    const table: string = rowNames
      .map((row: string): string =>
        rowName(row) + this.index
          .map((col: string, i: number): string =>
               (toFormat.data[col].data[row] || "undefined").padStart(colWidth[i], " "))
          .join(" "))
      .join("\n");

    return `${header}\n${table}`;
  }

  /**
   * Map a function over all values in this dataframe and return the resulting dataframe
   *
   * @param f The function to map
   * @return A new Dataframe containing mapped values
   */
  public map<U>(f: (value: T) => U): DataFrame<U> {
    return new DataFrame(this.index.map((col: string): Series<U> => this.data[col].map(f)),
                         this.index);
  }

  /**
   * Find the maximum value in the dataframe
   *
   * @param lens A Ramda Lens focused on the value for which to compute the max
   * @return The maximum value.
   */
  public max(lens: R.Lens): R.Ord {
    const maxSeries = R.map((col: string): R.Ord => this.data[col].max(lens), this.index);
    return R.reduce(R.max, maxSeries[0], maxSeries);
  }

  /**
   * Find the minimum value in the dataframe
   *
   * @param lens A Ramda Lens focused on the value for which to compute the min
   * @return The minimum value.
   */
  public min(lens: R.Lens): R.Ord {
    const minSeries = R.map((col: string): R.Ord => this.data[col].min(lens), this.index);
    return R.reduce(R.min, minSeries[0], minSeries);
  }

  /**
   * Get the index of the first occurrence of the maximum value for each column
   * @param lens A lens focused on the value to maximise within each element
   * @return [column label, row label, value]
   */
  public idxmax(lens: R.Lens): [string, string, T] {
    const valueLens = R.compose(R.lensIndex(2), lens) as R.Lens;
    const reducer = R.maxBy(R.view(valueLens) as (a: [string, string, T]) => R.Ord);
    const data: Array<[string, string, T]> =
      R.map((col: string) => R.prepend(col, this.data[col].idxmax(lens)) as [string, string, T],
            this.index);
    return R.reduce(reducer , data[0], data) as [string, string, T];
  }

  /**
   * Get the index of the first occurrence of the minimum value for each column
   * @param lens A lens focused on the value to minimise within each element
   * @return [column label, row label, value]
   */
  public idxmin(lens: R.Lens): [string, string, T] {
    const valueLens = R.compose(R.lensIndex(2), lens) as R.Lens;
    const reducer = R.minBy(R.view(valueLens) as (a: [string, string, T]) => R.Ord);
    const data: Array<[string, string, T]> =
      R.map((col: string) => R.prepend(col, this.data[col].idxmin(lens)) as [string, string, T],
            this.index);
    return R.reduce(reducer, data[0], data) as [string, string, T];
  }

  /**
   * Normalise all values in the dataframe such that the max() === 1
   *
   * @param lens A Ramda Lens focused on the value to normalise
   * @return A normalised copy of this dataframe
   */
  public normalise(lens: R.Lens): DataFrame<T> {
    const max: R.Ord = this.max(lens);

    if (typeof max === "number") {
      return this.map((node: T): T => R.over(lens, (val: number): number => val / max, node));
    } else {
      return this;
    }
  }

  /**
   * Reorder the columns of this dataframe
   *
   * @param newIndex Arrange the existing columns to conform to this as the new column labels
   * @return A copy of this dataframe with `newIndex` as the new order of column labels
   */
  public reorderColumns(newIndex: string[]): DataFrame<T> {
    const constrainedIndex: string[]
      = newIndex.filter((i: string): boolean => this.index.indexOf(i) > -1);

    return new DataFrame(constrainedIndex.map((col: string): Series<T> => this.data[col]),
                         constrainedIndex);
  }

  /**
   * Reorder the rows of this dataframe
   *
   * @param newIndex Arrange the existing rows to conform to this as the new row labels
   * @return A copy of this dataframe with `newIndex` as the new order of row labels
   */
  public reorderRows(newIndex: string[]): DataFrame<T> {
    return new DataFrame(
      this.index.map((col: string): Series<T> => this.data[col].reorder(newIndex)),
      this.index
    );
  }

  /**
   * Return a tuple representing the dimensionality (rows, cols)
   * of the [[Dataframe]].
   */
  public shape(): [number, number] {
    return [this.rows().length, this.columns().length];
  }

  public transpose(): DataFrame<T> {
    const columns: string[] = this.rows();
    return new DataFrame<T>(
      columns.map((label: string): Series<T> => this.row(label))
      , columns
    );
  }
}

/**
 * Convert a D3 parsed CSV into a DataFrame<Node>
 */
const fromCSV: (data: DSVRowArray<string>) => DataFrame<Node>
  = (data: DSVRowArray<string>): DataFrame<Node> => {
    const seriesIndexName: string = data.columns[0];
    const seriesIndex: string[] =
      data.map((row: DSVRowString<string>, i: number): string =>
        (row[seriesIndexName] === undefined ? `${i}` : row[seriesIndexName] as string)
      );

    return new DataFrame<Node>(
      data.columns.slice(1)
        .map(
          (col: string): Series<Node> =>
            new Series(
              data.map((row: DSVRowString<string>, i: number): Node => {
                const coldata = (row[col] === undefined ? 'null' : row[col] as string);
                const data: object | number = JSON.parse(coldata);
                if (typeof data === "number") {
                  return new Node({ name: `${col} and ${seriesIndex[i]}`, data });
                }

                return new Node(data);
              }),
              seriesIndex),
        ),
      data.columns.slice(1));
  };


/**
 * Convert a 2D array of T into a DataFrame<T>
 */
const fromArray: <T>(data: T[][]) => DataFrame<T>
  = <T>(data: T[][]): DataFrame<T> =>
    new DataFrame<T>(data.map((row: T[]): Series<T> => new Series<T>(row)));

export { ancestorOf, count, countRatio, fromArray, fromCSV, DataFrame, outerRadialDomain };
