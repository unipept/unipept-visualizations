import TooltipUtilities from "./../TooltipUtilities";

describe("TooltipUtilities.initTooltip", () => {
    it("should produce a tooltip that satisfies the requirements", () => {
        const tooltip = TooltipUtilities.initTooltip("unique-identifier");

        expect(tooltip.attr("id")).toContain("unique-identifier");
        expect(tooltip.attr("class")).toEqual("tip");
    });
});
