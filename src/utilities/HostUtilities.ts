import Tooltip from "./Tooltip";

export default class HostUtilities {
    /**
     * Empties the element a visualization renders in, so that constructing a visualization on an element that already
     * holds one replaces it instead of adding a second one next to it.
     *
     * The tooltip is taken down along with the contents. Removing the node the pointer is over does not fire a
     * mouseout on it, so the handler that would normally hide the tooltip never runs and it is left on screen
     * describing something that no longer exists. Clearing and hiding therefore belong together, which is why every
     * visualization goes through here rather than emptying its element itself.
     *
     * @param element The element the visualization is rendered in.
     * @param tooltipContainer The tooltip container of the visualization, as configured in its settings.
     */
    public static clear(element: HTMLElement, tooltipContainer: HTMLElement | string | null = null): void {
        Tooltip.hideFor(element, tooltipContainer);

        element.innerHTML = "";
    }
}
