import * as d3 from "d3";
import HeatmapSettings, {HeatmapLegendSettings} from "./HeatmapSettings";
import ClusterElement from "./cluster/ClusterElement";
import TreeNode from "./cluster/TreeNode";
import {Reorderer} from "./reorder/Reorderer";
import {HeatmapFeature} from "./HeatmapFeature";
import {HeatmapValue} from "./HeatmapValue";
import Preprocessor from "./Preprocessor";
import Tooltip from "./../../utilities/Tooltip";
import {VisualizationPadding} from "./../../Settings";

import CanvasRenderHelper from "./../../render/CanvasRenderHelper";
import RenderHelper from "./../../render/RenderHelper";

type ViewPort = {
    xTop: number,
    yTop: number,
    xBottom: number,
    yBottom: number
};

const LEGEND_FONT_FAMILY = "'Helvetica Neue', Helvetica, Arial, sans-serif";

// The color for the lowest value is a very light one by default, so the color bar is outlined to keep it visible.
const LEGEND_OUTLINE_COLOR = "rgba(0, 0, 0, 0.2)";

// Vertical space (in pixels) between the legend's title and its color bar.
const LEGEND_TITLE_SPACING = 6;

// Vertical space (in pixels) between the legend's color bar and its tick labels. The tick marks are drawn in it.
const LEGEND_LABEL_SPACING = 8;

// Length (in pixels) of the tick marks underneath the legend's color bar.
const LEGEND_TICK_LENGTH = 4;

// A canvas with a height of zero or less is invalid: browsers fall back to their default height of 150 pixels, which
// makes the visualization taller than requested instead of smaller.
const MINIMUM_GRID_HEIGHT = 1;

/**
 * One of the primitives that a legend is built out of. Positions are relative to the top left corner of the legend's
 * content (thus with the legend's padding already applied).
 */
type LegendShape =
    { type: "rect", x: number, y: number, width: number, height: number, fill: string, stroke?: string } |
    { type: "line", x1: number, y1: number, x2: number, y2: number, stroke: string } |
    { type: "text", x: number, y: number, fontSize: number, anchor: string, content: string };

export default class Heatmap {
    private element: HTMLElement;
    private settings: HeatmapSettings;

    private rows: HeatmapFeature[];
    private columns: HeatmapFeature[];
    private values: HeatmapValue[][];
    private valuesPerColor: Map<string, [number, number][]>;

    private originalViewPort: ViewPort;
    private currentViewPort: ViewPort;

    private visElement: d3.Selection<HTMLCanvasElement, unknown, HTMLElement, any>;
    private context: CanvasRenderingContext2D;

    // Which portion of the visualisation is currently reserved for the text?
    private textWidth: number;
    private textHeight: number;

    private tooltip: Tooltip | null = null;

    private legendElement: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null;

    // Set while the user pans or zooms the heatmap, so that the tooltip stays out of the way of the gesture.
    private navigating: boolean = false;

    private highlightedRow: number = -1;
    private highlightedColumn: number = -1;

    private pixelRatio: number;

    private rowClusterRoot!: TreeNode;
    private colClusterRoot!: TreeNode;
    private horizontalNodesPerDepth!: TreeNode[][];
    private verticalNodesPerDepth!: TreeNode[][];

    private animatingRows: boolean = false;
    private animatingCols: boolean = false;

    private clusteredHorizontal: boolean = false;
    private clusteredVertical: boolean = false;

    private lastZoomStatus: { k: number, x: number, y: number } = {
        k: 1,
        x: 0,
        y: 0
    };

    constructor(
        elementIdentifier: HTMLElement,
        values: number[][],
        rowLabels: string[],
        columnLabels: string[],
        options: HeatmapSettings = new HeatmapSettings()
    ) {
        this.settings = this.fillOptions(options);

        this.element = elementIdentifier;

        const preprocessor = new Preprocessor();
        this.rows = preprocessor.preprocessFeatures(rowLabels);
        this.columns = preprocessor.preprocessFeatures(columnLabels);

        this.values = preprocessor.preprocessValues(
            values,
            this.settings.minColor,
            this.settings.maxColor,
            this.settings.colorBuckets
        );
        this.valuesPerColor = preprocessor.orderPerColor(this.values);

        if (this.settings.enableTooltips) {
            this.tooltip = Tooltip.create(this.element, this.settings.tooltipContainer);
        }

        this.pixelRatio = window.devicePixelRatio || 1;

        // Initialize the viewport with the default width and height of the visualization
        this.originalViewPort = {
            xTop: 0,
            yTop: 0,
            xBottom: this.settings.width,
            yBottom: this.gridHeight
        }

        this.currentViewPort = this.originalViewPort;

        this.textWidth = this.settings.initialTextWidth;
        this.textHeight = this.settings.initialTextHeight;

        // Add a canvas to the desired element and set it's required properties
        this.element.innerHTML = "";

        // @ts-expect-error
        this.visElement = d3.select(this.element)
            .append("canvas")
            .attr("width", this.pixelRatio * this.settings.width)
            .attr("height", this.pixelRatio * this.gridHeight)
            .attr("style", this.canvasStyle())
            .on("mouseover", (event: MouseEvent) => this.tooltipMove(event))
            .on("mousemove", (event: MouseEvent) => this.tooltipMove(event))
            .on("mouseout", (event: MouseEvent) => this.tooltipMove(event))
            .on("click", (event: MouseEvent) => this.click(event));
        this.context = this.visElement.node()!.getContext("2d")!;
        this.context.scale(this.pixelRatio, this.pixelRatio);

        const zoom = d3.zoom()
            .extent([[0, 0], [this.settings.width, this.gridHeight]])
            .scaleExtent([0.25, 12])
            .on("start", () => {
                this.navigating = true;
                this.hideTooltip();
            })
            .on("zoom", (event: d3.D3ZoomEvent<any, any>) => {
                this.zoomed(event.transform);
            })
            .on("end", () => {
                this.navigating = false;
            });

        // @ts-expect-error
        this.visElement.call(zoom);

        if (this.settings.enableLegend) {
            this.legendElement = d3.select(this.element).append("svg");
            this.renderLegend();
        }

        this.computeClusterRoots();

        this.redraw();
    }

    private fillOptions(options: any = undefined): HeatmapSettings {
        const output = new HeatmapSettings();
        Object.assign(output, options);
        output.legend = this.fillGroup(new HeatmapLegendSettings(), options?.legend);
        return output;
    }

    /**
     * Object.assign is shallow, so a settings group that only mentions some of its settings would wipe out the
     * defaults for all the others. The padding nested inside such a group needs the same treatment.
     */
    private fillGroup<T extends { padding: VisualizationPadding }>(defaults: T, options: any): T {
        const padding = Object.assign({}, defaults.padding, options?.padding);
        return Object.assign(defaults, options, { padding });
    }

    /**
     * Reset the complete view to it's initial state with the options and data passed in the constructor.
     */
    public reset() {
        this.redraw();
    }

    /**
     * Cluster the data found in the Heatmap according to the default clustering algorithm.
     * @param toCluster One of "all", "columns" or "rows". "All" denotes that clustering on both the rows and columns
     * should be performed. "Columns" denotes that clustering should only be clustered on the columns only. "Rows"
     * denotes that the clustering is performed on the rows only.
     */
    public async cluster(toCluster: "all" | "columns" | "rows" | "none" = "all") {
        const animationDuration = this.settings.animationsEnabled ? this.settings.animationDuration / 2 : 0;

        // Function that animates the movement of the rows and columns
        const createAnimator = (rowOrder: number[], columnOrder: number[]) => {
            return new Promise<void>((resolve) => {
                let animationStart: number;

                const animateRows = (timestamp: number) => {
                    if (animationStart === undefined) {
                        animationStart = timestamp;
                    }
                    const elapsed = timestamp - animationStart;

                    const animationStep = this.settings.transition(elapsed / animationDuration);
                    this.redraw(rowOrder, columnOrder, animationStep);

                    if (elapsed < animationDuration) {
                        requestAnimationFrame(animateRows);
                    } else {
                        resolve();
                    }
                };

                requestAnimationFrame(animateRows);
            });
        }

        const preprocessor = new Preprocessor();

        let rowOrder: number[] = Array.from(Array(this.rows.length).keys())
        const inverseRowOrder: number[] = new Array(rowOrder.length);

        if ((toCluster === "all" || toCluster === "rows") && !this.clusteredVertical) {
            this.clusteredVertical = true;

            // Now we perform a depth first search on the result in order to find the order of the values
            rowOrder = this.determineOrder(this.rowClusterRoot);
            for (const [idx, row] of Object.entries(rowOrder)) {
                inverseRowOrder[row] = Number.parseInt(idx);
            }

            // First animate rows
            const columnIdentity = Array.from(Array(this.columns.length).keys());
            this.animatingRows = true;
            await createAnimator(inverseRowOrder, columnIdentity);
            this.animatingRows = false;

            const newValues = [];
            // Swap rows into the correct position
            for (const row of rowOrder) {
                newValues.push(this.values[row]);
            }

            // Swap row titles
            const newRowTitles = [];
            for (const row of rowOrder) {
                newRowTitles.push(this.rows[row]);
            }

            this.rows = newRowTitles;
            this.values = newValues;
            this.valuesPerColor = preprocessor.orderPerColor(this.values);
        }

        let columnOrder: number[] = Array.from(Array(this.columns.length).keys())
        const inverseColumnOrder: number[] = new Array(columnOrder.length);

        if ((toCluster === "all" || toCluster === "columns") && !this.clusteredHorizontal) {
            this.clusteredHorizontal = true;

            columnOrder = this.determineOrder(this.colClusterRoot);
            for (const [idx, col] of Object.entries(columnOrder)) {
                inverseColumnOrder[col] = Number.parseInt(idx);
            }

            // Then animate columns
            const rowIdentity = Array.from(Array(this.rows.length).keys());
            this.animatingCols = true;
            await createAnimator(rowIdentity, inverseColumnOrder);
            this.animatingCols = false;

            const newValues = [];
            // Swap columns
            for (const row of rowIdentity) {
                const newRow: HeatmapValue[] = [];
                for (const column of columnOrder) {
                    newRow.push(this.values[row][column]);
                }
                newValues.push(newRow);
            }

            // Swap column titles
            const newColumnTitles = [];
            for (const col of columnOrder) {
                newColumnTitles.push(this.columns[col]);
            }

            this.columns = newColumnTitles;
            this.values = newValues;
            this.valuesPerColor = preprocessor.orderPerColor(this.values);
        }

        this.redraw();
    }

    private computeClusterRoots() {
        const clusterer = this.settings.clusteringAlgorithm;
        const molo: Reorderer = this.settings.reorderer;

        // Create a new ClusterElement for every row that exists. This ClusterElement keeps track of an array of
        // numbers that correspond to a row's values.
        const rowElements: ClusterElement[] = this.rows.map((el, idx) => new ClusterElement(
            this.values[idx].filter(val => val.rowId == el.idx).map(x => x.value), el.idx!)
        );

        this.rowClusterRoot = molo.reorder(clusterer.cluster(rowElements));
        this.verticalNodesPerDepth = this.bfsNodesPerDepth(this.rowClusterRoot);

        // Create a new ClusterElement for every column that exists.
        const columnElements: ClusterElement[] = this.columns.map(
            (el, idx) => new ClusterElement(
                this.values.map(col => col[idx].value),
                el.idx!
            )
        );

        this.colClusterRoot = molo.reorder(clusterer.cluster(columnElements));
        this.horizontalNodesPerDepth = this.bfsNodesPerDepth(this.colClusterRoot);
    }

    public resize(newWidth: number, newHeight: number) {
        this.settings.width = newWidth;
        this.settings.height = newHeight;

        this.visElement.attr("height", this.pixelRatio * this.gridHeight);
        this.visElement.attr("width", this.pixelRatio * newWidth);
        this.visElement.attr("style", this.canvasStyle());
        this.context.scale(this.pixelRatio, this.pixelRatio);

        this.originalViewPort = {
            xTop: 0,
            yTop: 0,
            xBottom: newWidth,
            yBottom: this.gridHeight
        }

        this.renderLegend();

        this.zoomed(this.lastZoomStatus);
    }

    /**
     * Height that's available to the heatmap grid itself. The legend is rendered underneath the grid and takes away
     * part of the configured height, so that the visualization as a whole keeps the dimensions that were requested.
     * A grid that no longer fits is clamped instead of refused: heatmaps are commonly resized to whatever a container
     * happens to measure, and throwing on a container that's briefly smaller than the legend is worse than a
     * visualization that ends up a few pixels taller than asked for.
     */
    private get gridHeight(): number {
        return Math.max(MINIMUM_GRID_HEIGHT, this.settings.height - this.legendHeight());
    }

    private canvasStyle(): string {
        // A canvas is an inline element, which would put the descender gap of a line box between it and the legend
        // underneath it. Only opt out of that when there actually is a legend to keep away from.
        const display = this.settings.enableLegend ? "display: block; " : "";
        return `${display}width: ${this.settings.width}px; height: ${this.gridHeight}px`;
    }

    /**
     * Amount of vertical space (in pixels) that's taken up by the legend, or 0 when the legend is disabled.
     */
    private legendHeight(): number {
        if (!this.settings.enableLegend) {
            return 0;
        }

        const legend = this.settings.legend;
        const titleHeight = legend.title ? legend.titleFontSize + LEGEND_TITLE_SPACING : 0;

        return legend.padding.top +
            titleHeight +
            legend.height +
            LEGEND_LABEL_SPACING +
            legend.labelFontSize +
            legend.padding.bottom;
    }

    /**
     * Width (in pixels) of the legend's color bar, given the width that's available to the legend as a whole.
     */
    private legendBarWidth(availableWidth: number): number {
        const legend = this.settings.legend;

        return Math.max(1, Math.min(legend.width, availableWidth - legend.padding.left - legend.padding.right));
    }

    /**
     * Compute the primitives that the legend is built out of. Both the legend that's rendered next to the canvas and
     * the one that's written into the exported SVG are produced from this, so that the two cannot drift apart.
     *
     * @param barWidth Width (in pixels) that the color bar should take up.
     * @return All shapes of the legend, positioned relative to the top left corner of the legend's content.
     */
    private computeLegendShapes(barWidth: number): LegendShape[] {
        const legend = this.settings.legend;
        const shapes: LegendShape[] = [];

        const barTop = legend.title ? legend.titleFontSize + LEGEND_TITLE_SPACING : 0;

        if (legend.title) {
            shapes.push({
                type: "text",
                x: 0,
                y: 0,
                fontSize: legend.titleFontSize,
                anchor: "start",
                content: legend.title
            });
        }

        // Render the palette that the grid itself uses instead of a smooth gradient, so that the legend also shows how
        // coarse the color scale is when only a few color buckets are configured.
        const palette = new Preprocessor().computeColorPalette(
            this.settings.minColor,
            this.settings.maxColor,
            this.settings.colorBuckets
        );

        const bucketWidth = barWidth / palette.length;

        for (const [idx, color] of palette.entries()) {
            const x = idx * bucketWidth;

            shapes.push({
                type: "rect",
                x: x,
                y: barTop,
                // Overlap the next bucket, since fractional widths otherwise leave hairlines between the buckets.
                width: Math.min(bucketWidth + 1, barWidth - x),
                height: legend.height,
                fill: color
            });
        }

        shapes.push({
            type: "rect",
            x: 0.5,
            y: barTop + 0.5,
            width: barWidth - 1,
            height: legend.height - 1,
            fill: "none",
            stroke: LEGEND_OUTLINE_COLOR
        });

        const scale = d3.scaleLinear().domain([0, 1]).range([0, barWidth]);
        const ticks = scale.ticks(legend.ticks);
        const ticksTop = barTop + legend.height;

        for (const [idx, tick] of ticks.entries()) {
            const x = scale(tick);

            shapes.push({
                type: "line",
                x1: x,
                y1: ticksTop,
                x2: x,
                y2: ticksTop + LEGEND_TICK_LENGTH,
                stroke: this.settings.labelColor
            });

            shapes.push({
                type: "text",
                x: x,
                y: ticksTop + LEGEND_LABEL_SPACING,
                fontSize: legend.labelFontSize,
                // Anchor the outermost labels to the ends of the bar, otherwise they are clipped by the legend.
                anchor: idx === 0 ? "start" : idx === ticks.length - 1 ? "end" : "middle",
                content: legend.tickFormat(tick)
            });
        }

        return shapes;
    }

    /**
     * Render the color bar that maps the colors used by the grid onto the values they represent. Does nothing when the
     * legend is disabled.
     */
    private renderLegend() {
        if (!this.legendElement) {
            return;
        }

        const legend = this.settings.legend;
        const height = this.legendHeight();

        this.legendElement
            .attr("width", this.settings.width)
            .attr("height", height)
            .attr("style", `display: block; width: ${this.settings.width}px; height: ${height}px`);

        this.legendElement.selectAll("*").remove();

        const container = this.legendElement
            .append("g")
            .attr("class", "legend")
            .attr("transform", `translate(${legend.padding.left}, ${legend.padding.top})`)
            .attr("font-family", LEGEND_FONT_FAMILY)
            .attr("fill", this.settings.labelColor);

        for (const shape of this.computeLegendShapes(this.legendBarWidth(this.settings.width))) {
            if (shape.type === "rect") {
                container.append("rect")
                    .attr("x", shape.x)
                    .attr("y", shape.y)
                    .attr("width", shape.width)
                    .attr("height", shape.height)
                    .attr("fill", shape.fill)
                    .attr("stroke", shape.stroke ?? null);
            } else if (shape.type === "line") {
                container.append("line")
                    .attr("x1", shape.x1)
                    .attr("y1", shape.y1)
                    .attr("x2", shape.x2)
                    .attr("y2", shape.y2)
                    .attr("stroke", shape.stroke);
            } else {
                container.append("text")
                    .attr("x", shape.x)
                    .attr("y", shape.y)
                    .attr("font-size", shape.fontSize)
                    .attr("text-anchor", shape.anchor)
                    .attr("dominant-baseline", "hanging")
                    .text(shape.content);
            }
        }
    }

    /**
     * Convert the shapes of a legend into the corresponding SVG-elements.
     *
     * @param shapes Shapes that were computed by computeLegendShapes.
     * @return A string with one SVG-element per given shape.
     */
    private legendShapesToSVG(shapes: LegendShape[]): string {
        return shapes.map(shape => {
            if (shape.type === "rect") {
                const stroke = shape.stroke ? ` stroke="${shape.stroke}"` : "";

                return `<rect x="${shape.x}" y="${shape.y}" width="${shape.width}" height="${shape.height}" fill="${shape.fill}"${stroke}></rect>`;
            } else if (shape.type === "line") {
                return `<line x1="${shape.x1}" y1="${shape.y1}" x2="${shape.x2}" y2="${shape.y2}" stroke="${shape.stroke}"></line>`;
            } else {
                return `<text x="${shape.x}" y="${shape.y}" font-size="${shape.fontSize}" text-anchor="${shape.anchor}" dominant-baseline="hanging">${shape.content}</text>`;
            }
        }).join("\n");
    }

    /**
     * Convert the heatmap to an SVG-string that can easily be downloaded as a valid SVG-file. Note that the current
     * positioning and zooming level of the heatmap will not be taken into account (but clustering will!). The legend
     * is part of the produced SVG whenever it is enabled.
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
    public toSVG(
        fontSize: number = 14,
        squareDimension: number = 20,
        squarePadding: number = 2,
        visualizationTextPadding: number = 4
    ): string {
        const dimension = squareDimension;

        let svgContents = "";

        // First produce SVG-contents for all squares in the heatmap
        for (const [color, values] of this.valuesPerColor) {
            for (const [row, col] of values) {
                const xTop = col * (dimension + squarePadding);
                const yTop = row * (dimension + squarePadding);

                svgContents += `
                    <rect width="${dimension}" height="${dimension}" fill="${color}" x="${xTop}" y="${yTop}"></rect>
                `
            }
        }

        const offscreenCanvas = new OffscreenCanvas(1, 1);
        const ctx = offscreenCanvas.getContext("2d");

        ctx!.font = `${fontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;

        // Then add the row and colum titles to the heatmap
        const x = dimension * this.columns.length + squarePadding * (this.columns.length - 1) + visualizationTextPadding;
        const textCenter = Math.max((dimension - fontSize) / 2, 0);

        let maximumWidth: number = x;
        for (let row = 0; row < this.rows.length; row++) {
            const y = (dimension + squarePadding) * row + textCenter;

            svgContents += `
                <text 
                    x="${x}" 
                    y="${y}" 
                    font-size="${fontSize}" 
                    dominant-baseline="hanging" 
                    fill="black"
                    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
                >
                    ${this.rows[row].name}
                </text>
            `;

            // Compute the length of the label in pixels
            const computedWidth: number = ctx!.measureText(this.rows[row].name).width + x;
            if (computedWidth > maximumWidth) {
                maximumWidth = computedWidth;
            }
        }

        const y = dimension * this.rows.length + squarePadding * (this.rows.length - 1) + visualizationTextPadding;
        let maximumHeight: number = y;

        for (let col = 0; col < this.columns.length; col++) {
            const x = (dimension + squarePadding) * col + textCenter;

            svgContents += `
                <text 
                    x="${x}" 
                    y="${y}" 
                    font-size="${fontSize}" 
                    text-anchor="start" 
                    fill="black"
                    transform="rotate(90, ${x}, ${y})"
                    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
                >
                    ${this.columns[col].name}
                </text>
            `;

            const computedWidth: number = ctx!.measureText(this.columns[col].name).width + y;
            if (computedWidth > maximumHeight) {
                maximumHeight = computedWidth;
            }
        }

        // The legend is placed underneath the labels, at the size it also has on screen, and grows the exported image
        // instead of overlapping it.
        let legendContents = "";
        let legendHeight = 0;

        if (this.settings.enableLegend) {
            const legend = this.settings.legend;

            legendHeight = this.legendHeight();
            const shapes = this.computeLegendShapes(this.legendBarWidth(maximumWidth));

            legendContents = `
                <g
                    class="legend"
                    transform="translate(${legend.padding.left}, ${maximumHeight + legend.padding.top})"
                    font-family="${LEGEND_FONT_FAMILY}"
                    fill="${this.settings.labelColor}"
                >
                    ${this.legendShapesToSVG(shapes)}
                </g>
            `;
        }

        return `
            <svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(maximumWidth)}" height="${Math.ceil(maximumHeight + legendHeight)}">
                ${svgContents}
                ${legendContents}
            </svg>
        `;
    }

    /**
     * Extracts a linear order from a dendrogram by following all branches up to leaves in a depth-first ordering.
     *
     * @param treeNode Root of a dendrogram for which a linear leaf ordering needs to be extracted.
     */
    private determineOrder(treeNode: TreeNode): number[] {
        return treeNode.values.map(item => item.id);
    }

    /**
     * Determines the dimensions of one square based upon the current width and height-settings and the amount of rows
     * and columns currently set to be visualized.
     */
    private determineSquareWidth(
        viewPort = this.currentViewPort,
        textWidth: number = this.textWidth,
        textHeight: number = this.textHeight
    ) {
        const dendrogramWidth = this.determineDendrogramWidth();

        const visualizationWidth = viewPort.xBottom -
            viewPort.xTop -
            dendrogramWidth -
            this.columns.length * this.settings.squarePadding -
            textWidth;
        const visualizationHeight = viewPort.yBottom -
            viewPort.yTop -
            dendrogramWidth -
            this.rows.length * this.settings.squarePadding -
            textHeight;

        // Squares should at least be one pixel in height
        const squareWidth = Math.max(1, visualizationWidth / this.columns.length);
        const squareHeight = Math.max(1, visualizationHeight / this.rows.length);

        return Math.min(squareWidth, squareHeight);
    }

    private determineDendrogramWidth(): number {
        if (this.settings.dendrogramEnabled) {
            return this.settings.dendrogramWidth * this.lastZoomStatus.k;
        } else {
            return 0;
        }
    }

    private computeTextStartX(
        viewPort = this.currentViewPort,
        textWidth: number = this.textWidth,
        textHeight: number = this.textHeight
    ): number {
        return viewPort.xTop +
            this.determineDendrogramWidth() +
            this.determineSquareWidth(viewPort, textWidth, textHeight) * this.columns.length +
            this.settings.squarePadding * (this.columns.length - 1) +
            this.settings.visualizationTextPadding;
    }

    private computeTextStartY(
        viewPort = this.currentViewPort,
        textWidth: number = this.textWidth,
        textHeight: number = this.textHeight
    ): number {
        return viewPort.yTop +
            this.determineDendrogramWidth() +
            this.determineSquareWidth(viewPort, textWidth, textHeight) * this.rows.length +
            this.settings.squarePadding * (this.rows.length - 1) +
            this.settings.visualizationTextPadding;
    }

    private zoomed({ k, x, y }: { k: number, x: number, y: number }) {
        this.lastZoomStatus = { k, x, y };

        const newTextStartX = x + this.computeTextStartX(
            this.originalViewPort,
            this.settings.initialTextWidth,
            this.settings.initialTextHeight
        ) * k;

        const newTextStartY = y + this.computeTextStartY(
            this.originalViewPort,
            this.settings.initialTextWidth,
            this.settings.initialTextHeight
        ) * k;

        const comparator: (x: number, y: number) => number = (x, y) => {
            if (x > y) {
                return y;
            } else if (k >= 1) {
                return Math.min(x, y);
            } else {
                return Math.max(x, y);
            }
        };

        // Recalculate the current viewport
        this.currentViewPort = {
            xTop: x + this.originalViewPort.xTop * k,
            yTop: y + this.originalViewPort.yTop * k,
            xBottom: comparator(x + this.originalViewPort.xBottom * k, this.originalViewPort.xBottom),
            yBottom: comparator(y + this.originalViewPort.yBottom * k, this.originalViewPort.yBottom)
        }

        this.textWidth = this.currentViewPort.xBottom - newTextStartX;
        this.textHeight = this.currentViewPort.yBottom - newTextStartY;

        this.redraw();
    }

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
    private redraw(
        newRowPositions: number[] = Array.from(Array(this.rows.length).keys()),
        newColumnPositions: number[] = Array.from(Array(this.columns.length).keys()),
        animationStep: number = -1
    ) {
        this.redrawGrid(newRowPositions, newColumnPositions, animationStep);
        this.redrawRowTitles(newRowPositions, animationStep);
        this.redrawColumnTitles(newColumnPositions, animationStep);
        this.redrawDendrogram(animationStep);
    }

    private redrawGrid(
        newRowPositions: number[],
        newColumnPositions: number[],
        animationStep: number
    ) {
        if (animationStep === -1) {
            animationStep = 0;
        }

        const squareWidth = this.determineSquareWidth();
        const dendrogramWidth: number = this.determineDendrogramWidth();

        this.context.clearRect(0, 0, this.settings.width, this.gridHeight);

        for (const [color, values] of this.valuesPerColor) {
            this.context.beginPath();
            this.context.fillStyle = color;

            for (const [row, col] of values) {
                // First compute the positions at the start of the animation
                const xTopStart = this.currentViewPort.xTop + dendrogramWidth + col * (squareWidth + this.settings.squarePadding);
                const yTopStart = this.currentViewPort.yTop + dendrogramWidth + row * (squareWidth + this.settings.squarePadding);

                // Then compute the positions at the end of the animation
                const xTopEnd = this.currentViewPort.xTop + dendrogramWidth + newColumnPositions[col] * (squareWidth + this.settings.squarePadding);
                const yTopEnd = this.currentViewPort.yTop + dendrogramWidth + newRowPositions[row] * (squareWidth + this.settings.squarePadding);

                const xDifference = xTopEnd - xTopStart;
                const yDifference = yTopEnd - yTopStart;

                const xTopCurrent = xTopStart + xDifference * animationStep;
                const yTopCurrent = yTopStart + yDifference * animationStep;
                const xBottomCurrent = xTopCurrent + (squareWidth + this.settings.squarePadding);
                const yBottomCurrent = yTopCurrent + (squareWidth + this.settings.squarePadding);

                // We do not need to draw the current square
                if (xBottomCurrent < 0 || xTopCurrent > this.settings.width) {
                    continue;
                }

                if (yBottomCurrent < 0 || yTopCurrent > this.gridHeight) {
                    continue;
                }

                if (this.settings.highlightSelection && row == this.highlightedRow && col == this.highlightedColumn) {
                    // Add a highlight border around the currently selected square
                    this.context.save();
                    this.context.fillStyle = this.settings.maxColor;
                    this.context.fillRect(
                        xTopCurrent - this.settings.squarePadding,
                        yTopCurrent - this.settings.squarePadding,
                        squareWidth + 2 * this.settings.squarePadding,
                        squareWidth + 2 * this.settings.squarePadding
                    );
                    this.context.restore();
                }

                this.context.fillRect(
                    xTopCurrent,
                    yTopCurrent,
                    squareWidth,
                    squareWidth
                );
            }

            this.context.closePath();
        }
    }

    /**
     * Add ellipsis characters to the string, if it does not fit onto the screen.
     *
     * @param input The string to which an ellipsis should be added, if required.
     * @param width The maximum width that the string should occupy.
     * @return A string to which an ellipsis has been added, if it was required.
     */
    private ellipsizeString(input: string, width: number): string {
        const computedWidth = this.context.measureText(input);

        if (computedWidth.width > width) {
            let i = input.length;
            let output = input.substr(0, i) + "...";
            while (this.context.measureText(output).width > width && i > 0) {
                i--;
                output = input.substr(0, i) + "...";
            }

            if (i === 0) {
                return "";
            }

            return output;
        } else {
            return input;
        }
    }

    private redrawRowTitles(
        newRowPositions: number[],
        animationStep: number
    ) {
        if (animationStep === -1) {
            animationStep = 0;
        }

        const squareWidth = this.determineSquareWidth();
        const dendrogramWidth = this.determineDendrogramWidth();

        // Per how many items should we display a text item? (padding is 8)
        const stepSize: number = Math.max(Math.floor((this.settings.fontSize + 12) / (squareWidth + this.settings.squarePadding)), 1);

        const textStart = this.computeTextStartX();
        let textCenter = Math.max((squareWidth - this.settings.fontSize) / 2, 0);

        this.context.save();

        this.context.fillStyle = this.settings.labelColor;
        this.context.textBaseline = "top";
        this.context.textAlign = "start"
        this.context.font = `${this.settings.fontSize}px Arial, sans-serif`;
        for (let i = 0; i < this.rows.length; i += stepSize) {
            const row = this.rows[i];

            if (this.settings.highlightSelection && i == this.highlightedRow) {
                this.context.save();
                this.context.fillStyle = this.settings.highlightFontColor;
                this.context.font = `${this.settings.highlightFontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
                textCenter = Math.max((squareWidth - this.settings.highlightFontSize) / 2, 0);
            }

            const originalY = this.currentViewPort.yTop + dendrogramWidth + (squareWidth + this.settings.squarePadding) * i + textCenter;
            const endY = this.currentViewPort.yTop + dendrogramWidth + (squareWidth + this.settings.squarePadding) * newRowPositions[i] + textCenter;

            const difference = endY - originalY;
            const currentY = originalY + difference * animationStep;

            this.context.fillText(
                this.ellipsizeString(row.name, this.textWidth),
                textStart,
                currentY
            );

            if (this.settings.highlightSelection && i == this.highlightedRow) {
                this.context.restore();
            }
        }

        this.context.restore();
    }

    private redrawColumnTitles(
        newColumnPositions: number[],
        animationStep: number
    ) {
        if (animationStep === -1) {
            animationStep = 0;
        }

        const squareWidth = this.determineSquareWidth();
        const dendrogramWidth = this.determineDendrogramWidth();

        // Per how many items should we display a text item? (padding is 8)
        const stepSize: number = Math.max(Math.floor((this.settings.fontSize + 12) / (squareWidth + this.settings.squarePadding)), 1);

        const textStart = this.computeTextStartY();
        let textCenter = Math.max((squareWidth - this.settings.fontSize) / 2, 0);

        this.context.save();
        this.context.rotate((90 * Math.PI) / 180);
        this.context.fillStyle = this.settings.labelColor;
        this.context.textBaseline = "bottom";
        this.context.textAlign = "start";
        this.context.font = `${this.settings.fontSize}px Arial, sans-serif`;
        for (let i = 0; i < this.columns.length; i += stepSize) {
            const col = this.columns[i];

            if (this.settings.highlightSelection && i == this.highlightedColumn) {
                this.context.save();
                this.context.fillStyle = this.settings.highlightFontColor;
                this.context.font = `${this.settings.highlightFontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
                textCenter = Math.max((squareWidth - this.settings.highlightFontSize) / 2, 0);
            }

            const originalX = -(this.currentViewPort.xTop + dendrogramWidth + (squareWidth + this.settings.squarePadding) * i + textCenter);
            const endX = -(this.currentViewPort.xTop + dendrogramWidth + (squareWidth + this.settings.squarePadding) * newColumnPositions[i] + textCenter);

            const difference = endX - originalX;
            const currentX = originalX + difference * animationStep;

            // The axis of the canvas also rotate 90 degrees clockwise
            this.context.fillText(
                this.ellipsizeString(col.name, this.textHeight),
                textStart,
                currentX
            );

            if (this.settings.highlightSelection && i == this.highlightedColumn) {
                this.context.restore();
            }
        }

        this.context.restore();
    }

    /**
     * Perform a BFS search on the given tree and order all encountered nodes per depth level. The resulting output
     * of this function is a 2D array of the format depth => TreeNode[] (thus it keeps track of all nodes that are
     * situated at a specific level). Note that the ordering of these nodes per level is not arbitrary, but that nodes
     * in pairs share the parent (that is, node at index 0 and index 1 share the same parent, etc).
     *
     * @param root The root of the tree for which we should order all the children per depth level.
     * @return A 2D array containing one array per depth level of the given tree.
     */
    private bfsNodesPerDepth(root: TreeNode) {
        const nodesPerDepth: TreeNode[][] = [];

        const queue: [TreeNode, number][] = [];
        // Push current node and depth of the node
        queue.push([root, 0]);

        while (queue.length > 0) {
            const [node, depth]: [TreeNode, number] = queue.shift()!;
            if (nodesPerDepth.length <= depth) {
                nodesPerDepth.push([]);
            }
            nodesPerDepth[depth].push(node);

            if (node.leftChild) {
                queue.push([node.leftChild, depth + 1]);
            }

            if (node.rightChild) {
                queue.push([node.rightChild, depth + 1]);
            }
        }

        return nodesPerDepth;
    }

    private redrawDendrogram(animationStep: number) {
        if (this.settings.dendrogramEnabled) {
            this.redrawHorizontalDendrogram(animationStep);
            this.redrawVerticalDendrogram(animationStep);
        }
    }

    private computeDendrogramColor(clustered: boolean, shouldAnimate: boolean, animationStep: number) {
        if (animationStep === -1 || !shouldAnimate) {
            return clustered ? this.settings.dendrogramColor : "#d3d3d3";
        }

        const scale = d3.interpolateLab(d3.lab("#d3d3d3"), d3.lab(this.settings.dendrogramColor));
        return scale(animationStep);
    }

    private redrawVerticalDendrogram(animationStep: number) {
        this.context.save();

        const clusterColor: string = this.computeDendrogramColor(this.clusteredVertical, this.animatingRows, animationStep);

        // Calculate size of all the different items
        const squareWidth: number = this.determineSquareWidth();
        const dendrogramWidth: number = this.settings.dendrogramWidth * this.lastZoomStatus.k;

        const renderHelper: RenderHelper = new CanvasRenderHelper(this.context);

        const verticalLineOffset: number = this.currentViewPort.yTop + dendrogramWidth + squareWidth / 2;

        // Maps node with id i to it's corresponding starting position ([x, y]);
        const nodePositions: Map<number, [number, number]> = new Map<number, [number, number]>();
        const newRowPositions = this.determineOrder(this.rowClusterRoot!);
        for (let i = 0; i < newRowPositions.length; i++) {
            nodePositions.set(
                newRowPositions[i],
                [
                    this.currentViewPort.xTop + dendrogramWidth,
                    i * (squareWidth + this.settings.squarePadding) + verticalLineOffset
                ]
            );
        }

        // Calculate the amount of pixels that can be used for each merge
        const pixelsPerMerge: number = dendrogramWidth / this.rows.length;
        let currentMergeStep: number = this.currentViewPort.xTop + dendrogramWidth - pixelsPerMerge;

        for (let currentDepth = this.verticalNodesPerDepth.length - 1; currentDepth > 0; currentDepth--) {
            // We need to iterate over the different nodes in increments of 2 (since these nodes define a merge per 2)
            for (let i = 0; i < this.verticalNodesPerDepth[currentDepth].length; i += 2) {
                const leftChild = this.verticalNodesPerDepth[currentDepth][i];
                const rightChild = this.verticalNodesPerDepth[currentDepth][i + 1];
                const parent = leftChild.parent;

                const [leftX, leftY] = nodePositions.get(leftChild.id)!;
                const [rightX, rightY] = nodePositions.get(rightChild.id)!;

                this.context.beginPath();
                // Line for the left child
                renderHelper.renderLine(leftX, leftY, currentMergeStep, leftY, this.settings.dendrogramLineWidth, clusterColor);
                // Line for right child
                renderHelper.renderLine(rightX, rightY, currentMergeStep, rightY, this.settings.dendrogramLineWidth, clusterColor);

                // Draw vertical line that connects both items
                renderHelper.renderLine(currentMergeStep, leftY, currentMergeStep, rightY, this.settings.dendrogramLineWidth, clusterColor);
                this.context.closePath();

                // Update the starting position of the parent node.
                if (parent) {
                    const mergePoint: number = Math.min(leftY, rightY) + Math.abs(leftY - rightY) / 2;
                    nodePositions.set(parent.id, [currentMergeStep, mergePoint]);
                }

                currentMergeStep -= pixelsPerMerge;
            }
        }

        if (!this.clusteredVertical) {
            this.context.rotate(-(90 * Math.PI) / 180);
            this.context.fillStyle = this.settings.labelColor;
            const fontSize = 24 * this.lastZoomStatus.k;
            this.context.font = `${fontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
            const textWidth = this.context.measureText("Click to cluster").width;
            this.context.fillText(
                "Click to cluster",
                -(this.currentViewPort.yTop + dendrogramWidth + (this.rows.length * (squareWidth + this.settings.squarePadding)) / 2) - textWidth / 2,
                this.currentViewPort.xTop + dendrogramWidth / 2 + fontSize / 2,
            );
        }

        this.context.restore();
    }

    private redrawHorizontalDendrogram(animationStep: number) {
        this.context.save();

        const clusterColor: string = this.computeDendrogramColor(this.clusteredHorizontal, this.animatingCols, animationStep);

        // Calculate size of all the different items
        const squareWidth: number = this.determineSquareWidth();
        const dendrogramWidth: number = this.settings.dendrogramWidth * this.lastZoomStatus.k;

        const renderHelper: RenderHelper = new CanvasRenderHelper(this.context);

        const horizontalLineOffset: number = this.currentViewPort.xTop + squareWidth / 2 + dendrogramWidth;

        // Maps node with id i to it's corresponding starting position ([x, y]);
        const nodePositions: Map<number, [number, number]> = new Map<number, [number, number]>();
        const newColPositions = this.determineOrder(this.colClusterRoot);
        for (let i = 0; i < newColPositions.length; i++) {
            nodePositions.set(
                newColPositions[i],
                [
                    i * (squareWidth + this.settings.squarePadding) + horizontalLineOffset,
                    this.currentViewPort.yTop + dendrogramWidth
                ]
            );
        }

        // Calculate the amount of pixels that can be used for each merge
        const pixelsPerMerge: number = dendrogramWidth / this.columns.length;
        let currentMergeStep: number = this.currentViewPort.yTop + dendrogramWidth - pixelsPerMerge;

        for (let currentDepth = this.horizontalNodesPerDepth.length - 1; currentDepth > 0; currentDepth--) {
            // We need to iterate over the different nodes in increments of 2 (since these nodes define a merge per 2)
            for (let i = 0; i < this.horizontalNodesPerDepth[currentDepth].length; i += 2) {
                const leftChild = this.horizontalNodesPerDepth[currentDepth][i];
                const rightChild = this.horizontalNodesPerDepth[currentDepth][i + 1];
                const parent = leftChild.parent;

                const [leftX, leftY] = nodePositions.get(leftChild.id)!;
                const [rightX, rightY] = nodePositions.get(rightChild.id)!;

                this.context.beginPath();
                // Line for the left child
                renderHelper.renderLine(leftX, leftY, leftX, currentMergeStep, this.settings.dendrogramLineWidth, clusterColor);
                // Line for right child
                renderHelper.renderLine(rightX, rightY, rightX, currentMergeStep, this.settings.dendrogramLineWidth, clusterColor);

                // Draw horizontal line that connects both items
                renderHelper.renderLine(leftX, currentMergeStep, rightX, currentMergeStep, this.settings.dendrogramLineWidth, clusterColor);
                this.context.closePath();

                // Update the starting position of the parent node.
                if (parent) {
                    const mergePoint: number = Math.min(leftX, rightX) + Math.abs(leftX - rightX) / 2;
                    nodePositions.set(parent.id, [mergePoint, currentMergeStep]);
                }

                currentMergeStep -= pixelsPerMerge;
            }
        }

        if (!this.clusteredHorizontal) {
            this.context.fillStyle = this.settings.labelColor;
            const fontSize = 24 * this.lastZoomStatus.k;
            this.context.font = `${fontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
            const textWidth = this.context.measureText("Click to cluster").width;
            this.context.fillText(
                "Click to cluster",
                this.currentViewPort.xTop + dendrogramWidth + (this.columns.length * (squareWidth + this.settings.squarePadding)) / 2 - textWidth / 2,
                this.currentViewPort.yTop + dendrogramWidth / 2 + fontSize / 2,
            );
        }

        this.context.restore();
    }

    private findRowAndColForPosition(x: number, y: number): [number, number] {
        const dendrogramWidth = this.determineDendrogramWidth();
        const currentX = x - this.currentViewPort.xTop - dendrogramWidth;
        const currentY = y - this.currentViewPort.yTop - dendrogramWidth;

        const squareWidth = this.determineSquareWidth();

        const row = Math.floor(currentY / (squareWidth + this.settings.squarePadding));
        const col = Math.floor(currentX / (squareWidth + this.settings.squarePadding));

        return [row, col];
    }

    private tooltipMove(event: MouseEvent) {
        // Panning keeps the cursor moving over the heatmap, which would otherwise drag a tooltip along with it.
        if (this.navigating) {
            this.hideTooltip();
            return;
        }

        // Find out which element is situated under the current mouse position.
        // @ts-expect-error
        const rect = event.target.getBoundingClientRect();
        const [row, col] = this.findRowAndColForPosition(event.clientX - rect.left, event.clientY - rect.top);

        if (row < 0 || row >= this.rows.length || col < 0 || col >= this.columns.length) {
            this.hideTooltip();

            this.highlightedRow = -1;
            this.highlightedColumn = -1;

            if (this.settings.highlightSelection) {
                this.redraw();
            }

            return;
        }

        this.highlightedRow = row;
        this.highlightedColumn = col;

        if (this.settings.highlightSelection) {
            this.redraw();
        }

        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip.show(event, this.settings.getTooltip(this.values[row][col], this.rows[row], this.columns[col]));
        }
    }

    private hideTooltip() {
        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip.hide();
        }
    }

    /**
     * Determines if a click occurred on one of the dendrograms and if clustering should be applied to the heatmap.
     *
     * @param event
     * @private
     */
    private click(event: MouseEvent) {
        if (!this.settings.dendrogramEnabled) {
            return;
        }

        const dendroWidth = this.determineDendrogramWidth();
        const squareWidth = this.determineSquareWidth();

        // @ts-expect-error
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (
            x >= this.currentViewPort.xTop &&
            x <= this.currentViewPort.xTop + dendroWidth &&
            y >= this.currentViewPort.yTop + dendroWidth &&
            y <= this.currentViewPort.yTop + dendroWidth + this.rows.length * (squareWidth + this.settings.squarePadding)
        ) {
            // Clicked on the vertical dendrogram (and thus cluster vertically)
            this.cluster("rows");
            return;
        }

        if (
            x >= this.currentViewPort.xTop + dendroWidth &&
            x <= this.currentViewPort.xTop + dendroWidth + this.columns.length * (squareWidth + this.settings.squarePadding) &&
            y >= this.currentViewPort.yTop &&
            y <= this.currentViewPort.yTop + dendroWidth
        ) {
            this.cluster("columns");
            return;
        }
    }
}
