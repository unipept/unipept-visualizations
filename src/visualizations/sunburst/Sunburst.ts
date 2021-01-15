import * as d3 from "d3";

import SunburstSettings from "./SunburstSettings";
import SunburstPreprocessor from "./SunburstPreprocessor";
import DataNode from "./../../DataNode";
import TooltipUtilities from "./../../utilities/TooltipUtilities";
import StringUtils from "./../../utilities/StringUtils";

export default class Sunburst {
    private settings: SunburstSettings;

    private tooltip!: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
    private breadCrumbs!: d3.Selection<HTMLUListElement, unknown, HTMLElement, any>;

    private colorCounter: number = -1;

    constructor(
        private element: HTMLElement,
        private data: DataNode,
        options: SunburstSettings = new SunburstSettings()
    ) {
        this.settings = this.fillOptions(options);

        this.element.id = "U_SUNBURST_" + Math.floor(Math.random() * 2**16);

        const preprocessor = new SunburstPreprocessor();
        preprocessor.preprocessData(this.data, this.settings);

        if (this.settings.enableTooltips) {
            this.tooltip = TooltipUtilities.initTooltip(this.element.id);
        }

        console.log(this.data);
        this.redraw();
    }

    private fillOptions(options: any = undefined): SunburstSettings {
        const output = new SunburstSettings();
        return Object.assign(output, options);
    }

    private redraw() {
        // Clear everything
        this.element.innerHTML = "";

        this.breadCrumbs = d3.select("#" + this.element.id)
            .append("div")
            .attr("id", this.element.id + "-breadcrumbs")
            .attr("class", "sunburst-breadcrumbs")
            .append("ul");

        const x = d3.scaleLinear().range([0, 2 * Math.PI]); // use full circle
        const y = d3.scaleLinear().domain([0, 1]).range([0, this.settings.radius]);
        const currentMaxLevel = 4;

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

        const visGElement = visElement.append("g")
            // set origin to radius center
            .attr("transform", "translate(" + this.settings.radius + "," + this.settings.radius + ")");

        const rootNode: d3.HierarchyNode<DataNode> = d3.hierarchy<DataNode>(this.data);
        rootNode.sum(this.settings.countAccessor);

        const partition = d3.partition();

        const nodes = partition(rootNode).descendants();
        console.log(nodes);

        const arc = d3.arc()
            .startAngle((d: any) => Math.max(0, Math.min(2 * Math.PI, x(d.x))))
            .endAngle((d: any) => Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))))
            // prevent y-calculation on 0
            .innerRadius((d: any) => Math.max(0, d.y ?y(d.y) : d.y))
            .outerRadius((d: any) => Math.max(0, y(d.y + d.dy)) + 1);

        const path = visGElement.selectAll("path").data(nodes);
        path.enter().append("path")
            .attr("class", "arc")
            .attr("id", (d, i) => "path-" + i) // id based on index
            // @ts-ignore
            .attr("d", this.createArc(x, y)) // path data
            .attr("fill-rule", "evenodd") // fill rule
            // @ts-ignore
            .style("fill", d => this.color(d, this)) // call function for colour
            .on("click", d => {
                if (d.depth < currentMaxLevel) {
                    this.click(d);
                }
            })
            .on("mouseover", (d, i) => this.tooltipIn(d, i))
            .on("mousemove", (d, i) => this.tooltipMove(d, i))
            .on("mouseout", (d, i) => this.tooltipOut(d, i));

    }

    private click(d: any) {

    }

    /**
     * Calculates the color of an arc based on the color of his children.
     *
     * @param d The node for which we want the color.
     * @return string The calculated color in HTML color representation.
     */
    private color(d: DataNode, that: any) {
        if (d.name === "empty") {
            return "white";
        }
        if (that.settings.useFixedColors) {
            return that.settings.fixedColorPalette[Math.abs(StringUtils.stringHash(d.name + " " + d.data.rank)) % that.settings.fixedColorPalette.length];
        } else {
            if (d.children) {
                let colours = d.children.map(c => that.color(c, that)),
                    a = d3.hsl(colours[0]),
                    b = d3.hsl(colours[1]),
                    singleChild = d.children.length === 1 || d.children[1].name === "empty";
                // if we only have one child, return a slightly darker variant of the child color
                if (singleChild) {
                    return d3.hsl(a.h, a.s, a.l * 0.98);
                }
                // if we have 2 children or more, take the average of the first two children
                return d3.hsl((a.h + b.h) / 2, (a.s + b.s) / 2, (a.l + b.l) / 2);
            }
            // if we don't have children, pick a new color
            if (!d.data.color) {
                d.data.color = that.getColor();
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

    private createArc(
        x: d3.ScaleLinear<number, number>,
        y: d3.ScaleLinear<number, number>
    ): d3.ValueFn<SVGPathElement, d3.HierarchyRectangularNode<DataNode>, string | null> {
        return d3.arc<d3.HierarchyRectangularNode<DataNode>>()
            .startAngle((d: d3.HierarchyRectangularNode<DataNode>) => Math.max(0, Math.min(Math.PI * 2, x(d.x0))))
            .endAngle((d: d3.HierarchyRectangularNode<DataNode>) => Math.max(0, Math.min(Math.PI * 2, x(d.x1))))
            .innerRadius((d: d3.HierarchyRectangularNode<DataNode>) => Math.max(0, y(d.y0)))
            .outerRadius((d: d3.HierarchyRectangularNode<DataNode>) => Math.max(0, y(d.y1)));
    }
}
