import TestConsts from "./../../../test/TestConsts";
import { createTestDom } from "../../../test/TestDom";
import { waitForCondition } from "../../../test/TestUtils";
import { BarplotSettings } from "./../BarplotSettings";
import { Bar } from "./../Bar";
import Barplot from "./../Barplot";
import { JSDOM } from "jsdom";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

import puppeteer from "puppeteer";

describe("Barplot", () => {
    let browser: any;

    function bars(): Bar[] {
        return [
            {
                label: "Sample 1",
                items: [
                    { label: "Bacteria", counts: 10 },
                    { label: "Eukaryota", counts: 5 },
                    { label: "Archaea", counts: 1 },
                ]
            },
            {
                label: "Sample 2",
                items: [
                    { label: "Bacteria", counts: 6 },
                    { label: "Eukaryota", counts: 12 },
                    { label: "Archaea", counts: 2 },
                ]
            }
        ];
    }

    async function createBarplot(jsDom: JSDOM, settings: BarplotSettings, data: Bar[] = bars()): Promise<Barplot> {
        const element = jsDom.window.document.getElementById("visualization")!;

        settings["width"] = 800;
        settings["height"] = 800;

        const barplot = new Barplot(element, data, settings);

        await waitForCondition(() => element.getElementsByTagName("svg").length > 0, 2000, 500);

        return barplot;
    }

    function legendLabels(jsDom: JSDOM): string[] {
        return Array.from(jsDom.window.document.querySelectorAll(".legend-item"))
            .map(entry => entry.getAttribute("data-legend-entry") ?? "");
    }

    function valueLabels(jsDom: JSDOM): string[] {
        return Array.from(jsDom.window.document.querySelectorAll("text[data-key]"))
            .map(text => text.textContent ?? "");
    }

    beforeAll(async() => {
        browser = await puppeteer.launch();
    });

    it("should render a barplot with default settings", async() => {
        const jsDom = createTestDom();
        await createBarplot(jsDom, new BarplotSettings());

        const page = await browser.newPage();
        page.setViewport({ width: 1000, height: 1000 });
        await page.setContent(jsDom.serialize());

        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot(TestConsts.resolveImageSnapshotFolder(__filename));
    });

    it("should give the legend one entry per category", async() => {
        const jsDom = createTestDom();
        await createBarplot(jsDom, new BarplotSettings());

        // Nothing was binned into "Other" here, so it is not in the legend.
        expect(new Set(legendLabels(jsDom))).toEqual(
            new Set(["Bacteria", "Eukaryota", "Archaea"])
        );
    });

    it("should list Other in the legend once something is binned into it", async() => {
        const jsDom = createTestDom();
        const settings = new BarplotSettings();
        settings.maxItems = 2;
        await createBarplot(jsDom, settings);

        expect(new Set(legendLabels(jsDom))).toEqual(
            new Set(["Bacteria", "Eukaryota", "Other"])
        );
    });

    it("should label every bar", async() => {
        const jsDom = createTestDom();
        await createBarplot(jsDom, new BarplotSettings());

        const labels = Array.from(jsDom.window.document.querySelectorAll(".barLabels text"))
            .map(text => text.textContent);

        expect(labels).toEqual(["Sample 1", "Sample 2"]);
    });

    it("should show percentages in relative mode", async() => {
        const jsDom = createTestDom();
        const settings = new BarplotSettings();
        settings.displayMode = "relative";
        await createBarplot(jsDom, settings);

        const labels = valueLabels(jsDom).filter(label => label.length > 0);

        expect(labels.length).toBeGreaterThan(0);
        expect(labels.every(label => label.endsWith("%"))).toBe(true);
    });

    it("should show raw counts in absolute mode", async() => {
        const jsDom = createTestDom();
        const settings = new BarplotSettings();
        settings.displayMode = "absolute";
        await createBarplot(jsDom, settings);

        const labels = valueLabels(jsDom).filter(label => label.length > 0);

        // In the bars the count is written bare; the "10 hits" phrasing belongs
        // to the tooltip, not to this label.
        expect(labels.length).toBeGreaterThan(0);
        expect(labels.every(label => /^\d+$/.test(label))).toBe(true);
        expect(labels).toContain("10");
    });

    it("should fold the categories past maxItems into Other", async() => {
        const jsDom = createTestDom();
        const settings = new BarplotSettings();
        settings.maxItems = 1;
        await createBarplot(jsDom, settings);

        // Only the largest category of the first bar survives by name.
        expect(new Set(legendLabels(jsDom))).toEqual(new Set(["Bacteria", "Other"]));
    });

    it("should render every bar it is given", async() => {
        const jsDom = createTestDom();
        const data = [...bars(), {
            label: "Sample 3",
            items: [{ label: "Bacteria", counts: 4 }, { label: "Eukaryota", counts: 4 }]
        }];

        await createBarplot(jsDom, new BarplotSettings(), data);

        const labels = Array.from(jsDom.window.document.querySelectorAll(".barLabels text"))
            .map(text => text.textContent);

        expect(labels).toEqual(["Sample 1", "Sample 2", "Sample 3"]);
    });

    afterAll(async() => {
        await browser.close();
    });
});
