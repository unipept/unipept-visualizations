## 2024-05-24 - Treeview Layout Performance
**Learning:** D3 layouts (like `d3.tree`) traverse the entire hierarchy passed to them. If you have a large dataset where most nodes are hidden (collapsed), passing the full hierarchy and then filtering the results is inefficient (O(N_total)).
**Action:** Construct a partial `d3.hierarchy` containing only visible nodes before passing it to the layout engine. This reduces complexity to O(N_visible).
