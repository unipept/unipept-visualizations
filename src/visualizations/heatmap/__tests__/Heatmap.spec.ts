// @ts-nocheck

import HeatmapSettings from "./../HeatmapSettings";
import Heatmap from "./../Heatmap";
import * as cluster from "cluster";
import { JSDOM } from "jsdom";
import { sleep, waitForCondition } from "./../../../test/TestUtils";
import TestConsts from "./../../../test/TestConsts";

const puppeteer = require("puppeteer");

describe("Heatmap", () => {
    let browser: any;

    function createJSDom(): JSDOM {
        const dom = new JSDOM(`<!DOCTYPE html><div id="visualization"></div>`, {
            beforeParse(window: any) {
                window.Element.prototype.getComputedTextLength = function() {
                    return 20
                }
            }
        });

        return dom;
    }

    function getClusterData(): [number[][], string[], string[]] {
        const items = [
            [0.87, 1.48, 0.78, 0.87, 0.5, 1.5, 0.93, 1.07, 1.04, 0.96, 0.67, 1.33, 0.73, 1.21, 1.21, 0.85, 0.33, 1.67, 0.72, 2.07, 0.21, 1.17, 0.83, 0.63, 0.47, 0.95, 1.11, 2.21, 0.63, 1.14, 0.86, 0.63, 1.47, 1.47, 0.42, 0.6, 1.4, 0.86, 1.29, 0.86, 1.71, 0.43, 0.86, 0, 0.78, 1.57, 1.3, 0.78, 1.57, 1, 1.4, 0.8, 0.8, 0.62, 1.69, 0.92, 0.77, 0.55, 1.45],
            [0.64, 2.02, 0.97, 0.37, 0.5, 1.5, 1.17, 0.83, 1.57, 0.43, 0.9, 1.1, 0.91, 2.09, 0.5, 0.5, 1.07, 0.93, 1.09, 1.91, 0, 1.54, 0.46, 0.95, 0.06, 0.63, 1.83, 2.27, 0.25, 0.52, 1.48, 0.59, 1.41, 1.84, 0.16, 1.65, 0.35, 1.3, 3.24, 0.97, 0.24, 0.24, 0, 0.4, 2.32, 0.96, 0.24, 0.48, 1.6, 0.37, 1.33, 1.93, 0.37, 0.95, 1.55, 1.35, 0.15, 0.48, 1.52],
            [0.53, 2.19, 0.53, 0.75, 0.5, 1.5, 0.39, 1.61, 1.15, 0.85, 0.35, 1.65, 0.25, 2.67, 0.5, 0.58, 0.12, 1.88, 0.25, 2.75, 0, 1.67, 0.33, 0, 0, 0.97, 1.55, 3.1, 0.39, 0.3, 1.7, 0.13, 1.33, 1.33, 1.2, 1.68, 0.32, 0, 2, 3.25, 0.25, 0.25, 0.25, 0.22, 1.56, 0.89, 0.56, 0.22, 2.56, 0.53, 1.78, 0.89, 0.8, 0.48, 1.92, 1.44, 0.16, 0.3, 1.7],
            [0, 1.35, 2.46, 0.18, 0, 2, 0, 2, 2, 0, 0, 2, 0.06, 2.58, 1.29, 0.06, 0, 2, 0, 3, 0, 2, 0, 0, 0, 0, 3.95, 2.05, 0, 0, 2, 0.11, 1.95, 1.95, 0, 2, 0, 0.21, 3.93, 0.83, 0.21, 0.62, 0.21, 0, 1.64, 1.82, 0, 0, 2.55, 0, 1.81, 2.19, 0, 0, 2.87, 1.13, 0, 0, 2],
            [0, 1.82, 2.06, 0.12, 0, 2, 0, 2, 1.85, 0.15, 0, 2, 0.67, 2.1, 0.67, 0.57, 0, 2, 0, 3, 0, 2, 0, 0, 0, 0, 3, 3, 0, 0, 2, 0.14, 1.43, 2.14, 0.29, 1.87, 0.13, 0.34, 3.62, 1.47, 0.45, 0.11, 0, 0, 2.14, 2.14, 0, 0, 1.71, 0, 2.43, 1.39, 0.17, 0, 2.73, 1.09, 0.18, 0, 2],
            [0.63, 1.9, 1.4, 0.06, 0.5, 1.5, 0.52, 1.48, 1.22, 0.78, 0.06, 1.94, 1.07, 1.95, 0.88, 0.1, 0.11, 1.89, 0.44, 2.56, 0, 1.62, 0.38, 1.85, 0, 0.23, 1.96, 1.96, 0, 0.05, 1.95, 0.24, 1.94, 1.82, 0, 1.11, 0.89, 2.37, 1.89, 1.74, 0, 0, 0, 0.21, 2.9, 2.28, 0, 0.21, 0.41, 0.11, 2.97, 0.91, 0, 0.47, 1.8, 1.73, 0, 0.2, 1.8],
            [0.28, 2.05, 0.65, 1.02, 0, 0, 0.32, 1.68, 0.96, 1.04, 0.31, 1.69, 0.39, 3.22, 0.2, 0.2, 0, 2, 0.4, 2.6, 0, 2, 0, 0.15, 0, 0.31, 0.77, 4.77, 0, 0.33, 1.67, 0.94, 0, 0.71, 2.35, 2, 0, 1.33, 4.67, 0, 0, 0, 0, 0.4, 1.6, 1.6, 0, 0, 2.4, 0, 3.83, 0.17, 0, 0.22, 2.22, 0.67, 0.89, 0, 2]
        ];

        const rows = [
            "D45211", "U12334", "D00834", "D23668", "M11276", "L12983", "X59466"
        ];

        const columns = [
            "S0", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12", "S13", "S14", "S15", "S16", "S17", "S18", "S19", "S20", "S21", "S22", "S23", "S24", "S25", "S26", "S27", "S28", "S29", "S30", "S31", "S32", "S33", "S34", "S35", "S36", "S37", "S38", "S39", "S40", "S41", "S42", "S43", "S44", "S45", "S46", "S47", "S48", "S49", "S50", "S51", "S52", "S53", "S54", "S55", "S56", "S57", "S58"
        ];

        return [items, rows, columns];
    }

    async function createHeatmap(jsDom: JSDOM, settings: HeatmapSettings): Promise<Heatmap> {
        const element = jsDom.window.document.getElementById("visualization")!;

        settings["width"] = 800;
        settings["height"] = 400;
        settings["animationsEnabled"] = false;
        settings["animationDuration"] = 0;

        const [items, rows, columns] = getClusterData();
        const heatmap = new Heatmap(element, items, rows, columns, settings);

        await waitForCondition(() => element.innerHTML.includes("canvas"), 2000, 500);

        return heatmap;
    }

    async function makeScreenshot(jsDom: JSDOM): Promise<any> {
        const dataUrl = jsDom.window.document.getElementsByTagName("canvas").item(0).toDataURL();

        const page = await browser.newPage();
        page.setViewport({
            width: 800,
            height: 400
        });

        // Render image and capture screenshot
        await page.setContent(`
            <html>
            <body>
                <img src="${dataUrl}" />
            </body>
            </html>
        `);

        return page.screenshot();
    }

    beforeAll(async() => {
        browser = await puppeteer.launch();
    });

    it("should produce the expected image with default settings", async() => {
        const jsDom = createJSDom();
        const heatmap = await createHeatmap(jsDom, {});

        const image = await makeScreenshot(jsDom);
        expect(image).toMatchImageSnapshot(TestConsts.resolveImageSnapshotFolder(__filename));
    });

    it("should cluster the results if requested", async() => {
        const jsDom = createJSDom();
        const heatmap = await createHeatmap(jsDom, {});

        const canvas = jsDom.window.document.getElementsByTagName("canvas").item(0);
        const firstDataUrl = canvas.toDataURL();

        heatmap.cluster();

        await waitForCondition(() => firstDataUrl !== canvas.toDataURL(), 2000, 500);

        const image = await makeScreenshot(jsDom);
        expect(image).toMatchImageSnapshot(TestConsts.resolveImageSnapshotFolder(__filename));
    });

    it("should render dendrograms if requested", async() => {
        const jsDom = createJSDom();
        const heatmap = await createHeatmap(jsDom, { dendrogramEnabled: true });

        const canvas = jsDom.window.document.getElementsByTagName("canvas").item(0);
        const firstDataUrl = canvas.toDataURL();

        heatmap.cluster();

        await waitForCondition(() => firstDataUrl !== canvas.toDataURL(), 2000, 500);

        const image = await makeScreenshot(jsDom);
        expect(image).toMatchImageSnapshot(TestConsts.resolveImageSnapshotFolder(__filename));
    });

    it("should change color if custom colors are configured", async() => {
        const jsDom = createJSDom();
        const heatmap = await createHeatmap(jsDom, { minColor: "#ffebee", maxColor: "#c62828" });

        const image = await makeScreenshot(jsDom);
        expect(image).toMatchImageSnapshot(TestConsts.resolveImageSnapshotFolder(__filename));
    });

    afterAll(async() => {
        await browser.close();
    });
});
