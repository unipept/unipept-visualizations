export default abstract class Settings {
    // Total width of the visualization in pixels.
    public width: number = 1200;

    // Total height of the visualization in pixels.
    public height: number = 500;

    // Are tooltips being generated when hoovering over an item?
    public enableTooltips: boolean = true;

    // The class name that's added to the element. Used for styling the visualization.
    public abstract className: string;

}
