# Unipept heatmap
This repository contains a standalone version of the Unipept heatmap. The heatmap is part of the
Unipept visualizations project and will be merged with that repository in the future.

*Heatmap example image*

A live example of this heatmap can be found on [ObservableHQ](https://observablehq.com/@pverscha/unipept-heatmap-live-example).

## Requirements
This package uses D3v5 to render an SVG image, containing the heatmap. All necessary dependences
(including D3) are automatically installed, when adding this package through npm.

## Installation
The Unipept heatmap can simply be installed by executing `npm install unipept-heatmap`. This package
comes with type-information and is suitable for TypeScript environments.

## Quickstart
Setting up the Unipept heatmap is very simple. 

1. Install the package through npm (see installation
instructions).
2. Add a `div`-element to the page in which your visualization should be displayed.
3. Invoke the Heatmap constructor with a reference to the `div`-element, and pass the data that
should be visualized. 
4. Call the `cluster()`-method on the newly created Heatmap-object to start clustering the heatmap.
This method performs the UPGMA clustering technique and a heuristic to reorder the found clusters
for a more comprehensive result.

## Heatmap
#### Constructor
The constructor of the `Heatmap` class automatically starts rendering the heatmap upon invokation and has following
signature:

* `elementIdentifier`: The `HTMLElement` in which the heatmap should be rendered.
* `data`: An object with 3 properties: `rows`, `columns` and `values`. Each of these proeprties needs a special type of
object:
     * `rows`: A `HeatmapElement`-array, see below for full description.
     * `columns`: A `HeatmapElement`-array, see below for full description.
     * `values`: A two-dimensional `HeatmapValue`-array. See below for full description.
* `options` (*optional*): Can be used to configure the Heatmap before rendering. This parameter should receive a
`HeatmapSettings`-object. See below for full description.

#### Cluster
By calling `cluster()` upon a previously constructed heatmap object, the rows and columns of the heatmap are clustered
using the UPGMA-algorithm, and reordered using the MOLO-heuristic. The rows are clustered first. Columns are clustered
last.

#### Reset
The complete visualization can be rerendered, by calling `reset()`.

### The HeatmapElement object
A HeatmapElement represents one item that can be clustered. The rows and columns of the heatmap are typically 
`HeatmapElement`'s. This object consists of 3 properties:

* `name`: The name of the element. Will be used as a label for the respective row / column of the heatmap.
* `id`: (*optional*): An ID that will be used internally by the heatmap to refer to this element. Defaults to the index
of this element in the `rows` or `columns` array.
* `extras` (*optional*): Any extra value that can be associated to this element. This value can be referenced from any
of the overridden options-functions.

### The HeatmapValue object
All values that should be rendered by the heatmap are given as a two dimensional grid. Every value is an object that
should contain the following properties:

* `value`: The value of this cell. This should be a float in the [0, 1] interval.

### The HeatmapSettings object
A `HeatmapSettings` object can be used to fully configure the heatmap and contains the following properties:

* `width` (*optional*, default = 800): Maximum width of the visualization in pixels.
* `height` (*optional*, default = 800): Maximum height of the visualization in pixels.
* `textWidth` (*optional*, default = 100): Maximum amount of pixels that can be used for the row labels.
* `textHeight` (*optional*, default = 100): Maximum amount of pixels that can be used for the column labels.
* `enableTooltips` (*optional*, default = true): Are tooltips shown when hovering over an element in the heatmap? 
* `className` (*optional*, default = "heatmap"): An optional class that's appended to the `HTMLElement` wherein the 
heatmap is rendered.
* `maximumSquareWidth` (*optional*, default = 50): Absolute maximum size of an individual square in pixels. This value
is used as an upper range, and the actual square width can be smaller, depending on the number of items in the heatmap.
* `squarePadding` (*optional*, default = 2): Amount of pixels between successive squares in the heatmap.
* `visualizationTextPadding` (*optional*, default = 5): Padding in pixels between the heatmap grid and the labels.
* `fontSize` (*optional*, default = 12): Size of the text in the labels of the heatmap.
* `animationSpeed` (*optional*, default = 2000): How long should reordering the animations take? This value is given in
milliseconds.
* `getTooltip` (*optional*, default = generic tooltip function): The function that's called whenever the user hovers 
over a cell in the heatmap. This function needs to return a string representing HTML-code that will be executed and 
receives 3 parameters:
    * `HeatmapValue`: which represents the current cell over which the user is hovering.
    * `HeatmapElement`: an element that represents the current row over which the user is hovering.
    * `HeatmapElement`: an element that represents the current column over which the user is hovering.
**NOTE: Be very cautious in passing user input directly as a result of this function. Please always sanitize the user's
input before returning it, as this might lead to reflected XSS-attacks.**
* `getTooltipTitle` (*optional*, default = column + row name=): This function is used to fill in a 
tooltip's title. This function needs to return a string representing HTML-code that will be executed and 
receives 3 parameters:
     * `HeatmapValue`: which represents the current cell over which the user is hovering.
     * `HeatmapElement`: an element that represents the current row over which the user is hovering.
     * `HeatmapElement`: an element that represents the current column over which the user is hovering.
**NOTE: Be very cautious in passing user input directly as a result of this function. Please always sanitize the user's
input before returning it, as this might lead to reflected XSS-attacks.**
* `getTooltipText` (*optional*, default = cell value): This function is used to fill in a 
tooltip's body text. This function needs to return a string representing HTML-code that will be executed and 
receives 3 parameters:
     * `HeatmapValue`: which represents the current cell over which the user is hovering.
     * `HeatmapElement`: an element that represents the current row over which the user is hovering.
     * `HeatmapElement`: an element that represents the current column over which the user is hovering.
**NOTE: Be very cautious in passing user input directly as a result of this function. Please always sanitize the user's
input before returning it, as this might lead to reflected XSS-attacks.**

