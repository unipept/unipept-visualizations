import Sunburst from "./../Sunburst";
import { waitForCondition } from "./../../../test/TestUtils";
import SunburstSettings from "./../SunburstSettings";
import { JSDOM } from "jsdom";
import { describe, it, expect } from "vitest";
import taxonomyObject from "./resources/taxonomy.json";

describe("Sunburst Performance", () => {
    function createJSDom() {
        const dom = new JSDOM("<!DOCTYPE html><div id=\"visualization\"></div>");
        return dom;
    }

    it("should reduce getComputedTextLength calls with caching", async () => {
        let callCount = 0;

        const dom = createJSDom();
        // Mock getComputedTextLength on the prototype inside the JSDOM window
        // @ts-ignore
        dom.window.Element.prototype.getComputedTextLength = function() {
            callCount++;
            return 20;
        };

        const element = dom.window.document.getElementById("visualization")!;
        const settings = new SunburstSettings();
        settings.animationDuration = 0; // Disable animation for instant updates

        // @ts-ignore
        const sunburst = new Sunburst(element, taxonomyObject, settings);

        // Wait for initial render
        await waitForCondition(() => element.getElementsByTagName("text").length > 0, 2000, 100);

        const initialCount = callCount;
        console.log("Initial calls:", initialCount);

        // Trigger click on a child (path-1)
        const paths = element.getElementsByTagName("path");
        const event = dom.window.document.createEvent("CustomEvent");
        event.initEvent("click", true, true);
        paths.item(1)!.dispatchEvent(event);

        // Wait for re-render (allow some time for async renderText)
        await new Promise(r => setTimeout(r, 200));

        const afterDrillDownCount = callCount;
        console.log("Calls after drill down:", afterDrillDownCount - initialCount);

        // Reset to root (drill up)
        sunburst.reset();

        // Wait for re-render
        await new Promise(r => setTimeout(r, 200));

        const afterResetCount = callCount;
        const resetCalls = afterResetCount - afterDrillDownCount;
        console.log("Calls after reset:", resetCalls);

        // We export the count so we can verify it in the prompt/journal.
        // For the baseline, we expect resetCalls to be roughly equal to initialCount (re-measuring everything).
        // We will fail this test purposely if we want to enforce "improvement",
        // but for now let's just log it and maybe add an assertion that it IS high,
        // then later update it to expect LOW.

        // With optimization, resetCalls should be 0 because all nodes in the initial view have been cached.
        expect(resetCalls).toBe(0);
    });
});
