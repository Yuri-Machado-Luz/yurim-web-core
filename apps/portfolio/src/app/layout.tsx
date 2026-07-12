import "./globals.css";

import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { Footer, Navbar, ThemeProvider } from "@/components";
import { CopyProtection } from "@/components/copy-protection";
import { LocaleProvider } from "@/components/locale-provider";
import { SiteContextMenu } from "@/components/site-context-menu";
import { CustomCursor } from "@/components/ui/custom-cursor";
import CONFIG from "@/lib/config";
import { defaultOgImage, languageAlternates, personJsonLd } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.meta.siteUrl),
  title: {
    default: `Portfólio ${CONFIG.meta.suffix}`,
    template: `%s${CONFIG.meta.suffix}`,
  },
  description: CONFIG.meta.description,
  icons: {
    icon: "/favicon.svg",
  },
  alternates: languageAlternates("/"),
  ...defaultOgImage("portfolio"),
};

const themeInitScript = `(function(){try{var c=document.cookie.match(/(?:^|;\\s*)theme=(light|dark|system)(?:;|$)/);var e=c?c[1]:null;try{if(!e)e=localStorage.getItem("theme");else localStorage.setItem("theme",e)}catch(x){}var t=window.matchMedia("(prefers-color-scheme: dark)").matches;var d=e==="dark"||(e!=="light"&&t);var r=document.documentElement;r.classList.toggle("dark",d);r.dataset.theme=d?"dark":"light"}catch(e){}})();`;

const themeIconCriticalCss = `[data-theme-icon="sun"]{display:none!important}[data-theme-icon="moon"]{display:inline-flex!important}html[data-theme="dark"] [data-theme-icon="sun"]{display:inline-flex!important}html[data-theme="dark"] [data-theme-icon="moon"]{display:none!important}[data-theme-icon]{transition:none!important}`;

const jsonLd = personJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        fraunces.variable,
        jetbrainsMono.variable,
        "font-sans",
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <style dangerouslySetInnerHTML={{ __html: themeIconCriticalCss }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange
        >
          <LocaleProvider>
            <CustomCursor />
            <CopyProtection />
            <SiteContextMenu>
              <Navbar />
              <main className="relative z-1 flex-1 pt-16 md:pt-20">
                {children}
              </main>
              <Footer />
            </SiteContextMenu>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
