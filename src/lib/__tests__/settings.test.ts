import { SunburstSettings, SunburstSettingsData } from "../settings";
import { Node } from "../node";

test("default settings", () => {
  const settings: SunburstSettings = SunburstSettings.default();
  expect(settings.height).toEqual(600);
  expect(settings.width).toEqual(600);
  expect(settings.enableTooltips).toEqual(true);
  expect(settings.className).toEqual("unipept-sunburst");
  expect(settings.enableBreadcrumbs).toEqual(true);
  expect(settings.breadcrumbWidth).toEqual(200);
  expect(settings.countAccessor(new Node())).toEqual(0);
  expect(settings.rerootCallback).toBe(undefined);
});

test("initialise custom but defaults", () => {
  const settings: SunburstSettings =
    new SunburstSettings({} as SunburstSettingsData);
  expect(settings.height).toEqual(800);
  expect(settings.width).toEqual(800);
  expect(settings.enableTooltips).toEqual(true);
  expect(settings.className).toEqual("unipept-sunburst");
  expect(settings.enableBreadcrumbs).toEqual(true);
  expect(settings.breadcrumbWidth).toEqual(200);
  expect(settings.countAccessor(new Node())).toEqual(0);
  expect(settings.rerootCallback).toBe(undefined);
});

test("initialise custom", () => {
  const settings: SunburstSettings =
    new SunburstSettings(
      {
        width: 900,
        height: 600,
        enableTooltips: false,
        enableBreadcrumbs: false,
      } as SunburstSettingsData);
  expect(settings.height).toEqual(600);
  expect(settings.width).toEqual(900);
  //expect(settings.enableTooltips).toEqual(false);
  expect(settings.className).toEqual("unipept-sunburst");
  expect(settings.enableBreadcrumbs).toEqual(false);
  expect(settings.breadcrumbWidth).toEqual(200);
  expect(settings.countAccessor(new Node())).toEqual(0);
  expect(settings.rerootCallback).toBe(undefined);
});

// test("readableColor to return white for dark colors", () => {
//   expect(getReadableColorFor("black")).toEqual("#fff");
//   expect(getReadableColorFor("#000")).toEqual("#fff");
// });

// test("readableColor to return black for white colors", () => {
//   expect(getReadableColorFor("white")).toEqual("#000");
//   expect(getReadableColorFor("#fff")).toEqual("#000");
// }); 
