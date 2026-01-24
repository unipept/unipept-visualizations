## 2024-05-23 - DOM Layout Thrashing in Sunburst
**Learning:** `getComputedTextLength` causes synchronous layout thrashing and is a major bottleneck when called in loops (e.g. `renderText`).
**Action:** Leverage the `DataNode.extra` property to memoize expensive calculations like text width. This avoids repeated layout thrashing on re-renders when data hasn't changed.
