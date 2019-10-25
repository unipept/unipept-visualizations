import * as d3 from "d3";
import { readFileSync } from "fs";

import * as Data from "../data";
import { Node } from "../node";
import { Optional } from "../optional";

let data: d3.HierarchyNode<Node>;

beforeAll(() => {
  data = d3.hierarchy(JSON.parse(readFileSync(`${__dirname}/../../../examples/data/flare.json`,
                                              "utf8")));
  data.sum((n: Node): number => (n.size ? n.size : 0));
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
  const s: Data.Series<number> = new Data.Series([0, 1, 2, 3, 4]);

  expect(s.data)
    .toEqual({0: 0, 1: 1, 2: 2, 3: 3, 4: 4});
});

test("Construct an indexed Series", () => {
  const s: Data.Series<number> = new Data.Series([0, 1, 2, 3, 4],
                                                 ["a", "b", "c", "d", "e"]);

  expect(s.data)
    .toEqual({a: 0, b: 1, c: 2, d: 3, e: 4});

  console.log(s.format());
});

test("Construct an unindexed DataFrame", () => {
  const df: Data.DataFrame<number>
    = new Data.DataFrame([new Data.Series([0, 1, 2]),
                          new Data.Series([3, 4, 5]),
                          new Data.Series([6, 7, 8])]);

  console.log(df.rows());
  console.log(df.format());
});

test("Construct an indexed DataFrame", () => {
  const df: Data.DataFrame<number>
    = new Data.DataFrame([new Data.Series([0, 1, 2]),
                          new Data.Series([3, 4, 5]),
                          new Data.Series([6, 7, 8])],
                         ["one", "two", "three"]);

  console.log(df.rows());
  console.log(df.format());
});
