declare module "*.md" {
  import type { MDXProps } from "mdx/types";

  export default function MDXContent(props: MDXProps): React.ReactNode;
  export const frontmatter: Record<string, unknown>;
}

declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";

  export default function MDXContent(props: MDXProps): React.ReactNode;
  export const frontmatter: Record<string, unknown>;
}
