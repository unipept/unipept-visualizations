import Sunburst from "./../Sunburst";
import { waitForCondition, waitForPromises } from "./../../../test/TestUtils";
import SunburstSettings from "./../SunburstSettings";
import DataNode from "./../../../DataNode";
import TestConsts from "./../../../test/TestConsts";
import { JSDOM } from "jsdom";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

import puppeteer from "puppeteer";
import taxonomyObject from "../../../test/resources/taxonomy.json";

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

        new Sunburst(element, taxonomyObject, settings);

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

        new Sunburst(element, taxonomyObject, settings);

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

    it("should keep the labels that survive a reroot on screen during the animation", async() => {
        const dom = createJSDom();

        const element = dom.window.document.getElementById("visualization")!;

        const settings = new SunburstSettings();
        // Long enough that the assertions below land well before the animation ends.
        settings.animationDuration = 1000;

        new Sunburst(element, taxonomyObject, settings);

        const labelFor = (name: string) =>
            Array.from(element.getElementsByTagName("text")).find(t => t.textContent === name);
        const opacityOf = (label: SVGTextElement) =>
            Number.parseFloat(label.style.getPropertyValue("fill-opacity"));

        // Wait for the initial animation to have faded the labels in completely.
        await waitForCondition(() => {
            const label = labelFor("Eukaryota");
            return !!label && opacityOf(label) === 1;
        }, 5000, 100);

        const before = labelFor("Eukaryota")!;
        expect(before).toBeDefined();
        expect(opacityOf(before)).toEqual(1);

        // new Event("click") does apparently not work in combination with Jest and JSDOM
        const event = dom.window.document.createEvent("CustomEvent");
        event.initEvent("click", true, true);

        // Reroot on Eukaryota, which keeps its own label and the labels of its children.
        element.getElementsByTagName("path").item(1)!.dispatchEvent(event);

        await waitForPromises(50);

        const during = labelFor("Eukaryota")!;
        // A recreated label would be a different element sitting at zero opacity.
        expect(during).toBe(before);
        expect(opacityOf(during)).toEqual(1);
    });

    it("should trigger a custom callback when a node is clicked", async() => {
        const dom = createJSDom();

        const element = dom.window.document.getElementById("visualization")!;

        let nodeFromCallback: DataNode | null = null;

        const settings = new SunburstSettings();
        settings.animationDuration = 0;
        settings.rerootCallback = (d: DataNode) => nodeFromCallback = d;

        new Sunburst(element, taxonomyObject, settings);

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
