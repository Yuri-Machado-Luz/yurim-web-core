const SMOOTH_TAU = 0.25;
const MIN_COPIES = 2;
const COPY_HEADROOM = 2;

interface LogoLoopOptions {
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  pauseOnHover?: boolean;
  hoverSpeed?: number;
}

export class LogoLoopController {
  private container: HTMLElement;
  private track: HTMLElement;
  private seq: HTMLElement;

  private offset = 0;
  private velocity = 0;
  private rafId: number | null = null;
  private lastTs: number | null = null;
  private isHovered = false;
  private seqSize = 0;
  private copyCount = 0;

  private targetVelocity: number;
  private effectiveHoverSpeed: number | undefined;
  private isVertical: boolean;
  private resizeObserver: ResizeObserver | null = null;

  constructor(container: HTMLElement, opts: LogoLoopOptions = {}) {
    const {
      speed = 120,
      direction = "left",
      pauseOnHover,
      hoverSpeed,
    } = opts;

    this.container = container;
    this.track = container.querySelector<HTMLElement>(".logoloop__track")!;
    this.seq = container.querySelector<HTMLElement>(".logoloop__list")!;

    this.isVertical = direction === "up" || direction === "down";

    const magnitude = Math.abs(speed);
    const dirMul = this.isVertical
      ? direction === "up"
        ? 1
        : -1
      : direction === "left"
        ? 1
        : -1;
    this.targetVelocity = magnitude * dirMul * (speed < 0 ? -1 : 1);

    if (hoverSpeed !== undefined) {
      this.effectiveHoverSpeed = hoverSpeed;
    } else if (pauseOnHover === true) {
      this.effectiveHoverSpeed = 0;
    } else {
      this.effectiveHoverSpeed = undefined;
    }

    if (this.effectiveHoverSpeed !== undefined) {
      this.track.addEventListener("mouseenter", () => {
        this.isHovered = true;
      });
      this.track.addEventListener("mouseleave", () => {
        this.isHovered = false;
      });
    }

    this.measure();
    this.setupResizeObserver();
    this.startRAF();
  }

  private measure() {
    const seq = this.seq;
    const rect = seq.getBoundingClientRect();
    const size = this.isVertical ? rect.height : rect.width;
    if (size <= 0) return;

    this.seqSize = Math.ceil(size);

    const viewSize = this.isVertical
      ? this.container.clientHeight ||
        this.container.parentElement?.clientHeight ||
        size
      : this.container.clientWidth;

    const needed = Math.ceil(viewSize / this.seqSize) + COPY_HEADROOM;
    const target = Math.max(MIN_COPIES, needed);

    if (target !== this.copyCount) {
      this.copyCount = target;
      this.rebuildCopies();
    }
  }

  private rebuildCopies() {
    // remove existing copies (keep only seq = first list)
    const lists = this.track.querySelectorAll<HTMLElement>(".logoloop__list");
    lists.forEach((l, i) => {
      if (i > 0) l.remove();
    });

    for (let i = 1; i < this.copyCount; i++) {
      const clone = this.seq.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      this.track.appendChild(clone);
    }
  }

  private setupResizeObserver() {
    if (!window.ResizeObserver) {
      window.addEventListener("resize", () => this.measure());
      return;
    }
    this.resizeObserver = new ResizeObserver(() => this.measure());
    this.resizeObserver.observe(this.container);
    this.resizeObserver.observe(this.seq);
  }

  private startRAF() {
    const animate = (ts: number) => {
      if (this.lastTs === null) this.lastTs = ts;
      const dt = Math.max(0, ts - this.lastTs) / 1000;
      this.lastTs = ts;

      const target =
        this.isHovered && this.effectiveHoverSpeed !== undefined
          ? this.effectiveHoverSpeed
          : this.targetVelocity;

      const ease = 1 - Math.exp(-dt / SMOOTH_TAU);
      this.velocity += (target - this.velocity) * ease;

      if (this.seqSize > 0) {
        let next = this.offset + this.velocity * dt;
        next = ((next % this.seqSize) + this.seqSize) % this.seqSize;
        this.offset = next;

        const tx = this.isVertical
          ? `translate3d(0,${-this.offset}px,0)`
          : `translate3d(${-this.offset}px,0,0)`;
        this.track.style.transform = tx;
      }

      this.rafId = requestAnimationFrame(animate);
    };

    this.rafId = requestAnimationFrame(animate);
  }

  destroy() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.resizeObserver?.disconnect();
    this.lastTs = null;
  }
}
