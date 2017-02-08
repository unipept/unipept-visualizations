/**
 * Interactive Sunburst
 */
import SunburstNode from "./sunburstNode";

export default function Sunburst(element, data, options = {}) {
    let that = {};

    const MARGIN = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        COLORS = ["#f9f0ab", "#e8e596", "#f0e2a3", "#ede487", "#efd580", "#f1cb82", "#f1c298", "#e8b598", "#d5dda1", "#c9d2b5", "#aec1ad", "#a7b8a8", "#b49a3d", "#b28647", "#a97d32", "#b68334", "#d6a680", "#dfad70", "#a2765d", "#9f6652", "#b9763f", "#bf6e5d", "#af643c", "#9b4c3f", "#72659d", "#8a6e9e", "#8f5c85", "#934b8b", "#9d4e87", "#92538c", "#8b6397", "#716084", "#2e6093", "#3a5988", "#4a5072", "#393e64", "#aaa1cc", "#e0b5c9", "#e098b0", "#ee82a2", "#ef91ac", "#eda994", "#eeb798", "#ecc099", "#f6d5aa", "#f0d48a", "#efd95f", "#eee469", "#dbdc7f", "#dfd961", "#ebe378", "#f5e351"],
        FIXED_COLORS = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5", "#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6", "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"],
        DEFAULTS = {
            height: 600,
            width: 600,
            breadcrumbWidth: 200,
            radius: 300,

            className: "unipept-sunburst",
            levels: 4,
            getLevel: d => d.getDepth(),

            duration: 1000,
            colors: COLORS,
            fixedColors: FIXED_COLORS,
            useFixedColors: false,

            countAccessor: d => d.data.self_count,
            rerootCallback: undefined,

            labelHeight: 10,
            getLabel: d => d.name,

            enableTooltips: true,
            getTooltip: getTooltip,
            getTooltipTitle: getTooltipTitle,
            getTooltipText: getTooltipText,
        };

    let settings;

    let colorCounter = -1;

    // components
    let tooltip,
        breadcrumbs,
        path, // the arcs
        x, // the x-scale
        y, // the y-scale
        arc, // the arc function
        text, // all text nodes
        currentMaxLevel;

    /** ************* Private methods ***************/

    /**
     * Initializes Sunburst
     */
    function init() {
        settings = Object.assign({}, DEFAULTS, options);

        settings.width = settings.width - MARGIN.right - MARGIN.left;
        settings.height = settings.height - MARGIN.top - MARGIN.bottom;

        // prepare data
        data.children = addEmptyChildren(data.children, data.data.self_count);

        if (settings.enableTooltips) {
            initTooltip();
        }

        initCSS();

        // draw everything
        redraw();

        // fake click on the center node
        setTimeout(that.reset, 1000);
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

    function initCSS() {
        let elementClass = settings.className;
        $(element).addClass(elementClass);
        $("<style>").prop("type", "text/css")
                .html(`
.${elementClass} {
    font-family: Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif;
    width: ${settings.width + settings.breadcrumbWidth}px;
}
.${elementClass} .sunburst-breadcrumbs {
    width: 176px;
    float: right;
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
}
                `)
                .appendTo("head");
    }

    /**
     * Adds data for the peptides on the self level
     * Is called recursively
     *
     * @param <Array> children A list of children
     * @param <int> count The number of peptides that should be the sum of the
     *          children count
     * @return <Array> The modified list of children
     */
    function addEmptyChildren(children, count) {
        let i;
        for (i = 0; i < children.length; i++) {
            if (typeof children[i].children !== "undefined") {
                children[i].children = addEmptyChildren(children[i].children, children[i].data.self_count);
            }
        }
        if (children.length > 0 && count !== 0 && count !== undefined) {
            children.push({
                id: -1,
                name: "empty",
                data: {
                    count: count,
                    self_count: count,
                },
            });
        }
        return children;
    }

    /**
     * Redraws the pancore graph
     */
    function redraw() {
        let vis, // the visualisation
            partition, // the partition layout
            nodes, // the result of the partition layout
            textEnter; // new text nodes

        // clear everything
        $(element).empty();

        breadcrumbs = d3.select(element)
            .append("div")
                .attr("id", element.id + "-breadcrumbs")
                .attr("class", "sunburst-breadcrumbs")
            .append("ul");

        x = d3.scale.linear().range([0, 2 * Math.PI]); // use full circle
        y = d3.scale.linear().domain([0, 1]).range([0, settings.radius]);
        currentMaxLevel = 4;

        vis = d3.select(element)
            .append("svg")
            .attr("version", "1.1")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", `0 0 ${settings.width + MARGIN.right + MARGIN.left} ${settings.height + MARGIN.top + MARGIN.bottom}`)
            .attr("width", settings.width + MARGIN.right + MARGIN.left)
            .attr("height", settings.height + MARGIN.top + MARGIN.bottom)
            .attr("overflow", "hidden")
            .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");
        vis.append("style")
            .attr("type", "text/css")
            .html(".hidden{ visibility: hidden;}");
        vis = vis.append("g")
            .attr("transform", "translate(" + settings.radius + "," + settings.radius + ")"); // set origin to radius center

        partition = d3.layout.partition() // creates a new partition layout
            .sort(null) // don't sort,  use tree traversal order
            .value(function (d) {
                return d.data.self_count;
            }); // set the size of the pieces

        // calculate arcs out of partition coordinates
        arc = d3.svg.arc()
            .startAngle(function (d) {
                return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
            }) // start between 0 and 2Pi
            .endAngle(function (d) {
                return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
            }) // stop between 0 and 2Pi
            .innerRadius(function (d) {
                return Math.max(0, d.y ? y(d.y) : d.y);
            }) // prevent y-calculation on 0
            .outerRadius(function (d) {
                return Math.max(0, y(d.y + d.dy)) + 1;
            });

        // run the partition layout
        nodes = partition.nodes(data);

        path = vis.selectAll("path").data(nodes);
        path.enter().append("path") // for every node, draw an arc
            .attr("class", "arc")
            .attr("id", function (d, i) {
                return "path-" + i;
            }) // id based on index
            .attr("d", arc) // path data
            .attr("fill-rule", "evenodd") // fill rule
            .style("fill", colour) // call function for colour
            .on("click", function (d) {
                if (d.depth < currentMaxLevel) {
                    click(d);
                }
            }) // call function on click
            .on("mouseover", tooltipIn)
            .on("mousemove", tooltipMove)
            .on("mouseout", tooltipOut);

        // put labels on the nodes
        text = vis.selectAll("text").data(nodes);

        textEnter = text.enter().append("text")
            .style("fill", function (d) {
                return getReadableColorFor(colour(d));
            })
            .style("fill-opacity", 0)
            .style("font-family", "font-family: Helvetica, 'Super Sans', sans-serif")
            .style("pointer-events", "none") // don't invoke mouse events
            .attr("dy", ".2em");

        textEnter.append("tspan")
            .attr("x", 0)
            .text(function (d) {
                return d.depth && d.name !== "empty" ? d.name.split(" ")[0] : "";
            });

        textEnter.append("tspan")
            .attr("x", 0)
            .attr("dy", "1em")
            .text(function (d) {
                return d.depth && d.name !== "empty" ? d.name.split(" ")[1] || "" : "";
            });

        textEnter.append("tspan")
            .attr("x", 0)
            .attr("dy", "1em")
            .text(function (d) {
                return d.depth && d.name !== "empty" ? d.name.split(" ")[2] || "" : "";
            });

        textEnter.style("font-size", function (d) {
            return Math.min(((settings.radius / settings.levels) / this.getComputedTextLength() * 10) + 1, 12) + "px";
        });
    }

    /**
     *  Interpolate the scales!
     * Defines new scales based on the clicked item
     *
     * @param <Object> d The clicked item
     * @return <Scale> new scales
     */
    function arcTween(d) {
        let my = Math.min(maxY(d), d.y + settings.levels * d.dy),
            xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(y.domain(), [d.y, my]),
            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, settings.radius]);
        return function (d) {
            return function (t) {
                x.domain(xd(t));
                y.domain(yd(t)).range(yr(t));
                return arc(d);
            };
        };
    }

    /**
     * calculate the max-y of the clicked item
     *
     * @param <Object> d The clicked item
     * @return <Number> The maximal y-value
     */
    function maxY(d) {
        return d.children ? Math.max(...d.children.map(maxY)) : d.y + d.dy;
    }

    function setBreadcrumbs(d) {
        // breadcrumbs
        let crumbs = [];
        let temp = d;
        while (temp) {
            crumbs.push(temp);
            temp = temp.parent;
        }
        crumbs.reverse().shift();
        let breadArc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(15)
            .startAngle(0)
            .endAngle(function (d) {
                return 2 * Math.PI * d.data.count / d.parent.data.count;
            });
        let bc = breadcrumbs.selectAll(".crumb")
            .data(crumbs);
        bc.enter()
            .append("li")
            .on("click", function (d) {
                click(d.parent);
            })
            .attr("class", "crumb")
            .style("opacity", "0")
            .attr("title", function (d) {
                return "[" + d.data.rank + "] " + d.name;
            })
            .html(function (d) {
                return "<p class='name'>" +
                    d.name +
                    "</p><p class='percentage'>" +
                    Math.round(100 * d.data.count / d.parent.data.count) +
                    "% of " +
                    d.parent.name +
                    "</p>";
            })
            .insert("svg", ":first-child").attr("width", 30).attr("height", 30)
            .append("path").attr("d", breadArc).attr("transform", "translate(15, 15)").attr("fill", colour);
        bc.transition()
            .duration(settings.duration)
            .style("opacity", "1");
        bc.exit().transition()
            .duration(settings.duration)
            .style("opacity", "0")
            .remove();
    }

    /**
     * Defines what happens after a node is clicked
     *
     * @param <Object> d The data object of the clicked arc
     */
    function click(d) {
        if (d.name === "empty") {
            return;
        }

        setBreadcrumbs(d);

        if (settings.rerootCallback) {
            settings.rerootCallback.call(null, d);
        }

        // perform animation
        currentMaxLevel = d.depth + settings.levels;
        path.transition()
            .duration(settings.duration)
            .attrTween("d", arcTween(d))
            .attr("class", function (d) {
                if (d.depth >= currentMaxLevel) {
                    return "arc toHide";
                }
                return "arc";
            })
            .attr("fill-opacity", function (d) {
                if (d.depth >= currentMaxLevel) {
                    return 0.2;
                }
                return 1;
            });

        // Somewhat of a hack as we rely on arcTween updating the scales.
        text
            .style("visibility", function (e) {
                return isParentOf(d, e) ? null : d3.select(this).style("visibility");
            })
            .transition().duration(settings.duration)
            .attrTween("text-anchor", function (d) {
                return function () {
                    return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
                };
            })
            .attrTween("transform", function (d) {
                let multiline = (d.name || "").split(" ").length > 1;
                return function () {
                    let angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                        rotate = angle + (multiline ? -0.5 : 0);
                    return "rotate(" + rotate + ")translate(" + (y(d.y)) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
                };
            })
            .style("fill-opacity", function (e) {
                return isParentOf(d, e) ? 1 : 1e-6;
            })
            .each("end", function (e) {
                d3.select(this).style("visibility", isParentOf(d, e) ? null : "hidden");
            });
    }

    /**
     * Calculates if p is a parent of c
     * Returns true is label must be drawn
     */
    function isParentOf(p, c) {
        if (c.depth >= currentMaxLevel) {
            return false;
        }
        if (p === c) {
            return true;
        }
        if (p.children) {
            return p.children.some(function (d) {
                return isParentOf(d, c);
            });
        }
        return false;
    }

    /**
     * Calculates the color of an arc based on the color of his children
     *
     * @param <Object> d The node for which we want the color
     * @return <Color> The calculated color
     */
    function colour(d) {
        if (d.name === "empty") {
            return "white";
        }
        if (settings.useFixedColors) {
            switch (d.name) {
            case "Bacteria":
                return settings.fixedColors[0];
            case "Eukaryota":
                return settings.fixedColors[1];
            default:
                return settings.fixedColors[Math.abs(stringHash(d.name + " " + d.data.rank)) % settings.fixedColors.length];
            }
        } else {
            if (d.children) {
                let colours = d.children.map(colour),
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
            if (!d.color) {
                d.color = getColor();
            }
            return d.color;
        }
    }

    /**
     * color generation function
     * iterates over fixed list of colors
     *
     * @return <Color> The generated color
     */
    function getColor() {
        colorCounter = (colorCounter + 1) % settings.colors.length;
        return settings.colors[colorCounter];
    }


    // tooltip functions
    function tooltipIn(d, i) {
        if (!settings.enableTooltips) {
            return;
        }
        if (d.depth < currentMaxLevel && d.name !== "empty") {
            tooltip.html(settings.getTooltip(d))
                .style("top", (d3.event.pageY - 5) + "px")
                .style("left", (d3.event.pageX + 15) + "px")
                .style("visibility", "visible");
        }
    }

    function tooltipOut(d, i) {
        if (!settings.enableTooltips) {
            return;
        }
        tooltip.style("visibility", "hidden");
    }

    function tooltipMove(d, i) {
        if (!settings.enableTooltips) {
            return;
        }
        tooltip.style("top", (d3.event.pageY - 5) + "px")
            .style("left", (d3.event.pageX + 15) + "px");
    }

    function getTooltip(d) {
        return `<h3 class='tip-title'>${settings.getTooltipTitle(d)}</h3><p>${settings.getTooltipText(d)}</p>`;
    }

    function getTooltipTitle(d) {
        return d.name;
    }

    function getTooltipText(d) {
        return `${d.data.count} hits`;
    }


    /*
     * Returns the readable text color based on the brightness of a given backgroud color
     */
    function getReadableColorFor(color) {
        let textColor = "#000";
        try {
            textColor = brightness(d3.rgb(color)) < 125 ? "#eee" : "#000";
        } catch (err) { /* go on */ }
        return textColor;
    }

    /*
     * Returns the brightness of an rgb-color
     * from: http:// www.w3.org/WAI/ER/WD-AERT/#color-contrast
     */
    function brightness(rgb) {
        return rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
    }

    /**
     * Hash function for strings from
     * http://stackoverflow.com/a/15710692/865696
     */
    function stringHash(s) {
        return s.split("").reduce(function (a, b) {
            let c = ((a << 5) - a) + b.charCodeAt(0);
            return c & c;
        }, 0);
    }

    /** ************* Public methods ***************/

    /**
     * Resets the sunburst to its initial position
     */
    that.reset = function reset() {
        click(data);
    };

    /**
     * redraws the colors of the sunburst
     */
    that.redrawColors = function redrawColors() {
        d3.selectAll(".crumb path").transition()
            .style("fill", colour);
        path.transition()
            .style("fill", colour);
        text.transition()
            .style("fill", function (d) {
                return getReadableColorFor(colour(d));
            });
    };

    /**
     * Sets the visualisation in full screen mode
     *
     * @param <boolean> isFullScreen indicates if we're in full screen mode
     */
    that.setFullScreen = function setFullScreen(isFullScreen) {
        // the delay is because the event fires before we're in fullscreen
        // so the height en width functions don't give a correct result
        // without the delay
        setTimeout(function () {
            let size = 740;
            if (isFullScreen) {
                size = Math.min($(window).height() - 44, $(window).width() - 250);
            }
            $(element).children("svg")
                .attr("width", size)
                .attr("height", size);
        }, 1000);
    };

    // initialize the object
    init();

    return that;
}

function Plugin(userData, option) {
    return this.each(function () {
        let $this = $(this);
        let data = $this.data("vis.sunburst");
        let options = $.extend({}, $this.data(), typeof option === "object" && option);

        if (!data) {
            $this.data("vis.sunburst", (data = new Sunburst(this, userData, options)));
        }
        if (typeof option === "string") {
            data[option]();
        }
    });
}

$.fn.sunburst = Plugin;
$.fn.sunburst.Constructor = Sunburst;
