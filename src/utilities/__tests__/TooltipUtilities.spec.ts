import TooltipUtilities from "./../TooltipUtilities";

describe("TooltipUtilities.initTooltip", () => {
    it("should produce a tooltip that satisfies the requirements", () => {
        const tooltip = TooltipUtilities.initTooltip();

        expect(tooltip.attr("class")).toEqual("tip");
    });
});
