/**
 * Interactive Sunburst
 */
import Univis from "../shared/univis";
import SunburstNode from "./sunburstNode";

export default class Sunburst {

    constructor(element, data, options = {}) {
        this.element = element;
        this.data = data;
        this.settings = Object.assign({}, this.DEFAULTS, options);

        this.settings.width = this.settings.width - Sunburst.MARGIN.right - Sunburst.MARGIN.left;
        this.settings.height = this.settings.height - Sunburst.MARGIN.top - Sunburst.MARGIN.bottom;

        this.colorCounter = -1;

        // prepare data
        this.data.children = this.addEmptyChildren(this.data.children, this.settings.countAccessor.call(null, this.data));

        if (this.settings.enableTooltips) {
            this.initTooltip();
        }

        this.initCSS();

        // draw everything
        this.redraw();

        // fake click on the center node
        setTimeout(() => this.reset(), 1000);
    }

    initTooltip() {
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

    initCSS() {
        let elementClass = this.settings.className;
        $(this.element).addClass(elementClass);
        $("<style>").prop("type", "text/css")
                .html(`
.${elementClass} {
    font-family: Roboto,'Helvetica Neue',Helvetica,Arial,sans-serif;
    width: ${this.settings.width + this.settings.breadcrumbWidth}px;
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
}`)
                .appendTo("head");
    }

    /** ****** private functions ********/
    /**
     * Adds data for the peptides on the self level
     * Is called recursively
     *
     * @param <Array> children A list of children
     * @param <int> count The number of peptides that should be the sum of the
     *          children count
     * @return <Array> The modified list of children
     */
    addEmptyChildren(children, count) {
        for (let i = 0; i < children.length; i++) {
            if (typeof children[i].children !== "undefined") {
                children[i].children = this.addEmptyChildren(children[i].children, this.settings.countAccessor.call(null, children[i]));
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
    redraw() {
        // clear everything
        $(this.element).empty();

        this.breadcrumbs = d3.select(this.element)
            .append("div")
                .attr("id", this.element.id + "-breadcrumbs")
                .attr("class", "sunburst-breadcrumbs")
            .append("ul");

        this.x = d3.scale.linear().range([0, 2 * Math.PI]); // use full circle
        this.y = d3.scale.linear().domain([0, 1]).range([0, this.settings.radius]);
        this.currentMaxLevel = 4;

        let vis = d3.select(this.element)
            .append("svg")
            .attr("version", "1.1")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("viewBox", `0 0 ${this.settings.width + Sunburst.MARGIN.right + Sunburst.MARGIN.left} ${this.settings.height + Sunburst.MARGIN.top + Sunburst.MARGIN.bottom}`)
            .attr("width", this.settings.width + Sunburst.MARGIN.right + Sunburst.MARGIN.left)
            .attr("height", this.settings.height + Sunburst.MARGIN.top + Sunburst.MARGIN.bottom)
            .attr("overflow", "hidden")
            .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif");
        vis.append("style")
            .attr("type", "text/css")
            .html(".hidden{ visibility: hidden;}");
        vis = vis.append("g")
            .attr("transform", "translate(" + this.settings.radius + "," + this.settings.radius + ")"); // set origin to radius center

        let partition = d3.layout.partition() // creates a new partition layout
            .sort(null) // don't sort,  use tree traversal order
            .value(this.settings.countAccessor); // set the size of the pieces

        // calculate arcs out of partition coordinates
        this.arc = d3.svg.arc()
                .startAngle(d => Math.max(0, Math.min(2 * Math.PI, this.x(d.x))))
                .endAngle(d => Math.max(0, Math.min(2 * Math.PI, this.x(d.x + d.dx))))
                // prevent y-calculation on 0
                .innerRadius(d => Math.max(0, d.y ? this.y(d.y) : d.y))
                .outerRadius(d => Math.max(0, this.y(d.y + d.dy)) + 1);

        // run the partition layout
        let nodes = partition.nodes(this.data);

        this.path = vis.selectAll("path").data(nodes);
        this.path.enter().append("path") // for every node, draw an arc
            .attr("class", "arc")
            .attr("id", (d, i) => "path-" + i) // id based on index
            .attr("d", this.arc) // path data
            .attr("fill-rule", "evenodd") // fill rule
            .style("fill", d => this.colour(d, this)) // call function for colour
            .on("click", d => {
                if (d.depth < this.currentMaxLevel) {
                    this.click(d);
                }
            }) // call function on click
            .on("mouseover", (d, i) => this.tooltipIn(d, i))
            .on("mousemove", (d, i) => this.tooltipMove(d, i))
            .on("mouseout", (d, i) => this.tooltipOut(d, i));

        // put labels on the nodes
        this.text = vis.selectAll("text").data(nodes);

        // hack for the getComputedTextLength
        let that = this;

        this.text.enter().append("text")
            .style("fill", d => Univis.getReadableColorFor(this.colour(d, this)))
            .style("fill-opacity", 0)
            .style("font-family", "font-family: Helvetica, 'Super Sans', sans-serif")
            .style("pointer-events", "none") // don't invoke mouse events
            .attr("dy", ".2em")
            .text(this.settings.getLabel)
            .style("font-size", function (d) {
                return Math.floor(Math.min(((that.settings.radius / that.settings.levels) / this.getComputedTextLength() * 10) + 1, 12)) + "px";
            });
    }

    /**
     *  Interpolate the scales!
     * Defines new scales based on the clicked item
     *
     * @param <Object> d The clicked item
     * @return <Scale> new scales
     */
    arcTween(d, that) {
        let my = Math.min(Sunburst.maxY(d), d.y + that.settings.levels * d.dy),
            xd = d3.interpolate(that.x.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(that.y.domain(), [d.y, my]),
            yr = d3.interpolate(that.y.range(), [d.y ? 20 : 0, that.settings.radius]);
        return d => function (t) {
            that.x.domain(xd(t));
            that.y.domain(yd(t)).range(yr(t));
            return that.arc(d);
        };
    }

    setBreadcrumbs(d) {
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
            .endAngle(d => 2 * Math.PI * d.data.count / d.parent.data.count);
        let bc = this.breadcrumbs.selectAll(".crumb")
            .data(crumbs);
        bc.enter()
            .append("li")
            .on("click", d => {
                this.click(d.parent);
            })
            .attr("class", "crumb")
            .style("opacity", "0")
            .attr("title", d => `[${d.data.rank}] ${d.name}`)
            .html(d => `
<p class='name'>${d.name}</p>
<p class='percentage'>${Math.round(100 * d.data.count / d.parent.data.count)}% of ${d.parent.name}</p>`)
            .insert("svg", ":first-child").attr("width", 30).attr("height", 30)
            .append("path").attr("d", breadArc).attr("transform", "translate(15, 15)").attr("fill", d => this.colour(d, this));
        bc.transition()
            .duration(this.settings.duration)
            .style("opacity", "1");
        bc.exit().transition()
            .duration(this.settings.duration)
            .style("opacity", "0")
            .remove();
    }

    /**
     * Defines what happens after a node is clicked
     *
     * @param <Object> d The data object of the clicked arc
     */
    click(d) {
        if (d.name === "empty") {
            return;
        }

        this.setBreadcrumbs(d);

        if (this.settings.rerootCallback) {
            this.settings.rerootCallback.call(null, d);
        }

        // perform animation
        this.currentMaxLevel = d.depth + this.settings.levels;
        this.path.transition()
            .duration(this.settings.duration)
            .attrTween("d", this.arcTween(d, this))
            .attr("class", d => d.depth >= this.currentMaxLevel ? "arc toHide" : "arc")
            .attr("fill-opacity", d => d.depth >= this.currentMaxLevel ? 0.2 : 1);

        let that = this;

        // Somewhat of a hack as we rely on arcTween updating the scales.
        this.text
            .style("visibility", function (e) {
                return Sunburst.isParentOf(d, e, that.currentMaxLevel) ? null : d3.select(this).style("visibility");
            })
            .transition().duration(this.settings.duration)
            .attrTween("text-anchor", d => function () {
                return that.x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
            })
            .attrTween("dx", d => function () {
                return that.x(d.x + d.dx / 2) > Math.PI ? "-4px" : "4px";
            })
            .attrTween("transform", d => function () {
                let angle = that.x(d.x + d.dx / 2) * 180 / Math.PI - 90;
                return `rotate(${angle})translate(${that.y(d.y)})rotate(${angle > 90 ? -180 : 0})`;
            })
            .style("fill-opacity", e => Sunburst.isParentOf(d, e, that.currentMaxLevel) ? 1 : 1e-6)
            .each("end", function (e) {
                d3.select(this).style("visibility", Sunburst.isParentOf(d, e, that.currentMaxLevel) ? null : "hidden");
            });
    }


    /**
     * Calculates the color of an arc based on the color of his children
     *
     * @param <Object> d The node for which we want the color
     * @return <Color> The calculated color
     */
    colour(d, that) {
        if (d.name === "empty") {
            return "white";
        }
        if (that.settings.useFixedColors) {
            return that.settings.fixedColors[Math.abs(Univis.stringHash(d.name + " " + d.data.rank)) % that.settings.fixedColors.length];
        } else {
            if (d.children) {
                let colours = d.children.map(c => that.colour(c, that)),
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
                d.color = that.getColor();
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
    getColor() {
        this.colorCounter = (this.colorCounter + 1) % this.settings.colors.length;
        return this.settings.colors[this.colorCounter];
    }

    // tooltip functions
    tooltipIn(d, i) {
        if (!this.settings.enableTooltips) {
            return;
        }
        if (d.depth < this.currentMaxLevel && d.name !== "empty") {
            this.tooltip.html(this.settings.getTooltip(d))
                .style("top", (d3.event.pageY - 5) + "px")
                .style("left", (d3.event.pageX + 15) + "px")
                .style("visibility", "visible");
        }
    }

    tooltipOut(d, i) {
        if (!this.settings.enableTooltips) {
            return;
        }
        this.tooltip.style("visibility", "hidden");
    }

    tooltipMove(d, i) {
        if (!this.settings.enableTooltips) {
            return;
        }
        this.tooltip.style("top", (d3.event.pageY - 5) + "px")
            .style("left", (d3.event.pageX + 15) + "px");
    }

    getTooltip(d) {
        return `<h3 class='tip-title'>${this.settings.getTooltipTitle(d)}</h3><p>${this.settings.getTooltipText(d)}</p>`;
    }

    /** ****** util methods *************/
    /**
     * Calculates if p is a parent of c
     * Returns true is label must be drawn
     */
    static isParentOf(p, c, ml) {
        if (c.depth >= ml) {
            return false;
        }
        if (p === c) {
            return true;
        }
        if (p.children) {
            return p.children.some(function (d) {
                return Sunburst.isParentOf(d, c, ml);
            });
        }
        return false;
    }

    /**
     * calculate the max-y of the clicked item
     *
     * @param <Object> d The clicked item
     * @return <Number> The maximal y-value
     */
    static maxY(d) {
        return d.children ? Math.max(...d.children.map(Sunburst.maxY)) : d.y + d.dy;
    }

    /** ****** class constants **********/

    static get MARGIN() {
        return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        };
    }

    static get COLORS() {
        return ["#f9f0ab", "#e8e596", "#f0e2a3", "#ede487", "#efd580", "#f1cb82", "#f1c298", "#e8b598", "#d5dda1", "#c9d2b5", "#aec1ad", "#a7b8a8", "#b49a3d", "#b28647", "#a97d32", "#b68334", "#d6a680", "#dfad70", "#a2765d", "#9f6652", "#b9763f", "#bf6e5d", "#af643c", "#9b4c3f", "#72659d", "#8a6e9e", "#8f5c85", "#934b8b", "#9d4e87", "#92538c", "#8b6397", "#716084", "#2e6093", "#3a5988", "#4a5072", "#393e64", "#aaa1cc", "#e0b5c9", "#e098b0", "#ee82a2", "#ef91ac", "#eda994", "#eeb798", "#ecc099", "#f6d5aa", "#f0d48a", "#efd95f", "#eee469", "#dbdc7f", "#dfd961", "#ebe378", "#f5e351"];
    }

    static get FIXED_COLORS() {
        return ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5", "#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6", "#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"];
    }

    get DEFAULTS() {
        return {
            height: 600,
            width: 600,
            breadcrumbWidth: 200,
            radius: 300,

            className: "unipept-sunburst",
            levels: 4,
            getLevel: d => d.getDepth(),

            duration: 1000,
            colors: Sunburst.COLORS,
            fixedColors: Sunburst.FIXED_COLORS,
            useFixedColors: false,

            countAccessor: d => d.data.self_count,
            rerootCallback: undefined,

            getLabel: d => d.name === "empty" ? "" : d.name,

            enableTooltips: true,
            getTooltip: d => this.getTooltip.call(this, d),
            getTooltipTitle: Univis.getTooltipTitle,
            getTooltipText: Univis.getTooltipText,
        };
    }

    /** ************* Public methods ***************/

    /**
     * Resets the sunburst to its initial position
     */
    reset() {
        this.click(this.data);
    }

    /**
     * redraws the colors of the sunburst
     */
    redrawColors() {
        d3.selectAll(".crumb path").transition()
            .style("fill", d => this.colour(d, this));
        this.path.transition()
            .style("fill", d => this.colour(d, this));
        this.text.transition()
            .style("fill", d => Univis.getReadableColorFor(this.colour(d, this)));
    }

    /**
     * Sets the visualisation in full screen mode
     *
     * @param <boolean> isFullScreen indicates if we're in full screen mode
     */
    setFullScreen(isFullScreen) {
        // the delay is because the event fires before we're in fullscreen
        // so the height en width functions don't give a correct result
        // without the delay
        setTimeout(function () {
            let size = 740;
            if (isFullScreen) {
                size = Math.min($(window).height() - 44, $(window).width() - 250);
            }
            $(this.element).children("svg")
                .attr("width", size)
                .attr("height", size);
        }, 1000);
    }
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
