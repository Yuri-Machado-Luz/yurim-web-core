import { CONFIG } from "@config";
import { useGSAP } from "@gsap/react";
import { cm } from "@lib";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP, Observer, ScrollTrigger);

type NavbarProps = {
  currentPath?: string;
};

export default function Navbar({ currentPath: initialPath = "/" }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Com transition:persist o prop congela no primeiro render.
  // Sincroniza via evento para manter active link correto após navegação.
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : initialPath,
  );

  useEffect(() => {
    const onBeforePrep = () => { isTransitioningRef.current = true; };
    const syncAndReset = () => {
      isTransitioningRef.current = false;
      setCurrentPath(window.location.pathname);
      if (navRef.current) gsap.set(navRef.current, { y: 0 });
    };
    const refreshST = () => ScrollTrigger.refresh();
    document.addEventListener("astro:before-preparation", onBeforePrep);
    document.addEventListener("astro:after-swap", syncAndReset);
    document.addEventListener("astro:page-load", refreshST);
    return () => {
      document.removeEventListener("astro:before-preparation", onBeforePrep);
      document.removeEventListener("astro:after-swap", syncAndReset);
      document.removeEventListener("astro:page-load", refreshST);
    };
  }, []);

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      // Transparent-on-top → blurred-on-scroll
      ScrollTrigger.create({
        start: "top -1px",
        onEnter: () => nav.classList.add("is-scrolled"),
        onLeaveBack: () => nav.classList.remove("is-scrolled"),
      });

      // Hide on scroll down, show on scroll up
      const obs = Observer.create({
        tolerance: 4,
        onDown: () => {
          if (isTransitioningRef.current || window.scrollY < 5) return;
          gsap.to(nav, {
            y: "-100%",
            duration: 0.3,
            ease: "power2.in",
            overwrite: true,
          });
        },
        onUp: () => {
          if (isTransitioningRef.current) return;
          gsap.to(nav, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });

      return () => {
        obs.kill();
      };
    },
    { scope: navRef },
  );

  function toggleMenu() {
    const drawer = drawerRef.current;
    if (!drawer) return;

    if (!menuOpen) {
      setMenuOpen(true);
      gsap.fromTo(
        drawer,
        { height: 0, autoAlpha: 0 },
        { height: "auto", autoAlpha: 1, duration: 0.25, ease: "power2.out" },
      );
    } else {
      gsap.to(drawer, {
        height: 0,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setMenuOpen(false),
      });
    }
  }

  function closeMenu() {
    const drawer = drawerRef.current;
    if (!drawer || !menuOpen) return;
    gsap.to(drawer, {
      height: 0,
      autoAlpha: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setMenuOpen(false),
    });
  }

  return (
    <nav
      ref={navRef}
      className="navbar fixed top-0 left-0 z-50 w-full will-change-transform"
    >
      <div className="container flex items-center justify-between py-4 font-medium md:py-5">
        <a href="/">
          <img
            src={CONFIG.nav.logo.src as string}
            alt={CONFIG.nav.logo.alt ?? "Logo"}
            className="h-8 md:h-10"
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 text-sm md:flex">
          {CONFIG.nav.pages.map(({ label, href, cta }) => (
            <li key={href}>
              {cta ? (
                <a
                  href={href}
                  className="btn btn-primary"
                  style={{ fontSize: "0.8125rem", padding: "0.375rem 0.875rem" }}
                >
                  {label}
                </a>
              ) : (
                <a
                  href={href}
                  className={cm(
                    "transition-colors duration-200",
                    currentPath === href || currentPath.startsWith(href + "/")
                      ? "text-primary-400"
                      : "hover:text-primary-400",
                  )}
                  style={{
                    color:
                      currentPath === href || currentPath.startsWith(href + "/")
                        ? undefined
                        : "var(--color-muted)",
                  }}
                >
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="flex items-center justify-center md:hidden"
          style={{ color: "var(--color-muted)" }}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer — always mounted, GSAP controls visibility */}
      <div
        ref={drawerRef}
        className="overflow-hidden md:hidden"
        style={{
          height: 0,
          visibility: "hidden",
          borderBottom: "1px solid var(--color-border)",
          background: "rgb(from var(--color-bg) r g b / 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col gap-1 px-6 py-4 text-sm">
          {CONFIG.nav.pages.map(({ label, href, cta }) => (
            <li key={href}>
              {cta ? (
                <a
                  href={href}
                  className="block py-2 text-primary-400 font-medium transition-colors duration-200 hover:text-primary-300"
                  onClick={closeMenu}
                >
                  {label}
                </a>
              ) : (
                <a
                  href={href}
                  className={cm(
                    "block py-2 transition-colors duration-200",
                    currentPath === href
                      ? "text-primary-400"
                      : "hover:text-primary-400",
                  )}
                  style={{
                    color:
                      currentPath === href ? undefined : "var(--color-muted)",
                  }}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
