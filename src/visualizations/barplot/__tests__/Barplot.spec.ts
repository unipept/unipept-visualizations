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

    /**
     * Right edge of the widest bar, which is where the plot area ends and thus follows the configured width.
     */
    function barExtent(jsDom: JSDOM): number {
        const rects = Array.from(jsDom.window.document.querySelectorAll(".barplot-item rect"));

        return Math.max(...rects.map(rect =>
            Number.parseFloat(rect.getAttribute("x")!) + Number.parseFloat(rect.getAttribute("width")!)
        ));
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

    it("should replace the previous barplot when constructed again on the same element", async() => {
        const jsDom = createTestDom();
        await createBarplot(jsDom, new BarplotSettings());

        const element = jsDom.window.document.getElementById("visualization")!;
        const items = element.getElementsByClassName("barplot-item").length;
        const children = element.children.length;
        const styles = jsDom.window.document.head.getElementsByTagName("style").length;

        await createBarplot(jsDom, new BarplotSettings());

        expect(element.getElementsByClassName("barplot-item").length).toEqual(items);
        expect(element.children.length).toEqual(children);
        expect(jsDom.window.document.head.getElementsByTagName("style").length).toEqual(styles);
        expect(element.className.split(/\s+/).filter((name: string) => name === "barplot")).toHaveLength(1);
    });

    it("should keep the defaults of the nested settings that are not given", async() => {
        // A plain object literal is what a user of the library passes in, and it only mentions what it changes. The
        // cast is what that costs in TypeScript: the constructor asks for a complete BarplotSettings.
        const overrides = {
            chart: { padding: { left: 40 } },
            legend: { titleFontSize: 40 }
        } as unknown as BarplotSettings;

        const withDefaults = createTestDom();
        await createBarplot(withDefaults, new BarplotSettings());

        const withOverrides = createTestDom();
        await createBarplot(withOverrides, overrides);

        const barLabel = (jsDom: JSDOM) =>
            jsDom.window.document.querySelector(".barLabels text")!;
        const legendTitle = (jsDom: JSDOM) => Array.from(
            jsDom.window.document.getElementsByTagName("text")
        ).find(text => text.textContent === "Legend")!;

        // The override reaches the render.
        expect(barLabel(withOverrides).getAttribute("x")).toEqual("40");
        expect(legendTitle(withOverrides).getAttribute("font-size")).toEqual("40");

        // Everything the override did not mention keeps its default. The vertical position of a bar label is built
        // from chart.padding.top, which is only reachable if overriding `left` alone left the rest of the padding
        // object intact.
        expect(barLabel(withOverrides).getAttribute("y")).toEqual(barLabel(withDefaults).getAttribute("y"));
        expect(barLabel(withDefaults).getAttribute("x")).toEqual("10");
        expect(legendTitle(withDefaults).getAttribute("font-size")).toEqual("24");
    });

    it("should lay the plot out against the new size when it is resized", async() => {
        const jsDom = createTestDom();
        const barplot = await createBarplot(jsDom, new BarplotSettings());

        const element = jsDom.window.document.getElementById("visualization")!;
        const svg = () => element.getElementsByTagName("svg").item(0)!;

        // The plot area is what is left of the width after the chart padding, the bar labels and the space behind
        // them: 800 - 10 - 10 - 150 - 10.
        expect(barExtent(jsDom)).toBe(790);

        barplot.resize(1200, 400);

        expect(svg().getAttribute("width")).toBe("1200");
        expect(svg().getAttribute("height")).toBe("400");
        expect(svg().getAttribute("viewBox")).toBe("0 0 1200 400");
        expect(barExtent(jsDom)).toBe(1190);
    });

    it("should still render the same bars after a resize", async() => {
        const jsDom = createTestDom();
        const barplot = await createBarplot(jsDom, new BarplotSettings());

        const element = jsDom.window.document.getElementById("visualization")!;
        const barLabels = () => Array.from(element.querySelectorAll(".barLabels text")).map(text => text.textContent);
        const items = () => element.getElementsByClassName("barplot-item").length;

        const labelsBefore = barLabels();
        const itemsBefore = items();

        barplot.resize(1200, 400);

        expect(barLabels()).toEqual(labelsBefore);
        expect(items()).toEqual(itemsBefore);
        expect(new Set(legendLabels(jsDom))).toEqual(new Set(["Bacteria", "Eukaryota", "Archaea"]));

        const labels = valueLabels(jsDom).filter(label => label.length > 0);
        expect(labels.length).toBeGreaterThan(0);
        expect(labels.every(label => label.endsWith("%"))).toBe(true);
    });

    it("should replace the previous render when resized instead of adding a second one", async() => {
        const jsDom = createTestDom();
        const barplot = await createBarplot(jsDom, new BarplotSettings());

        const element = jsDom.window.document.getElementById("visualization")!;
        const children = element.children.length;
        const styles = jsDom.window.document.head.getElementsByTagName("style").length;

        barplot.resize(1200, 400);
        barplot.resize(900, 500);

        expect(element.getElementsByTagName("svg").length).toBe(1);
        expect(element.children.length).toEqual(children);
        expect(jsDom.window.document.head.getElementsByTagName("style").length).toEqual(styles);
        expect(element.className.split(/\s+/).filter((name: string) => name === "barplot")).toHaveLength(1);
    });

    afterAll(async() => {
        await browser.close();
    });
});
