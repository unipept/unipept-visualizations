export default class StyleUtilities {
    /**
     * Marks an element as the host of a visualization and installs the stylesheet that belongs to it.
     *
     * Both steps have to survive a visualization being constructed more than once on the same element: repeating them
     * blindly would grow the element's class attribute and leave a stale stylesheet in the document head on every
     * construction. The stylesheet is looked up by class name and rewritten in place, so settings that end up in the
     * CSS still take effect when a visualization is rebuilt.
     *
     * @param element The element the visualization is rendered in.
     * @param className The class name the stylesheet's rules are scoped to.
     * @param css The stylesheet's contents.
     */
    public static applyStyle(element: HTMLElement, className: string, css: string): void {
        element.classList.add(className);

        const document = element.ownerDocument;
        const selector = `style[data-unipept-style="${className}"]`;

        let styleElement = document.head.querySelector(selector);

        if (!styleElement) {
            styleElement = document.createElement("style");
            styleElement.setAttribute("data-unipept-style", className);
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = css;
    }
}
