import Sunburst from "./../Sunburst";
import { waitForCondition } from "./../../../test/TestUtils";
import SunburstSettings from "./../SunburstSettings";
import DataNode from "./../../../DataNode";
import TestConsts from "./../../../test/TestConsts";
import { JSDOM } from "jsdom";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

import puppeteer from "puppeteer";
import taxonomyObject from "./resources/taxonomy.json";

describe("Sunburst", () => {
    let browser: any;

    function createJSDom() {
        const dom = new JSDOM("<!DOCTYPE html><div id=\"visualization\"></div>", {
            beforeParse(window: any) {
                window.Element.prototype.getComputedTextLength = function() {
                    return 20
                }
            }
        });

        return dom;
    }

    async function createScreenshotForSunburst(settings: SunburstSettings): Promise<any> {
        const dom = createJSDom();

        const element = dom.window.document.getElementById("visualization")!;

        // Animations need to be disabled during the tests
        settings["animationDuration"] = 0;

        const sunburst = new Sunburst(element, taxonomyObject, settings);

        await waitForCondition(() => element.innerHTML.includes("svg"), 3000, 500);

        const page = await browser.newPage();
        page.setViewport({
            width: 1000,
            height: 800
        });

        await page.setContent(dom.serialize());
        return page.screenshot();
    }

    beforeAll(async() => {
        browser = await puppeteer.launch();
    });

    it("should produce the expected image with the default settings", async() => {
        expect(await createScreenshotForSunburst(new SunburstSettings())).toMatchImageSnapshot(TestConsts.resolveImageSnapshotFolder(__filename));
    });

    it("should use fixed colors if requested", async() => {
        const settings = new SunburstSettings();
        settings.useFixedColors = true;
        expect(await createScreenshotForSunburst(settings)).toMatchImageSnapshot(TestConsts.resolveImageSnapshotFolder(__filename));
    });

    it("should change labels if requested", async() => {
        const settings = new SunburstSettings();
        settings.getLabel = (x: DataNode) => x.id.toString();
        expect(await createScreenshotForSunburst(settings)).toMatchImageSnapshot(TestConsts.resolveImageSnapshotFolder(__filename));
    });

    it("should show breadcrumbs if a node is clicked", async() => {
        const dom = createJSDom();

        const element = dom.window.document.getElementById("visualization")!;

        const settings = new SunburstSettings();
        settings.animationDuration = 0;

        const sunburst = new Sunburst(element, taxonomyObject, settings);

        await waitForCondition(() => element.innerHTML.includes("svg"), 2000, 500);

        // new Event("click") does apparently not work in combination with Jest and JSDOM
        const event = dom.window.document.createEvent("CustomEvent");
        event.initEvent("click", true, true);

        element.getElementsByTagName("path").item(1)!.dispatchEvent(event);

        await waitForCondition(() => element.innerHTML.includes("crumb"), 2000, 500);

        const page = await browser.newPage();
        page.setViewport({
            width: 1000,
            height: 800
        });
        await page.setContent(dom.serialize());

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot(TestConsts.resolveImageSnapshotFolder(__filename));
    });

    it("should trigger a custom callback when a node is clicked", async() => {
        const dom = createJSDom();

        const element = dom.window.document.getElementById("visualization")!;

        let nodeFromCallback: DataNode | null = null;

        const settings = new SunburstSettings();
        settings.animationDuration = 0;
        settings.rerootCallback = (d: DataNode) => nodeFromCallback = d;

        const sunburst = new Sunburst(element, taxonomyObject, settings);

        await waitForCondition(() => element.innerHTML.includes("svg"), 2000, 500);

        expect(nodeFromCallback!.name).toEqual("root");

        // new Event("click") does apparently not work in combination with Jest and JSDOM
        const event = dom.window.document.createEvent("CustomEvent");
        event.initEvent("click", true, true);

        element.getElementsByTagName("path").item(1)!.dispatchEvent(event);

        await waitForCondition(() => element.innerHTML.includes("crumb"), 2000, 500);

        expect(nodeFromCallback!.name).toEqual("Eukaryota");
    });

    afterAll(async() => {
        await browser.close();
    });
});
