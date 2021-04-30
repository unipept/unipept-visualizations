import * as d3 from "d3";
import TreemapSettings from "./TreemapSettings";
import DataNode, { DataNodeLike } from "./../../DataNode";
import TooltipUtilities from "./../../utilities/TooltipUtilities";
import ColorUtils from "./../../color/ColorUtils";
import TreemapPreprocessor from "./TreemapPreprocessor";

type HRN<T> = d3.HierarchyRectangularNode<T>;

export default class Treemap {
    private readonly settings: TreemapSettings;
    private readonly data: HRN<DataNode>[];

    // This is required to find out how a clicked node is related to it's parents (since part of the parent-child
    // relation is lost when rerooting the tree).
    private readonly childParentRelations: Map<DataNode, DataNode | undefined> = new Map<DataNode, DataNode>();

    private currentRoot: HRN<DataNode>;

    private tooltip!: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
    private breadCrumbs: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
    private treemap: d3.Selection<HTMLDivElement, unknown, null, undefined>;

    private colorScale: d3.ScaleLinear<number, number>;

    private partition: d3.TreemapLayout<DataNode>;
    private nodeId: number = 0;

    constructor(
        private element: HTMLElement,
        data: DataNodeLike,
        options: TreemapSettings = new TreemapSettings()
    ) {
        this.settings = this.fillOptions(options);

        if (this.settings.enableTooltips) {
            this.tooltip = TooltipUtilities.initTooltip();
        }

        this.initCss();

        const preprocessor = new TreemapPreprocessor();

        const rootNode = d3.hierarchy<DataNode>(preprocessor.preprocessData(data));
        rootNode.sum((d: DataNode) => d.children.length > 0 ? 0 : d.count);
        rootNode.sort((a: d3.HierarchyNode<DataNode>, b: d3.HierarchyNode<DataNode>) => b.value! - a.value!);

        this.partition = d3.treemap<DataNode>();
        this.partition.size([this.settings.width + 1, this.settings.height + 1])
            .paddingTop(this.settings.labelHeight);
        this.data = this.partition(rootNode).descendants();

        if (!this.settings.levels) {
            this.settings.levels = this.data[0].height;
        }

        for (const item of this.data) {
            this.childParentRelations.set(item.data, item.parent?.data);
        }

        this.currentRoot = this.data[0];

        this.colorScale =  d3.scaleLinear()
            .domain([0, this.settings.levels])
            // @ts-ignore
            .range([this.settings.colorRoot, this.settings.colorLeaf])
            // @ts-ignore
            .interpolate(d3.interpolateLab);

        // @ts-ignore
        this.breadCrumbs = d3.select(this.element)
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

    public resize(newWidth: number, newHeight: number) {
        this.settings.width = newWidth;
        this.settings.height = newHeight;
        this.partition.size([newWidth + 1, newHeight + 1]);

        this.breadCrumbs.style("width", this.settings.width + "px");
        this.treemap.style("width", this.settings.width + "px");
        this.treemap.style("height", this.settings.height + "px");

        this.render(this.currentRoot, false);
    }

    private fillOptions(options: any = undefined): TreemapSettings {
        const output = new TreemapSettings();
        return Object.assign(output, options);
    }

    private initCss() {
        let elementClass = this.settings.className;
        this.element.className += " " + elementClass;

        const styleElement = this.element.ownerDocument.createElement("style");
        styleElement.appendChild(this.element.ownerDocument.createTextNode(`
            .${elementClass} {
                font-family: Arial,sans-serif;
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
        this.element.ownerDocument.head.append(styleElement);
    }

    private render(data: HRN<DataNode>, triggerCallback: boolean = true) {
        this.currentRoot = data;

        this.setBreadcrumbs();

        const rootNode = d3.hierarchy<DataNode>(data.data);
        rootNode.sum((d: DataNode) => d.children.length > 0 ? 0 : d.count);

        rootNode.sort((a: d3.HierarchyNode<DataNode>, b: d3.HierarchyNode<DataNode>) => b.value! - a.value!);

        let nodes = this.treemap.selectAll<d3.BaseType, HRN<DataNode>>(".node")
            .data(
                this.partition(rootNode).descendants(),
                (d: HRN<DataNode>) => d.data.id || (d.data.id = ++this.nodeId)
            );

        const divNodes = nodes.enter()
            .append("div")
            .attr("class", "node")
            .style("background", (d: HRN<DataNode>) => this.colorScale(this.settings.getLevel(d)))
            .style("color", (d: HRN<DataNode>) => ColorUtils.getReadableColorFor(this.colorScale(this.settings.getLevel(d)).toString()))
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

        // @ts-ignore
        divNodes.merge(nodes)
            .order()
            .transition()
            .call((transition) => {
                transition.style("left", (d: HRN<DataNode>) => d.x0 + "px");
                transition.style("top", (d: HRN<DataNode>) => d.y0 + "px");
                transition.style("width", (d: HRN<DataNode>) => Math.max(0, (d.x1 - d.x0) - 1) + "px");
                transition.style("height", (d: HRN<DataNode>) => Math.max(0, (d.y1 - d.y0) - 1) + "px");
            });

        nodes.exit().remove();

        if (triggerCallback) {
            this.settings.rerootCallback(this.currentRoot.data)
        }

    }

    private setBreadcrumbs() {
        let crumbs: DataNode[] = [];
        let temp: DataNode | undefined = this.currentRoot.data;
        while (temp) {
            crumbs.push(temp);
            temp = this.childParentRelations.get(temp);
        }
        crumbs.reverse();

        this.breadCrumbs.html("");
        this.breadCrumbs.selectAll(".crumb")
            .data(crumbs)
            .enter()
            .append("span")
            .attr("class", "crumb")
            .attr("title", (d: DataNode) => this.settings.getBreadcrumbTooltip(d))
            .html((d: DataNode) => `<span class='link'>${d.name}</span>`)
            .on("click", (event: MouseEvent, d: DataNode) => {
                this.render(this.data.filter((item: HRN<DataNode>) => item.data.id === d.id)[0]);
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
