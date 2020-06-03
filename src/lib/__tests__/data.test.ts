import * as d3 from "d3";
import { readFileSync } from "fs";
import * as R from "ramda";

import * as Data from "../data";
import { Node } from "../node";
import { Optional } from "../optional";
import { Series } from "../series";

let data: d3.HierarchyNode<Node>;
let immediate: R.Lens;
let ctor: (value: R.Ord) => {value: R.Ord};
let val: R.Lens;
let dataframe: Data.DataFrame<string>;
let dfSeries: Array<Series<string>>;
let dataframeObj: Data.DataFrame<{value: R.Ord}>;

beforeAll(() => {
  data = d3.hierarchy(JSON.parse(readFileSync(`${__dirname}/../../../examples/data/flare.json`,
                                              "utf8")));
  data.sum((n: Node): number => (n.size ? n.size : 0));

  immediate = R.lens(R.identity, R.defaultTo);

  ctor = (value: R.Ord) => { return {value}; };
  val = R.lensProp("value");

  dfSeries = [new Series(["a", "d", "g", "j"]),
              new Series(["b", "e", "h", "k"]),
              new Series(["c", "f", "i", "l"])];

  dataframe = new Data.DataFrame(dfSeries,
                                 ["A", "B", "C"]);

  const dfObjSeries = [new Series([ctor("a"), ctor("d"), ctor("g"), ctor("j")]),
                       new Series([ctor("b"), ctor("e"), ctor("h"), ctor("k")]),
                       new Series([ctor("c"), ctor("f"), ctor("i"), ctor("l")])];

  dataframeObj = new Data.DataFrame(dfObjSeries, ["A", "B", "C"]);
});


test("I am the ancestor of myself", () => {
  expect(Data.ancestorOf(data, data))
    .toEqual(Optional.of(0));
});

test("I am the ancestor of my child", () => {
  const child: Array<d3.HierarchyNode<Node>> | undefined
    = data !== undefined ? data.children : [];

  if (child !== undefined && child.length > 0) {
    expect(Data.ancestorOf(data, child[0]))
      .toEqual(Optional.of(1));
  } else {
    fail("Child was unexpectedly undefined");
  }
});

test("I am the ancestor of my grandchild", () => {
  const child: Array<d3.HierarchyNode<Node>> | undefined
    = data !== undefined ? data.children : [];
  const grandchild: Array<d3.HierarchyNode<Node>> | undefined
    = child !== undefined ? child[0].children : [];

  if (grandchild !== undefined && grandchild.length > 0) {
    expect(Data.ancestorOf(data, grandchild[0]))
      .toEqual(Optional.of(2));
  } else {
    fail("Grandchild was unexpectedly undefined");
  }
});

test("My children are not ancestors of each other", () => {
  const children: Array<d3.HierarchyNode<Node>> | undefined
    = data !== undefined ? data.children : [];

  if (children !== undefined && children.length > 1) {
    expect(Data.ancestorOf(children[0], children[1]))
      .toEqual(Optional.empty());
  } else {
    fail("Child was unexpectedly undefined");
  }
});

test("My child is not my ancestor", () => {
  const children: Array<d3.HierarchyNode<Node>> | undefined
    = data !== undefined ? data.children : [];

  if (children !== undefined && children.length > 0) {
    expect(Data.ancestorOf(children[0], data))
      .toEqual(Optional.empty());
  } else {
    fail("Child was unexpectedly undefined");
  }
});

test("My grandchild is not my ancestor", () => {
  const child: Array<d3.HierarchyNode<Node>> | undefined
    = data !== undefined ? data.children : [];
  const grandchild: Array<d3.HierarchyNode<Node>> | undefined
    = child !== undefined ? child[0].children : [];

  if (grandchild !== undefined && grandchild.length > 0) {
    expect(Data.ancestorOf(grandchild[0], data))
      .toEqual(Optional.empty());
  } else {
    fail("Grandchild was unexpectedly undefined");
  }
});

test("Construct an unindexed Series", () => {
  const s: Series<number> = new Series([0, 1, 2, 3, 4]);

  expect(s.data)
    .toEqual({0: 0, 1: 1, 2: 2, 3: 3, 4: 4});
});

test("Construct an indexed Series", () => {
  const s: Series<number> = new Series([0, 1, 2, 3, 4],
                                       ["a", "b", "c", "d", "e"]);

  expect(s.data)
    .toEqual({a: 0, b: 1, c: 2, d: 3, e: 4});
});

test("Convert Series to array", () => {
  expect(new Series([0, 1, 2, 3]).asArray())
    .toEqual([0, 1, 2, 3]);
});

test("Access Series by label", () => {
  const s: Series<number> = new Series([0, 1, 2, 3]);
  expect(s.at("0")).toBe(0);
  expect(s.at("1")).toBe(1);
  expect(s.at("2")).toBe(2);
  expect(s.at("3")).toBe(3);
});

test("Access Series by index", () => {
  const s: Series<number> = new Series([0, 1, 2, 3]);
  expect(s.iat(0)).toBe(0);
  expect(s.iat(1)).toBe(1);
  expect(s.iat(2)).toBe(2);
  expect(s.iat(3)).toBe(3);
});

test("Find minimum value in a Series<number>", () => {
  expect((new Series([])).min(immediate)).toBeUndefined();

  expect((new Series([5, 2, -108, 4, 28])).min(immediate)).toBe(-108);

  expect((new Series([5, 2, 0, 4, 28])).min(immediate)).toBe(0);
});

test("Find maximum value in a Series<number>", () => {
  expect((new Series([])).max(immediate)).toBeUndefined();

  expect((new Series([5, 2, -108, 4, 28])).max(immediate)).toBe(28);

  expect((new Series([5, 2, 0, 4, 28])).max(immediate)).toBe(28);
});

test("Find minimum value in a Series<object>", () => {
  expect((new Series([])).min(val)).toBeUndefined();

  expect((new Series([ctor(5), ctor(2), ctor(-108), ctor(4), ctor(28)])).min(val)).toBe(-108);

  expect((new Series([ctor(5), ctor(2), ctor(0), ctor(4), ctor(28)])).min(val)).toBe(0);
});

test("Find maximum value in a Series<object>", () => {
  expect((new Series([])).max(val)).toBeUndefined();

  expect((new Series([ctor(5), ctor(2), ctor(-108), ctor(4), ctor(28)])).max(val)).toBe(28);

  expect((new Series([ctor(5), ctor(2), ctor(0), ctor(4), ctor(28)])).max(val)).toBe(28);
});

test("Find label of the minimum value in a Series<number>", () => {
  const s: Series<number> = new Series([34, 23, 18, 68, 41],
                                       ["a", "b", "c", "d", "e"]);
  const s1: Series<number> = new Series([34, 23, 18, -68, 41],
                                        ["a", "b", "c", "d", "e"]);
  const s2: Series<number> = new Series([0, 23, 18, 68, 41],
                                        ["a", "b", "c", "d", "e"]);
  
  expect(s.idxmin(immediate)).toStrictEqual(["c", 18]);
  expect(s1.idxmin(immediate)).toStrictEqual(["d", -68]);
  expect(s2.idxmin(immediate)).toStrictEqual(["a", 0]);

  expect((new Series([])).idxmin(immediate)).toBeUndefined();
});

test("Find label of the maximum value in a Series<number>", () => {
  const s: Series<number> = new Series([34, 23, 18, 68, 41],
                                       ["a", "b", "c", "d", "e"]);
  const s1: Series<number> = new Series([34, 23, 18, -68, 41],
                                        ["a", "b", "c", "d", "e"]);
  const s2: Series<number> = new Series([0, -23, -18, -68, -41],
                                        ["a", "b", "c", "d", "e"]);

  expect(s.idxmax(immediate)).toStrictEqual(["d", 68]);
  expect(s1.idxmax(immediate)).toStrictEqual(["e", 41]);
  expect(s2.idxmax(immediate)).toStrictEqual(["a", 0]);

  expect((new Series([])).idxmax(immediate)).toBeUndefined();
});

test("Find label of the minimum value in a Series<object>", () => {
  const ctor = (value: number) => { return {value}; };
  const val: R.Lens = R.lensProp("value");

  const s: Series<{value: number}> =
    new Series([ctor(34), ctor(23), ctor(18), ctor(68), ctor(41)],
               ["a", "b", "c", "d", "e"]);
  const s1: Series<{value: number}> =
    new Series([ctor(34), ctor(23), ctor(18), ctor(-68), ctor(41)],
               ["a", "b", "c", "d", "e"]);
  const s2: Series<{value: number}> =
    new Series([ctor(0), ctor(23), ctor(18), ctor(68), ctor(41)],
               ["a", "b", "c", "d", "e"]);
  
  expect(s.idxmin(val)).toStrictEqual(["c", ctor(18)]);
  expect(s1.idxmin(val)).toStrictEqual(["d", ctor(-68)]);
  expect(s2.idxmin(val)).toStrictEqual(["a", ctor(0)]);

  expect((new Series([])).idxmin(val)).toBeUndefined();
});

test("Find label of the maximum value in a Series<object>", () => {
  const s: Series<{value: R.Ord}> =
    new Series([ctor(34), ctor(23), ctor(18), ctor(68), ctor(41)],
               ["a", "b", "c", "d", "e"]);
  const s1: Series<{value: R.Ord}> =
    new Series([ctor(34), ctor(23), ctor(18), ctor(-68), ctor(41)],
               ["a", "b", "c", "d", "e"]);
  const s2: Series<{value: R.Ord}> =
    new Series([ctor(0), ctor(-23), ctor(-18), ctor(-68), ctor(-41)],
               ["a", "b", "c", "d", "e"]);
  
  expect(s.idxmax(val)).toStrictEqual(["d", ctor(68)]);
  expect(s1.idxmax(val)).toStrictEqual(["e", ctor(41)]);
  expect(s2.idxmax(val)).toStrictEqual(["a", ctor(0)]);

  expect((new Series([])).idxmax(val)).toBeUndefined();
});

test("Reorder a Series with identical index", () => {
  const s: Series<number> =
    new Series([0, 1, 2, 3], ["a", "b", "c", "d"])
    .reorder(["a", "b", "c", "d"]);

  expect(s.asArray())
    .toEqual([0, 1, 2, 3]);
});

test("Reorder a Series with reversed index", () => {
  const s: Series<number> =
    new Series([0, 1, 2, 3], ["a", "b", "c", "d"])
    .reorder(["d", "c", "b", "a"]);

  expect(s.asArray())
    .toEqual([3, 2, 1, 0]);
});

test("Reorder a Series with larger index", () => {
  const s: Series<number> =
    new Series([0, 1, 2, 3], ["a", "b", "c", "d"])
    .reorder(["e", "a", "g", "b", "c", "d", "f"]);

  expect(s.asArray())
    .toEqual([0, 1, 2, 3]);
});

test("Reorder a Series with partially overlapping index", () => {
  const s: Series<number> =
    new Series([0, 1, 2, 3], ["a", "b", "c", "d"])
    .reorder(["c", "f", "a", "g"]);

  expect(s.asArray())
    .toEqual([2, 0]);
});

test("Construct an unindexed DataFrame", () => {
  const df: Data.DataFrame<number>
    = new Data.DataFrame([new Series([0, 1, 2]),
                          new Series([3, 4, 5]),
                          new Series([6, 7, 8])]);

  expect(df.rows())
    .toEqual(["0", "1", "2"]);
});

test("Construct an indexed DataFrame", () => {
  const df: Data.DataFrame<number>
    = new Data.DataFrame([new Series([0, 1, 2]),
                          new Series([3, 4, 5]),
                          new Series([6, 7, 8])],
                         ["one", "two", "three"]);

  expect(df.rows()).toEqual(["0", "1", "2"]);
  expect(df.columns()).toEqual(["one", "two", "three"]);
});

test("Access a dataframe by label", () => {
  expect(dataframe.at("0", "A"))
    .toEqual("a");
  expect(dataframe.at("3", "A"))
    .toEqual("j");
  expect(dataframe.at("3", "C"))
    .toEqual("l");
});

test("Access a dataframe by index", () => {
  expect(dataframe.iat(0, 0))
    .toEqual("a");
  expect(dataframe.iat(3, 0))
    .toEqual("j");
  expect(dataframe.iat(3, 2))
    .toEqual("l");
});

test("Find the minimum value in a DataFrame<string>", () => {
  expect(dataframe.min(immediate)).toBe("a");

  const empty = new Data.DataFrame([new Series([])]);
  expect(empty.min(immediate)).toBeUndefined();
});

test("Find the maximum value in a DataFrame<string>", () => {
  expect(dataframe.max(immediate)).toBe("l");

  const empty = new Data.DataFrame([new Series([])]);
  expect(empty.max(immediate)).toBeUndefined();
});

test("Find the minimum value in a DataFrame<object>", () => {
  expect(dataframeObj.min(val)).toBe("a");
});

test("Find the minimum value in a DataFrame<object>", () => {
  expect(dataframeObj.max(val)).toBe("l");
});

test("Find the label of the minimum value in a DataFrame<string>", () => {
  expect(dataframe.idxmin(immediate)).toStrictEqual(["A", "0", "a"]);
});

test("Find the label of the maximum value in a DataFrame<string>", () => {
  expect(dataframe.idxmax(immediate)).toStrictEqual(["C", "3", "l"]);
});

test("Find the label of the minimum value in a DataFrame<object>", () => {
  expect(dataframeObj.idxmin(val)).toStrictEqual(["A", "0", ctor("a")]);
});

test("Find the label of the maximum value in a DataFrame<string>", () => {
  expect(dataframeObj.idxmax(val)).toStrictEqual(["C", "3", ctor("l")]);
});

test("Reorder columns of a DataFrame with identical index", () => {
  const df: Data.DataFrame<string> = dataframe.reorderColumns(["A", "B", "C"]);

  expect(df)
    .toEqual(dataframe);
});

test("Reorder columns of a DataFrame with reversed index", () => {
  const df: Data.DataFrame<string> = dataframe.reorderColumns(["C", "B", "A"]);

  expect(df)
    .toEqual(new Data.DataFrame(dfSeries.reverse(), ["C", "B", "A"]));
});

test("Reorder rows of a DataFrame with identical index", () => {
  const df: Data.DataFrame<string> = dataframe.reorderRows(["0", "1", "2", "3"]);

  expect(df)
    .toEqual(dataframe);
});

test("Reorder rows of a DataFrame with reversed index", () => {
  const df: Data.DataFrame<string> = dataframe
    .reorderRows(["3", "2", "1", "0"]);

  expect(df.column("A")
         .asArray())
    .toEqual(dataframe.column("A")
             .asArray()
             .reverse());
  expect(df.column("B")
         .asArray())
    .toEqual(dataframe.column("B")
             .asArray()
             .reverse());
  expect(df.column("C")
         .asArray())
    .toEqual(dataframe.column("C")
             .asArray()
             .reverse());
});

