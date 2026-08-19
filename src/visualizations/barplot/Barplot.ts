import {BarplotSettings, BarplotChartSettings, BarplotLegendSettings} from "./BarplotSettings";
import {VisualizationPadding} from "../../Settings";
import * as d3 from "d3";
import {Bar, BarItem} from "./Bar";
import BarplotPreprocessor from "./BarplotPreprocessor";
import Tooltip from "../../utilities/Tooltip";
import StyleUtilities from "../../utilities/StyleUtilities";
import HostUtilities from "../../utilities/HostUtilities";

/**
 * Height (in pixels) of the x-axis: its tick marks, their labels and the title underneath them.
 */
const X_AXIS_HEIGHT = 40;

/**
 * Vertical space (in pixels) between the bottom of the bars and the x-axis underneath them.
 */
const AXIS_PADDING_TOP = 5;

/**
 * Vertical space (in pixels) between the title of the legend and its first row of entries.
 */
const LEGEND_TITLE_PADDING_BOTTOM = 10;

/**
 * One item of one bar: what the rectangles the barplot is built from are bound to.
 */
type StackedSegment = { barIndex: number, title: string, shape: d3.SeriesPoint<Bar> };

export default class Barplot {
    private readonly settings: BarplotSettings;
    private readonly data: Bar[];

    private tooltip!: Tooltip;
    
    constructor(
        // Public so that an embedding application can reach the rendered output, for example to export the SVG
        // that was drawn into it.
        public readonly element: HTMLElement,
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
            this.tooltip = Tooltip.create(this.element, this.settings.tooltipContainer);
        }
        
        this.renderBarplot();
    }

    /**
     * Resize the visualization to the given width and render it again with the data and the options that were passed
     * in the constructor.
     *
     * There is no height to give: a barplot is as tall as the bars, the axis and the legend it holds, so its height
     * follows from the data and from settings such as `barHeight`, and it is recomputed here along with the layout.
     *
     * @param newWidth New total width (in pixels) of the visualization.
     */
    public resize(newWidth: number) {
        this.settings.width = newWidth;

        this.renderBarplot();
    }

    private fillOptions(options: any = undefined): BarplotSettings {
        const output = new BarplotSettings();
        Object.assign(output, options);

        // Object.assign is shallow, so a caller that passes a plain object mentioning only the nested settings it
        // wants to change would otherwise replace the whole group and leave the rest of it undefined. Rendering then
        // fails on the first default it reads back.
        output.chart = this.fillGroup(new BarplotChartSettings(), options?.chart);
        output.legend = this.fillGroup(new BarplotLegendSettings(), options?.legend);

        return output;
    }

    /**
     * Copy the given overrides over a group of settings, treating the padding inside it the same way the group itself
     * is treated: every corner that is not mentioned keeps its default.
     */
    private fillGroup<T extends { padding: VisualizationPadding }>(defaults: T, options: any): T {
        const padding = Object.assign({}, defaults.padding, options?.padding);
        return Object.assign(defaults, options, { padding });
    }

    /**
     * Total height (in pixels) of the visualization, which is the height of what it holds: the bars, the axis
     * underneath them and the legend.
     *
     * There is no height setting to honour instead. How tall a barplot is follows from the number of bars it is given
     * and from `barHeight`, so a configured height could only cut the visualization off (the SVG hides its overflow)
     * or leave empty space below it.
     */
    private get contentHeight(): number {
        const plotHeight = this.settings.chart.padding.top +
            this.plotAreaHeight +
            AXIS_PADDING_TOP +
            X_AXIS_HEIGHT +
            this.settings.chart.padding.bottom;

        // A horizontal legend is placed beside the plot and so starts at the top of the visualization, while a
        // vertical one is placed underneath the bars and the axis.
        const legendBottom = this.settings.orientation === "horizontal"
            ? this.legendHeight
            : this.plotAreaHeight + X_AXIS_HEIGHT + this.legendHeight;

        return Math.max(plotHeight, legendBottom);
    }

    /**
     * Height (in pixels) of the area the bars themselves take up.
     */
    private get plotAreaHeight(): number {
        return this.settings.barHeight * this.data.length;
    }

    /**
     * Height (in pixels) of the legend, from the top of its padding down to the bottom of it.
     */
    private get legendHeight(): number {
        const legend = this.settings.legend;

        const entries = new Set(this.data.flatMap(bar => bar.items.map(item => item.label))).size;
        const rows = Math.ceil(entries / legend.columns);
        const rowHeight = Math.max(legend.symbolSize, legend.labelFontSize);

        return legend.padding.top +
            legend.titleFontSize +
            LEGEND_TITLE_PADDING_BOTTOM +
            rows * rowHeight +
            Math.max(rows - 1, 0) * legend.rowSpacing +
            legend.padding.bottom;
    }

    private renderBarplot(): void {
        HostUtilities.clear(this.element, this.settings.tooltipContainer);

        const visElement = d3.select(this.element)
            .append("svg")
            .attr("version", "1.1")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", `0 0 ${this.settings.width} ${this.contentHeight}`)
            .attr("width", this.settings.width)
            .attr("height", this.contentHeight)
            .attr("overflow", "hidden")
            .style("font-family", this.settings.font);

        this.initCss();

        const font = this.settings.font;

        // Plot settings
        // Padding for the actual plot area
        const plotPadding = this.settings.chart.padding;

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

        // Horizontal padding between legend colored box and legend label
        const legendSymbolPaddingRight = 10;

        let plotAreaWidth: number;
        let legendContentStartLeft: number;
        let legendContentStartTop: number;
        let legendEntryHeight: number;
        let maxLegendLabelWidth: number;
        let legendAreaWidth: number;
        let legendEntryWidth: number;

        // Computed metrics
        if (isHorizontal) {
            plotAreaWidth = this.settings.width  - plotPadding.left - plotPadding.right - legendWidth;
            legendContentStartTop = legendPadding.top;
            legendContentStartLeft = plotPadding.left + plotAreaWidth + plotPadding.right + legendPadding.left;
            legendEntryHeight = Math.max(legendSymbolSize, legendLabelFontSize);
            // Max width that a legend label should be
            maxLegendLabelWidth = legendWidth - legendPadding.left - legendPadding.right - legendSymbolSize - legendSymbolPaddingRight;
            legendEntryWidth = legendWidth - legendPadding.left - legendPadding.right;
        } else {
            plotAreaWidth = this.settings.width - plotPadding.left - plotPadding.right;
            legendContentStartTop = this.plotAreaHeight + legendPadding.top + X_AXIS_HEIGHT;
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

        const svgGElement = visElement.append("g");

        // Prepare data
        const stack = d3.stack<Bar, string>()
            .keys(Array.from(new Set(this.data.flatMap(bar => bar.items.map(item => item.label)))))
            .value((d, key) => d.items.find(item => item.label === key)?.counts ?? 0);
        const stackedData = stack(this.data);

        // Scales
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(stackedData, d => d3.max(d, d => d[1])) || 0])
            .range([0, barWidth]);

        const yScale = d3.scaleBand()
            .domain(this.data.map((_, i) => i.toString()))
            .range([0, this.plotAreaHeight])
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
        const transposedStackedData: StackedSegment[][] =
            Array.from({ length: this.data.length }, () => []);

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
                this.mouseIn(event, d.barIndex, itemIdx);
            })
            .on("mousemove", (event: MouseEvent, d: any) => {
                const itemIdx = this.data[d.barIndex].items.findIndex((item: BarItem) => item.label === d.title)!;
                this.mouseMove(event, d.barIndex, itemIdx);
            })
            .on("mouseout", (event: MouseEvent, d: any) => {
                const itemIdx = this.data[d.barIndex].items.findIndex((item: BarItem) => item.label === d.title)!;
                this.mouseOut(event, d.barIndex, itemIdx);
            });

        // Add x-axis
        svgGElement.append("g")
            .attr("transform", `translate(${plotPadding.left + barLabelWidth + barLabelPaddingRight}, ${plotPadding.top + this.plotAreaHeight + AXIS_PADDING_TOP})`)
            .call(d3.axisBottom(xScale))
            .attr("font-size", "12px") // Increase tick label size
            .append("text")
            .attr("font-family", font)
            .attr("fill", "black")
            .attr("x", barWidth / 2)
            .attr("y", X_AXIS_HEIGHT)
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
            .attr("transform", (_, i) => `translate(${(i % legendColumns) * legendEntryWidth + Math.max((i % legendColumns) - 1, 0) * legendColumnSpacing}, ${Math.floor(i / legendColumns) * (legendEntryHeight + legendRowSpacing) + legendTitleFontSize + LEGEND_TITLE_PADDING_BOTTOM + legendContentStartTop})`);

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
        const elementClass = this.settings.className;

        StyleUtilities.applyStyle(this.element, elementClass, `
.${elementClass} .barplot-item-highlighted {
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
    font-size: 20px;
}

.${elementClass} .legend-item-highlighted {
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
}
`);
    }

    private mouseIn(event: MouseEvent, barIndex: number, itemIndex: number) {
        const d = this.data[barIndex].items[itemIndex];

        this.settings.mouseIn(this.data, barIndex, itemIndex, {x: event.clientX, y: event.clientY});

        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip.show(event, this.settings.getTooltip(this.data, barIndex, itemIndex));
        }

        if (this.settings.highlightOnHover) {
            const barplot = d3.select(this.element);

            // Everything is dimmed except the hovered category, which is what makes it stand out, and its entry in
            // the legend. The category is matched on the datum d3 bound rather than through an attribute selector
            // holding the label: labels are free text, and a taxon name carrying a quote or a bracket builds a
            // selector that does not parse, which would throw out of this handler and leave the whole plot dimmed.
            barplot.selectAll<SVGGElement, StackedSegment>(".barplot-item")
                .classed("barplot-item-highlighted", segment => segment.title !== d.label);

            barplot.selectAll<SVGGElement, string>(".legend-item")
                .classed("legend-item-highlighted", label => label !== d.label);
        }
    }

    private mouseMove(event: MouseEvent, barIndex: number, itemIndex: number) {
        this.settings.mouseMove(this.data, barIndex, itemIndex, {x: event.clientX, y: event.clientY})

        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip.move(event);
        }
    }

    private mouseOut(event: MouseEvent, barIndex: number, itemIndex: number) {
        this.settings.mouseOut(this.data, barIndex, itemIndex)

        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip.hide();
        }

        if (this.settings.highlightOnHover) {
            const barplot = d3.select(this.element);

            // Stop highlighting of barplot items
            barplot.selectAll(".barplot-item").classed("barplot-item-highlighted", false);

            // Stop highlighting of the legend items
            barplot.selectAll(".legend-item").classed("legend-item-highlighted", false);
        }
    }
}
