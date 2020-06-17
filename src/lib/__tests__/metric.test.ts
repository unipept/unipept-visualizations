import { DataFrame } from "../data";
import { Series } from "../series";

import { centeredPearsonCorrelation,
         distanceMatrix,
         euclideanDistance } from "../metric";

const small2DDataSet: number[][] =
  [
    [1, 1],
    [1, 1.2],
    [2.5, 0.75],
    [3, 2],
    [3, 2.5],
  ];

/**
 * The `small2DDataset` was run through the following R code to generate
 * a matrix to compare against.
 * R code for verification and result:
 * library(amap)
 * x = matrix(c(1,1,2.5,3,3, 1,1.2,0.75,2,2.5), nrow=5, ncol=2)
 * Dist(x, method="euclidean")
 * =>
 *          1        2        3        4
 * 2 0.200000                           
 * 3 1.520691 1.566046                  
 * 4 2.236068 2.154066 1.346291         
 * 5 2.500000 2.385372 1.820027 0.500000
 */
const expectedEuclidean = () =>
  new DataFrame(
    [new Series([0.2, 1.520691, 2.236068, 2.5], ["1", "2", "3", "4"]),
     new Series([1.566046, 2.154066, 2.385372], ["2", "3", "4"]),
     new Series([1.346291, 1.820027], ["3", "4"]),
     new Series([0.5], ["4"])],
    ["0", "1", "2", "3"]);

/**
 * The `small2DDataset` was run through the following R code to generate
 * a matrix to compare against.
 * R code for verification and result:
 * library(amap)
 * x = matrix(c(1,1,2.5,3,3, 1,1.2,0.75,2,2.5), nrow=5, ncol=2)
 * Dist(x, method="correlation")
 * =>
 *   1 2 3 4
 * 2 0      
 * 3 0 2    
 * 4 0 2 0  
 * 5 0 2 0 0
 */
const expectedCenteredPearson = () =>
  new DataFrame(
    [new Series([0, 0, 0, 0], ["1", "2", "3", "4"]),
     new Series([2, 2, 2], ["2", "3", "4"]),
     new Series([0, 0], ["3", "4"]),
     new Series([0], ["4"])],
    ["0", "1", "2", "3"]);

test("Compute euclidean distance matrix", () => {
  const e = expectedEuclidean();
  const d = distanceMatrix(small2DDataSet, euclideanDistance);

  d.columns().forEach((clabel: string) => {
    d.rows().forEach((rlabel: string) => {
      const rec: number | undefined = d.at(rlabel, clabel);
      const exp: number | undefined = e.at(rlabel, clabel);
      if (typeof rec === "number" && typeof exp === "number") {
        expect(rec).toBeCloseTo(exp);
      } else {
        expect(rec).toBeUndefined();
      }
    });
  });
});

test("Compute pearson distance matrix", () => {
  const e = expectedCenteredPearson();
  const d = distanceMatrix(small2DDataSet, centeredPearsonCorrelation);

  d.columns().forEach((clabel: string) => {
    d.rows().forEach((rlabel: string) => {
      const rec: number | undefined = d.at(rlabel, clabel);
      const exp: number | undefined = e.at(rlabel, clabel);
      if (typeof rec === "number" && typeof exp === "number") {
        expect(rec).toBeCloseTo(exp);
      } else {
        expect(rec).toBeUndefined();
      }
    });
  });
});
