import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

/**
 * next/font loaders — CSS variables applied on <html>.
 * Fallbacks live in `src/config/fonts/stacks.css`.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVariables = [
  fontSans.variable,
  fontDisplay.variable,
  fontMono.variable,
].join(" ");
