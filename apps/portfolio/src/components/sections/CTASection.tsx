import { CONFIG } from "@config";

export function CTASection() {
  return (
    <section className="py-32 relative isolate flex items-center justify-center">
      <div className="container text-center">
        <h2 className="section-title mb-4">Vamos conversar?</h2>
        <p
          className="mb-10 text-base"
          style={{ color: "var(--color-muted)" }}
        >
          Tem um projeto em mente ou quer trocar uma ideia?
        </p>
        <a href="/sobre#contato" className="btn btn-primary">
          Entrar em contato
        </a>

        <nav className="social-links justify-center mt-6">
          <a
            href={CONFIG.meta.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            GitHub
          </a>
          <a
            href={CONFIG.meta.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${CONFIG.meta.social.email}`}
            className="social-link"
          >
            Email
          </a>
        </nav>
      </div>
    </section>
  );
}
