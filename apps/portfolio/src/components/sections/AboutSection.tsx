import { useRef } from "react";
import { stats } from "@lib";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section className="section-panel" ref={sectionRef}>
      <div className="section-inner container py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-16 lg:items-center">
          {/* Left: bio */}
          <div className="flex flex-col gap-6">
            <h2 className="section-title">Sobre mim</h2>
            <div
              className="flex flex-col gap-4 text-base leading-[1.8]"
              style={{ color: "var(--color-muted)" }}
            >
              <p>
                Comecei minha trajetória em tecnologia ainda na graduação em
                Psicologia — e desde então combino análise comportamental com
                engenharia de software. Acredito que o melhor produto nasce da
                interseção entre código robusto e design centrado em pessoas.
              </p>
              <p>
                Trabalho de forma autônoma desde 2020, desenvolvendo sistemas
                web, automações e produtos digitais para PMEs e projetos
                próprios. Em 2024, integrei a equipe da IBM onde redesenhei o
                ciclo de onboarding e reduzi o tempo de integração em 57%,
                antes de retomar minha trajetória independente.
              </p>
              <p>
                Escrevo, desenho e documento o que construo — cobrindo um
                projeto inteiro da arquitetura à comunicação final.
              </p>
            </div>
            <a
              href="/sobre"
              className="btn btn-ghost self-start"
              style={{ paddingLeft: 0 }}
            >
              Conheça minha trajetória →
            </a>
          </div>

          {/* Right: stats */}
          <ul role="list" className="flex flex-col gap-3 min-w-0 lg:min-w-64">
            {stats.heroStats.map((stat, i) => (
              <li key={i} className="stat-item">
                {stat.value ? (
                  <span className="value">{stat.value}</span>
                ) : (
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full shrink-0"
                    style={{ background: "var(--color-surface-strong)" }}
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ color: "var(--color-primary-400)" }}
                    >
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </span>
                )}
                <span className="label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
