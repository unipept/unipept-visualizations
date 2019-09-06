import { stringHash } from "../utils";

test("hash for a string to be stable", () => {
  const text: string = "this is a string";
  expect(stringHash(text))
    .toMatchInlineSnapshot("-1853110172");
});

