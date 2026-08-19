import "@/styles/global.css";

import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { NotFoundView } from "@/components/composed/NotFoundView";
import shared from "@/i18n/contents/pt-BR/shared.json";
import { cn } from "@/lib/utils";
import { SITE } from "@/meta";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const fontVariables = [
  fontSans.variable,
  fontDisplay.variable,
  fontMono.variable,
].join(" ");

const copy = shared.notFound;

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html
      lang={SITE.locale}
      className={cn("dark h-full antialiased", fontVariables, "font-sans")}
      data-scroll-behavior="smooth"
    >
      <body className="text-foreground flex min-h-full flex-col">
        <main className="relative z-[1] mx-auto flex w-full max-w-2xl flex-1 flex-col px-6">
          <NotFoundView
            code={copy.code}
            title={copy.title}
            description={copy.description}
            backHome={copy.backHome}
            homeHref="/"
            illustrationAlt={copy.illustrationAlt}
          />
        </main>
      </body>
    </html>
  );
}
