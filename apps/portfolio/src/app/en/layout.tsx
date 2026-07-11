import type { ReactNode } from "react";

/**
 * English segment layout. Locale is resolved from the `/en` path in
 * LocaleProvider (root) so Navbar/Footer stay in sync.
 */
export default function EnLayout({ children }: { children: ReactNode }) {
  return children;
}
