"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { C, serif, mono, focus } from "../../lib/theme";
import { site, navItems } from "../../data/siteData";

function isActive(item, pathname) {
  if (item.match === "exact") return pathname === "/";
  if (item.match === "prefix") return pathname === item.href || pathname.startsWith(`${item.href}/`);
  return false;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300"
      style={{
        background: solid ? "rgba(239,228,208,0.88)" : "transparent",
        backdropFilter: solid ? "blur(10px)" : "none",
        WebkitBackdropFilter: solid ? "blur(10px)" : "none",
        boxShadow: scrolled ? `0 1px 0 ${C.brown}22` : "none",
        color: C.ink,
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className={`text-2xl font-bold tracking-tight ${focus}`} style={serif} aria-label="Hiba Muhammed, home">
            {site.wordmark}
          </Link>
          <span
            className="hidden items-center gap-2 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] lg:inline-flex"
            style={{ ...mono, border: `1px solid ${C.brown}44`, color: C.brown }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none" style={{ background: C.sage }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: C.sage }} />
            </span>
            {site.status}
          </span>
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = isActive(item, pathname);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative py-1 text-sm font-medium transition-opacity ${active ? "opacity-100" : "opacity-70 hover:opacity-100"} ${focus}`}
              >
                {item.label}
                {active ? (
                  <motion.span layoutId="nav-active" aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full" style={{ background: C.rose }} />
                ) : (
                  <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ background: C.rose }} />
                )}
              </Link>
            );
          })}
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 rounded-full bg-[#2C221E] px-4 py-2 text-xs font-medium text-[#EFE4D0] transition-colors hover:bg-[#846044] ${focus}`}
          >
            Resume <ArrowUpRight size={14} aria-hidden />
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`grid h-10 w-10 place-items-center rounded-full md:hidden ${focus}`}
          style={{ border: `1px solid ${C.brown}55` }}
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border-t px-5 pb-8 pt-4 md:hidden"
            style={{ borderColor: `${C.brown}22` }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item, pathname) ? "page" : undefined}
                  className={`border-b py-4 text-3xl ${focus}`}
                  style={{ ...serif, borderColor: `${C.brown}22`, color: isActive(item, pathname) ? C.rose : C.ink }}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#2C221E] px-5 py-3 text-sm font-medium text-[#EFE4D0] ${focus}`}
              >
                Resume <ArrowUpRight size={14} aria-hidden />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
