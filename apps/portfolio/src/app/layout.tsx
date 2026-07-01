import "./globals.css";

import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { Footer, Navbar, ThemeProvider } from "@/components";
import CONFIG from "@/lib/config";
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
  title: {
    default: `${CONFIG.meta.author}${CONFIG.meta.suffix}`,
    template: `%s${CONFIG.meta.suffix}`,
  },
  description: CONFIG.meta.description,
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={CONFIG.meta.locale.split("-")[0]}
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
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
