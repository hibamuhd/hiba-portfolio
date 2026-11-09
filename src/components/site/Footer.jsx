"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { C, serif, mono } from "../../lib/theme";
import { site, navItems } from "../../data/siteData";

const onBrown = "underline-offset-4 opacity-80 transition-opacity hover:underline hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EFE4D0]";
const chip = "inline-flex items-center rounded-full border border-[#2C221E]/35 px-3 py-1 text-xs font-medium transition-colors hover:bg-[#2C221E] hover:text-[#F6EEDF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C221E]";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`; // clipboard blocked: fall back to opening mail
    }
  }

  const external = [
    site.linkedin && { label: "LinkedIn", href: site.linkedin },
    site.github && { label: "GitHub", href: site.github },
    site.resume && { label: "Resume", href: site.resume },
  ].filter(Boolean);

  return (
    <footer id="contact" className="px-4 pb-8 pt-16 sm:px-8 sm:pt-24" style={{ background: C.brown, color: C.paper }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          {/* the note */}
          <motion.div
            className="relative mx-auto w-full max-w-md rounded-sm px-7 pb-8 pt-10 lg:col-span-6 lg:mx-0"
            initial={{ rotate: -1.6 }}
            whileHover={{ rotate: 0, y: -3 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            style={{ background: C.tan, color: C.ink, boxShadow: "0 26px 40px -22px rgba(0,0,0,.6), 0 2px 4px rgba(0,0,0,.14)" }}
          >
            <span
              aria-hidden
              className="absolute left-1/2 top-0 h-6 w-24 -translate-x-1/2 -translate-y-1/2 -rotate-2"
              style={{ background: "rgba(255,255,255,.5)", backdropFilter: "blur(2px)", boxShadow: "0 1px 2px rgba(0,0,0,.12)" }}
            />
            <span
              aria-hidden
              className="absolute bottom-0 right-0 h-8 w-8"
              style={{ background: "linear-gradient(135deg, transparent 50%, rgba(44,34,30,.2) 50%)" }}
            />

            <p className="text-[11px] uppercase tracking-[0.22em]" style={{ ...mono, opacity: 0.7 }}>Say hello</p>
            <h2 className="mt-2 text-[1.7rem] leading-tight" style={{ ...serif, fontWeight: 500 }}>
              Let&rsquo;s talk <em>product, people</em> or just good food.
            </h2>
            <p className="mt-2 text-sm" style={{ opacity: 0.8 }}>{site.status}.</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-[15px] font-medium underline decoration-[#2C221E]/40 underline-offset-4 transition-colors hover:decoration-[#2C221E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C221E]"
              >
                <Mail size={15} aria-hidden />
                {site.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className={chip}
                aria-live="polite"
              >
                {copied ? "Copied" : "Copy email"}
              </button>
            </div>

            <ul className="mt-5 flex flex-wrap gap-2 border-t pt-4" style={{ borderColor: "rgba(44,34,30,.2)" }}>
              {external.map((e) => (
                <li key={e.label}>
                  <a href={e.href} target="_blank" rel="noopener noreferrer" className={chip}>{e.label} ↗</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* site links */}
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-2xl font-bold tracking-tight" style={serif}>{site.wordmark}</p>
            <p className="mt-1 text-sm opacity-75">Product · Growth · Engineering</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-2.5 text-sm sm:max-w-xs">
              {navItems.map((n) => (
                <li key={n.label}><Link href={n.href} className={onBrown}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t pt-5 text-xs" style={{ ...mono, borderColor: "rgba(239,228,208,.22)" }}>
          <span className="opacity-70">© 2026 {site.name}</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`inline-flex items-center gap-1.5 ${onBrown}`}
          >
            Back to top <ArrowUp size={13} aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
