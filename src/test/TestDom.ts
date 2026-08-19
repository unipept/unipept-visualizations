import { JSDOM } from "jsdom";

/**
 * A JSDOM document with the SVG features the visualizations rely on.
 *
 * JSDOM implements the SVG DOM only as far as the element interfaces: it parses
 * the markup, but the geometry and the transform lists behind it are absent.
 * The visualizations reach for both, so each gap has to be filled in here or
 * the code under test throws inside an animation frame, where the failure
 * surfaces as an unhandled rejection rather than as a failing assertion.
 */
export function createTestDom(): JSDOM {
    installTransformSupport();

    return new JSDOM("<!DOCTYPE html><div id=\"visualization\"></div>", {
        beforeParse(window: any) {
            // Text measurement, used to decide how much room a label needs.
            window.Element.prototype.getComputedTextLength = function() {
                return 20;
            };
        }
    });
}

/**
 * Teaches SVG elements to report their transform as a matrix.
 *
 * d3-transition interpolates a `transform` attribute by setting it on a
 * detached <g> and reading `element.transform.baseVal.consolidate()` back.
 * JSDOM has no SVGTransformList, so that property is undefined and every
 * transform transition throws before it can start.
 *
 * This patches the *global* SVGElement, not the one belonging to the JSDOM
 * instance a test creates: d3 builds its scratch <g> from whatever `document`
 * is in scope where it runs, which is the environment vitest set up, so
 * patching the instance would never be consulted.
 */
function installTransformSupport(): void {
    const prototype = (globalThis as any).SVGElement?.prototype;

    if (!prototype || Object.getOwnPropertyDescriptor(prototype, "transform")) {
        return;
    }

    Object.defineProperty(prototype, "transform", {
        configurable: true,
        get(this: SVGElement) {
            const attribute = this.getAttribute("transform");
            return {
                baseVal: {
                    consolidate: () => {
                        const matrix = parseTransform(attribute);
                        return matrix ? { matrix } : null;
                    }
                }
            };
        }
    });
}

type Matrix = { a: number, b: number, c: number, d: number, e: number, f: number };

/**
 * The subset of the SVG transform syntax the visualizations actually emit,
 * composed into the single matrix `consolidate()` is expected to return.
 *
 * Returns null for an absent or empty transform, which is what the real
 * `consolidate()` does when there is nothing in the list, and what d3 treats
 * as the identity.
 */
function parseTransform(value: string | null): Matrix | null {
    if (!value) {
        return null;
    }

    let matrix: Matrix = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
    let seen = false;

    const pattern = /(translate|scale|rotate|matrix)\s*\(([^)]*)\)/g;
    for (const [, name, rawArgs] of value.matchAll(pattern)) {
        const args = rawArgs.split(/[\s,]+/).filter(arg => arg.length > 0).map(Number);
        if (args.some(Number.isNaN)) {
            continue;
        }

        seen = true;
        matrix = multiply(matrix, toMatrix(name, args));
    }

    return seen ? matrix : null;
}

function toMatrix(name: string, args: number[]): Matrix {
    switch (name) {
        case "translate":
            return { a: 1, b: 0, c: 0, d: 1, e: args[0] ?? 0, f: args[1] ?? 0 };
        case "scale": {
            const x = args[0] ?? 1;
            return { a: x, b: 0, c: 0, d: args[1] ?? x, e: 0, f: 0 };
        }
        case "rotate": {
            const radians = ((args[0] ?? 0) * Math.PI) / 180;
            const cos = Math.cos(radians);
            const sin = Math.sin(radians);
            return { a: cos, b: sin, c: -sin, d: cos, e: 0, f: 0 };
        }
        default:
            return {
                a: args[0] ?? 1, b: args[1] ?? 0, c: args[2] ?? 0,
                d: args[3] ?? 1, e: args[4] ?? 0, f: args[5] ?? 0
            };
    }
}

function multiply(left: Matrix, right: Matrix): Matrix {
    return {
        a: left.a * right.a + left.c * right.b,
        b: left.b * right.a + left.d * right.b,
        c: left.a * right.c + left.c * right.d,
        d: left.b * right.c + left.d * right.d,
        e: left.a * right.e + left.c * right.f + left.e,
        f: left.b * right.e + left.d * right.f + left.f
    };
}
