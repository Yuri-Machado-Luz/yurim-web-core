import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

export const proseClassName = cn(
  // #region Configuração base do Tailwind Typography
  "prose prose-invert max-w-7xl",
  // #endregion

  // #region Cabeçalhos (h1, h2, h3, h4)
  "prose-headings:font-heading",
  "[&>h2]:mt-6 [&>h2]:scroll-mt-16",
  "[&>h3]:mt-4 [&>h3]:scroll-mt-16",
  "[&>h4]:mt-4 [&>h4]:scroll-mt-16",
  // #endregion

  // #region Links
  "prose-a:text-primary prose-a:underline-offset-4 prose-a:hover:underline",
  // #endregion

  // #region Imagens
  "prose-img:rounded-md prose-img:shadow-sm",
  "prose-img:shadow-black/5 dark:prose-img:shadow-black/20",
  // #endregion

  // #region Listas (ul, ol)
  "[&>ul]:list-disc [&>ul]:pl-6",
  "[&>ol]:list-decimal [&>ol]:pl-6",
  // #endregion

  // #region Código inline
  "prose-code:rounded-md prose-code:bg-muted",
  "prose-code:px-1 prose-code:py-0.5",
  "prose-code:text-sm prose-code:font-mono prose-code:font-semibold",
  "prose-code:text-foreground/80 dark:prose-code:text-foreground/90",
  // #endregion

  // #region Blocos de código (pre)
  "[&>pre]:rounded-md [&>pre]:bg-muted",
  "[&>pre]:px-4 [&>pre]:py-3",
  "[&>pre]:text-sm [&>pre]:font-mono [&>pre]:font-semibold",
  "[&>pre]:text-foreground/80 dark:[&>pre]:text-foreground/90",
  // #endregion

  // #region Espaçamento geral (ampliação)
  "prose-p:my-2",
  "prose-blockquote:border-l-4 prose-blockquote:border-primary/30",
  "prose-blockquote:pl-4 prose-blockquote:italic",
  "prose-hr:border-muted",
  // #endregion

  // #region Alinhamento e gaps (mantido do original)
  "text-justify gap-2",
  // #endregion
);

export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    ...components,
  };
}
