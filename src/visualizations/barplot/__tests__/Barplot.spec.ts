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

    /**
     * Builds a barplot without forcing a size onto the settings first, which is what the tests about the size need.
     */
    async function buildBarplot(jsDom: JSDOM, settings: BarplotSettings, data: Bar[] = bars()): Promise<HTMLElement> {
        const element = jsDom.window.document.getElementById("visualization")!;

        new Barplot(element, data, settings);

        await waitForCondition(() => element.getElementsByTagName("svg").length > 0, 2000, 500);

        return element;
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

    // The document of the test environment rather than a JSDOM of its own: a selection that is not scoped to one
    // barplot reaches across the whole document, and a barplot in a document nothing else lives in cannot show that.
    it("should highlight only the barplot the cursor is over", async() => {
        document.body.innerHTML = "";

        const hosts = ["first", "second"].map(id => {
            const host = document.createElement("div");
            host.id = id;
            document.body.appendChild(host);
            return host;
        });

        for (const host of hosts) {
            const settings = new BarplotSettings();
            settings.width = 800;
            settings.height = 800;
            new Barplot(host, bars(), settings);
            await waitForCondition(() => host.getElementsByTagName("svg").length > 0, 2000, 500);
        }

        const [first, second] = hosts;
        first.querySelector(".barplot-item")!.dispatchEvent(
            new MouseEvent("mouseover", { clientX: 10, clientY: 10 })
        );

        expect(first.getElementsByClassName("barplot-item-highlighted").length).toBeGreaterThan(0);
        expect(second.getElementsByClassName("barplot-item-highlighted")).toHaveLength(0);
        expect(second.getElementsByClassName("legend-item-highlighted")).toHaveLength(0);
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

    it("should lay the plot out against the new width when it is resized", async() => {
        const jsDom = createTestDom();
        const barplot = await createBarplot(jsDom, new BarplotSettings());

        const element = jsDom.window.document.getElementById("visualization")!;
        const svg = () => element.getElementsByTagName("svg").item(0)!;

        // The plot area is what is left of the width after the chart padding, the bar labels and the space behind
        // them: 800 - 10 - 10 - 150 - 10.
        expect(barExtent(jsDom)).toBe(790);

        const height = svg().getAttribute("height");

        barplot.resize(1200);

        expect(svg().getAttribute("width")).toBe("1200");
        expect(svg().getAttribute("viewBox")).toBe(`0 0 1200 ${height}`);
        expect(barExtent(jsDom)).toBe(1190);

        // Nothing about the height of the visualization is a function of its width.
        expect(svg().getAttribute("height")).toBe(height);
    });

    it("should still render the same bars after a resize", async() => {
        const jsDom = createTestDom();
        const barplot = await createBarplot(jsDom, new BarplotSettings());

        const element = jsDom.window.document.getElementById("visualization")!;
        const barLabels = () => Array.from(element.querySelectorAll(".barLabels text")).map(text => text.textContent);
        const items = () => element.getElementsByClassName("barplot-item").length;

        const labelsBefore = barLabels();
        const itemsBefore = items();

        barplot.resize(1200);

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

        barplot.resize(1200);
        barplot.resize(900);

        expect(element.getElementsByTagName("svg").length).toBe(1);
        expect(element.children.length).toEqual(children);
        expect(jsDom.window.document.head.getElementsByTagName("style").length).toEqual(styles);
        expect(element.className.split(/\s+/).filter((name: string) => name === "barplot")).toHaveLength(1);
    });

    it("should be as tall as the bars, the axis and the legend it holds", async() => {
        const jsDom = createTestDom();
        await createBarplot(jsDom, new BarplotSettings());

        const height = (dom: JSDOM) =>
            dom.window.document.getElementsByTagName("svg").item(0)!.getAttribute("height");

        // Two bars of 75, the 40 the axis takes up, and a legend of one row: its padding (10 and 10), its title
        // (24) and the 10 underneath that, and a row of 16.
        expect(height(jsDom)).toBe("260");

        const taller = createTestDom();
        await createBarplot(taller, new BarplotSettings(), [...bars(), {
            label: "Sample 3",
            items: [{ label: "Bacteria", counts: 4 }, { label: "Eukaryota", counts: 4 }]
        }]);

        // One more bar is one more barHeight, and nothing else.
        expect(height(taller)).toBe("335");
    });

    it("should ignore the height in the settings", async() => {
        const heightOf = async(height: number) => {
            const settings = new BarplotSettings();
            settings.height = height;

            const element = await buildBarplot(createTestDom(), settings);

            return element.getElementsByTagName("svg").item(0)!.getAttribute("height");
        };

        // A barplot is as tall as its contents whatever the settings ask for, so both of these are the 260 the two
        // bars above come to.
        expect(await heightOf(100)).toBe("260");
        expect(await heightOf(5000)).toBe("260");
    });

    it("should draw every bar it is given, however many that is", async() => {
        const jsDom = createTestDom();
        const many = Array.from({ length: 20 }, (_, i) => ({
            label: `Sample ${i}`,
            items: [
                { label: "Bacteria", counts: 10 + i },
                { label: "Eukaryota", counts: 5 },
                { label: "Archaea", counts: 1 }
            ]
        }));

        await createBarplot(jsDom, new BarplotSettings(), many);

        const element = jsDom.window.document.getElementById("visualization")!;
        const svg = element.getElementsByTagName("svg").item(0)!;
        const height = Number.parseFloat(svg.getAttribute("height")!);

        expect(jsDom.window.document.querySelectorAll(".barLabels text")).toHaveLength(20);

        // The SVG hides its overflow, so a bar that reaches past the bottom of it is a bar that is cut off. Twenty
        // bars of 75 are 1500 pixels, well past the 800 the height used to be fixed at.
        const rects = Array.from(jsDom.window.document.querySelectorAll(".barplot-item rect"));
        const lowest = Math.max(...rects.map(rect =>
            Number.parseFloat(rect.getAttribute("y")!) + Number.parseFloat(rect.getAttribute("height")!)
        ));

        expect(height).toBeGreaterThan(1500);
        expect(lowest).toBeLessThanOrEqual(height);
    });

    it("should render a resize exactly like a barplot that was built at that width", async() => {
        const resized = createTestDom();
        const barplot = await createBarplot(resized, new BarplotSettings());
        barplot.resize(640);

        const settings = new BarplotSettings();
        settings.width = 640;

        const element = await buildBarplot(createTestDom(), settings);

        expect(resized.window.document.getElementById("visualization")!.innerHTML)
            .toEqual(element.innerHTML);
    });

    it("should hide a tooltip that is showing when it is resized", async() => {
        const jsDom = createTestDom();
        const barplot = await createBarplot(jsDom, new BarplotSettings());

        const element = jsDom.window.document.getElementById("visualization")!;

        element.getElementsByClassName("barplot-item").item(0)!.dispatchEvent(new jsDom.window.MouseEvent("mouseover", {
            view: jsDom.window as unknown as Window,
            bubbles: true,
            clientX: 100,
            clientY: 50
        }));

        const tooltip = () => jsDom.window.document.body.querySelector(".tip") as HTMLElement;
        expect(tooltip().style.visibility).toEqual("visible");

        // The node the pointer is over is thrown away by the render, so it never gets a mouseout of its own. Without
        // help, the tooltip is left showing what it said about a bar that is no longer there.
        barplot.resize(1200);

        expect(tooltip().style.visibility).toEqual("hidden");
    });

    afterAll(async() => {
        await browser.close();
    });
});
