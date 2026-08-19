import { createTestDom } from "./../../test/TestDom";
import { waitForCondition } from "./../../test/TestUtils";
import Barplot from "./../barplot/Barplot";
import { Bar } from "./../barplot/Bar";
import { BarplotSettings } from "./../barplot/BarplotSettings";
import Treemap from "./../treemap/Treemap";
import TreemapSettings from "./../treemap/TreemapSettings";
import taxonomyObject from "./../../test/resources/taxonomy.json";
import { JSDOM } from "jsdom";
import { describe, it, expect } from "vitest";

/**
 * A visualization empties the element it renders in, which takes away the node the pointer is over without that node
 * ever getting a mouseout. These tests cover what that leaves behind: a tooltip that is still on screen, describing
 * something that is no longer there.
 */
describe("Stale tooltips", () => {
    function bars(): Bar[] {
        return [
            {
                label: "Sample 1",
                items: [
                    { label: "Bacteria", counts: 10 },
                    { label: "Eukaryota", counts: 5 }
                ]
            }
        ];
    }

    function barplotSettings(): BarplotSettings {
        const settings = new BarplotSettings();
        settings.width = 800;
        settings.height = 800;
        return settings;
    }

    function treemapSettings(): TreemapSettings {
        const settings = new TreemapSettings();
        settings.width = 800;
        settings.height = 800;
        return settings;
    }

    function host(dom: JSDOM): HTMLElement {
        return dom.window.document.getElementById("visualization")!;
    }

    function tooltip(dom: JSDOM): HTMLElement {
        return dom.window.document.querySelector<HTMLElement>(".tip[data-unipept-tooltip]")!;
    }

    function hover(dom: JSDOM, target: Element): void {
        target.dispatchEvent(new dom.window.MouseEvent("mouseover", { clientX: 10, clientY: 10 }));
    }

    async function renderBarplot(dom: JSDOM, settings: BarplotSettings = barplotSettings()): Promise<void> {
        const element = host(dom);
        new Barplot(element, bars(), settings);
        await waitForCondition(() => element.getElementsByTagName("svg").length > 0, 2000, 500);
    }

    async function renderTreemap(dom: JSDOM, settings: TreemapSettings = treemapSettings()): Promise<void> {
        const element = host(dom);
        new Treemap(element, taxonomyObject, settings);
        await waitForCondition(() => element.getElementsByClassName("node").length > 0, 2000, 500);
    }

    function hoverBarplotItem(dom: JSDOM): void {
        hover(dom, host(dom).querySelector(".barplot-item")!);
    }

    function hoverTreemapNode(dom: JSDOM): void {
        hover(dom, host(dom).querySelector(".node")!);
    }

    it("should hide the tooltip when a barplot is constructed over a barplot", async() => {
        const dom = createTestDom();
        await renderBarplot(dom);

        hoverBarplotItem(dom);
        expect(tooltip(dom).style.visibility).toEqual("visible");

        await renderBarplot(dom);

        expect(tooltip(dom).style.visibility).toEqual("hidden");
    });

    it("should hide the tooltip when a treemap is constructed over a treemap", async() => {
        const dom = createTestDom();
        await renderTreemap(dom);

        hoverTreemapNode(dom);
        expect(tooltip(dom).style.visibility).toEqual("visible");

        await renderTreemap(dom);

        expect(tooltip(dom).style.visibility).toEqual("hidden");
    });

    it("should hide the tooltip of another visualization when a treemap is constructed over a barplot", async() => {
        const dom = createTestDom();
        await renderBarplot(dom);

        hoverBarplotItem(dom);
        const content = tooltip(dom).innerHTML;
        expect(tooltip(dom).style.visibility).toEqual("visible");

        await renderTreemap(dom);

        // The tooltip left behind is the barplot's, so the treemap cannot recognize it as its own.
        expect(tooltip(dom).innerHTML).toEqual(content);
        expect(tooltip(dom).style.visibility).toEqual("hidden");
    });

    it("should hide a stranded tooltip even when the incoming visualization has tooltips disabled", async() => {
        const dom = createTestDom();
        await renderBarplot(dom);

        hoverBarplotItem(dom);
        expect(tooltip(dom).style.visibility).toEqual("visible");

        const settings = treemapSettings();
        settings.enableTooltips = false;
        await renderTreemap(dom, settings);

        expect(tooltip(dom).style.visibility).toEqual("hidden");
    });
});
