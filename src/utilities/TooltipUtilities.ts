import * as d3 from "d3";

export default class TooltipUtilities {
    public static initTooltip(): d3.Selection<HTMLDivElement, unknown, HTMLElement, any> {
        return d3.select("body")
            .append("div")
            .attr("class", "tip")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden");
    }
}
