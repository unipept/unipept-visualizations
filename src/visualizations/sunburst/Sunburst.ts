import * as d3 from "d3";

import SunburstSettings from "./SunburstSettings";
import SunburstPreprocessor from "./SunburstPreprocessor";
import DataNode from "./../../DataNode";
import TooltipUtilities from "./../../utilities/TooltipUtilities";
import StringUtils from "./../../utilities/StringUtils";
import NodeUtils from "./../../utilities/NodeUtils";
import ColorUtils from "./../../color/ColorUtils";

export default class Sunburst {
    private settings: SunburstSettings;

    private data: d3.HierarchyRectangularNode<DataNode>[];

    private tooltip!: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
    private breadCrumbs!: d3.Selection<HTMLUListElement, unknown, HTMLElement, any>;

    private colorCounter: number = -1;
    private currentMaxLevel: number = 4;

    private xScale: d3.ScaleLinear<number, number, never>;
    private yScale: d3.ScaleLinear<number, number, never>;

    private visGElement: any;

    private path: any;
    private text: any;
    private arc: any;

    constructor(
        private element: HTMLElement,
        data: DataNode,
        options: SunburstSettings = new SunburstSettings()
    ) {
        this.settings = this.fillOptions(options);

        this.element.id = "U_SUNBURST_" + Math.floor(Math.random() * 2**16);

        const preprocessor = new SunburstPreprocessor();
        preprocessor.preprocessData(data, this.settings);

        if (this.settings.enableTooltips) {
            this.tooltip = TooltipUtilities.initTooltip(this.element.id);
        }

        this.xScale = d3.scaleLinear().range([0, 2 * Math.PI]); // use full circle
        this.yScale = d3.scaleLinear().domain([0, 1]).range([0, this.settings.radius]);

        const rootNode = d3.hierarchy<DataNode>(data);
        // We don't want D3 to compute the sum itself. That's why we need to return 0 if the current node has no
        // children.
        rootNode.sum((d: DataNode) => d.children.length > 0 ? 0 : d.data.count);

        const partition = d3.partition<DataNode>();
        this.data = partition(rootNode).descendants();

        this.arc = this.createArc(this.xScale, this.yScale)

        this.initCss();

        // Draw sunburst
        this.redraw();

        // Fake click on the center node
        setTimeout(() => this.reset(), 1000);
    }

    public getCount(node: d3.HierarchyRectangularNode<DataNode>): number {
        const valueOfChildren = node.children ? node.children.reduce((acc, x) => acc + this.getCount(x), 0) : 0;
        return valueOfChildren + node.data.data.valid_taxon ? node.data.data.self_count : 0;
    }

    public reset() {
        this.click(this.data[0]);
    }

    private fillOptions(options: any = undefined): SunburstSettings {
        const output = new SunburstSettings();
        return Object.assign(output, options);
    }

    private maxY(d: d3.HierarchyRectangularNode<DataNode>): number {
        return d.children ? Math.max(...d.children!.map((i) => this.maxY(i))) : d.y1;
    }

    private redraw() {
        // Clear everything
        this.element.innerHTML = "";

        this.breadCrumbs = d3.select("#" + this.element.id)
            .append("div")
            .attr("id", this.element.id + "-breadcrumbs")
            .attr("class", "sunburst-breadcrumbs")
            .append("ul");

        this.currentMaxLevel = 4;

        const visElement = d3.select("#" + this.element.id)
            .append("svg")
            .attr("version", "1.1")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`)
            .attr("width", this.settings.width)
            .attr("height", this.settings.height)
            .attr("overflow", "hidden")
            .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");

        visElement.append("style")
            .attr("type", "text/css")
            .html(".hidden{ visibility: hidden;}");

        this.visGElement = visElement.append("g")
            // set origin to radius center
            .attr("transform", "translate(" + this.settings.radius + "," + this.settings.radius + ")");

        this.path = this.visGElement.selectAll("path").data(this.data);
        this.path = this.path.enter().append("path")
            .attr("class", "arc")
            .attr("id", (d: d3.HierarchyRectangularNode<DataNode>, i: number) => "path-" + i) // id based on index
            .attr("d", this.arc) // path data
            .attr("fill-rule", "evenodd") // fill rule
            .style("fill", (d: d3.HierarchyRectangularNode<DataNode>) => this.color(d.data)) // call function for colour
            .on("click", (event: MouseEvent, d: d3.HierarchyRectangularNode<DataNode>) => {
                if (d.depth < this.currentMaxLevel) {
                    this.click(d);
                }
            })
            .on("mouseover", (event: MouseEvent, d: d3.HierarchyRectangularNode<DataNode>) => this.tooltipIn(event, d))
            .on("mousemove", (event: MouseEvent, d: d3.HierarchyRectangularNode<DataNode>) => this.tooltipMove(event, d as d3.HierarchyRectangularNode<DataNode>))
            .on("mouseout", (event: MouseEvent, d: d3.HierarchyRectangularNode<DataNode>) => this.tooltipOut(event, d as d3.HierarchyRectangularNode<DataNode>));

        // put labels on the nodes
        this.text = this.visGElement.selectAll("text").data(this.data);

        // hack for the getComputedTextLength
        let that = this;

        this.text = this.text.enter().append("text")
            .style("fill", (d: d3.HierarchyRectangularNode<DataNode>) => ColorUtils.getReadableColorFor(this.color(d.data)))
            .style("fill-opacity", 0)
            .style("font-family", "font-family: Helvetica, 'Super Sans', sans-serif")
            .style("pointer-events", "none") // don't invoke mouse events
            .attr("dy", ".2em")
            .text((d: d3.HierarchyRectangularNode<DataNode>) => this.settings.getLabel(d.data))
            .style("font-size", function (d: d3.HierarchyRectangularNode<DataNode>) {
                //@ts-ignore
                return Math.floor(Math.min(((that.settings.radius / that.settings.levels) / this.getComputedTextLength() * 10) + 1, 12)) + "px";
            });
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
            return this.settings.fixedColorPalette[Math.abs(StringUtils.stringHash(d.name + " " + d.data.rank)) % this.settings.fixedColorPalette.length];
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
            if (!d.data.color) {
                d.data.color = this.getColor();
            }
            return d.data.color;
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

    private createArc(
        x: d3.ScaleLinear<number, number>,
        y: d3.ScaleLinear<number, number>
    ): d3.ValueFn<SVGPathElement, d3.HierarchyRectangularNode<DataNode>, string | null> {
        return d3.arc<d3.HierarchyRectangularNode<DataNode>>()
            .startAngle((d: d3.HierarchyRectangularNode<DataNode>) => Math.max(0, Math.min(Math.PI * 2, x(d.x0))))
            .endAngle((d: d3.HierarchyRectangularNode<DataNode>) => Math.max(0, Math.min(Math.PI * 2, x(d.x1))))
            .innerRadius((d: d3.HierarchyRectangularNode<DataNode>) => Math.max(0, d.y0 ? this.yScale(d.y0) : d.y0))
            .outerRadius((d: d3.HierarchyRectangularNode<DataNode>) => Math.max(0, y(d.y1) + 1));
    }

    /**
     * Interpolate the scales! Defines new scales based on the clicked item.
     *
     * @param d The clicked item
     * @return new scales
     */
    private arcTween(d: d3.HierarchyRectangularNode<DataNode>, that: any): any {
        let my = Math.min(this.maxY(d), d.y0 + that.settings.levels * (d.y1 - d.y0)),
            xd = d3.interpolate(that.xScale.domain(), [d.x0, d.x1]),
            yd = d3.interpolate(that.yScale.domain(), [d.y0, my]),
            yr = d3.interpolate(that.yScale.range(), [d.y0 ? 20 : 0, that.settings.radius]);

        return (d: d3.HierarchyRectangularNode<DataNode>) => {
            return (t: number) => {
                that.xScale.domain(xd(t));
                that.yScale.domain(yd(t)).range(yr(t));
                return that.arc(d);
            }
        }
    }


    private tooltipIn(event: MouseEvent, d: d3.HierarchyRectangularNode<DataNode>) {
        if (this.settings.enableTooltips && this.tooltip) {
            if (d.depth < this.currentMaxLevel && d.data.name !== "empty") {
                this.tooltip.html(this.settings.getTooltip(d.data))
                    .style("top", (event.pageY + 10) + "px")
                    .style("left", (event.pageX + 10) + "px")
                    .style("visibility", "visible");
            }
        }
    }

    private tooltipMove(event: MouseEvent, d: d3.HierarchyRectangularNode<DataNode>) {
        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip
                .style("top", (event.pageY + 10) + "px")
                .style("left", (event.pageX + 10) + "px");
        }
    }

    private tooltipOut(event: MouseEvent, d: d3.HierarchyRectangularNode<DataNode>) {
        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip.style("visibility", "hidden");
        }
    }

    /**
     * Defines what happens after a node is clicked.
     *
     * @param d The data object of the clicked arc
     */
    private click(d: d3.HierarchyRectangularNode<DataNode>) {
        if (d.data.name === "empty") {
            return;
        }

        if (this.settings.enableBreadcrumbs) {
            this.setBreadcrumbs(d);
        }

        if (this.settings.rerootCallback) {
            this.settings.rerootCallback(d.data);
        }

        // perform animation
        this.currentMaxLevel = d.depth + this.settings.levels;
        this.path.transition()
            .duration(this.settings.animationDuration)
            .attrTween("d", this.arcTween(d, this))
            .attr("class", (d: d3.HierarchyRectangularNode<DataNode>) => d.depth >= this.currentMaxLevel ? "arc toHide" : "arc")
            .attr("fill-opacity", (d: d3.HierarchyRectangularNode<DataNode>) => d.depth >= this.currentMaxLevel ? 0.2 : 1);

        const that = this;

        // Somewhat of a hack as we rely on arcTween updating the scales.
        this.text
            .style("visibility", function (e: d3.HierarchyRectangularNode<DataNode>) {
                // @ts-ignore
                return NodeUtils.isParentOf(d, e, that.currentMaxLevel) ? null : d3.select(this).style("visibility");
            })
            .transition().duration(this.settings.animationDuration)
            .attrTween("text-anchor", (d: d3.HierarchyRectangularNode<DataNode>) => {
                return (t: number) => this.xScale(d.x0 + (d.x1 - d.x0) / 2) > Math.PI ? "end" : "start";
            })
            .attrTween("dx", (d: d3.HierarchyRectangularNode<DataNode>) => {
                return (t: number) => this.xScale(d.x0 + (d.x1 - d.x0) / 2) > Math.PI ? "-4px" : "4px";
            })
            .attrTween("transform", (d: d3.HierarchyRectangularNode<DataNode>) => {
                return (t: number) => {
                    let angle = this.xScale(d.x0 + (d.x1 - d.x0) / 2) * 180 / Math.PI - 90;
                    return `rotate(${angle})translate(${this.yScale(d.y0)})rotate(${angle > 90 ? -180 : 0})`;
                }
            })
            .style("fill-opacity", (e: d3.HierarchyRectangularNode<DataNode>) => NodeUtils.isParentOf(d, e, that.currentMaxLevel) ? 1 : 1e-6)
            .on("end", function (e: d3.HierarchyRectangularNode<DataNode>) {
                // @ts-ignore
                d3.select(this).style("visibility", NodeUtils.isParentOf(d, e, that.currentMaxLevel) ? null : "hidden");
            });
    }

    public setBreadcrumbs(d: d3.HierarchyRectangularNode<DataNode>) {
        // breadcrumbs
        let crumbs: d3.HierarchyRectangularNode<DataNode>[] = [];
        let temp: (d3.HierarchyRectangularNode<DataNode> | null) = d;
        while (temp) {
            crumbs.push(temp);
            temp = temp.parent;
        }
        crumbs.reverse().shift();
        const breadArc = d3.arc()
            .innerRadius(0)
            .outerRadius(15)
            .startAngle(0)
            // @ts-ignore
            .endAngle((d: d3.HierarchyRectangularNode<DataNode>) => {
                return 2 * Math.PI * d.data.data.count / d.parent!.data.data.count
            });
        this.breadCrumbs.selectAll(".crumb")
            .data(crumbs)
            .enter()
            .append("li")
            .on("click", (event: MouseEvent, d: d3.HierarchyRectangularNode<DataNode>) => {
                this.click(d.parent!);
            })
            .attr("class", "crumb")
            .style("opacity", "0")
            .attr("title", (d: d3.HierarchyRectangularNode<DataNode>) => this.settings.getTitleText(d.data))
            .html((d: d3.HierarchyRectangularNode<DataNode>) => `
<p class='name'>${d.data.name}</p>
<p class='percentage'>${Math.round(100 * d.data.data.count / d.parent?.data.data.count)}% of ${d.parent?.data.name}</p>`)
            .insert("svg", ":first-child").attr("width", 30)
            .attr("height", 30)
            .append("path")
            //@ts-ignore
            .attr("d", breadArc)
            .attr("transform", "translate(15, 15)")
            .attr("fill", (d: d3.HierarchyRectangularNode<DataNode>) => this.color(d.data));

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
