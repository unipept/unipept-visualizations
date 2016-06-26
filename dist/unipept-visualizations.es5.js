"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Zoomable treeview, inspiration from
 * - http://bl.ocks.org/mbostock/4339083
 * - https://gist.github.com/robschmuecker/7880033
 * - http://www.brightpointinc.com/interactive/budget/index.html?source=d3js
 */
(function () {
    var TreeView = function TreeView(element, data) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        var that = {};

        var MARGIN = {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
        },
            DURATION = 750,
            COLOR_SCALE = d3.scale.category10(),
            DEFAULTS = {
            height: 300,
            width: 600,
            nodeDistance: 180,

            colors: function colors(d) {
                return COLOR_SCALE(d.name);
            },
            nodeFillColor: nodeFillColor,
            nodeStrokeColor: nodeStrokeColor,
            linkStrokeColor: linkStrokeColor,

            enableInnerArcs: true,
            enableExpandOnClick: true,
            enableRightClick: false,

            enableTooltips: true,
            getTooltip: getTooltip,
            getTooltipTitle: getTooltipTitle,
            getTooltipText: getTooltipText
        };

        var settings = void 0;

        var visibleRoot = void 0,
            tooltipTimer = void 0;

        var nodeId = 0,
            root = void 0;

        var tree = void 0,
            tooltip = void 0,
            diagonal = void 0,
            widthScale = void 0,
            innerArc = void 0,
            zoomListener = void 0,
            svg = void 0;

        function init() {
            settings = _extends({}, DEFAULTS, options);

            settings.width = settings.width - MARGIN.right - MARGIN.left;
            settings.height = settings.height - MARGIN.top - MARGIN.bottom;

            if (settings.enableTooltips) {
                initTooltip();
            }

            if (settings.enableInnerArcs) {
                initInnerArcs();
            }

            tree = d3.layout.tree().nodeSize([2, 10]).separation(function (a, b) {
                var width = nodeSize(a) + nodeSize(b),
                    distance = width / 2 + 4;
                return a.parent === b.parent ? distance : distance + 4;
            });

            diagonal = d3.svg.diagonal().projection(function (d) {
                return [d.y, d.x];
            });

            widthScale = d3.scale.linear().range([2, 105]);

            // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
            zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", function () {
                svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
            });

            svg = d3.select(element).append("svg").attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").attr("viewBox", "0 0 " + (settings.width + MARGIN.right + MARGIN.left) + " " + (settings.height + MARGIN.top + MARGIN.bottom)).attr("width", settings.width + MARGIN.right + MARGIN.left).attr("height", settings.height + MARGIN.top + MARGIN.bottom).call(zoomListener).append("g").attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")").append("g");

            draw(Node.createNode(data));
        }

        function initTooltip() {
            tooltip = d3.select("body").append("div").attr("id", element.id + "-tooltip").attr("class", "tip").style("position", "absolute").style("z-index", "10").style("visibility", "hidden").style("background-color", "white").style("padding", "2px").style("border", "1px solid #dddddd").style("border-radius", "3px;");
        }

        function initInnerArcs() {
            var arcScale = d3.scale.linear().range([0, 2 * Math.PI]);

            innerArc = d3.svg.arc().outerRadius(nodeSize).startAngle(0).endAngle(function (d) {
                return arcScale(d.data.self_count / d.data.count) || 0;
            });
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
                    d.children.forEach(function (node) {
                        color(node, i, d.color);
                    });
                }
            }
            root.children.forEach(function (node, i) {
                color(node, i);
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
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function (d) {
                d.y = d.depth * settings.nodeDistance;
            });

            // Update the nodes…
            var node = svg.selectAll("g.node").data(nodes, function (d) {
                return d.id || (d.id = ++nodeId);
            });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g").attr("class", "node").style("cursor", "pointer").attr("transform", function (d) {
                return "translate(" + (source.y || 0) + "," + (source.x0 || 0) + ")";
            }).on("click", click).on("mouseover", tooltipIn).on("mouseout", tooltipOut).on("contextmenu", rightClick);

            nodeEnter.append("circle").attr("r", 1e-6).style("stroke-width", "1.5px").style("stroke", settings.nodeStrokeColor).style("fill", settings.nodeFillColor);

            if (settings.enableInnerArcs) {
                nodeEnter.append("path").attr("d", innerArc).style("fill", settings.nodeStrokeColor).style("fill-opacity", 0);
            }

            nodeEnter.append("text").attr("x", function (d) {
                return d.isLeaf() ? -10 : 10;
            }).attr("dy", ".35em").attr("text-anchor", function (d) {
                return d.isLeaf() ? "end" : "start";
            }).text(function (d) {
                return d.name;
            }).style("font", "10px sans-serif").style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition().duration(DURATION).attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

            nodeUpdate.select("circle").attr("r", nodeSize).style("fill-opacity", function (d) {
                return d._children ? 1 : 0;
            }).style("stroke", settings.nodeStrokeColor).style("fill", settings.nodeFillColor);

            nodeUpdate.select("text").style("fill-opacity", 1);

            if (settings.enableInnerArcs) {
                nodeUpdate.select("path").duration(DURATION).attr("d", innerArc).style("fill-opacity", 0.8);
            }

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition().duration(DURATION).attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            }).remove();

            nodeExit.select("circle").attr("r", 1e-6);

            nodeExit.select("path").style("fill-opacity", 1e-6);

            nodeExit.select("text").style("fill-opacity", 1e-6);

            // Update the links…
            var link = svg.selectAll("path.link").data(links, function (d) {
                return d.target.id;
            });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g").attr("class", "link").style("fill", "none").style("stroke-opacity", "0.5").style("stroke-linecap", "round").style("stroke", settings.linkStrokeColor).style("stroke-width", 1e-6).attr("d", function (d) {
                var o = {
                    x: source.x0 || 0,
                    y: source.y0 || 0
                };
                return diagonal({
                    source: o,
                    target: o
                });
            });

            // Transition links to their new position.
            link.transition().duration(DURATION).attr("d", diagonal).style("stroke", settings.linkStrokeColor).style("stroke-width", function (d) {
                if (d.source.selected) {
                    return widthScale(d.target.data.count) + "px";
                } else {
                    return "4px";
                }
            });

            // Transition exiting nodes to the parent's new position.
            link.exit().transition().duration(DURATION).style("stroke-width", 1e-6).attr("d", function (d) {
                var o = {
                    x: source.x,
                    y: source.y
                };
                return diagonal({
                    source: o,
                    target: o
                });
            }).remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d) {
                var _ref = [d.x, d.y];
                d.x0 = _ref[0];
                d.y0 = _ref[1];
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
        }

        // Center a node
        function centerNode(source) {
            var scale = zoomListener.scale();
            var x = -source.y0;
            var y = -source.x0;

            x = x * scale + settings.width / 4;
            y = y * scale + settings.height / 2;
            svg.transition().duration(DURATION).attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
            zoomListener.scale(scale);
            zoomListener.translate([x, y]);
        }

        // tooltip functions
        function tooltipIn(d, i) {
            if (!settings.enableTooltips) {
                return;
            }
            tooltip.html(settings.getTooltip(d)).style("top", d3.event.pageY - 5 + "px").style("left", d3.event.pageX + 15 + "px");

            tooltipTimer = setTimeout(function () {
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

        function getTooltip(d) {
            return "<h3 class='tip-title'>" + settings.getTooltipTitle(d) + "</h3><p>" + settings.getTooltipText(d) + "</p>";
        }

        function getTooltipTitle(d) {
            return d.name;
        }

        function getTooltipText(d) {
            return d.data.count + " hits";
        }

        var Node = function () {
            function Node() {
                _classCallCheck(this, Node);
            }

            _createClass(Node, [{
                key: "isLeaf",


                // Returns true if a node is a leaf
                value: function isLeaf() {
                    return this.children || this._children;
                }

                // set node and children visible

            }, {
                key: "setVisible",
                value: function setVisible() {
                    this.selected = true;
                    if (this.children) {
                        this.children.forEach(function (c) {
                            c.setVisible();
                        });
                    }
                }
            }, {
                key: "setSelected",
                value: function setSelected(value) {
                    this.selected = value;
                    if (this.children) {
                        this.children.forEach(function (c) {
                            c.setSelected(value);
                        });
                    } else if (this._children) {
                        this._children.forEach(function (c) {
                            c.setSelected(value);
                        });
                    }
                }

                // collapse everything

            }, {
                key: "collapseAll",
                value: function collapseAll() {
                    if (this.children && this.children.length === 0) {
                        this.children = null;
                    }
                    if (this.children) {
                        this._children = this.children;
                        this._children.forEach(function (c) {
                            c.collapseAll();
                        });
                        this.children = null;
                    }
                }

                // Collapses a node

            }, {
                key: "collapse",
                value: function collapse() {
                    if (this.children) {
                        this._children = this.children;
                        this.children = null;
                    }
                }
            }, {
                key: "expandAll",
                value: function expandAll() {
                    this.expand(30);
                }

                // Expands a node and its children

            }, {
                key: "expand",
                value: function expand() {
                    var i = arguments.length <= 0 || arguments[0] === undefined ? 2 : arguments[0];

                    if (i > 0) {
                        if (this._children) {
                            this.children = this._children;
                            this._children = null;
                        }
                        if (this.children) {
                            this.children.forEach(function (c) {
                                c.expand(i - 1);
                            });
                        }
                    }
                }
            }], [{
                key: "createNode",
                value: function createNode(node) {
                    if (node.children) {
                        node.children = node.children.map(function (n) {
                            return Node.createNode(n);
                        });
                    }
                    return _extends(new Node(), node);
                }
            }]);

            return Node;
        }();

        /*************** Public methods ***************/


        that.reset = function reset() {
            zoomListener.scale(1);
            reroot(root);
        };

        // initialize the object
        init();

        // return the object
        return that;
    };

    function Plugin(userData, option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('vis.treeview');
            var options = $.extend({}, $this.data(), (typeof option === "undefined" ? "undefined" : _typeof(option)) === 'object' && option);

            if (!data) {
                $this.data('vis.treeview', data = new TreeView(this, userData, options));
            }
            if (typeof option === 'string') {
                data[option]();
            }
        });
    }

    $.fn.treeview = Plugin;
    $.fn.treeview.Constructor = TreeView;
})();
//# sourceMappingURL=unipept-visualizations.es5.js.map
