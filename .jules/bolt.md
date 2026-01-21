## 2024-05-22 - [Optimizing D3 Tree Traversal]
**Learning:** D3's hierarchy nodes contain parent pointers that are often overlooked in favor of recursive descent algorithms. Switching from top-down recursion (O(subtree size)) to bottom-up traversal (O(depth)) for ancestry checks yielded significant complexity reduction (O(N^2) to O(N * Depth) for bulk filtering).
**Action:** When working with D3 hierarchies, always prefer traversing up using `parent` pointers for ancestry checks instead of recursing down.
