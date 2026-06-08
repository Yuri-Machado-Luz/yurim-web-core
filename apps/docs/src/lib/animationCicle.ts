import gsap from "gsap";

export class MotionHandler {
  public ctx: gsap.Context | null;

  private boundAfterSwapHandler: () => void;
  private boundPageLoadHandlers: Map<string, () => void>;

  constructor() {
    this.ctx = null;
    this.boundAfterSwapHandler = this.onChangePage.bind(this);
    this.boundPageLoadHandlers = new Map();
    document.addEventListener("astro:after-swap", this.boundAfterSwapHandler);
  }

  initializeContext(): void {
    if (this.ctx === null) {
      this.ctx = gsap.context(() => {});
    }
  }

  elementExists(id: string): boolean {
    if (!id) throw new Error("ID cannot be null");
    return document.getElementById(id) !== null;
  }

  executeWhenVisible(
    id: string,
    callback: (ctx: gsap.Context | null) => void,
  ): void {
    if (!this.boundPageLoadHandlers.has(id)) {
      const handler = () => this.onPageLoad(id, callback);
      this.boundPageLoadHandlers.set(id, handler);
      document.addEventListener("astro:page-load", handler);
    }
    if (this.elementExists(id)) {
      this.initializeContext();
      callback(this.ctx);
    }
  }

  private onPageLoad(id: string, callback: (ctx: gsap.Context | null) => void): void {
    if (this.elementExists(id)) {
      this.initializeContext();
      callback(this.ctx);
    }
  }

  private revertContext() {
    if (this.ctx !== null) {
      this.ctx.revert();
      this.ctx = null;
    }
  }

  private onChangePage(): void {
    this.revertContext();
  }

  cleanup(): void {
    this.revertContext();
    document.removeEventListener(
      "astro:after-swap",
      this.boundAfterSwapHandler,
    );
    this.boundPageLoadHandlers.forEach((handler) => {
      document.removeEventListener("astro:page-load", handler);
    });
    this.boundPageLoadHandlers.clear();
  }
}

export default MotionHandler;
