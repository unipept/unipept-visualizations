import * as d3 from "d3";

import SunburstSettings from "./SunburstSettings";
import SunburstPreprocessor from "./SunburstPreprocessor";
import DataNode, { DataNodeLike } from "./../../DataNode";
import TooltipUtilities from "./../../utilities/TooltipUtilities";
import StringUtils from "./../../utilities/StringUtils";
import NodeUtils from "./../../utilities/NodeUtils";
import ColorUtils from "./../../color/ColorUtils";

import "core-js/stable";
import "regenerator-runtime/runtime";

type HRN<T> = d3.HierarchyRectangularNode<T>;

export default class Sunburst {
    private readonly settings: SunburstSettings;
    private readonly data: HRN<DataNode>[];

    private tooltip!: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
    private breadCrumbs: d3.Selection<HTMLUListElement, unknown, HTMLElement, any>;

    private colorCounter: number = -1;
    private currentMaxLevel: number = 4;

    private xScale: d3.ScaleLinear<number, number>;
    private yScale: d3.ScaleLinear<number, number>;

    private path!: d3.Selection<SVGPathElement, HRN<DataNode>, SVGGElement, unknown>;
    private text!: d3.Selection<any, HRN<DataNode>, SVGGElement, unknown>;
    private arc!: d3.Arc<any, HRN<DataNode>>;

    private visGElement: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;

    private arcData: HRN<DataNode>[] = [];
    private textData: HRN<DataNode>[] = [];

    private previousRoot: HRN<DataNode> | null = null;
    private previousMaxLevel: number = this.currentMaxLevel;

    constructor(
        private readonly element: HTMLElement,
        data: DataNodeLike,
        options: SunburstSettings = new SunburstSettings()
    ) {
        this.settings = this.fillOptions(options);

        this.element.id = "U_SUNBURST_" + Math.floor(Math.random() * 2**16);

        const preprocessor = new SunburstPreprocessor();
        const processedData = preprocessor.preprocessData(data);

        if (this.settings.enableTooltips) {
            this.tooltip = TooltipUtilities.initTooltip(this.element.id);
        }

        this.currentMaxLevel = this.settings.levels;

        this.xScale = d3.scaleLinear().range([0, 2 * Math.PI]); // use full circle
        this.yScale = d3.scaleLinear().domain([0, 1]).range([0, this.settings.radius]);

        const rootNode = d3.hierarchy<DataNode>(processedData);
        // We don't want D3 to compute the sum itself. That's why we need to return 0 if the current node has no
        // children.
        rootNode.sum((d: DataNode) => d.children.length > 0 ? 0 : d.selfCount);

        const partition = d3.partition<DataNode>();
        this.data = partition(rootNode).descendants();

        this.arc = d3.arc<HRN<DataNode>>()
            .startAngle((d: HRN<DataNode>) => Math.max(0, Math.min(Math.PI * 2, this.xScale(d.x0))))
            .endAngle((d: HRN<DataNode>) => Math.max(0, Math.min(Math.PI * 2, this.xScale(d.x1))))
            .innerRadius((d: HRN<DataNode>) => Math.max(0, d.y0 ? this.yScale(d.y0) : d.y0))
            .outerRadius((d: HRN<DataNode>) => Math.max(0, this.yScale(d.y1) + 1));

        this.initCss();

        // Prepare element and create SVG container
        this.element.innerHTML = "";
        this.breadCrumbs = d3.select("#" + this.element.id)
            .append("div")
            .attr("id", this.element.id + "-breadcrumbs")
            .attr("class", "sunburst-breadcrumbs")
            .append("ul");

        const visElement = d3.select(this.element)
            .append("svg")
            .attr("version", "1.1")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`)
            .attr("width", this.settings.width)
            .attr("height", this.settings.height)
            .attr("overflow", "hidden")
            .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");

        console.log(d3.select(this.element).html());

        visElement.append("style")
            .attr("type", "text/css")
            .html(".hidden{ visibility: hidden;}");

        // @ts-ignore
        this.visGElement = visElement.append("g")
            // set origin to radius center
            .attr("transform", "translate(" + this.settings.radius + "," + this.settings.radius + ")");

        // Fake click on the center node
        this.reset();
    }

    public reset() {
        this.click(this.data[0]);
    }

    private fillOptions(options: any = undefined): SunburstSettings {
        const output = new SunburstSettings();
        return Object.assign(output, options);
    }

    private maxY(d: HRN<DataNode>): number {
        return d.children ? Math.max(...d.children!.map((i) => this.maxY(i))) : d.y1;
    }

    /**
     * Calculates the color of an arc based on the color of his children.
     *
     * @param d The node for which we want the color.
     * @return string The calculated color in HTML color representation.
     */
    private color(d: DataNode) {
        if (d.name === "empty") {
            return "white";
        }
        if (this.settings.useFixedColors) {
            return this.settings.fixedColorPalette[
                Math.abs(this.settings.fixedColorHash(d)) % this.settings.fixedColorPalette.length
            ];
        } else {
            if (d.children.length > 0) {
                const colours: string[] = d.children.map(c => this.color(c));
                const a = d3.hsl(colours[0]);
                const b = d3.hsl(colours[1]);
                const singleChild = d.children.length === 1 || d.children[1].name === "empty";

                // if we only have one child, return a slightly darker variant of the child color
                if (singleChild) {
                    return d3.hsl(a.h, a.s, a.l * 0.98);
                }

                // if we have 2 children or more, take the average of the first two children
                return d3.hsl((a.h + b.h) / 2, (a.s + b.s) / 2, (a.l + b.l) / 2);
            }
            // if we don't have children, pick a new color
            if (!d.extra.color) {
                d.extra.color = this.getColor();
            }
            return d.extra.color;
        }
    }

    /**
     * Color generation function that iterates over a fixed list of colors.
     *
     * @return string HTML-representation of the generated color
     */
    private getColor(): string {
        this.colorCounter = (this.colorCounter + 1) % this.settings.colorPalette.length;
        return this.settings.colorPalette[this.colorCounter];
    }

    private initCss() {
        let elementClass = this.settings.className;
        this.element.className += " " + elementClass;

        const styleElement = document.createElement("style");
        styleElement.appendChild(document.createTextNode(`
.${elementClass} {
    font-family: Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif;
    width: ${this.settings.width + this.settings.breadcrumbWidth}px;
}
.${elementClass} .sunburst-breadcrumbs {
    width: 176px;
    float: right;
    margin-right: 15px;
    margin-top: 10px;
    padding-left: 5px;
}
.${elementClass} .sunburst-breadcrumbs ul {
    padding-left: 0;
    list-style: none;
}
.${elementClass} .sunburst-breadcrumbs .crumb {
    margin-bottom: 5px;
    cursor: pointer;
}
.${elementClass} .sunburst-breadcrumbs .crumb svg {
    float: left;
    margin-right: 3px;
}
.${elementClass} .sunburst-breadcrumbs .crumb p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0;
    font-size: 14px;
}
.${elementClass} .sunburst-breadcrumbs .crumb .percentage {
    font-size: 11px;
}`))
        document.head.appendChild(styleElement);
    }

    /**
     * Interpolate the scales! Defines new scales based on the clicked item.
     *
     * @param d The clicked item
     * @return new scales
     */
    private arcTween(d: HRN<DataNode>, that: any): any {
        let my = Math.min(this.maxY(d), d.y0 + that.settings.levels * (d.y1 - d.y0)),
            xd = d3.interpolate(that.xScale.domain(), [d.x0, d.x1]),
            yd = d3.interpolate(that.yScale.domain(), [d.y0, my]),
            yr = d3.interpolate(that.yScale.range(), [d.y0 ? 20 : 0, that.settings.radius]);

        return (d: HRN<DataNode>) => {
            // Return a function that takes in a timing (between 0 and 1) and returns the current arc that corresponds
            // with this timing.
            return (t: number) => {
                that.xScale.domain(xd(t));
                that.yScale.domain(yd(t)).range(yr(t));
                return that.arc(d);
            }
        }
    }

    private tooltipIn(event: MouseEvent, d: HRN<DataNode>) {
        if (this.settings.enableTooltips && this.tooltip) {
            if (d.depth < this.currentMaxLevel && d.data.name !== "empty") {
                this.tooltip.html(this.settings.getTooltip(d.data))
                    .style("top", (event.pageY + 10) + "px")
                    .style("left", (event.pageX + 10) + "px")
                    .style("visibility", "visible");
            }
        }
    }

    private tooltipMove(event: MouseEvent, d: HRN<DataNode>) {
        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip
                .style("top", (event.pageY + 10) + "px")
                .style("left", (event.pageX + 10) + "px");
        }
    }

    private tooltipOut(event: MouseEvent, d: HRN<DataNode>) {
        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip.style("visibility", "hidden");
        }
    }

    /**
     * Compute the amount of vertical space that's available for text (i.e. the maximum text height) for a specific node
     * in the sunburst visualization.
     *
     * @param d The node in the sunburst visualization for which the vertical space should be computed.
     * @return The available vertical space in pixels.
     */
    private computeAvailableSpace(d: HRN<DataNode>): number {
        const circumference = 2 * Math.max(0, this.yScale(d.y1) + 1) * Math.PI;
        // Difference in radians between the start and end of the angle.
        const difference = Math.max(
            0,
            Math.min(Math.PI * 2, this.xScale(d.x1)) -
            Math.max(0, Math.min(Math.PI * 2, this.xScale(d.x0)))
        );

        // Since an angle of 360 degrees corresponds to 2 * Pi radians, we can convert this angle difference to
        // pixels if we compute (difference / (2 * Pi)) * circumference_in_pixels
        return circumference * (difference / (2 * Math.PI));
    }

    /**
     * Defines what happens after a node is clicked.
     *
     * @param d The data object of the clicked arc
     */
    private click(d: HRN<DataNode>) {
        if (d.data.name === "empty" || (this.previousRoot && this.previousRoot.data.id === d.data.id)) {
            return;
        }

        this.previousRoot = d;

        if (this.settings.enableBreadcrumbs) {
            this.setBreadcrumbs(d);
        }

        if (this.settings.rerootCallback) {
            this.settings.rerootCallback(d.data);
        }

        // perform animation
        this.currentMaxLevel = d.depth + this.settings.levels;

        this.renderArcs(d);
        this.renderText(d);
    }

    private async renderArcs(parentNode: HRN<DataNode>) {
        // The previously rendered nodes should be kept until the animation is over. We should also compute which items
        // need to be added to the selection.
        const filteredData = this.data.filter((e: HRN<DataNode>) => {
            return NodeUtils.isParentOf(parentNode, e, this.currentMaxLevel + 2);
        });

        if (parentNode.parent) {
            filteredData.push(parentNode.parent);
        }

        const newData = filteredData.filter((x: HRN<DataNode>) => !this.arcData.includes(x));
        const data = this.arcData.concat(...newData);

        this.visGElement.selectAll("path").data([]).exit().remove();

        this.path = this.visGElement.selectAll("path")
            .data(data)
            .enter()
            .insert("path")
            .attr("class", "arc")
            .attr("id", (d: HRN<DataNode>, i: number) => "path-" + i) // id based on index
            .attr("d", this.arc) // path data
            .attr("fill-rule", "evenodd") // fill rule
            .style("fill", (d: HRN<DataNode>) => this.color(d.data)) // call function for colour
            .attr("fill-opacity", d => d.depth >= this.previousMaxLevel ? 0.2 : 1)
            .on("click", (event: MouseEvent, d: HRN<DataNode>) => {
                if (d.depth < this.currentMaxLevel) {
                    this.click(d);
                }
            })
            .on("mouseover", (event: MouseEvent, d: HRN<DataNode>) => this.tooltipIn(event, d))
            .on("mousemove", (event: MouseEvent, d: HRN<DataNode>) => this.tooltipMove(event, d as HRN<DataNode>))
            .on("mouseout", (event: MouseEvent, d: HRN<DataNode>) => this.tooltipOut(event, d as HRN<DataNode>));

        // Wait for the animations to be completed...
        await new Promise<void>((resolve) => {
            this.path.transition()
                .duration(this.settings.animationDuration)
                .attrTween("d", this.arcTween(parentNode, this))
                .attr("class", (d: HRN<DataNode>) => d.depth >= this.currentMaxLevel ? "arc toHide" : "arc")
                .attr("fill-opacity", d => d.depth >= this.currentMaxLevel ? 0.2 : 1)
                .on("end", () => {
                    resolve();
                });
        });

        this.previousMaxLevel = this.currentMaxLevel;
        this.arcData = filteredData;
    }

    private async renderText(parentNode: HRN<DataNode>) {
        const filteredData = this.data.filter((e: HRN<DataNode>) => {
            return NodeUtils.isParentOf(parentNode, e, this.currentMaxLevel);
        });

        const newData = filteredData.filter((x: HRN<DataNode>) => !this.textData.includes(x));
        const data = this.textData.concat(...newData);

        if (parentNode.parent) {
            data.splice(data.indexOf(parentNode.parent), 1);
        }

        // hack for the getComputedTextLength
        const that = this;

        const offscreenCanvasSupported = typeof OffscreenCanvas !== "undefined";
        let ctx: OffscreenCanvasRenderingContext2D;
        if (offscreenCanvasSupported) {
            const offscreenCanvas = new OffscreenCanvas(1, 1);
            ctx = offscreenCanvas.getContext("2d")!;
            ctx.font = ctx!.font = `16px 'Helvetica Neue', Helvetica, Arial, sans-serif`
        }

        // Remove old text nodes
        this.visGElement.selectAll("text").data([]).exit().remove();

        // Add new text nodes
        this.text = this.visGElement.selectAll("text").data(data).enter().append("text")
            .style("fill", (d: HRN<DataNode>) => ColorUtils.getReadableColorFor(this.color(d.data)))
            .style("fill-opacity", 0)
            .style("font-family", "font-family: Helvetica, 'Super Sans', sans-serif")
            .style("pointer-events", "none") // don't invoke mouse events
            .attr("dy", ".2em")
            .text((d: HRN<DataNode>) => this.settings.getLabel(d.data))
            .style("font-size", function (this: SVGTextContentElement, d: HRN<DataNode>) {
                const txtLength = offscreenCanvasSupported ? ctx.measureText(this.textContent!).width : this.getComputedTextLength();
                return Math.floor(Math.min(((that.settings.radius / that.settings.levels) / txtLength * 10) + 1, 12)) + "px";
            });

        // Somewhat of a hack as we rely on arcTween updating the scales.
        await new Promise<void>((resolve) => {
            this.text
                .transition().duration(this.settings.animationDuration)
                .attrTween("text-anchor", (d: HRN<DataNode>) => {
                    return (t: number) => this.xScale(d.x0 + (d.x1 - d.x0) / 2) > Math.PI ? "end" : "start";
                })
                .attrTween("dx", (d: HRN<DataNode>) => {
                    return (t: number) => this.xScale(d.x0 + (d.x1 - d.x0) / 2) > Math.PI ? "-4px" : "4px";
                })
                .attrTween("transform", (d: HRN<DataNode>) => {
                    return (t: number) => {
                        let angle = this.xScale(d.x0 + (d.x1 - d.x0) / 2) * 180 / Math.PI - 90;
                        return `rotate(${angle})translate(${this.yScale(d.y0)})rotate(${angle > 90 ? -180 : 0})`;
                    }
                })
                .styleTween("fill-opacity", function (this: SVGTextContentElement, e: HRN<DataNode>) {
                    const selectedFontSize = Number.parseInt(d3.select(this).style("font-size").replace("px", ""))

                    return (t: number) => {
                        const availableSpace = that.computeAvailableSpace(e);

                        if (availableSpace > selectedFontSize) {
                            return t.toString();
                        } else {
                            return "0";
                        }
                    }
                })
                .on("end", function (this: SVGTextContentElement, e: HRN<DataNode>) {
                    const availableSpace = that.computeAvailableSpace(e);
                    const node = d3.select(this);

                    node.style(
                        "visibility",
                        availableSpace > Number.parseInt(node.style("font-size").replace("px", "")) && NodeUtils.isParentOf(parentNode, e, that.currentMaxLevel)  ? "visible" : "hidden"
                    );

                    resolve();
                });
        });

        this.textData = filteredData;
    }

    private setBreadcrumbs(d: HRN<DataNode>) {
        // First find out which nodes we encounter on the path from the root node to the clicked node.
        let crumbs: HRN<DataNode>[] = [];
        let temp: (HRN<DataNode> | null) = d;

        while (temp) {
            crumbs.push(temp);
            temp = temp.parent;
        }
        crumbs.reverse().shift();

        // Small arc that's drawn for each of the breadcrumbs
        const breadArc: any = d3.arc()
            .innerRadius(0)
            .outerRadius(15)
            .startAngle(0)
            .endAngle((d: any) => {
                return 2 * Math.PI * d.data.count / d.parent!.data.count
            });

        this.breadCrumbs.selectAll(".crumb")
            .data(crumbs)
            .enter()
            .append("li")
            .on("click", (event: MouseEvent, d: HRN<DataNode>) => {
                this.click(d.parent!);
            })
            .attr("class", "crumb")
            .style("opacity", "0")
            .attr("title", (d: HRN<DataNode>) => this.settings.getTitleText(d.data))
            .html((d: HRN<DataNode>) => `
<p class='name'>${d.data.name}</p>
<p class='percentage'>${Math.round(100 * d.data.count / d.parent!.data.count)}% of ${d.parent?.data.name}</p>`)
            .insert("svg", ":first-child").attr("width", 30)
            .attr("height", 30)
            .append("path")
            .attr("d", breadArc)
            .attr("transform", "translate(15, 15)")
            .attr("fill", (d: HRN<DataNode>) => this.color(d.data));

        this.breadCrumbs.selectAll(".crumb")
            .transition()
            .duration(this.settings.animationDuration)
            .style("opacity", "1");

        this.breadCrumbs.selectAll(".crumb")
            .data(crumbs)
            .exit().transition()
            .duration(this.settings.animationDuration)
            .style("opacity", "0")
            .remove();
    }
}
