import * as d3 from "d3";
import BarCollection from "./BarCollection";

export default class StackedPercentageBarplot {
    private stackedBarplot!: d3.Selection<HTMLDivElement, unknown, null, undefined>;
    private legend!: d3.Selection<HTMLDivElement, unknown, null, undefined>;

    constructor(
        private readonly element: HTMLElement,
        private readonly bars: BarCollection
    ) {
        this.stackedBarplot = d3.select(this.element).append("div");
        this.legend = d3.select(this.element).append("div");
    }

    public reset() {

    }

    public render(data: BarCollection) {
        // For each of the bars, we need to figure out how many items are on there, and what percentage each of the
        // items occupies.


    }
}
