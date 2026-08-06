import type { MDXComponents } from "mdx/types";

export { proseClassName } from "@/lib/prose";

export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    ...components,
  };
}
