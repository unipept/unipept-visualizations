import * as R from "ramda";

import { Node } from "./node";
import { DataFrame } from "./data";
import { Series } from "./series";

/**
 * A function that accepts a distance matrix as input and returns a dendrogram
 */
type Cluster = (dm: DataFrame<number>) => Node;

const joinLabels = (l1: string, l2: string): string => {
  if (l1 === l2) {
    return l1;
  }

  return `${l1},${l2}`;
};

/**
 * @returns The number of leaves in this tree
 */
const countLeaves = (tree: Node): number => {
  return tree.preorder().filter((n: Node) => n.isLeaf()).length;
};

/**
 * Combine rows or columns of a distance matrix. This is an equivalent
 * Operation to joining subtrees under a new parent.
 *
 * @param s A row/column from a distance matrix
 * @param sWeight A weight factor to apply to distances in `s`
 * @param t A row/column from a distance matrix
 * @param tWeight A weight factor to apply to distances in `t`
 *
 * @return a combination of `s` and `t` given the input weights
 */
const combine = (s: Series<number>, sWeight: number,
                 t: Series<number>, tWeight: number): Series<number> => {
  const repeat: (rpt: number) => ((v: number) => number[])
    = R.flip<(v: number, n: number) => number[], [number, number]>(R.repeat);
  const concat: (list1: number[], list2: number[]) => number[] = R.concat;

  const sWeighted: number[][] = R.map(repeat(sWeight), s.asArray());
  const tWeighted: number[][] = R.map(repeat(tWeight), t.asArray());

  const labels = R.zipWith(joinLabels, s.labels(), t.labels());
  const data = R.map(R.mean, R.zipWith(concat, sWeighted, tWeighted));
  
  return new Series(data, labels);
};

const updateTree = (left: string, right: string,
                    height: number, dendrogram: Node[]): [Node[], number, number] => {
  const joinTrees: [Node, Node] = [
    R.find(R.propEq("name", left), dendrogram) as Node,
    R.find(R.propEq("name", right), dendrogram) as Node
  ];

  const tree = new Node({ name: joinLabels(left, right),
                          data: height,
                          children: joinTrees });

  return [
    R.append(tree, R.without(joinTrees, dendrogram) as Node[]),
    countLeaves(joinTrees[0]),
    countLeaves(joinTrees[1])
  ];
};

/**
 * Recursive computation of UPGMA.
 */
const cluster = (weight: (n: number) => number,
                 input: DataFrame<number>,
                 dendrogram: Node[]): Node => {

  if (dendrogram.length === 1) {
    return dendrogram[0];
  }

  const [column, row, height] = input.idxmin(R.lens(R.identity, R.defaultTo));
  const icolumn = input.columns().indexOf(column);

  const [newDendrogram, colLeaves, rowLeaves] = updateTree(column, row, height, dendrogram);

  const rowWeight = weight(rowLeaves);
  const colWeight = weight(colLeaves);

  const combinedRow =
    combine(input.row(column), colWeight,
            input.row(row), rowWeight)
      .drop(row)
      .modify(column, R.identity, joinLabels(column, row));

  const combinedColumn =
    combine(Series.concat([input.row(row).split(column)[1],
                           input.column(row).drop(column)]), rowWeight,
            input.column(column), colWeight)
      .drop(row);

  const columns = input.columns()
    .filter((col: string) => col !== row && col !== column)
    .map((col: string) => {
      return input.column(col)
        .drop(row)
        .modify(column, () => combinedRow.at(col), joinLabels(column, row));
    });

  const next = new DataFrame(R.insert(icolumn, combinedColumn, columns), combinedRow.labels());

  return cluster(weight, next, newDendrogram);
}

/**
 * UPGMA clustering
 */
const UPGMAcluster: Cluster = (dm: DataFrame<number>): Node => {
  const leaves = R.map((name: string) => new Node({ name }),
                       R.uniq(R.concat(dm.columns(), dm.rows())));

  const unweighted = (n: number): number => n;

  return cluster(unweighted, dm, leaves);
};

export { Cluster, UPGMAcluster };
