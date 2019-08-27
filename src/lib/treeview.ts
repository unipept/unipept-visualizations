import d3 from "d3";
import { MaxCountHeap } from "./maxCountHeap";
import { TreeviewNode } from "./treeviewNode";
import { BasicNode } from "./basicNode";
import { functor } from "./utils";

/**
 * Zoomable treeview, inspiration from
 * - http://bl.ocks.org/mbostock/4339083
 * - https://gist.github.com/robschmuecker/7880033
 * - http://www.brightpointinc.com/interactive/budget/index.html?source=d3js
 */
export class TreeView {

  public static readonly colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  public static readonly defaultSettings = Object.freeze({
    height: 300,
    width: 600,
    nodeDistance: 180,
    levelsToExpand: 2,
    minNodeSize: 2,
    maxNodeSize: 105,

    countAccessor: d => d.data.count,
    rerootCallback: undefined,

    colors: d => TreeView.colorScale(d.name),
    nodeFillColor: TreeView.nodeFillColor,
    nodeStrokeColor: TreeView.nodeStrokeColor,
    linkStrokeColor: TreeView.linkStrokeColor,

    enableInnerArcs: true,
    enableExpandOnClick: true,
    enableRightClick: true,

    enableLabels: true,
    getLabel: d => d.name,

    enableTooltips: true,
    getTooltip: TreeView.getTooltip,
    getTooltipTitle: TreeView.getTooltipTitle,
    getTooltipText: TreeView.getTooltipText,
    enableAutoExpand: false,
  });

  public readonly margin = Object.freeze({
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  });
  public readonly duration = 750;

  public readonly element;
  public readonly settings;

  private visibleRoot;
  private tooltipTimer;
  private nodeId = 0;
  private root?: TreeviewNode;

  private tree;
  private tooltip;
  private widthScale;
  private innerArc;
  private zoomListener: d3.ZoomBehavior<any, any>;
  private svg;

  constructor(element, data: BasicNode, options) {
    this.element = element;
    this.settings = Object.assign({}, TreeView.defaultSettings, options);
    TreeviewNode.countAccessor = this.settings.countAccessor;
    TreeviewNode.levelsToExpand = this.settings.levelsToExpand;

    this.settings.width = this.settings.width - this.margin.right - this.margin.left;
    this.settings.height = this.settings.height - this.margin.top - this.margin.bottom;

    if (this.settings.enableTooltips) {
      this.initTooltip();
    }

    if (this.settings.enableInnerArcs) {
      this.initInnerArcs();
    }

    this.tree = d3.tree()
      .nodeSize([2, 10])
      .separation((a, b) => {
        const width = (this.nodeSize(a) + this.nodeSize(b));
        const distance = width / 2 + 4;
        return (a.parent === b.parent) ? distance : distance + 4;
      });

    this.widthScale = d3.scaleLinear().range([this.settings.minNodeSize, this.settings.maxNodeSize]);

    // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
    this.zoomListener = d3.zoom()
      .scaleExtent([0.1, 3])
      .on("zoom", () => {
        this.svg.attr("transform", `translate(${d3.event.translate})scale(${d3.event.scale})`);
      });

    this.svg = d3.select(element).append("svg")
      .attr("version", "1.1")
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("viewBox", `0 0 ${this.settings.width + this.margin.right + this.margin.left} ${this.settings.height + this.margin.top + this.margin.bottom}`)
      .attr("width", this.settings.width + this.margin.right + this.margin.left)
      .attr("height", this.settings.height + this.margin.top + this.margin.bottom)
      .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif")
      .call(this.zoomListener)
      .append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`)
      .append("g");

    this.draw(TreeviewNode.createNodes(data));
  }

  private draw(data: TreeviewNode): void {
    this.widthScale.domain([0, data.data.count]);

    this.root = data;
    this.root.x0 = this.settings.height / 2;
    this.root.y0 = 0;

    // set everything visible
    this.root.setSelected(true);

    if (this.root.children) {
      this.root.children.forEach((d, i) => {
        d.color = functor(this.settings.colors).call(this, d, i);
        d.setRecursiveProperty("color", d.color);
      });
    }

    if (this.settings.enableExpandOnClick) {
      this.root.collapseAll();
      this.initialExpand(this.root);
    } else {
      this.root.expandAll();
    }

    this.update(this.root);
    this.centerNode(this.root);
  }

  public update(source): void {
    // Compute the new tree layout.
    const nodes = this.tree.nodes(this.root).reverse();
    const links = this.tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(d => {
      d.y = d.depth * this.settings.nodeDistance;
    });

    // Update the nodes…
    const node = this.svg.selectAll("g.node")
      .data(nodes, d => d.id || (d.id = ++this.nodeId));

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .style("cursor", "pointer")
      .attr("transform", d => `translate(${source.y || 0},${source.x0 || 0})`)
      .on("click", this.click)
      .on("mouseover", this.tooltipIn)
      .on("mouseout", this.tooltipOut)
      .on("contextmenu", this.rightClick);

    nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("stroke-width", "1.5px")
      .style("stroke", this.settings.nodeStrokeColor)
      .style("fill", this.settings.nodeFillColor);

    if (this.settings.enableInnerArcs) {
      nodeEnter.append("path")
        .attr("d", this.innerArc)
        .style("fill", this.settings.nodeStrokeColor)
        .style("fill-opacity", 0);
    }

    if (this.settings.enableLabels) {
      nodeEnter.append("text")
        .attr("x", d => d.isLeaf() ? 10 : -10)
        .attr("dy", ".35em")
        .attr("text-anchor", d => d.isLeaf() ? "start" : "end")
        .text(this.settings.getLabel)
        .style("font", "10px sans-serif")
        .style("fill-opacity", 1e-6);
    }

    // Transition nodes to their new position.
    const nodeUpdate = node.transition()
      .duration(this.duration)
      .attr("transform", d => `translate(${d.y},${d.x})`);

    nodeUpdate.select("circle")
      .attr("r", this.nodeSize)
      .style("fill-opacity", d => d._children ? 1 : 0)
      .style("stroke", this.settings.nodeStrokeColor)
      .style("fill", this.settings.nodeFillColor);

    if (this.settings.enableLabels) {
      nodeUpdate.select("text")
        .style("fill-opacity", 1);
    }

    if (this.settings.enableInnerArcs) {
      nodeUpdate.select("path")
        .duration(this.duration)
        .attr("d", this.innerArc)
        .style("fill-opacity", 0.8);
    }

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node.exit().transition()
      .duration(this.duration)
      .attr("transform", () => `translate(${source.y},${source.x})`)
      .remove();

    nodeExit.select("circle")
      .attr("r", 1e-6);

    nodeExit.select("path")
      .style("fill-opacity", 1e-6);

    nodeExit.select("text")
      .style("fill-opacity", 1e-6);

    // Update the links…
    const link = this.svg.selectAll("path.link")
      .data(links, d => d.target.id);

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
      .attr("class", "link")
      .style("fill", "none")
      .style("stroke-opacity", "0.5")
      .style("stroke-linecap", "round")
      .style("stroke", this.settings.linkStrokeColor)
      .style("stroke-width", 1e-6)
      .attr("d", () => {
        const o = {
          x: (source.x0 || 0),
          y: (source.y0 || 0),
        };
        return this.link({
          source: o,
          target: o,
        });
      });

    // Transition links to their new position.
    link.transition()
      .duration(this.duration)
      .attr("d", this.link)
      .style("stroke", this.settings.linkStrokeColor)
      .style("stroke-width", d => {
        if (d.source.selected) {
          return this.widthScale(d.target.data.count) + "px";
        } else {
          return "4px";
        }
      });

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
      .duration(this.duration)
      .style("stroke-width", 1e-6)
      .attr("d", () => {
        const o = {
          x: source.x,
          y: source.y,
        };
        return this.link({
          source: o,
          target: o,
        });
      })
      .remove();

    // Stash the old positions for transition.
    nodes.forEach(d => {
      [d.x0, d.y0] = [d.x, d.y];
    });
  }

  private initialExpand(root): void {
    if (!this.settings.enableAutoExpand) {
      root.expand();
      return;
    }

    root.expand(1);
    let allowedCount = root.data.count * (Number.isFinite(this.settings.enableAutoExpand) ? this.settings.enableAutoExpand : 0.8);
    const pq = new MaxCountHeap(root.children || []);
    while (allowedCount > 0 && pq.size > 0) {
      const toExpand = pq.remove();
      allowedCount -= toExpand.data.count;
      toExpand.expand(1);
      (toExpand.children || []).forEach(c => pq.add(c));
    }
  }

  private initTooltip(): void {
    this.tooltip = d3.select("body")
      .append("div")
      .attr("id", this.element.id + "-tooltip")
      .attr("class", "tip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("padding", "2px")
      .style("border", "1px solid #dddddd")
      .style("border-radius", "3px;");
  }

  private initInnerArcs(): void {
    const arcScale = d3.scaleLinear().range([0, 2 * Math.PI]);

    this.innerArc = d3.arc()
      .outerRadius(this.nodeSize)
      .startAngle(0)
      .endAngle(d => arcScale(d.data.self_count / d.data.count) || 0);
  }

  private nodeSize(d): number {
    if (d.selected) {
      return this.widthScale(d.data.count) / 2;
    } else {
      return 2;
    }
  }

  // Toggle children on click.
  private click(d): void {
    if (!this.settings.enableExpandOnClick) {
      return;
    }

    // check if click is triggered by panning on a node
    if (d3.event.defaultPrevented) {
      return;
    }

    if (d3.event.shiftKey) {
      d.expandAll();
    } else if (d.children) {
      d.collapse();
    } else {
      d.expand();
    }
    this.update(d);
    this.centerNode(d);
  }

  private rightClick(d): void {
    if (this.settings.enableRightClick) {
      this.reroot(d);
    }
  }

  // Sets the width of the right clicked node to 100%
  private reroot(d): void {
    if (d === this.visibleRoot && d !== this.root) {
      this.reroot(this.root);
      return;
    }
    this.visibleRoot = d;

    // set Selection properties
    this.root.setSelected(false);
    d.setSelected(true);

    // scale the lines
    this.widthScale.domain([0, d.data.count]);

    d.expand();

    // redraw
    if (d3.event !== null) {
      d3.event.preventDefault();
    }
    this.update(d);
    this.centerNode(d);

    if (this.settings.rerootCallback) {
      this.settings.rerootCallback.call(null, d);
    }
  }

  // Center a node
  public centerNode(source): void {
    const scale = this.zoomListener.scale();
    let [x, y] = [-source.y0, -source.x0];
    x = x * scale + this.settings.width / 4;
    y = y * scale + this.settings.height / 2;
    this.svg.transition()
      .duration(this.duration)
      .attr("transform", `translate(${x},${y})scale(${scale})`);
    this.zoomListener.scale(scale);
    this.zoomListener.translate([x, y]);
  }

  // tooltip functions
  private tooltipIn(d, i): void {
    if (!this.settings.enableTooltips) {
      return;
    }
    this.tooltip.html(this.settings.getTooltip(d))
      .style("top", (d3.event.pageY - 5) + "px")
      .style("left", (d3.event.pageX + 15) + "px");

    this.tooltipTimer = setTimeout(() => {
      this.tooltip.style("visibility", "visible");
    }, 1000);
  }

  private tooltipOut(d, i): void {
    if (!this.settings.enableTooltips) {
      return;
    }
    clearTimeout(this.tooltipTimer);
    this.tooltip.style("visibility", "hidden");
  }

  /**
   * Returns an svg path for drawing a link between two nodes
   * @param d link object that was returned from a d3 hierarchy function
   */
  private link(d): string {
    return `M${d.source.y},${d.source.x}C${(d.source.y + d.target.y) / 2},${d.source.x} ${(d.source.y + d.target.y) / 2},${d.target.x} ${d.target.y},${d.target.x}`;
  }

  public reset(): void {
    this.zoomListener.scale(1);
    this.reroot(this.root);
  }

  /**
   * Returns the fill color of a node and gray if selected.
   * @param d A node
   */
  static nodeFillColor(d): string {
    if (d.selected) {
      return d._children ? d.color || "#aaa" : "#fff";
    } else {
      return "#aaa";
    }
  }

  /**
   * Returns the stroke color of a node and gray if selected.
   * @param d A node
   */
  static nodeStrokeColor(d): string {
    if (d.selected) {
      return d.color || "#aaa";
    } else {
      return "#aaa";
    }
  }

  /**
   * Returns the link stroke color of a node and gray if selected.
   * @param d A node
   */
  static linkStrokeColor(d): string {
    if (d.source.selected) {
      return d.target.color;
    } else {
      return "#aaa";
    }
  }

  /**
   * Returns the inner html for a tooltip
   * @param d 
   * @param graph 
   */
  static getTooltip(d, graph: TreeView): string {
    return `<h3 class='tip-title'>${graph.settings.getTooltipTitle(d)}</h3><p>${graph.settings.getTooltipText(d)}</p>`;
  }

  /**
   * Returns a title to be used in the tooltip
   * @param d 
   */
  static getTooltipTitle(d): string {
    return d.name;
  }

  /**
   * Return a text to be used in the tooltip
   * @param d 
   */
  static getTooltipText(d): string {
    return `${d.data.count} hits`;
  }


}