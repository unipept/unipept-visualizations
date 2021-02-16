import HeatmapSettings from "./HeatmapSettings";
import "core-js/stable";
import "regenerator-runtime/runtime";
export default class Heatmap {
    private element;
    private settings;
    private rows;
    private columns;
    private values;
    private valuesPerColor;
    private originalViewPort;
    private currentViewPort;
    private visElement;
    private context;
    private textWidth;
    private textHeight;
    private tooltip;
    private highlightedRow;
    private highlightedColumn;
    private pixelRatio;
    private rowClusterRoot;
    private colClusterRoot;
    private horizontalNodesPerDepth;
    private verticalNodesPerDepth;
    private animatingRows;
    private animatingCols;
    private clusteredHorizontal;
    private clusteredVertical;
    private lastZoomStatus;
    constructor(elementIdentifier: HTMLElement, values: number[][], rowLabels: string[], columnLabels: string[], options?: HeatmapSettings);
    private fillOptions;
    /**
     * Reset the complete view to it's initial state with the options and data passed in the constructor.
     */
    reset(): void;
    /**
     * Cluster the data found in the Heatmap according to the default clustering algorithm.
     * @param toCluster One of "all", "columns" or "rows". "All" denotes that clustering on both the rows and columns
     * should be performed. "Columns" denotes that clustering should only be clustered on the columns only. "Rows"
     * denotes that the clustering is performed on the rows only.
     */
    cluster(toCluster?: "all" | "columns" | "rows" | "none"): Promise<void>;
    private computeClusterRoots;
    resize(newWidth: number, newHeight: number): void;
    /**
     * Convert the heatmap to an SVG-string that can easily be downloaded as a valid SVG-file. Note that the current
     * positioning and zooming level of the heatmap will not be taken into account (but clustering will!).
     *
     * Note that this function can take a while to compute for larger heatmaps. It is recommended to start this
     * function in a dedicated worker in order not to block the main JS thread.
     *
     * @param fontSize Font size that should be used for the labels in the produced SVG file.
     * @param squareDimension width and height (in pixels) of one square in the produced heatmap.
     * @param squarePadding Amount of space between squares in both the horizontal and vertical direction (in pixels).
     * @param visualizationTextPadding Amount of space between the heatmap itself and the labels on both axes.
     * @return A string that represents the content of a valid SVG file.
     */
    toSVG(fontSize?: number, squareDimension?: number, squarePadding?: number, visualizationTextPadding?: number): string;
    /**
     * Extracts a linear order from a dendrogram by following all branches up to leaves in a depth-first ordering.
     *
     * @param treeNode Root of a dendrogram for which a linear leaf ordering needs to be extracted.
     */
    private determineOrder;
    /**
     * Determines the dimensions of one square based upon the current width and height-settings and the amount of rows
     * and columns currently set to be visualized.
     */
    private determineSquareWidth;
    private determineDendrogramWidth;
    private computeTextStartX;
    private computeTextStartY;
    private zoomed;
    /**
     * Redraw the complete Heatmap and clear the view first. This function accepts three optional arguments that
     * determine the current animation state (if requested).
     *
     * @param newRowPositions Current position of the rows. Row[i] = j denotes that the i'th row in the original grid
     * should move to position j.
     * @param newColumnPositions New positions of the columns. Column[i] = j denotes that i'th column in the original
     * grid should move to position j.
     * @param animationStep A decimal number (in [0, 1]) that denotes the current animation progress. If 0.7 is passed
     * as a value, 70% of the animation has already passed.
     */
    private redraw;
    private redrawGrid;
    /**
     * Add ellipsis characters to the string, if it does not fit onto the screen.
     *
     * @param input The string to which an ellipsis should be added, if required.
     * @param width The maximum width that the string should occupy.
     * @return A string to which an ellipsis has been added, if it was required.
     */
    private ellipsizeString;
    private redrawRowTitles;
    private redrawColumnTitles;
    /**
     * Perform a BFS search on the given tree and order all encountered nodes per depth level. The resulting output
     * of this function is a 2D array of the format depth => TreeNode[] (thus it keeps track of all nodes that are
     * situated at a specific level). Note that the ordering of these nodes per level is not arbitrary, but that nodes
     * in pairs share the parent (that is, node at index 0 and index 1 share the same parent, etc).
     *
     * @param root The root of the tree for which we should order all the children per depth level.
     * @return A 2D array containing one array per depth level of the given tree.
     */
    private bfsNodesPerDepth;
    private redrawDendrogram;
    private computeDendrogramColor;
    private redrawVerticalDendrogram;
    private redrawHorizontalDendrogram;
    private initTooltip;
    private findRowAndColForPosition;
    private tooltipMove;
    /**
     * Determines if a click occurred on one of the dendrograms and if clustering should be applied to the heatmap.
     *
     * @param event
     * @private
     */
    private click;
}
