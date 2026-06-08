import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { CONFIG } from "@config";
import { education, experience, languages, stats } from "@lib";
import { Contact } from "@sections/Contact";
import { Skills } from "@sections/Skills";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SobrePage() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.addEventListener("astro:page-load", refresh);
    return () => document.removeEventListener("astro:page-load", refresh);
  }, []);

  useEffect(() => {
    const ids = ["bio", "habilidades", "experiencia", "formacao", "idiomas", "contato"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            history.replaceState(null, "", `#${entry.target.id}`);
            break;
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      gsap.set(".sobre-header", { autoAlpha: 0, y: 24 });
      gsap.to(".sobre-header", {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.set(".bio-paragraph", { autoAlpha: 0, y: 16 });
      ScrollTrigger.batch(".bio-paragraph", {
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
          }),
        once: true,
        start: "top 90%",
      });

      gsap.set(".experience-item", { autoAlpha: 0, x: -20 });
      ScrollTrigger.batch(".experience-item", {
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            x: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power3.out",
          }),
        once: true,
        start: "top 88%",
      });

      gsap.set(".education-item, .language-card", { autoAlpha: 0, y: 20 });
      ScrollTrigger.batch(".education-item, .language-card", {
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.07,
            ease: "power2.out",
          }),
        once: true,
        start: "top 90%",
      });
    },
    { scope: containerRef },
  );

  return (
    <main ref={containerRef}>
      {/* Header */}
      <header className="container pt-32 pb-16 sobre-header">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
          {/* Left: title + lead + social */}
          <div className="flex flex-col gap-4">
            <p className="eyebrow">Sobre</p>
            <h1 className="page-title">Yuri Machado Luz</h1>
            <p className="page-lead">
              Desenvolvedor Full-Stack · Analista de Sistemas · São Paulo, Brasil
            </p>
            <nav className="flex gap-3 mt-2">
              <a
                href={CONFIG.meta.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  style={{ width: 14, height: 14 }}
                />
                GitHub
              </a>
              <a
                href={CONFIG.meta.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  style={{ width: 14, height: 14 }}
                />
                LinkedIn
              </a>
            </nav>
          </div>

          {/* Right: quick facts */}
          <div
            className="rounded-xl px-5 py-4 shrink-0"
            style={{
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
            }}
          >
            <ul className="flex flex-col gap-2.5">
              {stats.quickFacts.map((fact) => (
                <li
                  key={fact.text}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--color-muted)" }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-primary-400 shrink-0"
                    aria-hidden="true"
                  />
                  {fact.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Bio */}
      <section id="bio" className="container mb-20">
        <h2 className="section-title mb-8">Bio</h2>
        <div
          className="flex flex-col gap-5 leading-[1.8] max-w-3xl"
          style={{ color: "var(--color-muted)" }}
        >
          <p className="bio-paragraph">
            Comecei minha trajetória em tecnologia ainda na graduação em
            Psicologia — e desde então combino análise comportamental com
            engenharia de software.
          </p>
          <p className="bio-paragraph">
            Trabalho de forma autônoma desde 2020, desenvolvendo sistemas web,
            automações e produtos digitais para PMEs e projetos próprios. Em
            2024, integrei a equipe da IBM onde redesenhei o ciclo de onboarding
            e reduzi o tempo de integração em 57%, antes de retomar minha
            trajetória independente.
          </p>
          <p className="bio-paragraph">
            Escrevo, desenho e documento o que construo — o que me permite
            cobrir um projeto inteiro: da arquitetura à comunicação final, com
            rigor e sigilo.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section id="habilidades" className="container mb-20">
        <h2 className="section-title mb-2">Habilidades</h2>
        <p className="mb-10" style={{ color: "var(--color-muted)" }}>
          Tecnologias e ferramentas que uso no dia a dia.
        </p>
        <Skills />
      </section>

      {/* Experience */}
      <section id="experiencia" className="container mb-20">
        <h2 className="section-title mb-10">Experiência</h2>
        <div className="experience-list">
          {experience.map((item, i) => (
            <div key={i} className="experience-item">
              <div className="timeline">
                <div className="timeline-dot" />
                <div className="timeline-line" />
              </div>
              <div className="body">
                <h3 className="role">{item.role}</h3>
                <div className="meta">
                  <span className="company">{item.company}</span>
                  <span className="period">{item.period}</span>
                </div>
                <ul className="bullets">
                  {item.bullets.map((bullet, j) => (
                    <li key={j} className="bullet">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="formacao" className="container mb-20">
        <h2 className="section-title mb-8">Formação</h2>
        <div className="education-list">
          {education.map((edu, i) => (
            <article key={i} className="education-item">
              <p className="degree">{edu.degree}</p>
              <p className="institution">{edu.institution}</p>
              {edu.detail && <p className="detail">{edu.detail}</p>}
            </article>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section id="idiomas" className="container mb-20">
        <h2 className="section-title mb-8">Idiomas</h2>
        <div className="language-grid">
          {languages.map((lang) => (
            <article key={lang.name} className="language-card">
              <span className="name">{lang.name}</span>
              <span className="level">{lang.level}</span>
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contato" className="mb-20">
        <Contact />
      </section>
    </main>
  );
}
