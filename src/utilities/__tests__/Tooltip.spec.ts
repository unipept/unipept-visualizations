import Tooltip from "./../Tooltip";
import { createTestDom } from "./../../test/TestDom";
import { JSDOM } from "jsdom";
import { describe, it, expect } from "vitest";

describe("Tooltip", () => {
    function reference(dom: JSDOM): HTMLElement {
        return dom.window.document.getElementById("visualization")!;
    }

    function tooltipElements(dom: JSDOM): Element[] {
        return Array.from(dom.window.document.querySelectorAll(".tip"));
    }

    function mouseEvent(x: number, y: number): MouseEvent {
        return new MouseEvent("mousemove", { clientX: x, clientY: y });
    }

    it("should add a tooltip element to the body by default", () => {
        const dom = createTestDom();

        Tooltip.create(reference(dom)).show(mouseEvent(100, 50), "<div>Bacteria</div>");

        const elements = tooltipElements(dom);
        expect(elements).toHaveLength(1);
        expect(elements[0].parentElement).toEqual(dom.window.document.body);
    });

    it("should wait for a first tooltip before it touches the document", () => {
        const dom = createTestDom();

        Tooltip.create(reference(dom));

        expect(tooltipElements(dom)).toHaveLength(0);
    });

    it("should reuse the tooltip element of a container instead of adding a second one", () => {
        const dom = createTestDom();

        const first = Tooltip.create(reference(dom));
        const second = Tooltip.create(reference(dom));

        first.show(mouseEvent(100, 50), "<div>Bacteria</div>");
        second.show(mouseEvent(100, 50), "<div>Archaea</div>");

        expect(tooltipElements(dom)).toHaveLength(1);
        expect(second).toBe(first);
    });

    it("should create the tooltip in the container it is given", () => {
        const dom = createTestDom();
        const container = dom.window.document.createElement("div");
        dom.window.document.body.appendChild(container);

        Tooltip.create(reference(dom), container).show(mouseEvent(100, 50), "<div>Bacteria</div>");

        const elements = tooltipElements(dom);
        expect(elements).toHaveLength(1);
        expect(elements[0].parentElement).toEqual(container);
    });

    it("should create the tooltip in the container matching a selector", () => {
        const dom = createTestDom();
        const container = dom.window.document.createElement("div");
        container.id = "fullscreen";
        dom.window.document.body.appendChild(container);

        Tooltip.create(reference(dom), "#fullscreen").show(mouseEvent(100, 50), "<div>Bacteria</div>");

        expect(tooltipElements(dom)[0].parentElement).toEqual(container);
    });

    it("should throw when no element matches the container selector", () => {
        const dom = createTestDom();

        expect(() => Tooltip.create(reference(dom), "#nothing")).toThrowError(/#nothing/);
    });

    it("should create its element again after the container has been emptied", () => {
        const dom = createTestDom();
        const container = reference(dom);
        const tooltip = Tooltip.create(container, container);

        tooltip.show(mouseEvent(100, 50), "<div>Bacteria</div>");
        expect(container.querySelectorAll(".tip")).toHaveLength(1);

        // Which is what every visualization does to the element it renders in.
        container.innerHTML = "";

        tooltip.show(mouseEvent(100, 50), "<div>Bacteria</div>");

        const elements = container.querySelectorAll(".tip");
        expect(elements).toHaveLength(1);
        expect((elements[0] as HTMLElement).style.visibility).toEqual("visible");
    });

    it("should leave a tooltip element it did not create alone", () => {
        const dom = createTestDom();
        const container = reference(dom);

        const foreign = dom.window.document.createElement("div");
        foreign.className = "tip";
        foreign.innerHTML = "<div>a tooltip of the application itself</div>";
        container.appendChild(foreign);

        Tooltip.create(container, container).show(mouseEvent(100, 50), "<div>Bacteria</div>");

        expect(foreign.innerHTML).toEqual("<div>a tooltip of the application itself</div>");
        expect(foreign.getAttribute("style")).toBeNull();
        expect(container.querySelectorAll(".tip")).toHaveLength(2);
        expect(container.querySelectorAll("[data-unipept-tooltip]")).toHaveLength(1);
    });

    it("should show the content next to the cursor", () => {
        const dom = createTestDom();
        const tooltip = Tooltip.create(reference(dom));

        tooltip.show(mouseEvent(100, 50), "<div>Bacteria</div>");

        const element = tooltipElements(dom)[0] as HTMLElement;
        expect(element.innerHTML).toEqual("<div>Bacteria</div>");
        expect(element.style.visibility).toEqual("visible");
        expect(element.style.left).toEqual("110px");
        expect(element.style.top).toEqual("60px");
    });

    it("should follow the cursor while it moves", () => {
        const dom = createTestDom();
        const tooltip = Tooltip.create(reference(dom));

        tooltip.show(mouseEvent(100, 50), "<div>Bacteria</div>");
        tooltip.move(mouseEvent(200, 150));

        const element = tooltipElements(dom)[0] as HTMLElement;
        expect(element.style.left).toEqual("210px");
        expect(element.style.top).toEqual("160px");
    });

    it("should hide the tooltip again", () => {
        const dom = createTestDom();
        const tooltip = Tooltip.create(reference(dom));

        tooltip.show(mouseEvent(100, 50), "<div>Bacteria</div>");
        tooltip.hide();

        expect((tooltipElements(dom)[0] as HTMLElement).style.visibility).toEqual("hidden");
    });

    it("should hide the tooltip of a container without being handed its instance", () => {
        const dom = createTestDom();

        Tooltip.create(reference(dom)).show(mouseEvent(100, 50), "<div>Bacteria</div>");
        Tooltip.hideFor(reference(dom));

        expect((tooltipElements(dom)[0] as HTMLElement).style.visibility).toEqual("hidden");
    });

    it("should not create a tooltip for a container that never showed one", () => {
        const dom = createTestDom();

        Tooltip.hideFor(reference(dom));
        Tooltip.hideFor(reference(dom), "#nothing");

        expect(tooltipElements(dom)).toHaveLength(0);
    });

    it("should leave the styling of the tooltip to the application", () => {
        const dom = createTestDom();
        const style = dom.window.document.createElement("style");
        style.textContent = ".tip { background: rgb(1, 2, 3); padding: 7px; border: 2px solid red; color: rgb(9, 9, 9); }";
        dom.window.document.head.appendChild(style);

        Tooltip.create(reference(dom)).show(mouseEvent(100, 50), "<div>Bacteria</div>");

        // The library only places the tooltip, so nothing it sets may outrank the rules of the application.
        const element = tooltipElements(dom)[0] as HTMLElement;
        const computed = dom.window.getComputedStyle(element);
        expect(computed.padding).toEqual("7px");
        expect(computed.color).toEqual("rgb(9, 9, 9)");

        const inline = element.getAttribute("style") ?? "";
        for (const property of ["background", "border", "padding", "color", "margin", "overflow"]) {
            expect(inline).not.toContain(property);
        }
    });

    it("should neutralize the popover styling of the user agent with a rule of the lowest possible specificity", () => {
        const dom = createTestDom();
        // JSDOM has no popover support, so it has to be faked to reach the branch that needs the stylesheet.
        Object.defineProperty(dom.window.HTMLElement.prototype, "popover", {
            configurable: true,
            writable: true,
            value: null
        });
        for (const method of ["showPopover", "hidePopover"]) {
            Object.defineProperty(dom.window.HTMLElement.prototype, method, {
                configurable: true,
                value: () => undefined
            });
        }

        const container = dom.window.document.createElement("div");
        dom.window.document.body.appendChild(container);

        Tooltip.create(reference(dom)).show(mouseEvent(100, 50), "<div>Bacteria</div>");
        Tooltip.create(reference(dom), container).show(mouseEvent(100, 50), "<div>Bacteria</div>");

        const styles = dom.window.document.querySelectorAll("style[data-unipept-tooltip-style]");
        expect(styles).toHaveLength(1);
        expect(styles[0].textContent).toContain(":where(.tip[popover])");
    });
});
