
import { waitForCondition } from "../../../test/TestUtils";
import TestConsts from "./../../../test/TestConsts";
import TreemapSettings from "./../TreemapSettings";
import { JSDOM } from "jsdom";
import Treemap from "./../Treemap";
import DataNode from "./../../../DataNode";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

import puppeteer from "puppeteer";
import taxonomyObject from "./resources/taxonomy.json";

describe("Treemap", () => {
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

    async function createTreemap(jsDom: JSDOM, settings: TreemapSettings): Promise<Treemap> {
        const element = jsDom.window.document.getElementById("visualization")!;

        settings["width"] = 800;
        settings["height"] = 800;

        const treemap = new Treemap(element, taxonomyObject, settings);

        await waitForCondition(() => element.getElementsByClassName("node").length > 0, 2000, 500);

        return treemap;
    }

    async function makeScreenshot(jsDom: JSDOM): Promise<any> {
        const page = await browser.newPage();
        page.setViewport({
            width: 1000,
            height: 1000
        });

        // Render image and capture screenshot
        await page.setContent(jsDom.serialize());
        return page.screenshot();
    }

    beforeAll(async() => {
        browser = await puppeteer.launch();
    });

    it("should render a treemap with default settings", async() => {
        const jsDom = createJSDom();
        const treemap = await createTreemap(jsDom, new TreemapSettings());

        const image = await makeScreenshot(jsDom);
        expect(image).toMatchImageSnapshot(TestConsts.resolveImageSnapshotFolder(__filename));
    });

    it("should trigger a custom callback when a node is clicked in the visualization", async() => {
        const jsDom = createJSDom();

        let nodeFromCallback: DataNode | null = null;

        const settings = new TreemapSettings();
        settings.rerootCallback = (d: DataNode) => nodeFromCallback = d;

        const treemap = await createTreemap(jsDom, settings);

        expect(nodeFromCallback!.name).toEqual("root");

        // new Event("click") does apparently not work in combination with Jest and JSDOM
        const event = jsDom.window.document.createEvent("CustomEvent");
        event.initEvent("click", true, true);

        const oldSerializedHtml = jsDom.serialize();

        jsDom.window.document.getElementsByClassName("node").item(1)!.dispatchEvent(event);

        await waitForCondition(() => oldSerializedHtml !== jsDom.serialize(), 2000, 500);

        expect(nodeFromCallback!.name).toEqual("Bacteria");
    });

    afterAll(async() => {
        await browser.close();
    });
});
