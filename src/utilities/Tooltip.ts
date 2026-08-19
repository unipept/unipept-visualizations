/**
 * Class name of the tooltip element, which applications embedding this library can hook their own styling onto.
 */
const tooltipClass = "tip";

/**
 * Marks the stylesheet this class installs, so that it is only installed once per document.
 */
const styleAttribute = "data-unipept-tooltip-style";

/**
 * A tooltip that follows the mouse cursor.
 *
 * All visualizations that share a container share one tooltip element: only one cursor exists, so only one tooltip can
 * ever be visible, and a page with a dozen visualizations should not end up with a dozen elements that nothing ever
 * cleans up.
 *
 * Where the browser supports it, the element is promoted to the top layer through the popover API. The top layer is
 * painted above the element that is shown fullscreen, which is the only way for a tooltip that lives outside of that
 * element to remain visible while a visualization is in fullscreen. Browsers without popover support need the tooltip
 * to live inside the element that goes fullscreen, which is what the tooltip container setting is for.
 */
export default class Tooltip {
    /**
     * The tooltip that belongs to a given element, so that visualizations sharing an element also share the state of
     * the tooltip rather than each tracking their own idea of whether it is currently shown.
     */
    private static readonly instances: WeakMap<HTMLElement, Tooltip> = new WeakMap();

    private readonly usesPopover: boolean;
    private visible: boolean = false;

    private constructor(private readonly element: HTMLElement) {
        this.usesPopover = "popover" in element;
    }

    /**
     * Returns the tooltip for the given container, creating its element if the container does not hold one yet.
     *
     * @param reference An element of the visualization the tooltip belongs to. Its document is the one the tooltip is
     *                  created in and the one a container selector is resolved against.
     * @param container The element the tooltip should be appended to, or a selector for it. Defaults to the body of
     *                  the document that holds the visualization.
     * @throws When a container selector matches no element.
     */
    public static create(reference: HTMLElement, container: HTMLElement | string | null = null): Tooltip {
        const parent = Tooltip.resolveContainer(reference, container);
        const element = parent.querySelector<HTMLElement>(`:scope > .${tooltipClass}`) ?? Tooltip.createElement(parent);

        let tooltip = Tooltip.instances.get(element);

        if (!tooltip) {
            tooltip = new Tooltip(element);
            Tooltip.instances.set(element, tooltip);
        }

        return tooltip;
    }

    /**
     * Fills the tooltip with the given content, moves it to the mouse cursor and shows it.
     */
    public show(event: MouseEvent, content: string): void {
        this.element.innerHTML = content;
        this.move(event);

        if (!this.visible) {
            this.visible = true;
            this.setVisibility(true);
        }
    }

    /**
     * Moves the tooltip to the mouse cursor.
     */
    public move(event: MouseEvent): void {
        // Viewport coordinates rather than page coordinates: a fullscreen element is laid out against the viewport,
        // while the document behind it keeps the scroll offset that page coordinates are expressed in.
        this.element.style.top = `${event.clientY + 10}px`;
        this.element.style.left = `${event.clientX + 10}px`;
    }

    /**
     * Hides the tooltip.
     */
    public hide(): void {
        if (this.visible) {
            this.visible = false;
            this.setVisibility(false);
        }
    }

    private setVisibility(visible: boolean): void {
        this.element.style.visibility = visible ? "visible" : "hidden";

        // Both popover methods throw when the element is not part of a document.
        if (!this.usesPopover || !this.element.isConnected) {
            return;
        }

        if (visible) {
            this.element.showPopover();
        } else {
            this.element.hidePopover();
        }
    }

    private static resolveContainer(reference: HTMLElement, container: HTMLElement | string | null): HTMLElement {
        if (!container) {
            return reference.ownerDocument.body;
        }

        if (typeof container !== "string") {
            return container;
        }

        const resolved = reference.ownerDocument.querySelector<HTMLElement>(container);

        if (!resolved) {
            throw new Error(`No element matches the tooltip container selector "${container}".`);
        }

        return resolved;
    }

    private static createElement(parent: HTMLElement): HTMLElement {
        const element = parent.ownerDocument.createElement("div");
        element.className = tooltipClass;

        if ("popover" in element) {
            // Manual, since the mouse handlers of the visualizations are the only thing that should open or close it.
            element.popover = "manual";
            Tooltip.installPopoverStyle(parent.ownerDocument);
        }

        // Inline styles outrank every rule an application can write, so only what the tooltip needs to work goes here:
        // where it is placed, and that it never takes the mouse events the visualization runs on. "inset: auto" undoes
        // the "inset: 0" a user agent gives a popover, which would otherwise centre it instead of leaving it at the
        // top and left it is moved to.
        element.style.cssText =
            "position: fixed; inset: auto; z-index: 10; pointer-events: none; visibility: hidden;";

        parent.appendChild(element);

        return element;
    }

    /**
     * Takes the border, padding and background a user agent gives a popover back off again, once per document.
     *
     * The appearance of the tooltip belongs to the application embedding this library, which styles it through the tip
     * class. The rule is therefore wrapped in :where(), which makes its specificity zero: any rule the application
     * writes wins over it, whatever the order the two stylesheets end up in.
     */
    private static installPopoverStyle(document: Document): void {
        if (document.querySelector(`style[${styleAttribute}]`)) {
            return;
        }

        const style = document.createElement("style");
        style.setAttribute(styleAttribute, "");
        style.appendChild(document.createTextNode(`
            :where(.${tooltipClass}[popover]) {
                margin: 0;
                border: 0;
                padding: 0;
                background: transparent;
                color: inherit;
                overflow: visible;
            }
        `));

        document.head.appendChild(style);
    }
}
