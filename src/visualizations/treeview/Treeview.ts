import * as d3 from "d3";

import TreeviewSettings from "./TreeviewSettings";
import TreeviewNode from "./TreeviewNode";
import MaxCountHeap from "./heap/MaxCountHeap";
import TreeviewPreprocessor from "./TreeviewPreprocessor";
import TooltipUtilities from "./../../utilities/TooltipUtilities";

type HPN<T> = d3.HierarchyPointNode<T>;
type HPL<T> = d3.HierarchyPointLink<T>;

export default class Treeview {
    private readonly settings: TreeviewSettings;
    private readonly data: HPN<TreeviewNode>[];

    private root: HPN<TreeviewNode>;
    private nodeId: number = 0;

    private widthScale: d3.ScaleLinear<number, number>;
    private treeLayout: d3.TreeLayout<TreeviewNode>;

    private visElement: d3.Selection<SVGGElement, any, d3.BaseType, unknown>;

    private tooltip!: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

    private zoomListener: d3.ZoomBehavior<any, any>;
    private tooltipTimer!: number;

    private zoomScale: number = 1;

    private svg: any;

    constructor(
        private readonly element: HTMLElement,
        data: TreeviewNode,
        options: TreeviewSettings = new TreeviewSettings()
    ) {
        this.settings = this.fillOptions(options);

        this.element.id = "U_TREEVIEW_" + Math.floor(Math.random() * 2**16);

        if (this.settings.enableTooltips) {
            this.tooltip = TooltipUtilities.initTooltip(this.element.id);
        }

        const dataProcessor = new TreeviewPreprocessor();
        data = dataProcessor.preprocessData(data);

        const rootNode = d3.hierarchy<TreeviewNode>(data);
        // We don't want D3 to compute the sum itself. That's why we need to return 0 if the current node has no
        // children.
        rootNode.sum((d: TreeviewNode) => d.children.length > 0 ? 0 : d.count);

        this.widthScale = d3.scaleLinear()
            .range([this.settings.minNodeSize, this.settings.maxNodeSize]);

        this.treeLayout = d3.tree<TreeviewNode>()
            .nodeSize([2, 10])
            .separation((a: HPN<TreeviewNode>, b: HPN<TreeviewNode>) => {
                if (a.data.isCollapsed() || b.data.isCollapsed()) {
                    return 0;
                }
                const width = (this.computeNodeSize(a) + this.computeNodeSize(b));
                const distance = width / 2 + 4;
                return (a.parent === b.parent) ? distance : distance + 4;
            });

        this.data = this.treeLayout(rootNode).descendants();
        this.root = this.data[0];

        this.element.innerHTML = "";

        this.svg = d3.select("#" + this.element.id)
            .append("svg")
            .attr("version", "1.1")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", `0 0 ${this.settings.width} ${this.settings.height}`)
            .attr("width", this.settings.width)
            .attr("height", this.settings.height)
            .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");

        this.zoomListener = d3.zoom()
            .extent([[0, 0], [this.settings.width, this.settings.height]])
            .scaleExtent([0.1, 3])
            .on("zoom", (event: d3.D3ZoomEvent<any, any>) => {
                this.zoomScale = event.transform.k;
                this.visElement.attr("transform", event.transform.toString())
            })

        this.visElement = this.svg.call(this.zoomListener).append("g");

        this.render(this.root);
    }

    private fillOptions(options: any = undefined): TreeviewSettings {
        const output = new TreeviewSettings();
        return Object.assign(output, options);
    }

    private render(root: HPN<TreeviewNode>) {
        this.widthScale.domain([0, root.data.count]);

        this.root = root;

        this.root.x = this.settings.height / 2;
        this.root.y = 0;

        this.root.data.setSelected(true);

        this.root.children?.forEach((d: HPN<TreeviewNode>, i: number) => {
            d.data.setColor(this.settings.colorProvider(d.data));
        });

        if (this.settings.enableExpandOnClick) {
            this.root.data.collapseAll();
            this.initialExpand(this.root);
        } else {
            this.root.data.expandAll();
        }

        this.update(root);
        this.centerRoot(root);
    }

    private centerRoot(source: HPN<TreeviewNode>): void {
        let [x, y] = [-source.y, -source.x];

        x = x * this.zoomScale + this.settings.width / 4;
        y = y * this.zoomScale + this.settings.height / 2;

        this.visElement
            .transition()
            .duration(this.settings.animationDuration)
            .attr("transform", `translate(${x},${y})scale(${this.zoomScale})`)
            .on("end", () => this.zoomListener.transform(this.svg, d3.zoomIdentity.translate(x, y).scale(this.zoomScale)));
    }

    private initialExpand(root: HPN<TreeviewNode>): void {
        if (!this.settings.enableAutoExpand) {
            root.data.expand(this.settings.levelsToExpand);
        } else {
            root.data.expand(1);
            let allowedCount = root.data.count * (this.settings.enableAutoExpand ? this.settings.autoExpandValue : 0.8);
            const pq = new MaxCountHeap<HPN<TreeviewNode>>(root.children, (a: HPN<TreeviewNode>, b: HPN<TreeviewNode>) => b.data.count - a.data.count);
            while (allowedCount > 0 && pq.size() > 0) {
                const toExpand = pq.remove();
                allowedCount -= toExpand.data.count;
                toExpand.data.expand(1);
                toExpand.children?.forEach((d: HPN<TreeviewNode>, i: number) => pq.add(d));
            }
        }
    }

    private update(source: HPN<TreeviewNode>): void {
        // Compute the new tree layout
        const layout = this.treeLayout(this.root);
        const nodes: HPN<TreeviewNode>[] = layout.descendants().reverse().filter((d: HPN<TreeviewNode>) => !d.data.isCollapsed());
        const links: HPL<TreeviewNode>[] = layout.links().filter((d: HPL<TreeviewNode>) => !d.target.data.isCollapsed() && !d.source.data.isCollapsed());

        // Normalize for fixed depth. The depth of a node determines it's horizontal position from the root.
        nodes.forEach(d => d.y = d.depth * this.settings.nodeDistance);

        // Update the nodes...
        const node = this.visElement.selectAll<d3.BaseType, HPN<TreeviewNode>>("g.node")
            .data(nodes, (d: HPN<TreeviewNode>) => d.data.id || (d.data.id = ++this.nodeId));

        let nodeEnter = node.enter()
            .append("g")
            .attr("class", "node")
            .style("cursor", "pointer")
            // Every node is originally situated on the clicked node's (the source) position. Animations afterwards
            // reposition the node to it's final location.
            .attr("transform", `translate(${source.y || 0},${source.data.previousPosition.x || 0})`)
            .on("click", (event: MouseEvent, d: HPN<TreeviewNode>) => this.click(event, d))
            .on("mouseover", (event: MouseEvent, d: HPN<TreeviewNode>) => this.tooltipIn(event, d))
            .on("mouseout", (event: MouseEvent, d: HPN<TreeviewNode>) => this.tooltipOut(event, d))
            .on("contextmenu", (event: MouseEvent, d: HPN<TreeviewNode>) => this.rightClick(event, d))
            // @ts-ignore
            .merge(node);

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("stroke-width", "1.5px")
            .style("stroke", (d: HPN<TreeviewNode>) => this.settings.nodeStrokeColor(d.data))
            .style("fill", (d: HPN<TreeviewNode>) => this.settings.nodeFillColor(d.data));

        const arcScale = d3.scaleLinear().range([0, 2 * Math.PI]);

        const innerArc = d3.arc()
            .innerRadius(0)
            // @ts-ignore
            .outerRadius((d: HPN<TreeviewNode>) => {
                return this.computeNodeSize(d);
            })
            .startAngle(0)
            .endAngle(d => {
                // @ts-ignore
                return arcScale(d.data.data.self_count / d.data.data.count) || 0;
            });

        if (this.settings.enableInnerArcs) {
            // @ts-ignore
            nodeEnter.append("path")
                .attr("class", "innerArc")
                // @ts-ignore
                .attr("d", innerArc)
                .style("fill", (d: HPN<TreeviewNode>) => this.settings.nodeStrokeColor(d.data))
                .style("fill-opacity", 0);
        }

        if (this.settings.enableLabels) {
            nodeEnter.append("text")
                .attr("x", (d: HPN<TreeviewNode>) => d.children ? -10 : 10)
                .attr("dy", ".35em")
                .attr("text-anchor", (d: HPN<TreeviewNode>) => d.children ? "end" : "start")
                .text((d: HPN<TreeviewNode>) => this.settings.getLabel(d.data))
                .style("font", "10px sans-serif")
                .style("fill-opacity", 1e-6);
        }

        // Transition nodes to their new position. (From the source's location to the final location)
        const nodeUpdate = nodeEnter.transition()
            .duration(this.settings.animationDuration)
            .attr("transform", (d: HPN<TreeviewNode>) => `translate(${d.y}, ${d.x})`);

        // Animate the fill and stroke of each circle (these circles make up the nodes that are rendered).
        nodeUpdate.select("circle")
            .attr("r", (d: HPN<TreeviewNode>) => this.computeNodeSize(d))
            .style("fill-opacity", (d: HPN<TreeviewNode>) => d.data.isCollapsed() ? 1 : 0)
            .style("stroke", (d: HPN<TreeviewNode>) => this.settings.nodeStrokeColor(d.data))
            .style("fill", (d: HPN<TreeviewNode>) => this.settings.nodeFillColor(d.data));

        if (this.settings.enableInnerArcs) {
            nodeUpdate.select(".innerArc")
                .style("fill-opacity", 1);
        }

        if (this.settings.enableLabels) {
            nodeUpdate.select("text")
                .style("fill-opacity", 1);
        }

        // Animate the movement of every node that should be removed to the source node location.
        const nodeExit = node.exit().transition()
            .duration(this.settings.animationDuration)
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("path")
            .style("fill-opacity", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links between the different nodes.
        // @ts-ignore
        let link = this.visElement.selectAll("path.link")
            .data(links, (d: HPL<TreeviewNode>) => d.target.data.id);

        const linkGenerator = d3.linkHorizontal<any, HPL<TreeviewNode>, HPN<TreeviewNode>>().x(d => d.y).y(d => d.x);

        // Enter any new links at the parent's previous position.
        // @ts-ignore
        link.enter()
            .insert("path", "g")
            .attr("class", "link")
            .style("fill", "none")
            .style("stroke-opacity", "0.5")
            .style("stroke-linecap", "round")
            .style("stroke", (d: HPL<TreeviewNode>) => this.settings.linkStrokeColor(d))
            .style("stroke-width", 1e-6)
            // @ts-ignore
            .attr("d", (d: HPL<TreeviewNode>) => {
                const o = {
                    x: source.data.previousPosition.x,
                    y: source.data.previousPosition.y
                }

                // @ts-ignore
                return linkGenerator({
                    source: o,
                    target: o
                });
            })
            // @ts-ignore
            .merge(link)
            .transition()
            .duration(this.settings.animationDuration)
            .attr("d", linkGenerator)
            .style("stroke", this.settings.linkStrokeColor)
            .style("stroke-width", (d: HPL<TreeviewNode>) => {
                if (d.source.data.isSelected()) {
                    return this.widthScale(d.target.data.count) + "px";
                } else {
                    return "4px";
                }
            });

        // Transition exiting links to parent's new position.
        link.exit().transition()
            .duration(this.settings.animationDuration)
            .style("stroke-width", 1e-6)
            // @ts-ignore
            .attr("d", (d: HPL<TreeviewNode>) => {
                const o = {
                    x: source.x,
                    y: source.y
                };

                // @ts-ignore
                return linkGenerator({
                    source: o,
                    target: o
                });
            })
            .remove();

        // Keep track of the old positions for the transitions
        nodes.forEach((d: HPN<TreeviewNode>) => {
            d.data.previousPosition = {
                x: d.x,
                y: d.y
            };
        });
    }

    private computeNodeSize(d: HPN<TreeviewNode>): number {
        if (d.data.isSelected()) {
            return this.widthScale(d.data.count) / 2;
        } else {
            return 2;
        }
    }

    private click(event: MouseEvent, d: HPN<TreeviewNode>): void {
        if (!this.settings.enableExpandOnClick) {
            return;
        }

        if (event.defaultPrevented) {
            return;
        }

        if (event.shiftKey) {
            d.data.expandAll();
        } else if (d.children && d.children.some(n => !n.data.isCollapsed())) {
            d.data.collapseAll();
        } else {
            d.data.expand(this.settings.levelsToExpand);
        }

        this.update(d);
        this.centerRoot(d);
    }

    private tooltipIn(event: MouseEvent, d: HPN<TreeviewNode>) {
        if (this.settings.enableTooltips && this.tooltip) {
            this.tooltip.html(this.settings.getTooltip(d.data))
                .style("top", (event.pageY + 10) + "px")
                .style("left", (event.pageX + 10) + "px");

            this.tooltipTimer = window.setTimeout(() => this.tooltip.style("visibility", "visible"), 1000);
        }
    }

    private tooltipOut(event: MouseEvent, d: HPN<TreeviewNode>) {
        if (this.settings.enableTooltips && this.tooltip) {
            clearTimeout(this.tooltipTimer);
            this.tooltip.style("visibility", "hidden");
        }
    }

    private rightClick(event: MouseEvent, d: HPN<TreeviewNode>) {
        if (this.settings.enableRightClick) {
            this.render(d);
        }
    }
}
