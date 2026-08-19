import { waitForCondition } from "../../../test/TestUtils";
import TestConsts from "./../../../test/TestConsts";
import TreeviewSettings from "./../TreeviewSettings";
import { JSDOM } from "jsdom";
import { createTestDom } from "../../../test/TestDom";
import Treeview from "./../Treeview";
import TreeviewNode from "./../TreeviewNode";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

import puppeteer from "puppeteer";
import taxonomyObject from "../../../test/resources/taxonomy.json";

describe("Treeview", () => {
    let browser: any;

    async function createTreeview(jsDom: JSDOM, settings: TreeviewSettings): Promise<Treeview> {
        const element = jsDom.window.document.getElementById("visualization")!;

        settings["width"] = 800;
        settings["height"] = 800;

        const treeview = new Treeview(element, taxonomyObject, settings);

        await waitForCondition(() => element.getElementsByClassName("node").length > 0, 2000, 500);
        await waitForRender(jsDom);

        return treeview;
    }

    /**
     * Waits for the entering transition to have run.
     *
     * A node is appended with a radius of 1e-6 and a label at fill-opacity
     * 1e-6, and only the transition gives either a visible value. Reading the
     * DOM as soon as the nodes exist therefore describes a tree that is present
     * but entirely invisible, which is what a screenshot taken at that point
     * records.
     */
    async function waitForRender(jsDom: JSDOM): Promise<void> {
        const settled = () => Array.from(jsDom.window.document.querySelectorAll(".node circle"))
            .some(circle => Number(circle.getAttribute("r")) > 1);

        await waitForCondition(settled, 2000, 100);
    }

    function nodes(jsDom: JSDOM): Element[] {
        return Array.from(jsDom.window.document.getElementsByClassName("node"));
    }

    function labelsOf(jsDom: JSDOM): string[] {
        return nodes(jsDom).map(node => node.textContent?.trim() ?? "");
    }

    /**
     * Clicking a node is what expands or collapses it. `new Event("click")` does
     * not reach d3's listener under JSDOM, which is why the treemap spec builds
     * the event this way too.
     */
    async function clickNode(jsDom: JSDOM, node: Element): Promise<void> {
        const event = jsDom.window.document.createEvent("CustomEvent");
        event.initEvent("click", true, true);

        const before = jsDom.serialize();
        node.dispatchEvent(event);
        await waitForCondition(() => before !== jsDom.serialize(), 2000, 500);
    }

    beforeAll(async() => {
        browser = await puppeteer.launch();
    });

    it("should render a treeview with default settings", async() => {
        const jsDom = createTestDom();
        await createTreeview(jsDom, new TreeviewSettings());

        const page = await browser.newPage();
        page.setViewport({ width: 1000, height: 1000 });
        await page.setContent(jsDom.serialize());

        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot(TestConsts.resolveImageSnapshotFolder(__filename));
    });

    it("should draw a link for every node except the root", async() => {
        const jsDom = createTestDom();
        await createTreeview(jsDom, new TreeviewSettings());

        const linkCount = jsDom.window.document.getElementsByClassName("link").length;
        expect(linkCount).toEqual(nodes(jsDom).length - 1);
    });

    it("should expand fewer levels when levelsToExpand is lowered", async() => {
        const oneLevel = createTestDom();
        const oneLevelSettings = new TreeviewSettings();
        oneLevelSettings.levelsToExpand = 1;
        await createTreeview(oneLevel, oneLevelSettings);

        const twoLevels = createTestDom();
        await createTreeview(twoLevels, new TreeviewSettings());

        // Two levels is the default, so the second tree has to show strictly more.
        expect(new TreeviewSettings().levelsToExpand).toEqual(2);
        expect(nodes(oneLevel).length).toBeLessThan(nodes(twoLevels).length);
    });

    it("should expand a collapsed node when it is clicked", async() => {
        const jsDom = createTestDom();
        const settings = new TreeviewSettings();
        settings.levelsToExpand = 1;
        await createTreeview(jsDom, settings);

        const before = nodes(jsDom).length;

        // The root is drawn first, so its first child is the first node that has
        // a subtree still folded away underneath it.
        await clickNode(jsDom, nodes(jsDom)[1]);

        expect(nodes(jsDom).length).toBeGreaterThan(before);
    });

    it("should not expand anything when enableExpandOnClick is false", async() => {
        const jsDom = createTestDom();
        const settings = new TreeviewSettings();
        settings.levelsToExpand = 1;
        settings.enableExpandOnClick = false;
        await createTreeview(jsDom, settings);

        const before = labelsOf(jsDom);

        const event = jsDom.window.document.createEvent("CustomEvent");
        event.initEvent("click", true, true);
        nodes(jsDom)[1].dispatchEvent(event);
        await waitForCondition(() => false, 500, 100);

        expect(labelsOf(jsDom)).toEqual(before);
    });

    it("should use the configured colorProvider for the coloured levels", async() => {
        const jsDom = createTestDom();
        const settings = new TreeviewSettings();
        settings.colorProvider = () => "steelblue";
        await createTreeview(jsDom, settings);

        const circles = Array.from(jsDom.window.document.querySelectorAll(".node circle"));
        const fills = circles.map(circle => (circle as SVGElement).style.fill);

        // Three fills are legitimate here: the colour the provider returned,
        // white for the leaves, and #aaa for the root, which is the fallback in
        // nodeFillColor and is reached because colorProvider is only called
        // from the root's children downwards. Anything else would mean the
        // default colour scale got a say after all.
        const allowed = ["steelblue", "rgb(255, 255, 255)", "rgb(170, 170, 170)"];

        expect(fills).toContain("steelblue");
        expect(fills.filter(fill => !allowed.includes(fill))).toEqual([]);
    });

    it("should call getLabel for the text next to each node", async() => {
        const jsDom = createTestDom();
        const settings = new TreeviewSettings();
        settings.getLabel = (d: TreeviewNode) => `[${d.name}]`;
        await createTreeview(jsDom, settings);

        expect(labelsOf(jsDom).filter(label => label.length > 0).every(
            label => label.startsWith("[") && label.endsWith("]")
        )).toBe(true);
    });

    it("should restore the initial tree after reset", async() => {
        const jsDom = createTestDom();
        const settings = new TreeviewSettings();
        settings.levelsToExpand = 1;
        const treeview = await createTreeview(jsDom, settings);

        const initial = labelsOf(jsDom);

        await clickNode(jsDom, nodes(jsDom)[1]);
        expect(nodes(jsDom).length).toBeGreaterThan(initial.length);

        treeview.reset();
        await waitForCondition(() => nodes(jsDom).length === initial.length, 2000, 500);

        expect(labelsOf(jsDom)).toEqual(initial);
    });

    afterAll(async() => {
        await browser.close();
    });
});
