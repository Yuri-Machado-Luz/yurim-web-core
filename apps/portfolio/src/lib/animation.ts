import gsap from "gsap";

/**
 * Singleton para contextos GSAP fora de ilhas React.
 * React islands usam useGSAP({ scope: ref }) diretamente.
 */
class AnimationOrchestrator {
  private ctx: gsap.Context | null = null;

  constructor() {
    if (typeof document === "undefined") return;
    document.addEventListener("astro:after-swap", () => this.revert());
    document.addEventListener("astro:page-load", () => this.refresh());
  }

  /** Inicializa contexto GSAP com escopo e setup. */
  init(scope: Element | string, setup: (ctx: gsap.Context) => void): void {
    this.revert();
    this.ctx = gsap.context(() => {
      setup(this.ctx!);
    }, scope);
  }

  /** Destrói contexto e animações registradas. Chamado em astro:after-swap. */
  revert(): void {
    this.ctx?.revert();
    this.ctx = null;
  }

  /** Atualiza ScrollTrigger após navegação. Chamado em astro:page-load. */
  refresh(): void {
    gsap.getProperty(document.body, "--gsap-refresh");
    // ScrollTrigger.refresh() é chamado pelos componentes React via useGSAP;
    // este método existe para scripts Astro que precisem do hook.
  }
}

export const animator = new AnimationOrchestrator();
