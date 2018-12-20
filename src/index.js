import {Heatmap} from "./heatmap/heatmap";

$.fn.heatmap = function(data, options) {
    return new Heatmap(this.get(0), data, options);
};
