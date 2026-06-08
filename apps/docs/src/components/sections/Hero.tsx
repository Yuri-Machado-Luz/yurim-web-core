import { ProfilePicture } from "@assets";
import { ButtonReact } from "@components/ui/Button";
import { CONFIG } from "@config";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-hero-badge]", { autoAlpha: 0, y: 16 });
        gsap.set("[data-hero-reveal]", { autoAlpha: 0, y: 16 });
        gsap.set("[data-hero-picture]", { autoAlpha: 0, scale: 0.95 });

        SplitText.create("[data-hero-text-reveal]", {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap
              .timeline({ delay: 0.6 })
              .set("[data-hero-text-reveal]", { autoAlpha: 1 })
              .to("[data-hero-badge]", {
                autoAlpha: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
              })
              .from(
                self.lines,
                {
                  yPercent: 110,
                  duration: 0.7,
                  stagger: 0.12,
                  ease: "power3.out",
                },
                "<0.1",
              )
              .to(
                "[data-hero-picture]",
                { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power2.out" },
                "<",
              )
              .to(
                "[data-hero-reveal]",
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.09,
                  ease: "power2.out",
                },
                "<0.35",
              );
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          "[data-hero-text-reveal], [data-hero-badge], [data-hero-reveal], [data-hero-picture]",
          { autoAlpha: 1, y: 0, scale: 1 },
        );
      });
    },
    { scope: heroRef },
  );

  return (
    <header
      ref={heroRef}
      id="hero"
      className="container flex min-h-svh items-center py-32"
    >
      <div className="grid w-full items-center gap-8 md:grid-cols-[2fr_1fr] md:gap-12">
        {/* Left: text block */}
        <div className="order-2 flex flex-col gap-6 md:order-1">
          {/* Badge */}
          <div data-hero-badge>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
              style={{
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
                color: "var(--color-muted)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-primary-400"
                aria-hidden="true"
              />
              Full-Stack Developer
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-display text-5xl font-bold leading-tight whitespace-nowrap md:text-7xl"
            data-hero-text-reveal
            style={{ opacity: 0 }}
          >
            {CONFIG.meta.author}
          </h1>

          {/* Eyecatch */}
          <p
            className="text-lg font-medium"
            style={{ color: "var(--color-muted)" }}
            data-hero-reveal
          >
            {CONFIG.meta.description}
          </p>

          {/* Description */}
          <p
            className="max-w-md text-sm leading-relaxed"
            style={{ color: "var(--color-muted)" }}
            data-hero-reveal
          >
            Construo sistemas web, APIs e automações — do back-end à interface.
            Trabalho autônomo desde 2020 com foco em arquitetura documentada e
            entrega que funciona.
          </p>

          {/* CTAs */}
          <nav className="flex flex-wrap gap-3" data-hero-reveal>
            <ButtonReact
              href="/sobre"
              style={{ variant: "primary", size: "md" }}
            >
              Saiba Mais
            </ButtonReact>
            <ButtonReact href="/docs" style={{ variant: "muted", size: "md" }}>
              Publicações
            </ButtonReact>
          </nav>
        </div>

        {/* Right: profile picture */}
        <div className="order-1 flex justify-center md:order-2 md:justify-end md:items-center">
          <div className="hero-picture-wrap" data-hero-picture>
            <img
              src={ProfilePicture.src}
              alt={`Foto de ${CONFIG.meta.author}`}
              width={ProfilePicture.width}
              height={ProfilePicture.height}
              className="relative z-10 h-64 w-64 rounded-full object-cover md:h-80 md:w-80"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
