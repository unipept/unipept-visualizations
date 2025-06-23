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
            .style("font-family", this.settings.font);

        this.initCss();

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

        let barLabelWidth = this.settings.barLabelWidth;
        const barLabelFontSize = 18;
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

        const extendedSpectralColors20 = [
            "#9e0142",  // deep red
            "#c72e4c",
            "#d53e4f",
            "#eb5c48",
            "#f46d43",
            "#fba35b",
            "#fdae61",
            "#fee08b",
            "#ffffbf",
            "#e6f598",
            "#b5e3a5",
            "#8dd380",
            "#66c2a5",  // soft teal-green
            "#4dacb1",  // teal-cyan
            "#3288bd",  // medium blue
            "#1f78b4",  // classic blue
            "#5e4fa2",  // deep blue-violet
            "#6a3d9a",  // purple
            "#984ea3",  // medium purple-magenta
            "#df7ab4"   // strong magenta
        ];

        // Color for the "other" class in the labels
        const otherColor = "#acaaaa";

        const colorScheme = new Array(...extendedSpectralColors20);

        if (this.settings.maxItems) {
            colorScheme[this.settings.maxItems % (this.data[0].items.length + 1)] = otherColor;
        }

        const colorScale: d3.ScaleOrdinal<string, string, string> = d3.scaleOrdinal<string, string, string>()
            .domain(Array.from(new Set(this.data.flatMap(bar => bar.items.map(item => item.label)))))
            .range(colorScheme);

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

        // Instead of keeping track of n values per entry, we want to keep track of n bars with the entries
        const transposedStackedData = Array(this.data.length).fill(null).map(_ => new Array());

        for (const entry of stackedData) {
            const entryTitle = entry.key;
            for (let i = 0; i < entry.length; i++) {
                transposedStackedData[i].push({
                    barIndex: i,
                    title: entryTitle,
                    shape: entry[i]
                });
            }
        }

        svgGElement.append("g")
            .selectAll("g")
            .data(transposedStackedData)
            .join("g")
            .selectAll("g")
            .data(d => d)
            .join((container) => {
                // A simple container per item per bar (which contains the actual colored rectangle and text)
                const g = container
                    .append("g");

                // Colored rectangle for each bar item
                g
                    .append("rect")
                    .attr("fill", d => colorScale(d.title))
                    .attr("x", d => plotPadding.left + barLabelWidth + barLabelPaddingRight + Math.floor(xScale(d.shape[0])))
                    .attr("y", d => plotPadding.top + (yScale(d.barIndex.toString()) || 0))
                    .attr("width", d => Math.floor(xScale(d.shape[1])) - Math.floor(xScale(d.shape[0])))
                    .attr("height", Math.floor(yScale.bandwidth()));

                // Text (value of the item) for each bar item
                if (this.settings.showValuesInBars) {
                    g
                        .append("text")
                        .attr("data-key", d => d.title)
                        .attr("x", d => {
                            const barStart = Math.floor(xScale(d.shape[0]));
                            const barEnd = Math.floor(xScale(d.shape[1]));
                            return plotPadding.left + barLabelWidth + barLabelPaddingRight + barStart + (barEnd - barStart) / 2;
                        })
                        .attr("y", d => plotPadding.top + (yScale(d.barIndex.toString()) || 0) + yScale.bandwidth() / 2)
                        .attr("dy", ".35em")
                        .attr("text-anchor", "middle")
                        .attr("fill", d => {
                            const backgroundColor = colorScale(d.title);
                            const rgb = d3.rgb(backgroundColor);
                            // Use relative luminance formula to determine if color is dark
                            const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
                            return luminance < 0.5 ? "white" : "#171717";
                        })
                        .attr("font-family", font)
                        .attr("font-size", this.settings.valuesInBarsFontSize)
                        .attr("font-weight", 600)
                        .text(d => {
                            const value = d.shape[1] - d.shape[0];
                            const width = Math.floor(xScale(d.shape[1])) - Math.floor(xScale(d.shape[0]));
                            if (width < 30) return "";
                            return this.settings.displayMode === "relative" ? `${value.toFixed(1)}%` : value;
                        });
                }

                return g;
            })
            .classed("barplot-item", true)
            .attr("data-bar-item", (d) => d.title)
            .on("mouseover", (event: MouseEvent, d: any) => {
                const itemIdx = this.data[d.barIndex].items.findIndex((item: BarItem) => item.label === d.title)!;
                this.mouseIn(event, d.barIndex, itemIdx, (event.target! as HTMLElement).parentElement!);
            })
            .on("mousemove", (event: MouseEvent, d: any) => {
                const selectedItem = this.data[d.barIndex].items.find((item: BarItem) => item.label === d.title)!;
                this.mouseMove(event, selectedItem, (event.target! as HTMLElement).parentElement!);
            })
            .on("mouseout", (event: MouseEvent, d: any) => {
                const selectedItem = this.data[d.barIndex].items.find((item: BarItem) => item.label === d.title)!;
                this.mouseOut(event, selectedItem, (event.target! as HTMLElement).parentElement!);
            });

        // Add x-axis
        svgGElement.append("g")
            .attr("transform", `translate(${plotPadding.left + barLabelWidth + barLabelPaddingRight}, ${plotPadding.top + barHeight * this.data.length + 5})`)
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
            .classed("legend-item", true)
            .attr("data-legend-entry", (d) => d)
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
            .attr("fill", colorScale)

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

    private initCss() {
        let elementClass = this.settings.className;
        this.element.className += " " + elementClass;

        const styleElement = this.element.ownerDocument.createElement("style");
        styleElement.appendChild(this.element.ownerDocument.createTextNode(`
.${elementClass} .barplot-item-highlighted {
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
    font-size: 20px;
}

.${elementClass} .legend-item-highlighted {
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
}
`))
        this.element.ownerDocument.head.appendChild(styleElement);
    }

    private mouseIn(event: MouseEvent, barIndex: number, itemIndex: number, targetElement: EventTarget) {
        const d = this.data[barIndex].items[itemIndex];

        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip.html(this.settings.getTooltip(this.data, barIndex, itemIndex))
                .style("top", (event.pageY + 10) + "px")
                .style("left", (event.pageX + 10) + "px")
                .style("visibility", "visible");
        }

        if (this.settings.highlightOnHover) {
            // Select all barplot-items and make them slightly transparent
            d3.selectAll(".barplot-item").classed("barplot-item-highlighted", true);
            // Except for the current element, we want this one to stand out of the rest
            d3.selectAll(`g[data-bar-item="${d.label}"]`).classed("barplot-item-highlighted", false);
            
            // Also select the legend entry with the same label and highlight the corresponding rectangle
            d3.selectAll(".legend-item").classed("legend-item-highlighted", true);

            d3.selectAll(`g[data-legend-entry="${d.label}"]`).classed("legend-item-highlighted", false);
        }
    }

    private mouseMove(event: MouseEvent, d: BarItem, targetElement: EventTarget) {
        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip
                .style("top", (event.pageY + 10) + "px")
                .style("left", (event.pageX + 10) + "px");
        }
    }

    private mouseOut(event: MouseEvent, d: BarItem, targetElement: EventTarget) {
        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip.style("visibility", "hidden");
        }

        if (this.settings.highlightOnHover) {
            // Stop highlighting of barplot items
            d3.selectAll(".barplot-item").classed("barplot-item-highlighted", false);

            // Stop highlighting of the legend items
            d3.selectAll(".legend-item").classed("legend-item-highlighted", false);
        }
    }
}
