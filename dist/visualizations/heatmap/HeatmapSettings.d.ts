import { default as Settings } from './../../Settings';
import { HeatmapFeature } from './HeatmapFeature';
import { HeatmapValue } from './HeatmapValue';
import { Clusterer } from './cluster/Clusterer';
import { Reorderer } from './reorder/Reorderer';

export default class HeatmapSettings extends Settings {
    /**
     * The amount of pixels that can maximally be used for row labels when initially rendering the heatmap.
     */
    initialTextWidth: number;
    /**
     * The amount of pixels that can maximally be used for column labels when initially rendering the heatmap.
     */
    initialTextHeight: number;
    /**
     * Padding between squares in the heatmap grid (in pixels). Set to 0 for no padding.
     */
    squarePadding: number;
    /**
     * Padding between the visualization and the labels (in pixels). This padding is applied to both the row and
     * column labels.
     */
    visualizationTextPadding: number;
    /**
     * Font size for labels, when current label is not highlighted. Size must be given in pixels.
     */
    fontSize: number;
    /**
     * Color of label text, when label is not highlighted. Value should be a valid HTML color string (hexadecimal).
     */
    labelColor: string;
    /**
     * Should the row, column and square that are currently being hovered by the mouse cursor be highlighted?
     */
    highlightSelection: boolean;
    /**
     * Font size for labels, when current label is highlighted. Size must be given in pixels.
     */
    highlightFontSize: number;
    /**
     * Color of label text, when label is highlighted. Value should be a valid HTML color string (hexadecimal).
     */
    highlightFontColor: string;
    /**
     * Classname that's internally used for the object.
     */
    className: string;
    /**
     * Determines if animations should be rendered when rows and columns are reordered.
     */
    animationsEnabled: boolean;
    /**
     * Determines how long animations should take, if they are enabled. Time should be given in milliseconds.
     */
    animationDuration: number;
    /**
     * Transition effect that should be applied to the reordering animation. Pass a predefined function from the
     * Transition namespace, or provide your own function that maps a value from [0, 1] to [0, 1].
     *
     * @param x A value from the interval [0, 1].
     * @return A value in the interval [0, 1] that adheres to a specific transition's rules.
     */
    transition: (x: number) => number;
    /**
     * Color value that should be used to render squares with the lowest possible value. All other values between min
     * and max value will be colored with a color value interpolated between minColor and maxColor. Value should be a
     * valid HTML color string.
     */
    minColor: string;
    /**
     * Color value that should be used to render squares with the highest possible value. All other values between min
     * and max value will be colored with a color value interpolated between minColor and maxColor. Value should be a
     * valid HTML color string.
     */
    maxColor: string;
    /**
     * How many distinct colors between minColor and maxColor should be used for the heatmap (this value thus determines
     * the size of the color palette). Increasing this value will decrease the heatmap's performance.
     */
    colorBuckets: number;
    /**
     * Should a dendrogram be rendered for both axes?
     */
    dendrogramEnabled: boolean;
    /**
     * Amount of pixels that can be taken in by the dendrogram
     */
    dendrogramWidth: number;
    /**
     * Width of the lines used to construct a dendrogram (in pixels).
     */
    dendrogramLineWidth: number;
    /**
     * Color of the lines used to construct a dendrogram (must be a valid HTML color string).
     */
    dendrogramColor: string;
    clusteringAlgorithm: Clusterer;
    reorderer: Reorderer;
    /**
     * Returns the html to use as tooltip for a cell. Is called with a HeatmapValue that represents the current cell and
     * the row and column objects associated with the highlighted cell as parameters. The result of getTooltipTitle is
     * used for the header and getTooltipText is used for the body of the tooltip by default.
     *
     * @param value Current value for the square that's being hovered by the mouse cursor.
     * @param row Row index that's currently being hovered by the mouse cursor.
     * @param column Column index that's currently being hovered by the mouse cursor.
     * @return A valid HTML-string that represents a tooltip.
     */
    getTooltip: (value: HeatmapValue, row: HeatmapFeature, column: HeatmapFeature) => string;
    /**
     * Returns text that's being used for the title of a tooltip. This tooltip provides information to the user about
     * the value that's currently hovered by the mouse cursor.
     *
     * This function returns the row and column title of the currently selected value by default.
     *
     * @param value Current value for the square that's being hovered by the mouse cursor.
     * @param row Row index that's currently being hovered by the mouse cursor.
     * @param column Column index that's currently being hovered by the mouse cursor.
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipTitle: (value: HeatmapValue, row: HeatmapFeature, column: HeatmapFeature) => string;
    /**
     * Returns text that's being used for the body of a tooltip. This tooltip provides information to the user about
     * the value that's currently hovered by the mouse cursor.
     *
     * This function returns the currently selected value (as a percentage) by default.
     *
     * @param x Current value for the square that's being hovered by the mouse cursor.
     * @return Text content that should be used for the header of the tooltip.
     */
    getTooltipText: (x: HeatmapValue) => string;
}
