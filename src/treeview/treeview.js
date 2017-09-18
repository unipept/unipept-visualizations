/**
 * Zoomable treeview, inspiration from
 * - http://bl.ocks.org/mbostock/4339083
 * - https://gist.github.com/robschmuecker/7880033
 * - http://www.brightpointinc.com/interactive/budget/index.html?source=d3js
 */
import Univis from "../shared/univis";
import TreeviewNode from "./treeviewNode";

export default function TreeView(element, data, options = {}) {
    let that = {};

    const MARGIN = {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5,
        },
        DURATION = 750,
        COLOR_SCALE = d3.scale.category10(),
        DEFAULTS = {
            height: 300,
            width: 600,
            nodeDistance: 180,
            levelsToExpand: 2,
            minNodeSize: 2,
            maxNodeSize: 105,

            countAccessor: d => d.data.count,
            rerootCallback: undefined,

            colors: d => COLOR_SCALE(d.name),
            nodeFillColor: nodeFillColor,
            nodeStrokeColor: nodeStrokeColor,
            linkStrokeColor: linkStrokeColor,

            enableInnerArcs: true,
            enableExpandOnClick: true,
            enableRightClick: true,

            enableLabels: true,
            getLabel: d => d.name,

            enableTooltips: true,
            getTooltip: getTooltip,
            getTooltipTitle: Univis.getTooltipTitle,
            getTooltipText: Univis.getTooltipText,
        };

    let settings;

    let visibleRoot,
        tooltipTimer;

    let nodeId = 0,
        root;

    let tree,
        tooltip,
        diagonal,
        widthScale,
        innerArc,
        zoomListener,
        svg;

    function init() {
        settings = Object.assign({}, DEFAULTS, options);
        TreeviewNode.settings = settings;

        settings.width = settings.width - MARGIN.right - MARGIN.left;
        settings.height = settings.height - MARGIN.top - MARGIN.bottom;

        if (settings.enableTooltips) {
            initTooltip();
        }

        if (settings.enableInnerArcs) {
            initInnerArcs();
        }

        tree = d3.layout.tree()
                .nodeSize([2, 10])
                .separation((a, b) => {
                    let width = (nodeSize(a) + nodeSize(b)),
                        distance = width / 2 + 4;
                    return (a.parent === b.parent) ? distance : distance + 4;
                });

        diagonal = d3.svg.diagonal().projection(d => [d.y, d.x]);

        widthScale = d3.scale.linear().range([settings.minNodeSize, settings.maxNodeSize]);

            // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
        zoomListener = d3.behavior.zoom()
                .scaleExtent([0.1, 3])
                .on("zoom", () => {
                    svg.attr("transform", `translate(${d3.event.translate})scale(${d3.event.scale})`);
                });

        svg = d3.select(element).append("svg")
                .attr("version", "1.1")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("viewBox", `0 0 ${settings.width + MARGIN.right + MARGIN.left} ${settings.height + MARGIN.top + MARGIN.bottom}`)
                .attr("width", settings.width + MARGIN.right + MARGIN.left)
                .attr("height", settings.height + MARGIN.top + MARGIN.bottom)
                .call(zoomListener)
                .append("g")
                .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`)
                .append("g");

        draw(TreeviewNode.createNode(data));
    }

    function initTooltip() {
        tooltip = d3.select("body")
                .append("div")
                .attr("id", element.id + "-tooltip")
                .attr("class", "tip")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden")
                .style("background-color", "white")
                .style("padding", "2px")
                .style("border", "1px solid #dddddd")
                .style("border-radius", "3px;");
    }

    function initInnerArcs() {
        let arcScale = d3.scale.linear().range([0, 2 * Math.PI]);

        innerArc = d3.svg.arc()
                .outerRadius(nodeSize)
                .startAngle(0)
                .endAngle(d => arcScale(d.data.self_count / d.data.count) || 0);
    }

    function draw(data) {
        widthScale.domain([0, data.data.count]);

        root = data;
        root.x0 = settings.height / 2;
        root.y0 = 0;

            // set everything visible
        root.setSelected(true);

        root.children.forEach((d, i) => {
            d.color = d3.functor(settings.colors).call(this, d, i);
            d.setRecursiveProperty("color", d.color);
        });

        if (settings.enableExpandOnClick) {
            root.collapseAll();
            root.expand();
        } else {
            root.expandAll();
        }

        update(root);
        centerNode(root);
    }

    function update(source) {
            // Compute the new tree layout.
        let nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

            // Normalize for fixed-depth.
        nodes.forEach(d => {
            d.y = d.depth * settings.nodeDistance;
        });

            // Update the nodes…
        let node = svg.selectAll("g.node")
                .data(nodes, d => d.id || (d.id = ++nodeId));

            // Enter any new nodes at the parent's previous position.
        let nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .style("cursor", "pointer")
                .attr("transform", d => `translate(${source.y || 0},${source.x0 || 0})`)
                .on("click", click)
                .on("mouseover", tooltipIn)
                .on("mouseout", tooltipOut)
                .on("contextmenu", rightClick);

        nodeEnter.append("circle")
                .attr("r", 1e-6)
                .style("stroke-width", "1.5px")
                .style("stroke", settings.nodeStrokeColor)
                .style("fill", settings.nodeFillColor);

        if (settings.enableInnerArcs) {
            nodeEnter.append("path")
                    .attr("d", innerArc)
                    .style("fill", settings.nodeStrokeColor)
                    .style("fill-opacity", 0);
        }

        if (settings.enableLabels) {
            nodeEnter.append("text")
                    .attr("x", d => d.isLeaf() ? 10 : -10)
                    .attr("dy", ".35em")
                    .attr("text-anchor", d => d.isLeaf() ? "start" : "end")
                    .text(settings.getLabel)
                    .style("font", "10px sans-serif")
                    .style("fill-opacity", 1e-6);
        }

            // Transition nodes to their new position.
        let nodeUpdate = node.transition()
                .duration(DURATION)
                .attr("transform", d => `translate(${d.y},${d.x})`);

        nodeUpdate.select("circle")
                .attr("r", nodeSize)
                .style("fill-opacity", d => d._children ? 1 : 0)
                .style("stroke", settings.nodeStrokeColor)
                .style("fill", settings.nodeFillColor);

        if (settings.enableLabels) {
            nodeUpdate.select("text")
                    .style("fill-opacity", 1);
        }

        if (settings.enableInnerArcs) {
            nodeUpdate.select("path")
                    .duration(DURATION)
                    .attr("d", innerArc)
                    .style("fill-opacity", 0.8);
        }

            // Transition exiting nodes to the parent's new position.
        let nodeExit = node.exit().transition()
                .duration(DURATION)
                .attr("transform", d => `translate(${source.y},${source.x})`)
                .remove();

        nodeExit.select("circle")
                .attr("r", 1e-6);

        nodeExit.select("path")
                .style("fill-opacity", 1e-6);

        nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
        let link = svg.selectAll("path.link")
                .data(links, d => d.target.id);

            // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
                .attr("class", "link")
                .style("fill", "none")
                .style("stroke-opacity", "0.5")
                .style("stroke-linecap", "round")
                .style("stroke", settings.linkStrokeColor)
                .style("stroke-width", 1e-6)
                .attr("d", d => {
                    let o = {
                        x: (source.x0 || 0),
                        y: (source.y0 || 0),
                    };
                    return diagonal({
                        source: o,
                        target: o,
                    });
                });

            // Transition links to their new position.
        link.transition()
                .duration(DURATION)
                .attr("d", diagonal)
                .style("stroke", settings.linkStrokeColor)
                .style("stroke-width", d => {
                    if (d.source.selected) {
                        return widthScale(d.target.data.count) + "px";
                    } else {
                        return "4px";
                    }
                });

            // Transition exiting nodes to the parent's new position.
        link.exit().transition()
                .duration(DURATION)
                .style("stroke-width", 1e-6)
                .attr("d", d => {
                    let o = {
                        x: source.x,
                        y: source.y,
                    };
                    return diagonal({
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

    function nodeSize(d) {
        if (d.selected) {
            return widthScale(d.data.count) / 2;
        } else {
            return 2;
        }
    }

    // Toggle children on click.
    function click(d) {
        if (!settings.enableExpandOnClick) {
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
        update(d);
        centerNode(d);
    }

    function rightClick(d) {
        if (settings.enableRightClick) {
            reroot(d);
        }
    }

        // Sets the width of the right clicked node to 100%
    function reroot(d) {
        if (d === visibleRoot && d !== root) {
            reroot(root);
            return;
        }
        visibleRoot = d;

            // set Selection properties
        root.setSelected(false);
        d.setSelected(true);

            // scale the lines
        widthScale.domain([0, d.data.count]);

        d.expand();

            // redraw
        if (d3.event !== null) {
            d3.event.preventDefault();
        }
        update(d);
        centerNode(d);

        if (settings.rerootCallback) {
            settings.rerootCallback.call(null, d);
        }
    }

        // Center a node
    function centerNode(source) {
        let scale = zoomListener.scale(),
            [x, y] = [-source.y0, -source.x0];
        x = x * scale + settings.width / 4;
        y = y * scale + settings.height / 2;
        svg.transition()
                .duration(DURATION)
                .attr("transform", `translate(${x},${y})scale(${scale})`);
        zoomListener.scale(scale);
        zoomListener.translate([x, y]);
    }

        // tooltip functions
    function tooltipIn(d, i) {
        if (!settings.enableTooltips) {
            return;
        }
        tooltip.html(settings.getTooltip(d))
                .style("top", (d3.event.pageY - 5) + "px")
                .style("left", (d3.event.pageX + 15) + "px");

        tooltipTimer = setTimeout(() => {
            tooltip.style("visibility", "visible");
        }, 1000);
    }

    function tooltipOut(d, i) {
        if (!settings.enableTooltips) {
            return;
        }
        clearTimeout(tooltipTimer);
        tooltip.style("visibility", "hidden");
    }

        /** ************ Default methods ***************/
        // set fill color
    function nodeFillColor(d) {
        if (d.selected) {
            return d._children ? d.color || "#aaa" : "#fff";
        } else {
            return "#aaa";
        }
    }

        // set node stroke color
    function nodeStrokeColor(d) {
        if (d.selected) {
            return d.color || "#aaa";
        } else {
            return "#aaa";
        }
    }

        // set link stroke color
    function linkStrokeColor(d) {
        if (d.source.selected) {
            return d.target.color;
        } else {
            return "#aaa";
        }
    }

    function getTooltip(d) {
        return `<h3 class='tip-title'>${settings.getTooltipTitle(d)}</h3><p>${settings.getTooltipText(d)}</p>`;
    }

        /** ************* Public methods ***************/
    that.reset = function reset() {
        zoomListener.scale(1);
        reroot(root);
    };

        // initialize the object
    init();

        // return the object
    return that;
}

$.fn.treeview = function (data, options) {
    return new TreeView(this.get(0), data, options);
};
