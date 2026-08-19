import Sunburst from "./../Sunburst";
import { waitForCondition, waitForPromises } from "./../../../test/TestUtils";
import SunburstSettings from "./../SunburstSettings";
import DataNode from "./../../../DataNode";
import TestConsts from "./../../../test/TestConsts";
import { JSDOM } from "jsdom";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

import puppeteer from "puppeteer";
import taxonomyObject from "../../../test/resources/taxonomy.json";
import NodeUtils from "./../../../utilities/NodeUtils";

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

    function labelsOf(element: HTMLElement): string[] {
        return Array.from(element.getElementsByTagName("text"))
            .map((label: SVGTextElement) => label.textContent!)
            .filter((text: string) => text.length > 0)
            .sort();
    }

    function opacityOfLabel(element: HTMLElement, name: string): number {
        const label = Array.from(element.getElementsByTagName("text")).find(l => l.textContent === name);
        return label ? Number.parseFloat(label.style.getPropertyValue("fill-opacity")) : 0;
    }

    function visibleLabelsOf(element: HTMLElement): string[] {
        return Array.from(element.getElementsByTagName("text"))
            .filter((label: SVGTextElement) => Number.parseFloat(label.style.getPropertyValue("fill-opacity")) > 0.5)
            .map((label: SVGTextElement) => label.textContent!)
            .filter((text: string) => text.length > 0)
            .sort();
    }

    function clickArcOf(dom: JSDOM, element: HTMLElement, name: string) {
        const arc = Array.from(element.getElementsByTagName("path"))
            .find((path: any) => path.__data__?.data?.name === name);
        expect(arc).toBeDefined();

        // new Event("click") does apparently not work in combination with Jest and JSDOM
        const event = dom.window.document.createEvent("CustomEvent");
        event.initEvent("click", true, true);
        arc!.dispatchEvent(event);
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

    it("should not draw a render on the view of a render that was interrupted", async() => {
        const animationDuration = 400;
        // Comfortably longer than an animation, which runs on wall clock time.
        const settled = 3 * animationDuration;

        /**
         * Reroot on each of the given nodes in turn, waiting the matching amount of
         * milliseconds after each of the clicks.
         */
        const drillDown = async(names: string[], gaps: number[]) => {
            const dom = createJSDom();
            const element = dom.window.document.getElementById("visualization")!;

            const settings = new SunburstSettings();
            settings.animationDuration = animationDuration;

            new Sunburst(element, taxonomyObject, settings);
            await waitForCondition(() => opacityOfLabel(element, "Eukaryota") === 1, 5000, 100);

            const rootLabels = labelsOf(element);

            for (let i = 0; i < names.length; i++) {
                clickArcOf(dom, element, names[i]);
                await waitForPromises(gaps[i]);
            }

            return { rootLabels, labels: labelsOf(element), visible: visibleLabelsOf(element) };
        };

        // Labels that are only drawn while Eukaryota is the root.
        const eukaryota = await drillDown(["Eukaryota"], [settled]);
        const eukaryotaOnly = eukaryota.labels.filter((label: string) => !eukaryota.rootLabels.includes(label));
        expect(eukaryotaOnly.length).toBeGreaterThan(0);

        const path = ["Eukaryota", "Bacteria", "Proteobacteria"];
        const slowly = await drillDown(path, [settled, settled, settled]);
        // The second click supersedes the Eukaryota render long before it ends, so
        // the third one may not join its labels on the view that render was drawing.
        const rapidly = await drillDown(path, [60, 140, settled]);

        expect(rapidly.labels.filter((label: string) => eukaryotaOnly.includes(label))).toEqual([]);
        // Which labels end up on screen may not depend on how fast the clicks came in.
        expect(rapidly.visible).toEqual(slowly.visible);
    }, 30000);

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

    it("should keep every label when rerooting to a node that was not on screen", async() => {
        const dom = createJSDom();
        const element = dom.window.document.getElementById("visualization")!;

        const settings = new SunburstSettings();
        settings["animationDuration"] = 0;

        const sunburst = new Sunburst(element, taxonomyObject, settings);
        await waitForCondition(() => element.getElementsByTagName("text").length > 0, 3000, 500);

        // Only `levels` rings are drawn, so a node below that depth has never had a label and its parent is therefore
        // absent from the set the labels are joined to. That is the case in which the guard around the parent has to
        // hold: the render still has to draw one label per node it is given.
        const internals = sunburst as unknown as { data: any[], textData: any[], currentMaxLevel: number };
        const target = internals.data.find(node => node.depth === 5 && node.data.name !== "empty")!;

        expect(target).toBeDefined();

        const onScreen = internals.textData;
        sunburst.reroot(target.data.id);

        await waitForCondition(() => false, 500, 100);

        // The labels are joined to everything that was already on screen plus everything the new root brings in. The
        // parent of the new root is in neither, so nothing may be dropped.
        const expected = new Set(onScreen);
        internals.data
            .filter(node => NodeUtils.isParentOf(target, node, internals.currentMaxLevel))
            .forEach(node => expected.add(node));

        expect(element.getElementsByTagName("text").length).toEqual(expected.size);
    });

    afterAll(async() => {
        await browser.close();
    });
});
