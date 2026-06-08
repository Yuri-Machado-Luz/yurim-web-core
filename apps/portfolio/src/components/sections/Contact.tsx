import emailjs from "@emailjs/browser";
import { faGithub, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Loader2, Mail, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CONFIG } from "@config";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Status = "idle" | "sending" | "sent" | "error";

type ContactProps = {
  fullPage?: boolean;
};

export function Contact({ fullPage = false }: ContactProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const key = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;
    if (key) emailjs.init(key);
  }, []);

  useGSAP(
    () => {
      gsap.set(".contact-item", { autoAlpha: 0, y: 20 });

      ScrollTrigger.batch(".contact-item", {
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            overwrite: true,
          }),
        once: true,
        start: "top 85%",
      });
    },
    { scope: sectionRef },
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    const els = formRef.current.elements;
    const nameVal = (els.namedItem("name") as HTMLInputElement).value;
    (els.namedItem("title") as HTMLInputElement).value = nameVal;
    (els.namedItem("time") as HTMLInputElement).value =
      new Date().toLocaleString("pt-BR");

    setStatus("sending");
    try {
      await emailjs.sendForm(
        import.meta.env.PUBLIC_EMAILJS_SERVICE_ID as string,
        import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID as string,
        formRef.current,
      );
      setStatus("sent");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  const inputClass =
    "w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-colors duration-200 focus:ring-1 focus:ring-primary-500/50";
  const inputStyle = {
    background: "var(--color-surface-strong)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text)",
  };
  const labelClass = "block text-xs font-medium mb-1.5";

  return (
    <section
      ref={sectionRef}
      id="contato"
      className={
        fullPage
          ? "container flex min-h-svh flex-col items-center justify-center py-32 text-center"
          : "container py-24"
      }
    >
      <h2 className="text-4xl font-bold mb-2">Contato</h2>
      <p className="mb-12" style={{ color: "var(--color-muted)" }}>
        Tem um projeto em mente ou quer trocar uma ideia?
      </p>

      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{ border: "1px solid var(--color-border)" }}
      >
        <div className="grid md:grid-cols-2">
          {/* Left: contact info */}
          <div
            className="p-8 md:p-12 flex flex-col justify-between"
            style={{ borderRight: "1px solid var(--color-border)" }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 contact-item">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full shrink-0"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  <Mail size={16} className="text-primary-400" />
                </div>
                <div className="text-sm">
                  <p className="mb-1" style={{ color: "var(--color-muted)" }}>Email</p>
                  <a
                    href={`mailto:${CONFIG.meta.social.email}`}
                    className="hover:text-primary-400 transition-colors"
                    style={{ color: "var(--color-text)" }}
                  >
                    {CONFIG.meta.social.email}
                  </a>
                </div>
              </div>

              <a
                href="https://api.whatsapp.com/send?phone=5511949359394&text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 contact-item hover:opacity-80 transition-opacity"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full shrink-0"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  <FontAwesomeIcon icon={faWhatsapp} style={{ width: 16, height: 16 }} className="text-primary-400" />
                </div>
                <div className="text-sm">
                  <p className="mb-1" style={{ color: "var(--color-muted)" }}>WhatsApp</p>
                  <p style={{ color: "var(--color-text)" }}>+55 (11) 94935-9394</p>
                </div>
              </a>

              <div className="flex items-center gap-4 contact-item">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full shrink-0"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  <MapPin size={16} className="text-primary-400" />
                </div>
                <div className="text-sm">
                  <p className="mb-1" style={{ color: "var(--color-muted)" }}>Localização</p>
                  <p style={{ color: "var(--color-text)" }}>São Paulo, Brasil</p>
                </div>
              </div>
            </div>

            <div
              className="flex gap-3 pt-8 mt-8"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              {[
                { href: CONFIG.meta.social.github, label: "GitHub", fa: faGithub },
                { href: CONFIG.meta.social.linkedin, label: "LinkedIn", fa: faLinkedin },
                { href: `mailto:${CONFIG.meta.social.email}`, label: "Email", lucide: Mail },
              ].map(({ href, label, fa, lucide: LucideIcon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:opacity-80"
                  style={{
                    border: "1px solid var(--color-border)",
                    color: "var(--color-muted)",
                  }}
                  aria-label={label}
                >
                  {fa ? (
                    <FontAwesomeIcon icon={fa} style={{ width: 16, height: 16 }} />
                  ) : LucideIcon ? (
                    <LucideIcon size={16} />
                  ) : null}
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-8 md:p-12 flex flex-col gap-5 contact-item"
          >
            <div>
              <label
                htmlFor="name"
                className={labelClass}
                style={{ color: "var(--color-muted)" }}
              >
                Nome
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                placeholder="Seu nome"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className={labelClass}
                style={{ color: "var(--color-muted)" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="seu@email.com"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label
                htmlFor="message"
                className={labelClass}
                style={{ color: "var(--color-muted)" }}
              >
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Descreva brevemente o projeto, o prazo aproximado e como prefere conversar."
                className={inputClass}
                style={{ ...inputStyle, minHeight: "8rem", resize: "vertical" }}
              />
            </div>

            <input type="hidden" name="title" />
            <input type="hidden" name="time" />

            {status === "sent" && (
              <p
                className="text-sm flex items-center gap-2 p-3 rounded-lg"
                style={{ background: "var(--color-success-bg)", color: "var(--color-success)" }}
              >
                <Check size={16} />
                Mensagem recebida. Respondo em até dois dias úteis.
              </p>
            )}
            {status === "error" && (
              <p
                className="text-sm p-3 rounded-lg"
                style={{ background: "var(--color-danger-bg)", color: "var(--color-danger)" }}
              >
                Não foi possível enviar a mensagem. Verifique a conexão e tente novamente.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full py-2.5 text-sm font-medium text-white transition-colors duration-300 disabled:opacity-60"
              style={{ background: "var(--color-primary-700)" }}
            >
              {status === "sending" ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Enviando...
                </span>
              ) : status === "sent" ? (
                <span className="flex items-center justify-center gap-2">
                  <Check size={16} />
                  Enviado!
                </span>
              ) : (
                "Enviar mensagem"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
