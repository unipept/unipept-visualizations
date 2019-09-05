import * as d3 from "d3";

/**
 * Defines default color palettes
 */
export class ColorPalette {
  public static sunburstColors(): d3.ScaleOrdinal<string, string> {
    return d3.scaleOrdinal(
      ["#f9f0ab", "#e8e596", "#f0e2a3", "#ede487", "#efd580", "#f1cb82",
        "#f1c298", "#e8b598", "#d5dda1", "#c9d2b5", "#aec1ad", "#a7b8a8",
        "#b49a3d", "#b28647", "#a97d32", "#b68334", "#d6a680", "#dfad70",
        "#a2765d", "#9f6652", "#b9763f", "#bf6e5d", "#af643c", "#9b4c3f",
        "#72659d", "#8a6e9e", "#8f5c85", "#934b8b", "#9d4e87", "#92538c",
        "#8b6397", "#716084", "#2e6093", "#3a5988", "#4a5072", "#393e64",
        "#aaa1cc", "#e0b5c9", "#e098b0", "#ee82a2", "#ef91ac", "#eda994",
        "#eeb798", "#ecc099", "#f6d5aa", "#f0d48a", "#efd95f", "#eee469",
        "#dbdc7f", "#dfd961", "#ebe378", "#f5e351"]);
  }

  public static sunburstColorsAlt(): d3.ScaleOrdinal<string, string> {
    return d3.scaleOrdinal(
      ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a",
        "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94",
        "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d",
        "#17becf", "#9edae5", "#393b79", "#5254a3", "#6b6ecf", "#9c9ede",
        "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39",
        "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c",
        "#7b4173", "#a55194", "#ce6dbd", "#de9ed6", "#3182bd", "#6baed6",
        "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2",
        "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8",
        "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"]);
  }
}
