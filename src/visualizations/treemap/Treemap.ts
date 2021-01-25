import * as d3 from "d3";
import TreemapSettings from "./TreemapSettings";
import DataNode from "./../../DataNode";
import TooltipUtilities from "./../../utilities/TooltipUtilities";
import ColorUtils from "./../../color/ColorUtils";

type HRN<T> = d3.HierarchyRectangularNode<T>;

export default class Treemap {
    private readonly settings: TreemapSettings;
    private readonly data: HRN<DataNode>[];

    private currentRoot: HRN<DataNode>;

    private tooltip!: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
    private breadCrumbs: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
    private treemap: d3.Selection<HTMLDivElement, unknown, null, undefined>;

    private colorScale: d3.ScaleLinear<number, number, never>;

    constructor(
        private element: HTMLElement,
        data: DataNode,
        options: TreemapSettings = new TreemapSettings()
    ) {
        this.settings = this.fillOptions(options);


        this.element.id = "U_TREEMAP_" + Math.floor(Math.random() * 2**16);

        if (this.settings.enableTooltips) {
            this.tooltip = TooltipUtilities.initTooltip(this.element.id);
        }

        this.initCss();

        const rootNode = d3.hierarchy<DataNode>(data);
        rootNode.sum((d: DataNode) => d.children.length > 0 ? 0 : d.data.count);

        if (!this.settings.levels) {
            this.settings.levels = rootNode.height;
        }

        const partition = d3.treemap<DataNode>();
        partition.size([this.settings.width + 1, this.settings.height + 1])
            .paddingTop(this.settings.labelHeight);
        this.data = partition(rootNode).descendants();

        this.currentRoot = this.data[0];

        this.colorScale =  d3.scaleLinear()
            .domain([0, this.settings.levels])
            // @ts-ignore
            .range([this.settings.colorRoot, this.settings.colorLeaf])
            // @ts-ignore
            .interpolate(d3.interpolateLab);

        this.breadCrumbs = d3.select("#" + this.element.id)
            .append("div")
            .attr("class", "breadcrumbs")
            .style("position", "relative")
            .style("width", this.settings.width + "px")
            .style("height", "20px")
            .style("background-color", this.settings.colorBreadcrumbs);

        this.treemap = d3.select(this.element)
            .append("div")
            .style("position", "relative")
            .style("width", this.settings.width + "px")
            .style("height", this.settings.height + "px");

        this.render(this.currentRoot);
    }

    private fillOptions(options: any = undefined): TreemapSettings {
        const output = new TreemapSettings();
        return Object.assign(output, options);
    }

    private initCss() {
        let elementClass = this.settings.className;
        this.element.className += " " + elementClass;

        const styleElement = document.createElement("style");
        styleElement.appendChild(document.createTextNode(`
            .${elementClass} {
                font-family: Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif;
            }
            .${elementClass} .node {
                font-size: 9px;
                line-height: 10px;
                overflow: hidden;
                position: absolute;
                text-indent: 2px;
                text-align: center;
                text-overflow: ellipsis;
                cursor: pointer;
            }
            .${elementClass} .node:hover {
                outline: 1px solid white;
            }
            .${elementClass} .breadcrumbs {
                font-size: 11px;
                line-height: 20px;
                padding-left: 5px;
                font-weight: bold;
                color: white;
                box-sizing: border-box;
            }
            .full-screen .${elementClass} .breadcrumbs {
                width: 100% !important;
            }
            .${elementClass} .crumb {
                cursor: pointer;
            }
            .${elementClass} .crumb .link:hover {
                text-decoration: underline;
            }
            .${elementClass} .breadcrumbs .crumb + .crumb::before {
                content: " > ";
                cursor: default;
            }
        `));
        document.head.append(styleElement);
    }

    private render(data: HRN<DataNode>, triggerCallback: boolean = true) {
        this.currentRoot = data;

        this.setBreadcrumbs();

        const nodes = this.treemap.selectAll(".node")
            .data(this.data);

        // let nodes = treemap.selectAll(".node")
        //     .data(treemapLayout.nodes(data), d => d.id || (d.id = ++nodeId));

        const divNodes = nodes.enter()
            .append("div")
            .attr("class", "node")
            .style("background", (d: HRN<DataNode>) => this.colorScale(d.depth))
            .style("color", (d: HRN<DataNode>) => ColorUtils.getReadableColorFor(this.colorScale(d.depth).toString()))
            .style("left", "0px")
            .style("top", "0px")
            .style("width", "0px")
            .style("height", "0px")
            .text((d: HRN<DataNode>) => this.settings.getLabel(d.data))
            .on("click", (event: MouseEvent, d: HRN<DataNode>) => this.render(d))
            .on("contextmenu", (event: MouseEvent, d: HRN<DataNode>) => {
                event.preventDefault();
                if (this.currentRoot.parent) {
                    this.render(this.currentRoot.parent);
                }
            })
            .on("mouseover", (event: MouseEvent, d: HRN<DataNode>) => this.tooltipIn(event, d))
            .on("mousemove", (event: MouseEvent, d: HRN<DataNode>) => this.tooltipMove(event, d))
            .on("mouseout", (event: MouseEvent, d: HRN<DataNode>) => this.tooltipOut(event, d));

        divNodes.order()
            .transition()
            .call((transition) => {
                transition.style("left", (d: HRN<DataNode>) => d.x0 + "px");
                transition.style("top", (d: HRN<DataNode>) => d.y0 + "px");
                transition.style("width", (d: HRN<DataNode>) => Math.max(0, (d.x1 - d.x0) - 1) + "px");
                transition.style("height", (d: HRN<DataNode>) => Math.max(0, (d.y1 - d.y0) - 1) + "px");
            })

        divNodes.exit().remove();

        if (triggerCallback) {
            this.settings.rerootCallback(this.currentRoot.data)
        }

    }

    // private position(this: HTMLElement) {
    //     this.style("left", d => d.x + "px")
    //         .style("top", d => d.y + "px")
    //         .style("width", d => Math.max(0, d.dx - 1) + "px")
    //         .style("height", d => Math.max(0, d.dy - 1) + "px");
    // }

    private setBreadcrumbs() {
        let crumbs: HRN<DataNode>[] = [];
        let temp: HRN<DataNode> | null = this.currentRoot;
        while (temp) {
            crumbs.push(temp);
            temp = temp.parent;
        }
        crumbs.reverse();

        this.breadCrumbs.html("");
        this.breadCrumbs.selectAll(".crumb")
            .data(crumbs)
            .enter()
            .append("span")
            .attr("class", "crumb")
            .attr("title", (d: HRN<DataNode>) => this.settings.getBreadcrumbTooltip(d.data))
            .html(d => `<span class='link'>${d.data.name}</span>`)
            .on("click", (event: MouseEvent, d: HRN<DataNode>) => {
                this.render(d);
            });
    }

    private tooltipIn(event: MouseEvent, d: HRN<DataNode>) {
        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip.html(this.settings.getTooltip(d.data))
                .style("top", (event.pageY + 10) + "px")
                .style("left", (event.pageX + 10) + "px")
                .style("visibility", "visible");
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
}
