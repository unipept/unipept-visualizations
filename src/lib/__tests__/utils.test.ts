import { generateId } from "../utils";

test("Default ID length", () => {
  const v: string = generateId();
  expect(v.length)
    .toEqual(10);
});

test("Specific ID length", () => {
  const v: string = generateId(6);
  expect(v.length)
    .toEqual(6);
});

