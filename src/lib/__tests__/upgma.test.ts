import * as R from "ramda";

import { Series } from "../series";
import { DataFrame } from "../data";
import { Node } from "../node";
import { UPGMAcluster } from "../cluster";
import { distanceMatrix, euclideanDistance } from "../metric";

/**
 * R code for verification and result:
 * library(amap)
 * library(stats)
 * x = matrix(c(1,1,2.5,3,3, 1,1.2,0.75,2,2.5), nrow=5, ncol=2)
 * d = Dist(x, method="euclidean")
 * hc = hclust(d, method="average")
 * hc$merge
 * =>
 *      [,1] [,2]
 * [1,]   -1   -2
 * [2,]   -4   -5
 * [3,]   -3    1
 * [4,]    2    3
 *
 * hc$height
 * =>
 * [1] 0.200000 0.500000 1.543368 2.073637
 *
 * str(as.dendrogram(hc))
 * =>
 * --[dendrogram w/ 2 branches and 5 members at h = 2.07]
 *   |--[dendrogram w/ 2 branches and 2 members at h = 0.5]
 *   |  |--leaf 4 
 *   |  `--leaf 5 
 *   `--[dendrogram w/ 2 branches and 3 members at h = 1.54]
 *      |--leaf 3 
 *      `--[dendrogram w/ 2 branches and 2 members at h = 0.2]
 *         |--leaf 1 
 *         `--leaf 2
 */

const expected1 = () => {
  const leaf1 = new Node({name: "0"});
  const leaf2 = new Node({name: "1"});
  const d12 = new Node({name: "0,1", data: 0.2, children: [leaf1, leaf2]});

  const leaf4 = new Node({name: "3"});
  const leaf5 = new Node({name: "4"});
  const d45 = new Node({name: "3,4", data: 0.5, children: [leaf4, leaf5]});

  const leaf3 = new Node({name: "2"});
  const d3d12 = new Node({name: "0,1,2", data: 1.54, children: [d12, leaf3]});

  const tree = new Node({name: "0,1,2,3,4", data: 2.07, children: [d3d12, d45]});

  return tree;
};


test("Example 1", () => {
  const small2DDataSet: number[][] =
  [
    [1, 1],
    [1, 1.2],
    [2.5, 0.75],
    [3, 2],
    [3, 2.5],
  ];

  const dm: DataFrame<number> = distanceMatrix(small2DDataSet, euclideanDistance);
  const result = UPGMAcluster(dm).preorder();
  const expected = expected1().preorder();

  const resultHeights = result.map((n: Node): number => n.data as number);
  const expHeights = expected.map((n: Node): number => n.data as number);
  R.zip(resultHeights, expHeights).forEach(([r, e]: [number, number]) => {
    expect(r).toBeCloseTo(e);
  });

  const resultNames = result.map((n: Node): string => n.name);
  const expNames = expected.map((n: Node): string => n.name);
  R.zip(resultNames, expNames).forEach(([r, e]: [string, string]) => {
    expect(r).toBe(e);
  });
});

/**
 * Example from: http://www.slimsuite.unsw.edu.au/teaching/upgma/
 *
 * The computed heights resulting from the R code below were manually checked against
 * the expected heights from the link above.
 *
 * R code for verification and result:
 * dm <- matrix(c(0,19,27,8,33,18,13, 19,0,31,18,36,1,13, 27,31,0,26,41,32,29, 8,18,26,0,31,17,14, 33,36,41,31,0,35,28, 18,1,32,17,35,0,12, 13,13,29,14,28,12,0), nrow=7 , ncol=7)
 * rownames(dm) <- c('A', 'B', 'C', 'D', 'E', 'F', 'G')
 * colnames(dm) <- c('A', 'B', 'C', 'D', 'E', 'F', 'G')
 * d <- as.dist(dm)
 * hc <- hclust(d, method="average")
 * hc$merge
 * =>
 *      [,1] [,2]
 * [1,]   -2   -6
 * [2,]   -1   -4
 * [3,]   -7    1
 * [4,]    2    3
 * [5,]   -3    4
 * [6,]   -5    5
 *
 * hc$height
 * =>
 * [1]  1.0  8.0 12.5 16.5 29.0 34.0
 *
 * str(as.dendrogram(hc))
 * =>
 * --[dendrogram w/ 2 branches and 7 members at h = 34]
 *   |--leaf "E" 
 *   `--[dendrogram w/ 2 branches and 6 members at h = 29]
 *      |--leaf "C" 
 *      `--[dendrogram w/ 2 branches and 5 members at h = 16.5]
 *         |--[dendrogram w/ 2 branches and 2 members at h = 8]
 *         |  |--leaf "A" 
 *         |  `--leaf "D" 
 *         `--[dendrogram w/ 2 branches and 3 members at h = 12.5]
 *            |--leaf "G" 
 *            `--[dendrogram w/ 2 branches and 2 members at h = 1]
 *               |--leaf "B" 
 *               `--leaf "F" 
 */
const expected2 = () => {
  const leafB = new Node({ name: "B" });
  const leafF = new Node({ name: "F" });
  const BF = new Node({ name: "B,F", data: 1, children: [leafB, leafF] });

  const leafA = new Node({ name: "A" });
  const leafD = new Node({ name: "D" });
  const AD = new Node({ name: "A,D", data: 8, children: [leafA, leafD] });

  const leafG = new Node({ name: "G" });
  const BFG = new Node({ name: "B,F,G", data: 12.5, children: [BF, leafG] });

  const ADBFG = new Node({ name: "A,D,B,F,G", data: 16.5, children: [AD, BFG] });

  const leafC = new Node({ name: "C" });
  const ADBFGC = new Node({ name: "A,D,B,F,G,C", data: 29, children: [ADBFG, leafC] });

  const leafE = new Node({ name: "E" });
  const tree = new Node({ name: "A,D,B,F,G,C,E", data: 34, children: [ADBFGC, leafE] });

  return tree;
}

test("Example 2", () => {
  const A = new Series([19, 27, 8, 33, 18, 13], ["B", "C", "D", "E", "F", "G"]);
  const B = new Series([31, 18, 36, 1, 13], ["C", "D", "E", "F", "G"]);
  const C = new Series([26, 41, 32, 29], ["D", "E", "F", "G"]);
  const D = new Series([31, 17, 14], ["E", "F", "G"]);
  const E = new Series([35, 28], ["F", "G"]);
  const F = new Series([12], ["G"]);
  const dm: DataFrame<number> = new DataFrame([A, B, C, D, E, F], ["A", "B", "C", "D", "E", "F"]);

  const result = UPGMAcluster(dm).preorder();
  const expected = expected2().preorder();

  const resultHeights = result.map((n: Node): number => n.data as number);
  const expHeights = expected.map((n: Node): number => n.data as number);
  R.zip(resultHeights, expHeights).forEach(([r, e]: [number, number]) => {
    expect(r).toBeCloseTo(e);
  });

  const resultNames = result.map((n: Node): string => n.name);
  const expNames = expected.map((n: Node): string => n.name);
  R.zip(resultNames, expNames).forEach(([r, e]: [string, string]) => {
    expect(r).toBe(e);
  });
});

/**
 * Example from: https://en.wikipedia.org/wiki/UPGMA
 *
 * The computed heights resulting from the R code below were manually checked against
 * the expected heights from the link above.
 *
 * R code for verification and result:
 * dm <- matrix(c(0,17,21,31,23, 17,0,30,34,21, 21,30,0,28,39, 31,34,28,0,43, 23,21,39,43,0), nrow=5 , ncol=5)
 * rownames(dm) <- c('a', 'b', 'c', 'd', 'e')
 * colnames(dm) <- c('a', 'b', 'c', 'd', 'e')
 * d <- as.dist(dm)
 * hc <- hclust(d, method="average")
 * hc$merge
 * =>
 *      [,1] [,2]
 * [1,]   -1   -2
 * [2,]   -5    1
 * [3,]   -3   -4
 * [4,]    2    3
 *
 * hc$height
 * =>
 * [1] 17 22 28 33
 *
 * str(as.dendrogram(hc))
 * =>
 * --[dendrogram w/ 2 branches and 5 members at h = 33]
 *   |--[dendrogram w/ 2 branches and 3 members at h = 22]
 *   |  |--leaf "e" 
 *   |  `--[dendrogram w/ 2 branches and 2 members at h = 17]
 *   |     |--leaf "a" 
 *   |     `--leaf "b" 
 *   `--[dendrogram w/ 2 branches and 2 members at h = 28]
 *      |--leaf "c" 
 *      `--leaf "d"
 */
const expected3 = () => {
  const leafa = new Node({ name: "a" });
  const leafb = new Node({ name: "b" });
  const AB = new Node({ name: "a,b", data: 17, children: [leafa, leafb] });

  const leafe = new Node({ name: "e" });
  const abe = new Node({ name: "a,b,e", data: 22, children: [AB, leafe] });

  const leafc = new Node({ name: "c" });
  const leafd = new Node({ name: "d" });
  const cd = new Node({ name: "c,d", data: 28, children: [leafc, leafd] });

  const tree = new Node({ name: "a,b,e,c,d", data: 33, children: [abe, cd] });

  return tree;
}

test("Example 3", () => {
  const a = new Series([17, 21, 31, 23], ["b", "c", "d", "e"]);
  const b = new Series([30, 34, 21], ["c", "d", "e"]);
  const c = new Series([28, 39], ["d", "e"]);
  const d = new Series([43], ["e"]);
  const dm: DataFrame<number> = new DataFrame([a, b, c, d], ["a", "b", "c", "d"]);

  const result = UPGMAcluster(dm).preorder();
  const expected = expected3().preorder();

  const resultHeights = result.map((n: Node): number => n.data as number);
  const expHeights = expected.map((n: Node): number => n.data as number);
  R.zip(resultHeights, expHeights).forEach(([r, e]: [number, number]) => {
    expect(r).toBeCloseTo(e);
  });

  const resultNames = result.map((n: Node): string => n.name);
  const expNames = expected.map((n: Node): string => n.name);
  R.zip(resultNames, expNames).forEach(([r, e]: [string, string]) => {
    expect(r).toBe(e);
  });
});


/**
 * Randomly generated distances
 *
 * R code for verification and result:
 * dm <- matrix(c(   0, 20.8, 18.3, 15.8,  4.4, 22.1, 18.9, 15.6,  0.9, 15.1,
 *                20.8,    0, 26.1,  8.6, 27.7, 15.8, 28.8, 14.6, 31.3, 15.3,
 *                18.3, 26.1,    0, 11.8, 19.7, 32.5, 12.4, 20.3, 21.8, 32.6,
 *                15.8,  8.6, 11.8,    0, 14.8, 22.5, 27.1, 16.9, 22.2, 20.5,
 *                 4.4, 27.7, 19.7, 14.8,    0, 21.5, 11.8, 12.5, 28.8,  9.3,
 *                22.1, 15.8, 32.5, 22.5, 21.5,    0, 19.2, 12.7, 17.3,  0.7,
 *                18.9, 28.8, 12.4, 27.1, 11.8, 19.2,    0,  1.9, 24.3, 18.8,
 *                15.6, 14.6, 20.3, 16.9, 12.5, 12.7,  1.9,    0, 11.2, 21.9,
 *                 0.9, 31.3, 21.8, 22.2, 28.8, 17.3, 24.3, 11.2,    0, 23.9,
 *                15.1, 15.3, 32.6, 20.5,  9.3,  0.7, 18.8, 21.9, 23.9,    0),
 *              nrow=10, ncol=10)
 * rownames(dm) <- c('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J')
 * colnames(dm) <- c('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J')
 * d <- as.dist(dm)
 * hc <- hclust(d, method="average")
 * hc$merge
 * =>
 *       [,1] [,2]
 *  [1,]   -6  -10
 *  [2,]   -1   -9
 *  [3,]   -7   -8
 *  [4,]   -2   -4
 *  [5,]   -5    3
 *  [6,]    2    5
 *  [7,]    1    6
 *  [8,]   -3    4
 *  [9,]    7    8
 *
 * hc$height
 * =>
 * [1]  0.70000  0.90000  1.90000  8.60000 12.15000 17.20000 18.18000 18.95000
 * [9] 21.50952
 *
 * str(as.dendrogram(hc))
 * =>
 * --[dendrogram w/ 2 branches and 10 members at h = 21.5]
 *   |--[dendrogram w/ 2 branches and 7 members at h = 18.2]
 *   |  |--[dendrogram w/ 2 branches and 2 members at h = 0.7]
 *   |  |  |--leaf "F" 
 *   |  |  `--leaf "J" 
 *   |  `--[dendrogram w/ 2 branches and 5 members at h = 17.2]
 *   |     |--[dendrogram w/ 2 branches and 2 members at h = 0.9]
 *   |     |  |--leaf "A" 
 *   |     |  `--leaf "I" 
 *   |     `--[dendrogram w/ 2 branches and 3 members at h = 12.2]
 *   |        |--leaf "E" 
 *   |        `--[dendrogram w/ 2 branches and 2 members at h = 1.9]
 *   |           |--leaf "G" 
 *   |           `--leaf "H" 
 *   `--[dendrogram w/ 2 branches and 3 members at h = 19]
 *      |--leaf "C" 
 *      `--[dendrogram w/ 2 branches and 2 members at h = 8.6]
 *         |--leaf "B" 
 *         `--leaf "D"
 */
const expected4 = () => {
  const leafF = new Node({ name: "F" });
  const leafJ = new Node({ name: "J" });
  const FJ = new Node({ name: "F,J", data: 0.7, children: [leafF, leafJ] });

  const leafA = new Node({ name: "A" });
  const leafI = new Node({ name: "I" });
  const AI = new Node({ name: "A,I", data: 0.9, children: [leafA, leafI] });

  const leafG = new Node({ name: "G" });
  const leafH = new Node({ name: "H" });
  const GH = new Node({ name: "G,H", data: 1.9, children: [leafG, leafH] });

  const leafB = new Node({ name: "B" });
  const leafD = new Node({ name: "D" });
  const BD = new Node({ name: "B,D", data: 8.6, children: [leafB, leafD] });

  const leafE = new Node({ name: "E" });
  const EGH = new Node({ name: "E,G,H", data: 12.15, children: [leafE, GH] });

  const AIEGH = new Node({ name: "A,I,E,G,H", data: 17.2, children: [AI, EGH] });

  const AIEGHFJ = new Node({ name: "A,I,E,G,H,F,J", data: 18.18, children: [AIEGH, FJ] });

  const leafC = new Node({ name: "C" });
  const BDC = new Node({ name: "B,D,C", data: 18.95, children: [BD, leafC] });

  const tree = new Node({ name: "A,I,E,G,H,F,J,B,D,C", data: 21.50952, children: [AIEGHFJ, BDC] });

  return tree;
}

test("Example 4", () => {
  const A = new Series([20.8, 18.3, 15.8, 4.4, 22.1, 18.9, 15.6, 0.9, 15.1],
                       ["B",  "C",  "D",  "E", "F",  "G",  "H",  "I", "J"]);
  const B = new Series([26.1, 8.6, 27.7, 15.8, 28.8, 14.6, 31.3, 15.3],
                       ["C",  "D", "E",  "F",  "G",  "H",  "I",  "J"]);
  const C = new Series([11.8, 19.7, 32.5, 12.4 ,20.3, 21.8, 32.6],
                       ["D",  "E",  "F",  "G",  "H",  "I",  "J"]);
  const D = new Series([14.8, 22.5, 27.1, 16.9, 22.2, 20.5],
                       ["E",  "F",  "G",  "H",  "I",  "J"]);
  const E = new Series([21.5, 11.8, 12.5, 28.8, 9.3],
                       ["F",  "G",  "H",  "I",  "J"]);
  const F = new Series([19.2, 12.7, 17.3, 0.7],
                       ["G",  "H",  "I",  "J"]);
  const G = new Series([1.9, 24.3, 18.8],
                       ["H", "I",  "J"]);
  const H = new Series([11.2, 21.9],
                       ["I",  "J"]);
  const I = new Series([23.9],
                       ["J"]);
  const dm: DataFrame<number> = new DataFrame([A, B, C, D, E, F, G, H, I],
                                              ["A", "B", "C", "D", "E", "F", "G", "H", "I"]);

  const result = UPGMAcluster(dm).preorder();
  const expected = expected4().preorder();

  const resultNames = result.map((n: Node): string => n.name);
  const expNames = expected.map((n: Node): string => n.name);
  R.zip(resultNames, expNames).forEach(([r, e]: [string, string]) => {
    expect(r).toBe(e);
  });

  const resultHeights = result.map((n: Node): number => n.data as number);
  const expHeights = expected.map((n: Node): number => n.data as number);
  R.zip(resultHeights, expHeights).forEach(([r, e]: [number, number]) => {
    expect(r).toBeCloseTo(e);
  });
});
