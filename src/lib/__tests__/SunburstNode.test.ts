import { SunburstNode } from "../sunburst/node";

test("Test SunburstNode default initialisation", () => {
  const data = SunburstNode.new();

  expect(data)
    .toMatchObject({ name: "" });
});

test("Test SunburstNode initialisation from data", () => {
  const A_SIZE: number = 1;
  const B_SIZE: number = 2;
  const NUM_CHILDREN: number = 2;

  const input = {
    name: "test",
    children: [
      { name: "A", size: A_SIZE },
      { name: "B", size: B_SIZE }],
  };

  const data: SunburstNode = SunburstNode.createNodes(input);
  expect(data.children)
    .toBeDefined();
  if (data.children !== undefined) {
    expect(data.children.length)
      .toEqual(NUM_CHILDREN);
    expect(data.children[0].size)
      .toEqual(A_SIZE);
    expect(data.children[1].size)
      .toEqual(B_SIZE);
  }
});
