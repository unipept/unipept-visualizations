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

    /**
     * Element the tooltip is appended to, or a selector for it. The default is the body of the document that holds the
     * visualization. Visualizations that share a container also share a single tooltip element.
     *
     * Browsers that support the popover API show the tooltip in the top layer, which is painted above a fullscreen
     * element, so this only needs to be set for fullscreen support in browsers that do not. Point it at the element
     * that is made fullscreen and the tooltip goes fullscreen along with it.
     */
    public tooltipContainer: HTMLElement | string | null = null;
}

export interface VisualizationPadding {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
