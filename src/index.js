export {Heatmap} from "./heatmap/heatmap";

// TODO: How to export jQuery function here?
$.fn.heatmap = function(data, options) {
    return new Heatmap(this.get(0), data, options);
};
