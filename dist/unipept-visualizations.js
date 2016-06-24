/**
 * Zoomable treeview, inspiration from
 * - http://bl.ocks.org/mbostock/4339083
 * - https://gist.github.com/robschmuecker/7880033
 * - http://www.brightpointinc.com/interactive/budget/index.html?source=d3js
 */
(function () {
    var TreeView = function TreeView(element, data, options = {}) {
        let that = {};

        const MARGIN = {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5
            },
            DURATION = 750,
            COLOR_SCALE = d3.scale.category10();

        let settings;

        let visibleRoot,
            tooltipTimer;

        let nodeId = 0,
            root;

        let tree,
            tooltip,
            numberFormat,
            diagonal,
            widthScale,
            arcScale,
            innerArc,
            zoomListener,
            svg;

        const DEFAULTS = {
            height: 500,
            width: 500,

            colors: d => COLOR_SCALE(d.name),
            nodeFillColor: nodeFillColor,
            nodeStrokeColor: nodeStrokeColor,
            linkStrokeColor: linkStrokeColor
        };

        function init() {
            settings = Object.assign({}, DEFAULTS, options);

            settings.width = settings.width - MARGIN.right - MARGIN.left;
            settings.height = settings.height - MARGIN.top - MARGIN.bottom;

            numberFormat = d3.format(",d");

            tooltip = d3.select("body")
                .append("div")
                .attr("id", element.id + "-tooltip")
                .attr("class", "tip")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden");

            tree = d3.layout.tree()
                .nodeSize([2, 10])
                .separation((a, b) => {
                    let width = (nodeSize(a) + nodeSize(b)),
                        distance = width / 2 + 4;
                    return (a.parent === b.parent) ? distance : distance + 4;
                });

            diagonal = d3.svg.diagonal().projection(d => [d.y, d.x]);

            widthScale = d3.scale.linear().range([2, 105]);
            arcScale = d3.scale.linear().range([0, 2 * Math.PI]);

            innerArc = d3.svg.arc()
                .outerRadius(nodeSize)
                .startAngle(0)
                .endAngle(arcSize);

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

            draw(Node.createNode(data));
        }

        function draw(data) {
            widthScale.domain([0, data.data.count]);

            root = data;
            root.x0 = settings.height / 2;
            root.y0 = 0;

            // set everything visible
            root.setVisible();

            // set colors
            function color(d, i, c) {
                if (c) {
                    d.color = c;
                } else {
                    d.color = d3.functor(settings.colors).call(this, d, i);
                }
                if (d.children) {
                    d.children.forEach((node) => {
                        color(node, i, d.color);
                    });
                }
            }
            root.children.forEach((node, i) => {
                color(node, i);
            });

            // collapse everything
            root.collapseAll();
            root.expand();

            update(root);
            centerNode(root);
        }

        function update(source) {
            // Compute the new tree layout.
            let nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(d => {
                d.y = d.depth * 180;
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

            nodeEnter.append("path")
                .attr("d", innerArc)
                .style("fill", settings.nodeStrokeColor)
                .style("fill-opacity", 0);

            nodeEnter.append("text")
                .attr("x", d => d.isLeaf() ? -10 : 10)
                .attr("dy", ".35em")
                .attr("text-anchor", d => d.isLeaf() ? "end" : "start")
                .text(d => d.name)
                .style("font", "10px sans-serif")
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            let nodeUpdate = node.transition()
                .duration(DURATION)
                .attr("transform", d => `translate(${d.y},${d.x})`);

            nodeUpdate.select("circle")
                .attr("r", nodeSize)
                .style("fill-opacity", d => d._children ? 1 : 0)
                .style("stroke", settings.nodeStrokeColor)
                .style("fill", settings.nodeFillColor);

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            nodeUpdate.select("path")
                .duration(DURATION)
                .attr("d", innerArc)
                .style("fill-opacity", 0.8);

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
                        y: (source.y0 || 0)
                    };
                    return diagonal({
                        source: o,
                        target: o
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
                        y: source.y
                    };
                    return diagonal({
                        source: o,
                        target: o
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

        function arcSize(d) {
            return arcScale(d.data.self_count / d.data.count) || 0;
        }

        // Toggle children on click.
        function click(d) {
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

        // Sets the width of the right clicked node to 100%
        function rightClick(d) {
            if (d === visibleRoot && d !== root) {
                rightClick(root);
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
        }

        // Center a node
        function centerNode(source) {
            let scale = zoomListener.scale(),
                x = -source.y0,
                y = -source.x0;
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
            tooltip.html(`<b>${d.name}</b> (${d.data.rank})<br/>
                ${numberFormat(!d.data.self_count ? "0" : d.data.self_count)}${d.data.self_count && d.data.self_count === 1 ? " sequence" : " sequences"} specific to this level<br/>
                ${numberFormat(!d.data.count ? "0" : d.data.count)}${d.data.count && d.data.count === 1 ? " sequence" : " sequences"} specific to this level or lower`);
            tooltip.style("top", (d3.event.pageY - 5) + "px").style("left", (d3.event.pageX + 15) + "px");

            tooltipTimer = setTimeout(() => {
                tooltip.style("visibility", "visible");
            }, 1000);

        }

        function tooltipOut(d, i) {
            clearTimeout(tooltipTimer);
            tooltip.style("visibility", "hidden");
        }

        /************** Default methods ***************/
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

        class Node {
            static createNode(node) {
                if (node.children) {
                    node.children = node.children.map(n => Node.createNode(n));
                }
                return Object.assign(new Node(), node);
            }

            // Returns true if a node is a leaf
            isLeaf() {
                return this.children || this._children;
            }

            // set node and children visible
            setVisible() {
                this.selected = true;
                if (this.children) {
                    this.children.forEach(c => {
                        c.setVisible();
                    });
                }
            }

            setSelected(value) {
                this.selected = value;
                if (this.children) {
                    this.children.forEach(c => {
                        c.setSelected(value);
                    });
                } else if (this._children) {
                    this._children.forEach(c => {
                        c.setSelected(value);
                    });
                }
            }

            // collapse everything
            collapseAll() {
                if (this.children && this.children.length === 0) {
                    this.children = null;
                }
                if (this.children) {
                    this._children = this.children;
                    this._children.forEach(c => {
                        c.collapseAll();
                    });
                    this.children = null;
                }
            }

            // Collapses a node
            collapse() {
                if (this.children) {
                    this._children = this.children;
                    this.children = null;
                }
            }

            expandAll() {
                this.expand(30);
            }

            // Expands a node and its children
            expand(i = 2) {
                if (i > 0) {
                    if (this._children) {
                        this.children = this._children;
                        this._children = null;
                    }
                    if (this.children) {
                        this.children.forEach(c => {
                            c.expand(i - 1);
                        });
                    }
                }
            }
        }

        /*************** Public methods ***************/
        that.reset = function reset() {
            zoomListener.scale(1);
            rightClick(root);
        };

        // initialize the object
        init();

        // return the object
        return that;
    };

    function Plugin(userData, option) {
        return this.each(function () {
            let $this = $(this);
            let data = $this.data('vis.treeview');
            let options = $.extend({}, $this.data(), typeof option === 'object' && option);

            if (!data) {
                $this.data('vis.treeview', (data = new TreeView(this, userData, options)));
            }
            if (typeof option === 'string') {
                data[option]();
            }
        });
    }

    $.fn.treeview = Plugin;
    $.fn.treeview.Constructor = TreeView;
})();
