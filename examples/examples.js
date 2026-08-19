/*
 * Shows each example page its own source.
 *
 * The page's module script is the single copy of the code: this reads that
 * script back and prints it into the "Source" block, so what a reader sees is
 * by construction the code that just ran.
 */

// On a static server the example's script is the inline one carrying
// `data-source`. Vite's dev server rewrites inline module scripts into a
// `src` pointing at its own copy, which drops the attribute along with the
// element's text, so match that proxy too.
const script = document.querySelector("script[data-source], script[src*=html-proxy]");
const target = document.querySelector("[data-source-target]");

if (script && target) {
    let code = script.textContent;

    if (!code.trim() && script.src) {
        // The proxy hands back the same code with the import specifier
        // resolved and a sourcemap comment appended.
        const response = await fetch(script.src);
        code = (await response.text()).replace(/\n*\/\/# sourceMappingURL=.*$/s, "");
    }

    const lines = code.replace(/^\s*\n/, "").trimEnd().split("\n");

    // The script sits several levels deep in the markup, so every line carries
    // that indentation. Strip the smallest amount any line has, which leaves
    // the relative indentation of the code intact.
    const indents = lines.filter(line => line.trim()).map(line => line.match(/^ */)[0].length);
    const shared = Math.min(...indents);

    target.textContent = lines.map(line => line.slice(shared)).join("\n");
}
