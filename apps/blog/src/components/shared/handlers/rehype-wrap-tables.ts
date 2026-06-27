import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

export function rehypeWrapTables() {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "table" || !parent || index === undefined) return;

      const wrapper: Element = {
        type: "element",
        tagName: "div",
        properties: { className: ["prose-table-wrap"] },
        children: [node],
      };

      parent.children[index] = wrapper;
    });
  };
}
