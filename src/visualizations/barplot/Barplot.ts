import {BarplotSettings} from "./BarplotSettings";
import * as d3 from "d3";
import {Bar, BarItem} from "./Bar";
import BarplotPreprocessor from "./BarplotPreprocessor";
import TooltipUtilities from "../../utilities/TooltipUtilities";
import DataNode from "../../DataNode";

export default class Barplot {
    private readonly settings: BarplotSettings;
    private readonly data: Bar[];

    private tooltip!: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
    
    constructor(
        private readonly element: HTMLElement,
        data: Bar[],
        options: BarplotSettings = new BarplotSettings()
    ) {
        this.settings = this.fillOptions(options);

        const preprocessor = new BarplotPreprocessor();
        this.data = preprocessor.computeMaxItemsInBars(data, this.settings.maxItems);

        if (this.settings.displayMode === "relative") {
            this.data = preprocessor.convertAbsoluteToRelative(this.data);
        }

        if (this.settings.enableTooltips) {
            this.tooltip = TooltipUtilities.initTooltip();
        }
        
        this.renderBarplot();
    }

    private fillOptions(options: any = undefined): BarplotSettings {
        const output = new BarplotSettings();
        return Object.assign(output, options);
    }

    private renderBarplot(): void {
        const visElement = d3.select(this.element)
            .append("svg")
            .attr("version", "1.1")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`)
            .attr("width", this.settings.width)
            .attr("height", this.settings.height)
            .attr("overflow", "hidden")
            .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");

        const font = this.settings.font;

        // Plot settings
        // Padding for the actual plot area
        const plotPadding = this.settings.chart.padding;

        // Height of each bar in the barplot
        const barHeight = this.settings.barHeight;

        const isHorizontal = this.settings.orientation == "horizontal";

        /**
         * Legend-related settings
         */
        const legendPadding = this.settings.legend.padding;

        const legendWidth = this.settings.legend.width;

        const legendTitleFontSize = this.settings.legend.titleFontSize;
        const legendLabelFontSize = this.settings.legend.labelFontSize;

        const legendSymbolSize = this.settings.legend.symbolSize;

        const legendRowSpacing = this.settings.legend.rowSpacing;
        const legendColumnSpacing = this.settings.legend.columnSpacing;

        const legendColumns = this.settings.legend.columns;

        // Padding below the title of the legend
        const legendTitlePaddingBottom = 10;

        // Horizontal padding between legend colored box and legend label
        const legendSymbolPaddingRight = 10;

        /**
         * Axis settings
         */
        // Height of the x-axis bar and it's labels
        const xAxisHeight: number = 40;

        let plotAreaWidth: number;
        let plotAreaHeight: number;
        let legendContentStartLeft: number;
        let legendContentStartTop: number;
        let legendEntryHeight: number;
        let maxLegendLabelWidth: number;
        let legendAreaWidth: number;
        let legendEntryWidth: number;

        // Computed metrics
        if (isHorizontal) {
            plotAreaWidth = this.settings.width  - plotPadding.left - plotPadding.right - legendWidth;
            plotAreaHeight = barHeight * this.data.length;
            legendContentStartTop = legendPadding.top;
            legendContentStartLeft = plotPadding.left + plotAreaWidth + plotPadding.right + legendPadding.left;
            legendEntryHeight = Math.max(legendSymbolSize, legendLabelFontSize);
            // Max width that a legend label should be
            maxLegendLabelWidth = legendWidth - legendPadding.left - legendPadding.right - legendSymbolSize - legendSymbolPaddingRight;
            legendEntryWidth = legendWidth - legendPadding.left - legendPadding.right;
        } else {
            plotAreaWidth = this.settings.width - plotPadding.left - plotPadding.right;
            plotAreaHeight = barHeight * this.data.length;
            legendContentStartTop = plotAreaHeight + legendPadding.top + xAxisHeight;
            legendContentStartLeft = legendPadding.left;
            legendEntryHeight = Math.max(legendSymbolSize, legendLabelFontSize);
            legendAreaWidth = this.settings.width - legendPadding.left - legendPadding.right;
            legendEntryWidth = Math.floor((legendAreaWidth - Math.max(legendColumns - 1, 0) * legendColumnSpacing) / legendColumns);
            maxLegendLabelWidth = legendEntryWidth - legendSymbolSize - legendSymbolPaddingRight;
        }

        let barLabelWidth = 150;
        const barLabelFontSize = 15;
        const barLabelPaddingRight = 10;

        let barWidth = plotAreaWidth;

        if (this.settings.showBarLabel) {
            barWidth = plotAreaWidth - barLabelWidth - barLabelPaddingRight;
        } else {
            barLabelWidth = 0;
        }

        // Clear previous render
        visElement.selectAll("*").remove();

        const svgGElement = visElement.append("g");

        // Prepare data
        const stackedData = d3.stack<Bar, string>()
            .keys(Array.from(new Set(this.data.flatMap(bar => bar.items.map(item => item.label)))))
            .value((d, key) => d.items.find(item => item.label === key)?.counts ?? 0)
            (this.data);

        // Scales
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(stackedData, d => d3.max(d, d => d[1])) || 0])
            .range([0, barWidth]);

        const yScale = d3.scaleBand()
            .domain(this.data.map((_, i) => i.toString()))
            .range([0, barHeight * this.data.length])
            .paddingInner(0.1)
            .paddingOuter(0);

        const materialDesignColors = [
            "#F44336",    // red
            "#B71C1C",    // red-darken-4
            "#E91E63",    // pink
            "#880E4F",    // pink-darken-4
            "#9C27B0",    // purple
            "#4A148C",    // purple-darken-4
            "#673AB7",    // deep-purple
            "#311B92",    // deep-purple-darken-4
            "#3F51B5",    // indigo
            "#1A237E",    // indigo-darken-4
            "#2196F3",    // blue
            "#006064",    // cyan-darken-4
            "#009688",    // teal
            "#004D40",    // teal-darken-4
            "#4CAF50",    // green
            "#1B5E20",    // green-darken-4
            "#C0CA33",    // lime-darken-1
            "#827717",    // lime-darken-4
            "#FFC107",    // amber
            "#FF6F00",    // amber-darken-4
            "#FF9800",    // orange
            "#E65100",    // orange-darken-4
            "#FF5722",    // deep-orange
            "#BF360C"     // deep-orange-darken-4
        ];

        // Color for the "other" class in the labels
        const otherColor = "#9E9E9E";

        if (this.settings.maxItems) {
            materialDesignColors[this.settings.maxItems % (this.data[0].items.length + 1)] = otherColor;
        }

        const colorScale: d3.ScaleOrdinal<string, string, string> = d3.scaleOrdinal<string, string, string>()
            .domain(Array.from(new Set(this.data.flatMap(bar => bar.items.map(item => item.label)))))
            .range(materialDesignColors);

        if (this.settings.showBarLabel) {
            // Add bar labels
            svgGElement.append("g")
                .attr("class", "barLabels")
                .selectAll("text")
                .data(this.data)
                .join("text")
                .attr("x", plotPadding.left)
                .attr("y", (_, i) => plotPadding.top + (yScale(i.toString()) || 0) + yScale.bandwidth() / 2)
                .attr("dy", ".35em")
                .attr("font-family", font)
                .attr("font-size", barLabelFontSize)
                .text(d => {
                    if (d.label.length * (barLabelFontSize * 0.6) > barLabelWidth) {
                        const charsToShow = Math.floor(barLabelWidth / (barLabelFontSize * 0.6));
                        return d.label.substring(0, charsToShow - 3) + "...";
                    }
                    return d.label;
                });
        }

        // Add bars
        svgGElement.append("g")
            .selectAll("g")
            .data(stackedData)
            .join("g")
            .attr("fill", d => colorScale(d.key))
            .attr("data-key", d => d.key)
            .selectAll("rect")
            .data(d => d)
            .join("rect")
            .attr("x", d => plotPadding.left + barLabelWidth + barLabelPaddingRight + Math.floor(xScale(d[0])))
            .attr("y", (d, i) => plotPadding.top + (yScale(i.toString()) || 0))
            .attr("width", d => Math.floor(xScale(d[1])) - Math.floor(xScale(d[0])))
            .attr("height", yScale.bandwidth())
            .on("mouseover", (event: MouseEvent, d: any) => {
                const key = d3.select((event.target! as any).parentNode).attr("data-key");
                const selectedItem = d.data.items.find((item: BarItem) => item.label === key);
                this.tooltipIn(event, selectedItem);
            })
            .on("mousemove", (event: MouseEvent, d: any) => {
                const key = d3.select((event.target! as any).parentNode).attr("data-key");
                const selectedItem = d.data.items.find((item: BarItem) => item.label === key);
                this.tooltipMove(event, selectedItem);
            })
            .on("mouseout", (event: MouseEvent, d: any) => {
                const key = d3.select((event.target! as any).parentNode).attr("data-key");
                const selectedItem = d.data.items.find((item: BarItem) => item.label === key);
                this.tooltipOut(event, selectedItem);
            });

        if (this.settings.showValuesInBars) {
            svgGElement.append("g")
                .selectAll("g")
                .data(stackedData)
                .join("g")
                .selectAll("text")
                .data(d => d)
                .join("text")
                .attr("x", d => {
                    const barStart = Math.floor(xScale(d[0]));
                    const barEnd = Math.floor(xScale(d[1]));
                    return plotPadding.left + barLabelWidth + barLabelPaddingRight + barStart + (barEnd - barStart) / 2;
                })
                .attr("y", (d, i) => plotPadding.top + (yScale(i.toString()) || 0) + yScale.bandwidth() / 2)
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .attr("fill", "white")
                .attr("font-family", font)
                .attr("font-size", this.settings.valuesInBarsFontSize)
                .text(d => {
                    const value = d[1] - d[0];
                    const width = Math.floor(xScale(d[1])) - Math.floor(xScale(d[0]));
                    if (width < 30) return "";
                    return this.settings.displayMode === "relative" ? `${value.toFixed(1)}%` : value;
                });
        }

        // Add x-axis
        svgGElement.append("g")
            .attr("transform", `translate(${plotPadding.left + barLabelWidth + barLabelPaddingRight}, ${plotPadding.top + barHeight * this.data.length})`)
            .call(d3.axisBottom(xScale))
            .attr("font-size", "12px") // Increase tick label size
            .append("text")
            .attr("font-family", font)
            .attr("fill", "black")
            .attr("x", barWidth / 2)
            .attr("y", xAxisHeight)
            .attr("text-anchor", "middle")
            .attr("font-size", 14)
            .text(this.settings.displayMode === "relative" ? "Percentage" : "Count");

        // Add legend
        const legend = svgGElement.append("g")
            .attr("font-family", font)
            .attr("font-size", legendLabelFontSize)
            .selectAll("g")
            .data(colorScale.domain())
            .join("g")
            .attr("transform", (_, i) => `translate(${(i % legendColumns) * legendEntryWidth + Math.max((i % legendColumns) - 1, 0) * legendColumnSpacing}, ${Math.floor(i / legendColumns) * (legendEntryHeight + legendRowSpacing) + legendTitleFontSize + legendTitlePaddingBottom + legendContentStartTop})`);

        // Legend title
        svgGElement.append("text")
            .attr("font-family", font)
            .attr("font-size", legendTitleFontSize)
            .attr("dominant-baseline", "hanging")
            .attr("x", legendContentStartLeft)
            .attr("y", legendContentStartTop)
            .text("Legend");

        // Little colored boxes before each legend item
        legend.append("rect")
            .attr("x", legendContentStartLeft)
            .attr("width", legendSymbolSize)
            .attr("height", legendSymbolSize)
            .attr("rx", 5)
            .attr("fill", colorScale);

        // Legend labels
        legend.append("text")
            .attr("x", legendContentStartLeft + legendSymbolSize + legendSymbolPaddingRight)
            .attr("y", legendLabelFontSize / 2)
            .attr("dy", "0.35em")
            .text(d => {
                if (d.length * (legendLabelFontSize * 0.6) > maxLegendLabelWidth) {
                    const charsToShow = Math.floor(maxLegendLabelWidth / (legendLabelFontSize * 0.6));
                    return d.substring(0, charsToShow - 3) + "...";
                }
                return d;
            });
    }

    private tooltipIn(event: MouseEvent, d: BarItem) {
        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip.html(this.settings.getTooltip(d))
                .style("top", (event.pageY + 10) + "px")
                .style("left", (event.pageX + 10) + "px")
                .style("visibility", "visible");
        }
    }

    private tooltipMove(event: MouseEvent, d: BarItem) {
        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip
                .style("top", (event.pageY + 10) + "px")
                .style("left", (event.pageX + 10) + "px");
        }
    }

    private tooltipOut(event: MouseEvent, d: BarItem) {
        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip.style("visibility", "hidden");
        }
    }
}
