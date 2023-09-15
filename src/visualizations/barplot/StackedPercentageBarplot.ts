import * as d3 from "d3";
import BarCollection from "./BarCollection";
import StackedPercentageBarplotSettings from "./StackedPercentageBarplotSettings";

export default class StackedPercentageBarplot {
    private stackedBarplot!: d3.Selection<HTMLDivElement, unknown, null, undefined>;
    private legend!: d3.Selection<HTMLDivElement, unknown, null, undefined>;

    constructor(
        private readonly element: HTMLElement,
        private readonly bars: BarCollection,
        private readonly settings: StackedPercentageBarplotSettings
    ) {
        this.stackedBarplot = d3.select(this.element).append("div");
        this.legend = d3.select(this.element).append("div");
    }

    public reset() {

    }

    public render(data: BarCollection) {
        // For each of the bars, we need to figure out how many items are on there, and what percentage each of the
        // items occupies.

        const allPercentages = [];

        for (const bar of data.bars) {
            if (bar.counts.length !== data.itemNames.length) {
                throw new Error("Every bar must provide the same amount of items and counts!");
            }

            const totalCount = bar.counts.reduce((prev, curr) => prev + curr, 0);
            const percentages = bar.counts.map(c => c / totalCount);

            allPercentages.push(percentages);
        }

        this.stackedBarplot.selectAll(".bar")
            .data(allPercentages)
            .enter()
            .append("div");
    }
}
