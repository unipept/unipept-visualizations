# Unipept visualizations
This repository contains stand-alone versions of the Unipept visualizations. At this time, a treeview, a treemap, a sunburst graph and a heatmap are available. The complete package has been written in TypeScript and uses D3 (v6) internally and is aimed at rendering vast amounts of data as fast as possible. Most visualizations are SVG-based, but an HTML Canvas has been used where necessary to make sure performance is as high as possible.

![treeview example](examples/treeview-taxonomy.png)

![treemap example](examples/treemap-taxonomy.png)

![sunburst example](examples/sunburst-taxonomy.png)

![heatmap example](examples/heatmap.png)

## Requirements
[D3.js](https://d3js.org/) (version 6.x should do) and is required to use these visualizations. The code is written using JavaScript ES2020 features, but a transpiled ES6-compatible version (`unipept-visualizations.js`) that should work in all modern browsers is available in the [`dist`](dist) directory.

## Installation and use
1. Download and include [`unipept-visualizations.min.js`](dist/unipept-visualizations.js) on your page
2. Include D3
3. Add a div with an id (for example `<div id="example"></div>`) to your page
4. Initialize the treeview by invoking `treeview()` or `treemap()` with the div-element. For example `const treeview = new UnipeptVisualizations.Treeview(document.getElementById("example"), data, options);`

## Documentation
Head over to our [GitHub Wiki](https://github.com/unipept/unipept-visualizations/wiki) for the full documentation of this package.
