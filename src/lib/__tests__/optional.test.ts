import { Optional } from "../optional";

test("Empty optional from empty() factory", () => {
  expect(Optional.empty().isPresent()).toEqual(false);
});

test("Empty optional from immediate undefined", () => {
  expect(Optional.of(undefined).isPresent()).toEqual(false);
});

test("Empty optional from immediate null", () => {
  expect(Optional.of(null).isPresent()).toEqual(false);
});

test("Empty optional from function returning empty()", () => {
  expect((() => Optional.empty())().isPresent()).toEqual(false);
});

test("Empty optional from function returning undefined", () => {
  expect(Optional.of((() => undefined)()).isPresent()).toEqual(false);
});

test("Empty optional from function returning null", () => {
  expect(Optional.of((() => null)()).isPresent()).toEqual(false);
});

test("Create optional of 0", () => {
  expect(Optional.of(0).isPresent()).toEqual(true);
  expect(Optional.of(0).get()).toEqual(0);
});

test("Filter out for empty", () => {
  expect(Optional.empty().filter((_v) => false)).toEqual(Optional.empty());
});

test("Filter in for empty", () => {
  expect(Optional.empty().filter((_v) => true)).toEqual(Optional.empty());
});

test("Filter out for present value", () => {
  expect(Optional.of(1).filter((_v) => false)).toEqual(Optional.empty());
});

test("Filter in for present value", () => {
  expect(Optional.of(1).filter((_v) => true)).toEqual(Optional.of(1));
});

test("Get empty value", () => {
  expect(Optional.empty().get()).toBe(undefined);
});

test("Get present value", () => {
  expect(Optional.of(1).get()).toEqual(1);
});

test("Map empty", () => {
  expect(Optional.empty().map((_v) => 2)).toEqual(Optional.empty());
});

test("Map present value", () => {
  expect(Optional.of(1).map((v: number) => v * 2)).toEqual(Optional.of(2));
});

test("Map POD object", () => {
  const data = {a: 0, b: 1, c: 2};
  const o_data = Optional.of(data);

  expect(o_data.isPresent()).toEqual(true);
  expect(o_data.map((d) => d.a)).toEqual(Optional.of(0));
  expect(o_data.map((d) => d.b)).toEqual(Optional.of(1));
  expect(o_data.map((d) => d.c)).toEqual(Optional.of(2));
});
