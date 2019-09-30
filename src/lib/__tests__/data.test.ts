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
