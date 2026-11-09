"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { C, serif, mono, focus } from "../../lib/theme";
import { domains } from "../../data/siteData";

// "Where my curiosity goes": soft pill tabs (hover / click / arrow keys) that retint a
// friendly panel, show related tools as little chips, and offer a "next" button.
export default function DisciplineExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const current = domains[active];

  function select(i, moveFocus = false) {
    setActive(i);
    if (moveFocus) tabs.current[i]?.focus();
  }
  function onKeyDown(e) {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    let next = null;
    if (step) next = (active + step + domains.length) % domains.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = domains.length - 1;
    if (next === null) return;
    e.preventDefault();
    select(next, true);
  }

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="text-2xl sm:text-[1.7rem]" style={{ ...serif, fontWeight: 500 }}>Where my curiosity goes</h2>
        <p className="text-xs" style={{ ...mono, color: C.brown }}>Pick one to explore</p>
      </div>

      <div role="tablist" aria-label="Areas of interest" onKeyDown={onKeyDown} className="mt-5 flex flex-wrap gap-2.5">
        {domains.map((d, i) => {
          const on = i === active;
          return (
            <button
              key={d.id}
              ref={(el) => { tabs.current[i] = el; }}
              role="tab"
              id={`domain-tab-${d.id}`}
              aria-selected={on}
              aria-controls="domain-panel"
              tabIndex={on ? 0 : -1}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-300 hover:-translate-y-0.5 ${focus}`}
              style={{ borderColor: on ? d.accent : `${C.brown}33`, color: C.ink }}
            >
              {on && (
                <motion.span
                  layoutId="pill-bg"
                  aria-hidden
                  className="absolute inset-0 rounded-full"
                  style={{ background: `${d.accent}38` }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span aria-hidden className="relative h-2 w-2 rounded-full" style={{ background: d.accent }} />
              <span className="relative">{d.label}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        id="domain-panel"
        role="tabpanel"
        aria-labelledby={`domain-tab-${current.id}`}
        initial={false}
        animate={{ backgroundColor: `${current.accent}1F`, borderColor: `${current.accent}66` }}
        transition={{ duration: 0.45 }}
        className="mt-5 rounded-2xl border p-5 sm:p-7"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <p className="max-w-2xl text-base leading-relaxed" style={{ color: `${C.ink}E6` }}>{current.text}</p>

            <motion.ul
              className="mt-5 flex flex-wrap gap-2"
              initial="hide"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } }, hide: {} }}
              aria-label="Related tools and experiences"
            >
              {current.tags.map((t) => (
                <motion.li
                  key={t}
                  variants={{ hide: { opacity: 0, y: 6, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
                  whileHover={{ y: -3, rotate: -1.5 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  className="cursor-default rounded-full px-3 py-1 text-[11px]"
                  style={{ ...mono, color: C.ink, background: "rgba(255,255,255,.65)", border: `1px solid ${current.accent}88` }}
                >
                  {t}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <Link href={current.cta.href} className={`group inline-flex items-center gap-2 text-sm font-medium ${focus}`} style={{ color: C.ink }}>
            <span className="border-b pb-0.5" style={{ borderColor: current.accent }}>{current.cta.label}</span>
            <ArrowRight size={15} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <button
            type="button"
            onClick={() => select((active + 1) % domains.length)}
            aria-label="Show next interest"
            className={`rounded-full px-3 py-1 text-xs transition-colors hover:bg-[#DFCCB1] ${focus}`}
            style={{ ...mono, color: C.brown }}
          >
            Next →
          </button>
        </div>
      </motion.div>
    </div>
  );
}
