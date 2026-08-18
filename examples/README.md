# Examples

Each example is a standalone HTML page that imports the library from
`../dist/unipept-visualizations.js`. That file is a build artifact and is no
longer committed, so build it once before opening any of these pages:

```sh
npm install
npm run build
```

Then serve the repository root over HTTP — the pages use ES modules and
`d3.json()`, so opening them as `file://` URLs will not work:

```sh
npx vite
```

and open one of the pages below, for example
<http://localhost:5173/examples/treeview-taxonomy.html>. `npm run dev` starts
the same server.

| Example | Data |
| --- | --- |
| `treeview-taxonomy.html`, `treemap-taxonomy.html`, `sunburst-taxonomy.html` | A Unipept taxonomic tree |
| `treeview-flare.html`, `treemap-flare.html`, `sunburst-flare.html` | The D3 "flare" package hierarchy |
| `treeview-multi.html`, `treemap-multi.html`, `sunburst-multi.html` | Several visualizations on one page |
| `barplot-taxonomy.html` | A stacked barplot |
| `heatmap-random.html` | Randomly generated values |
| `heatmap-clusters.html` | A CSV of pre-clustered values |
