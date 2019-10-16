import { Node } from "../node";
import { ISunburstSettingsData, SunburstSettings } from "../sunburst/settings";

test("default settings", () => {
  const settings: SunburstSettings = SunburstSettings.default();
  expect(settings.height)
    .toEqual(600);

  expect(settings.width)
    .toEqual(600);

  expect(settings.enableTooltips)
    .toEqual(true);

  expect(settings.parent)
    .toEqual("unipept-sunburst");

  expect(settings.className)
    .toEqual("unipept-sunburst");

  expect(settings.enableBreadcrumbs)
    .toEqual(true);

  expect(settings.countAccessor(new Node()))
    .toEqual(0);

  expect(settings.rerootCallback)
    .toBe(undefined);
});

test("initialise custom but defaults", () => {
  const settings: SunburstSettings =
    new SunburstSettings({} as ISunburstSettingsData);
  expect(settings.height)
    .toEqual(800);

  expect(settings.width)
    .toEqual(800);

  expect(settings.enableTooltips)
    .toEqual(true);

  expect(settings.parent)
    .toEqual("unipept-sunburst");

  expect(settings.className)
    .toEqual("unipept-sunburst");

  expect(settings.enableBreadcrumbs)
    .toEqual(true);

  expect(settings.countAccessor(new Node()))
    .toEqual(0);

  expect(settings.rerootCallback)
    .toBe(undefined);
});

test("initialise custom", () => {
  const node: Node = new Node();
  node.data = { count: 5 };

  const settings: SunburstSettings =
    new SunburstSettings(
      {
        width: 900,
        height: 600,
        enableTooltips: false,
        enableBreadcrumbs: false,
        countAccessor(data: Node): number {
          return data.data.count + 1;
        },
      } as ISunburstSettingsData);

  expect(settings.height)
    .toEqual(600);

  expect(settings.width)
    .toEqual(900);

  expect(settings.enableTooltips)
    .toEqual(false);

  expect(settings.parent)
    .toEqual("unipept-sunburst");

  expect(settings.className)
    .toEqual("unipept-sunburst");

  expect(settings.enableBreadcrumbs)
    .toEqual(false);

  expect(settings.countAccessor(node))
    .toEqual(6);

  expect(settings.rerootCallback)
    .toBe(undefined);
});
