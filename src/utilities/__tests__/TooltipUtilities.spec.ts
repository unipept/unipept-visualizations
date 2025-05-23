import TooltipUtilities from "./../TooltipUtilities";
import { describe, it, expect } from "vitest";

describe("TooltipUtilities.initTooltip", () => {
    it("should produce a tooltip that satisfies the requirements", () => {
        const tooltip = TooltipUtilities.initTooltip();

        expect(tooltip.attr("class")).toEqual("tip");
    });
});
