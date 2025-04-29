export default abstract class Settings {
    /**
     * Total width of the visualization (in pixels).
     */
    width: number;
    /**
     * Total height of the visualization (in pixels)
     */
    height: number;
    /**
     * Are tooltips enabled when hovering the visualization?
     */
    enableTooltips: boolean;
}
export interface VisualizationPadding {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
