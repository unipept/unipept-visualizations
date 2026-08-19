/**
 * Class name of the tooltip element, which applications embedding this library can hook their own styling onto.
 */
const tooltipClass = "tip";

/**
 * Marks the tooltip elements this class made, so that it never takes over one belonging to something else.
 */
const ownedAttribute = "data-unipept-tooltip";

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
     * The tooltip that belongs to a given container, so that visualizations sharing a container also share the state
     * of the tooltip rather than each tracking their own idea of whether it is currently shown.
     */
    private static readonly instances: WeakMap<HTMLElement, Tooltip> = new WeakMap();

    private element: HTMLElement | null = null;
    private visible: boolean = false;

    private constructor(private readonly container: HTMLElement) {}

    /**
     * Returns the tooltip that belongs to the given container. Its element follows when the tooltip is first shown.
     *
     * @param reference An element of the visualization the tooltip belongs to. Its document is the one the tooltip is
     *                  created in and the one a container selector is resolved against.
     * @param container The element the tooltip should be appended to, or a selector for it. Defaults to the body of
     *                  the document that holds the visualization.
     * @throws When a container selector matches no element.
     */
    public static create(reference: HTMLElement, container: HTMLElement | string | null = null): Tooltip {
        const parent = Tooltip.resolveContainer(reference, container);

        let tooltip = Tooltip.instances.get(parent);

        if (!tooltip) {
            tooltip = new Tooltip(parent);
            Tooltip.instances.set(parent, tooltip);
        }

        return tooltip;
    }

    /**
     * Hides the tooltip that belongs to the given container, if one was ever made for it.
     *
     * Static because the visualization that has to take a tooltip down is not necessarily the one that put it up: the
     * tooltip is shared per container, and a visualization that runs with tooltips disabled holds no instance at all
     * while a tooltip of a sibling may well be on screen. Hiding whatever the container has costs that sibling
     * nothing more than a tooltip that returns on the next mouse move.
     *
     * Nothing is created here. A container that never showed a tooltip has none to hide, and an unresolvable
     * container selector is left to whoever asks for a tooltip to actually show.
     *
     * @param reference An element of the visualization the tooltip belongs to, as in {@link create}.
     * @param container The container the tooltip was created in, or a selector for it.
     */
    public static hideFor(reference: HTMLElement, container: HTMLElement | string | null = null): void {
        const parent = Tooltip.findContainer(reference, container);

        if (parent) {
            Tooltip.instances.get(parent)?.hide();
        }
    }

    /**
     * Fills the tooltip with the given content, moves it to the mouse cursor and shows it.
     */
    public show(event: MouseEvent, content: string): void {
        const element = this.ensureElement();

        element.innerHTML = content;
        this.moveTo(element, event);

        if (!this.visible) {
            this.visible = true;
            this.setVisibility(element, true);
        }
    }

    /**
     * Moves the tooltip to the mouse cursor.
     */
    public move(event: MouseEvent): void {
        this.moveTo(this.ensureElement(), event);
    }

    /**
     * Hides the tooltip.
     */
    public hide(): void {
        if (this.visible && this.element) {
            this.visible = false;
            this.setVisibility(this.element, false);
        }
    }

    /**
     * Returns the element of this tooltip, making one when there is none to be had.
     *
     * Every visualization empties the element it renders in, and a container that is meant to go fullscreen is often
     * that same element. Creating the tooltip while a visualization is being built would therefore hand it an element
     * that is about to be thrown away, so it is made on first use instead, and checked to still be in its container
     * every time after that.
     */
    private ensureElement(): HTMLElement {
        if (this.element && this.element.parentElement === this.container) {
            return this.element;
        }

        // Only elements this class made are picked up again: "tip" is a class name an application may well use for a
        // tooltip of its own, and adopting one of those would mean showing an element that was never set up to be a
        // popover, and taking over a node the application maintains for its own purposes.
        this.element = this.container.querySelector<HTMLElement>(`:scope > .${tooltipClass}[${ownedAttribute}]`)
            ?? this.createElement();

        // Whatever the element that came before was doing, this one starts out hidden.
        this.visible = false;

        return this.element;
    }

    private moveTo(element: HTMLElement, event: MouseEvent): void {
        // Viewport coordinates rather than page coordinates: a fullscreen element is laid out against the viewport,
        // while the document behind it keeps the scroll offset that page coordinates are expressed in.
        element.style.top = `${event.clientY + 10}px`;
        element.style.left = `${event.clientX + 10}px`;
    }

    private setVisibility(element: HTMLElement, visible: boolean): void {
        element.style.visibility = visible ? "visible" : "hidden";

        // Only an element that was actually turned into a popover can be shown as one, and both popover methods throw
        // when the element is not part of a document.
        if (element.popover !== "manual" || !element.isConnected) {
            return;
        }

        if (visible) {
            element.showPopover();
        } else {
            element.hidePopover();
        }
    }

    private createElement(): HTMLElement {
        const element = this.container.ownerDocument.createElement("div");
        element.className = tooltipClass;
        element.setAttribute(ownedAttribute, "");

        if ("popover" in element) {
            // Manual, since the mouse handlers of the visualizations are the only thing that should open or close it.
            element.popover = "manual";
            Tooltip.installPopoverStyle(this.container.ownerDocument);
        }

        // Inline styles outrank every rule an application can write, so only what the tooltip needs to work goes here:
        // where it is placed, and that it never takes the mouse events the visualization runs on. "inset: auto" undoes
        // the "inset: 0" a user agent gives a popover, which would otherwise centre it instead of leaving it at the
        // top and left it is moved to.
        element.style.cssText =
            "position: fixed; inset: auto; z-index: 10; pointer-events: none; visibility: hidden;";

        this.container.appendChild(element);

        return element;
    }

    private static resolveContainer(reference: HTMLElement, container: HTMLElement | string | null): HTMLElement {
        const resolved = Tooltip.findContainer(reference, container);

        if (!resolved) {
            throw new Error(`No element matches the tooltip container selector "${container}".`);
        }

        return resolved;
    }

    private static findContainer(reference: HTMLElement, container: HTMLElement | string | null): HTMLElement | null {
        if (!container) {
            return reference.ownerDocument.body;
        }

        if (typeof container !== "string") {
            return container;
        }

        return reference.ownerDocument.querySelector<HTMLElement>(container);
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
