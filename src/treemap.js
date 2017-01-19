/**
 * Interactive treemap
 */
import Node from "./node";

export default function TreeMap(element, data, options = {}) {
    let that = {};

    const MARGIN = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
        DEFAULTS = {
            height: 300,
            width: 600,

            className: "unipept-treemap",
            levels: undefined,
            getLevel: d => d.getDepth(),

            countAccessor: d => d.data.self_count,
            rerootCallback: undefined,

            getBreadcrumbTooltip: d => d.name,
            colorRoot: "#104B7D",
            colorLeaf: "#fdffcc",
            colorBreadcrumbs: "#FF8F00",

            labelHeight: 10,
            getLabel: d => d.name,

            enableTooltips: true,
            getTooltip: getTooltip,
            getTooltipTitle: getTooltipTitle,
            getTooltipText: getTooltipText,
        };

    let settings;

    let root,
        nodeId = 0,
        current,
        treemapLayout,
        breadcrumbs,
        treemap,
        tooltip,
        colorScale;

        /**
         * Initializes Treemap
         */
    function init() {
        settings = Object.assign({}, DEFAULTS, options);

        root = TreemapNode.createNode(data);

        settings.width = settings.width - MARGIN.right - MARGIN.left;
        settings.height = settings.height - MARGIN.top - MARGIN.bottom;

        settings.levels = settings.levels || root.getHeight();

        if (settings.enableTooltips) {
            initTooltip();
        }

        initCSS();

            // setup the visualisation
        draw(root);
        reroot(root, false);
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
                `)
                .appendTo("head");
    }

    function draw(data) {
        $(element).empty();

        treemapLayout = d3.layout.treemap()
                .size([settings.width + 1, settings.height + 1])
                .padding([settings.labelHeight, 0, 0, 0])
                .value(settings.countAccessor);

        colorScale = d3.scale.linear()
                .domain([0, settings.levels])
                .range([settings.colorRoot, settings.colorLeaf])
                .interpolate(d3.interpolateLab);

        breadcrumbs = d3.select(element).append("div")
                .attr("class", "breadcrumbs")
                .style("position", "relative")
                .style("width", settings.width + "px")
                .style("height", "20px")
                .style("background-color", settings.colorBreadcrumbs);

        treemap = d3.select(element).append("div")
                .style("position", "relative")
                .style("width", settings.width + "px")
                .style("height", settings.height + "px")
                .style("left", MARGIN.left + "px")
                .style("top", MARGIN.top + "px");
    }

    function setBreadcrumbs() {
        let crumbs = [];
        let temp = current;
        while (temp) {
            crumbs.push(temp);
            temp = temp.parent;
        }
        crumbs.reverse();
        breadcrumbs.html("");
        breadcrumbs.selectAll(".crumb")
                .data(crumbs)
                .enter()
                .append("span")
                .attr("class", "crumb")
                .attr("title", settings.getBreadcrumbTooltip)
                .html(d => `<span class='link'>${d.name}</span>`)
                .on("click", d => {
                    reroot(d);
                });
    }

    function reroot(data, triggerCallback = true) {
        current = data;

        setBreadcrumbs();

        let nodes = treemap.selectAll(".node")
                .data(treemapLayout.nodes(data), d => d.id || (d.id = ++nodeId));

        nodes.enter()
                .append("div")
                .attr("class", "node")
                .style("background", d => colorScale(settings.getLevel(d)))
                .style("color", d => getReadableColorFor(colorScale(settings.getLevel(d))))
                .style("left", "0px")
                .style("top", "0px")
                .style("width", "0px")
                .style("height", "0px")
                .text(settings.getLabel)
                .on("click", d => {
                    reroot(d);
                })
                .on("contextmenu", d => {
                    d3.event.preventDefault();
                    if (current.parent) {
                        reroot(current.parent);
                    }
                })
                .on("mouseover", tooltipIn)
                .on("mousemove", tooltipMove)
                .on("mouseout", tooltipOut);

        nodes.order()
                .transition()
                .call(position);

        nodes.exit().remove();

        if (triggerCallback && settings.rerootCallback) {
            settings.rerootCallback.call(null, current);
        }
    }

    function update() {
        let nodes = treemap.selectAll(".node")
                .data(treemapLayout.nodes(data), d => d.id)
                .order()
                .transition()
                .call(position);
    }

        /**
         * sets the position of a square
         */
    function position() {
        this.style("left", d => d.x + "px")
                .style("top", d => d.y + "px")
                .style("width", d => Math.max(0, d.dx - 1) + "px")
                .style("height", d => Math.max(0, d.dy - 1) + "px");
    }

        /**
         * Resizes the treemap for a given width and height
         */
    function resize(width, height) {
        treemapLayout = d3.layout.treemap()
                .size([width + 1, height + 1])
                .padding([10, 0, 0, 0])
                .value(settings.countAccessor);
        update();
    }

        // tooltip functions
    function tooltipIn(d, i) {
        if (!settings.enableTooltips) {
            return;
        }
        tooltip.html(settings.getTooltip(d))
                .style("top", (d3.event.pageY - 5) + "px")
                .style("left", (d3.event.pageX + 15) + "px")
                .style("visibility", "visible");
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

    class TreemapNode extends Node {
        static new(node = {}) {
            return new TreemapNode(node);
        }

        static createNode(node) {
            return Node.createNode(node, TreemapNode.new);
        }
        }


        /** ************* Public methods ***************/
        /**
         * Resets the treemap to its initial position
         */
    that.reset = function reset() {
        reroot(root);
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
            let [w, h] = [settings.width, settings.height];
            if (isFullScreen) {
                w = $(window).width();
                h = $(window).height() - 44;
            }
            resize(w, h);
        }, 1000);
    };

        // initialize the object
    init();

    return that;
}

function Plugin(userData, option) {
    return this.each(function () {
        let $this = $(this);
        let data = $this.data("vis.treemap");
        let options = $.extend({}, $this.data(), typeof option === "object" && option);

        if (!data) {
            $this.data("vis.treemap", (data = new TreeMap(this, userData, options)));
        }
        if (typeof option === "string") {
            data[option]();
        }
    });
}

$.fn.treemap = Plugin;
$.fn.treemap.Constructor = TreeMap;
