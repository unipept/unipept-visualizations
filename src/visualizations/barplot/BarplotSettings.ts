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
    columns: number = 4;

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
    maxItems: number | undefined = 15;

    /**
     * Which font for the titles and labels in the visualization
     */
    font: string = "Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;";

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

    enableTooltips: boolean = true;

    /**
     * Returns the html to use as tooltip for current mouse position. This tooltip provides information to the user
     * about the node that's currently hovered by the mouse cursor.
     *
     * @param value Current node that's being hovered by the mouse cursor.
     * @return A valid HTML-string that represents a tooltip.
     */
    getTooltip: (
        value: BarItem,
    ) => string = (value: BarItem) => {
        return `
            <style>
                .unipept-tooltip {
                    padding: 10px;
                    border-radius: 5px; 
                    background: rgba(0, 0, 0, 0.8); 
                    color: #fff;
                }
                
                .unipept-tooltip div, .unipept-tooltip a {
                    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
                }
                
                .unipept-tooltip div {
                    font-weight: bold;
                }
            </style>
            <div class="unipept-tooltip">
                <div>
                    ${this.getTooltipTitle(value)}
                </div>
                <a>
                    ${this.getTooltipText(value)}
                </a>
            </div>
        `
    };

    /**
     * Returns text that's being used for the title of a tooltip. This tooltip provides information to the user about
     * the node that's currently hovered by the mouse cursor.
     *
     * This function returns the row and column title of the currently selected value by default.
     *
     * @param value Current node that's being hovered by the mouse cursor.
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipTitle: (value: BarItem) => string = (value: BarItem) => value.label;

    /**
     * Returns text that's being used for the body of a tooltip. This tooltip provides information to the user about
     * the node that's currently hovered by the mouse cursor.
     *
     * @param x Current value for the node that's being hovered by the mouse cursor.
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipText: (x: BarItem) => string = (x: BarItem) => {
        if (this.displayMode === "absolute") {
            return `${x.counts.toFixed(1)} hits`;
        } else {
            return `${x.counts.toFixed(1)} %`;
        }
    };
}
