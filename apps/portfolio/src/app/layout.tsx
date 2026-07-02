import "./globals.css";

import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { Footer, Navbar, ThemeProvider } from "@/components";
import CONFIG from "@/lib/config";
import { defaultOgImage } from "@/lib/metadata";
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
  ...defaultOgImage("portfolio"),
};

const themeInitScript = `(function(){try{var e=localStorage.getItem("theme");var t=window.matchMedia("(prefers-color-scheme: dark)").matches;var d=e==="dark"||(e!=="light"&&t);var r=document.documentElement;r.classList.toggle("dark",d);r.dataset.theme=d?"dark":"light"}catch(e){}})();`;

const themeIconCriticalCss = `[data-theme-icon="sun"]{display:none!important}[data-theme-icon="moon"]{display:inline-flex!important}html[data-theme="dark"] [data-theme-icon="sun"]{display:inline-flex!important}html[data-theme="dark"] [data-theme-icon="moon"]{display:none!important}[data-theme-icon]{transition:none!important}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={CONFIG.meta.locale.split("-")[0]}
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
      </head>
      <body className="flex min-h-full flex-col text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange
        >
          <Navbar />
          <main className="relative z-1 flex-1 pt-16 md:pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
