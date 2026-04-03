"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";

const NAV_LINKS = [
  { label: "About",      href: "#about",      id: "about" },
  { label: "Services",   href: "#services",   id: "services" },
  { label: "Stack",      href: "#stack",      id: "stack" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact",    href: "#contact",    id: "contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId]  = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { threshold: 0.1, rootMargin: "-60px 0px -20% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`
          fixed top-0 inset-x-0 z-50 transition-all duration-300
          ${scrolled
            ? "border-b border-[rgba(255,255,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"}
        `}
        style={scrolled ? {
          background: "rgba(5,5,8,0.85)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
        } : undefined}
      >
        <nav
          className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between md:grid md:grid-cols-3"
          aria-label="Navigation principale"
        >
          {/* Logo */}
          <a
            href="#"
            className="font-display font-bold text-xl tracking-tight text-gradient-cyan"
            aria-label="Accueil"
          >
            A<span className="text-[var(--color-muted)]">.</span>
          </a>

          {/* Desktop nav — centré */}
          <ul className="hidden md:flex items-center justify-center gap-1" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    className={`
                      relative px-4 py-2 rounded-lg font-mono text-sm
                      transition-colors duration-200
                      ${isActive
                        ? "text-[var(--color-text)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]"
                      }
                    `}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-cyan)]"
                        style={{ boxShadow: "0 0 8px rgba(0,212,255,0.9)" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center justify-end gap-4">
            <Badge variant="success" pulse className="hidden sm:inline-flex">
              Available
            </Badge>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[var(--color-surface)] transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-px bg-[var(--color-text)] origin-center transition-all"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block w-5 h-px bg-[var(--color-text)] origin-center"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-px bg-[var(--color-text)] origin-center transition-all"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-10"
            style={{
              background: "rgba(5,5,8,0.97)",
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
            }}
          >
            {/* Close button */}
            <button
              onClick={closeMenu}
              aria-label="Fermer le menu"
              className="absolute top-5 right-6 p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            <Badge variant="success" pulse>Available for work</Badge>

            <nav aria-label="Menu mobile">
              <ul className="flex flex-col items-center gap-1" role="list">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeId === link.id;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <a
                        href={link.href}
                        onClick={closeMenu}
                        className={`
                          block px-8 py-3 font-display text-2xl font-bold text-center
                          transition-colors duration-200
                          ${isActive ? "text-[var(--color-cyan)]" : "text-[var(--color-text)] hover:text-[var(--color-cyan)]"}
                        `}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <p className="font-mono text-xs text-[var(--color-muted)] tracking-widest uppercase">
              Antananarivo, Madagascar
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
