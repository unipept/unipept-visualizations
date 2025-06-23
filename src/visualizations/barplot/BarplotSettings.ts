import Settings, {VisualizationPadding} from "../../Settings";
import DataNode from "../../DataNode";
import {Bar, BarItem} from "./Bar";

export class BarplotChartSettings {
    /**
     * Padding around the actual chart part of the visualization (thus excluding the legend area).
     */
    padding: VisualizationPadding = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    }
}

export class BarplotLegendSettings {
    /**
     * Padding around the legend area of the visualization.
     */
    padding: VisualizationPadding = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };

    /**
     * Size (in pixels) for the legend title.
     */
    titleFontSize: number = 24;

    /**
     * Size (in pixels) for the labels of the legend.
     */
    labelFontSize: number = 16;

    /**
     * Size (in pixels) for the colored square before each entry in the legend.
     */
    symbolSize: number = 16;

    /**
     * The number of columns that should be used in the legend.
     */
    columns: number = 3;

    /**
     * Maximum width of the legend (in pixels), when used in horizontal mode. The width of the complete visualization is
     * used when the barplot is rendered in vertical mode. The available width will be spread over the amount of desired
     * columns that are requested.
     */
    width: number = 300;

    /**
     * Spacing (in pixels) between successive rows in the legend.
     */
    rowSpacing: number = 5;

    /**
     * Minimum amount of spacing (in pixels) between successive columns in the legend.
     */
    columnSpacing: number = 20;
}

export class BarplotSettings extends Settings {
    /**
     * In horizontal mode, the legend will be displayed to the right of the barplot area. In vertical mode, the legend
     * will be placed below the actual plot.
     */
    orientation: "horizontal" | "vertical" = "vertical";

    /**
     * Height of each bar in the visualization.
     */
    barHeight: number = 75;

    /**
     * Classname that's internally used for the object.
     */
    className: string = "barplot";

    /**
     * Only shows the n largest items in the barplot and moves all the others into a single group "other"
     * The order of the items is determined by looking at values in the first bar. Pass undefined into this option
     * to display all items (and disable the "other" category).
     */
    maxItems: number | undefined = 20;

    /**
     * Which font for the titles and labels in the visualization
     */
    font: string = "\"Roboto\", sans-serif";

    /**
     * Should absolute counts be displayed in the visualization? Or should they be displayed as a percentage relative
     * to the total?
     */
    displayMode: "absolute" | "relative" = "relative";

    /**
     * Show the name of the dataset that's represented by a bar before the actual bar?
     */
    showBarLabel: boolean = true;

    /**
     * Show the count values in the bars themselves? These will always only be displayed if the bar chunks are wide
     * enough.
     */
    showValuesInBars: boolean = true;

    /**
     * Width in pixels of the labels for the bars.
     */
    barLabelWidth: number = 150;

    /**
     * Size (in pixels) of the values that are shown in the bars.
     */
    valuesInBarsFontSize: number = 12;

    /**
     * All settings that are directly related to the chart area of the visualization.
     */
    chart: BarplotChartSettings = new BarplotChartSettings();

    /**
     * All settings that are directly related to the legend area of the visualization.
     */
    legend: BarplotLegendSettings = new BarplotLegendSettings();

    /**
     * Show tooltips when hovering over a chunk in a bar?
     */
    enableTooltips: boolean = true;

    /**
     * Highlight the selected chunk of each bar when it is being hovered by the mouse? This will also highlight the
     * corresponding entry in the barplot's legend.
     */
    highlightOnHover: boolean = true;

    /**
     * Returns the html to use as tooltip for current mouse position. This tooltip provides information to the user
     * about the node that's currently hovered by the mouse cursor.
     *
     * @param bars All bars that are used in this visualization
     * @param barIndex Index of the bar that's currently hovered by the user.
     * @param itemIndex Index of the specific item within a bar that's currently hovered by the user
     * @return A valid HTML-string that represents a tooltip.
     */
    getTooltip: (
        bars: Bar[],
        barIndex: number,
        itemIndex: number
    ) => string = (bars: Bar[], barIndex: number, itemIndex: number) => {
        return `
            <style>
                .unipept-tooltip {
                    padding: 10px;
                    border-radius: 5px; 
                    background: rgba(0, 0, 0, 0.8); 
                    color: #fff;
                }
                
                .unipept-tooltip div {
                    font-family: "Roboto", sans-serif;
                }
            </style>
            <div class="unipept-tooltip">
                <div style="font-size: 20px; margin-bottom: 8px;">
                    ${this.getTooltipTitle(bars, barIndex, itemIndex)}
                </div>
                <div>
                    ${this.getTooltipText(bars, barIndex, itemIndex)}
                </div>
            </div>
        `
    };

    /**
     * Returns text that's being used for the title of a tooltip. This tooltip provides information to the user about
     * the node that's currently hovered by the mouse cursor.
     *
     * This function returns the row and column title of the currently selected value by default.
     *
     * @param bars All bars that are used in this visualization
     * @param barIndex Index of the bar that's currently hovered by the user.
     * @param itemIndex Index of the specific item within a bar that's currently hovered by the user
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipTitle: (bars: Bar[], barIndex: number, itemIndex: number) => string = (bars: Bar[], barIndex: number, itemIndex: number) => bars[barIndex].items[itemIndex].label;

    /**
     * Returns text that's being used for the body of a tooltip. This tooltip provides information to the user about
     * the node that's currently hovered by the mouse cursor.
     *
     * @param bars All bars that are used in this visualization
     * @param barIndex Index of the bar that's currently hovered by the user.
     * @param itemIndex Index of the specific item within a bar that's currently hovered by the user
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipText: (bars: Bar[], barIndex: number, itemIndex: number) => string = (bars: Bar[], barIndex: number, itemIndex: number) => {
        const displayText = [];

        const itemKey  = bars[barIndex].items[itemIndex].label;

        for (const bar of bars) {
            const correspondingItem = bar.items.find((item: BarItem) => item.label === itemKey);

            let countText: string;
            if (correspondingItem) {
                countText = this.displayMode === "absolute" ? `${correspondingItem.counts} hits` : `${correspondingItem.counts.toFixed(2)}%`;
            } else {
                countText = "Not present";
            }

            displayText.push(
                `<span style="font-weight: 600;">${bar.label}: </span><span>${countText}</span>`
            );
        }
        return displayText.map(t => `<div style="margin-bottom: 4px;">${t}</div>`).join("\n");
    };
}
