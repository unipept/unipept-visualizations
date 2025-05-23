export default abstract class Settings {
    /**
     * Total width of the visualization (in pixels).
     */
    public width: number = 800;

    /**
     * Total height of the visualization (in pixels)
     */
    public height: number = 800;

    /**
     * Are tooltips enabled when hovering the visualization?
     */
    public enableTooltips: boolean = true;
}

export interface VisualizationPadding {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
