import { stringHash, generateId } from "../utils";

test("hash for a string to be stable", () => {
  const text: string = "this is a string";
  expect(stringHash(text))
    .toMatchInlineSnapshot("-1853110172");
});

test("Default ID length", () => {
  const v: string = generateId();
  expect(v.length).toEqual(10);
});

test("Specific ID length", () => {
  const v: string = generateId(6);
  expect(v.length).toEqual(6);
});
