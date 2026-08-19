import { describe, it, expect } from "vitest";
import { createTestDom } from "../../test/TestDom";
import { waitForCondition } from "../../test/TestUtils";
import Barplot from "../barplot/Barplot";
import { BarplotSettings } from "../barplot/BarplotSettings";
import Sunburst from "../sunburst/Sunburst";
import SunburstSettings from "../sunburst/SunburstSettings";
import Treemap from "../treemap/Treemap";
import TreemapSettings from "../treemap/TreemapSettings";
import Treeview from "../treeview/Treeview";
import Heatmap from "../heatmap/Heatmap";
import HeatmapSettings from "../heatmap/HeatmapSettings";
import TreeviewSettings from "../treeview/TreeviewSettings";
import taxonomyObject from "../../test/resources/taxonomy.json";

/**
 * Applications embedding this library need to reach the rendered output in order to export it. Until this was exposed
 * the only way in was the private field, which the Unipept frontend reads behind a `@ts-ignore`.
 */
describe("the element a visualization renders into", () => {
    it("gives access to the rendered output", async() => {
        const jsDom = createTestDom();
        const host = jsDom.window.document.getElementById("visualization")!;

        const settings = new TreeviewSettings();
        settings.width = 600;
        settings.height = 600;

        const treeview = new Treeview(host, taxonomyObject, settings);
        await waitForCondition(() => host.getElementsByClassName("node").length > 0, 3000, 100);

        expect(treeview.element).toBe(host);
        expect(treeview.element.querySelector(":scope > svg")).not.toBeNull();
    });

    it("is the element that was passed to every visualization's constructor", () => {
        const hosts: HTMLElement[] = [];

        const host = (): HTMLElement => {
            const element = createTestDom().window.document.getElementById("visualization")!;
            hosts.push(element);
            return element;
        };

        const barplotSettings = new BarplotSettings();
        barplotSettings.width = 600;

        const sunburstSettings = new SunburstSettings();
        sunburstSettings.animationDuration = 0;

        const treemapSettings = new TreemapSettings();
        treemapSettings.width = 400;
        treemapSettings.height = 300;

        const treeviewSettings = new TreeviewSettings();
        treeviewSettings.width = 600;
        treeviewSettings.height = 600;

        const heatmapSettings = new HeatmapSettings();
        heatmapSettings.animationsEnabled = false;
        heatmapSettings.width = 400;
        heatmapSettings.height = 300;

        const elements = [
            new Barplot(host(), [{ label: "S1", items: [{ label: "a", counts: 3 }, { label: "b", counts: 5 }] }], barplotSettings).element,
            new Sunburst(host(), taxonomyObject, sunburstSettings).element,
            new Treemap(host(), taxonomyObject, treemapSettings).element,
            new Treeview(host(), taxonomyObject, treeviewSettings).element,
            // The heatmap takes its data as a matrix with labels rather than a tree. It needs the canvas package,
            // like the other heatmap specs.
            new Heatmap(host(), [[0.1, 0.9], [0.5, 0.2]], ["r1", "r2"], ["c1", "c2"], heatmapSettings).element
        ];

        expect(elements).toEqual(hosts);
    });
});
