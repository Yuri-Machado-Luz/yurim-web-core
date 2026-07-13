import "@/config/global.css";

import type { Metadata, Viewport } from "next";

import { fontVariables } from "@/config/fonts";
import { SITE } from "@/config/site";
import { personJsonLd, rootMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = rootMetadata();

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = personJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SITE.locale}
      className={cn("dark h-full antialiased", fontVariables, "font-sans")}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="text-foreground flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
