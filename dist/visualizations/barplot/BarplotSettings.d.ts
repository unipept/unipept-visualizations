import { default as Settings, VisualizationPadding } from '../../Settings';
import { BarItem } from './Bar';

export declare class BarplotChartSettings {
    /**
     * Padding around the actual chart part of the visualization (thus excluding the legend area).
     */
    padding: VisualizationPadding;
}
export declare class BarplotLegendSettings {
    /**
     * Padding around the legend area of the visualization.
     */
    padding: VisualizationPadding;
    /**
     * Size (in pixels) for the legend title.
     */
    titleFontSize: number;
    /**
     * Size (in pixels) for the labels of the legend.
     */
    labelFontSize: number;
    /**
     * Size (in pixels) for the colored square before each entry in the legend.
     */
    symbolSize: number;
    /**
     * The number of columns that should be used in the legend.
     */
    columns: number;
    /**
     * Maximum width of the legend (in pixels), when used in horizontal mode. The width of the complete visualization is
     * used when the barplot is rendered in vertical mode. The available width will be spread over the amount of desired
     * columns that are requested.
     */
    width: number;
    /**
     * Spacing (in pixels) between successive rows in the legend.
     */
    rowSpacing: number;
    /**
     * Minimum amount of spacing (in pixels) between successive columns in the legend.
     */
    columnSpacing: number;
}
export declare class BarplotSettings extends Settings {
    /**
     * In horizontal mode, the legend will be displayed to the right of the barplot area. In vertical mode, the legend
     * will be placed below the actual plot.
     */
    orientation: "horizontal" | "vertical";
    /**
     * Height of each bar in the visualization.
     */
    barHeight: number;
    /**
     * Classname that's internally used for the object.
     */
    className: string;
    /**
     * Only shows the n largest items in the barplot and moves all the others into a single group "other"
     * The order of the items is determined by looking at values in the first bar. Pass undefined into this option
     * to display all items (and disable the "other" category).
     */
    maxItems: number | undefined;
    /**
     * Which font for the titles and labels in the visualization
     */
    font: string;
    /**
     * Should absolute counts be displayed in the visualization? Or should they be displayed as a percentage relative
     * to the total?
     */
    displayMode: "absolute" | "relative";
    /**
     * Show the name of the dataset that's represented by a bar before the actual bar?
     */
    showBarLabel: boolean;
    /**
     * Show the count values in the bars themselves? These will always only be displayed if the bar chunks are wide
     * enough.
     */
    showValuesInBars: boolean;
    /**
     * Size (in pixels) of the values that are shown in the bars.
     */
    valuesInBarsFontSize: number;
    /**
     * All settings that are directly related to the chart area of the visualization.
     */
    chart: BarplotChartSettings;
    /**
     * All settings that are directly related to the legend area of the visualization.
     */
    legend: BarplotLegendSettings;
    enableTooltips: boolean;
    /**
     * Returns the html to use as tooltip for current mouse position. This tooltip provides information to the user
     * about the node that's currently hovered by the mouse cursor.
     *
     * @param value Current node that's being hovered by the mouse cursor.
     * @return A valid HTML-string that represents a tooltip.
     */
    getTooltip: (value: BarItem) => string;
    /**
     * Returns text that's being used for the title of a tooltip. This tooltip provides information to the user about
     * the node that's currently hovered by the mouse cursor.
     *
     * This function returns the row and column title of the currently selected value by default.
     *
     * @param value Current node that's being hovered by the mouse cursor.
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipTitle: (value: BarItem) => string;
    /**
     * Returns text that's being used for the body of a tooltip. This tooltip provides information to the user about
     * the node that's currently hovered by the mouse cursor.
     *
     * @param x Current value for the node that's being hovered by the mouse cursor.
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipText: (x: BarItem) => string;
}
