import { ImageResponse } from "next/og";

import { SITE } from "@/config/site";

type OgImageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export const ogImageSize = {
  width: SITE.og.width,
  height: SITE.og.height,
} as const;

export function createOgImage({
  eyebrow,
  title,
  description,
}: OgImageProps): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#050404",
        color: "#f2f4f3",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 28,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#d21c1c",
        }}
      >
        {eyebrow}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 30, color: "#c8c2c0", maxWidth: 920 }}>
          {description}
        </div>
      </div>
    </div>,
    { ...ogImageSize },
  );
}
