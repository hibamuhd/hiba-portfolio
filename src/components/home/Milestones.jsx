"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Folder } from "lucide-react";
import { C, serif, mono, focus } from "../../lib/theme";
import { milestones } from "../../data/siteData";
import SectionLabel from "../ui/SectionLabel";
import Reveal from "../ui/Reveal";

const BODY = "#F6EEDF";
const STRIP = "#E7D8BD";
const SIDE = "#EEE1C9";

function Photo({ m }) {
  return (
    <Image
      src={m.image.src}
      alt={m.image.alt}
      fill
      sizes="(min-width: 768px) 380px, 90vw"
      className="object-cover"
      style={{ objectPosition: m.image.pos || "center" }}
      priority
    />
  );
}

// Milestones as a tiny file manager: pick a "file" in the sidebar, preview it on the right.
// Click, hover-free keyboard (arrow keys) and touch all work.
export default function Milestones() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  const m = milestones[active];

  function onKeyDown(e) {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let next = null;
    if (step) next = (active + step + milestones.length) % milestones.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = milestones.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <section id="milestones" aria-labelledby="milestones-heading" className="px-4 py-20 sm:px-8 sm:py-28" style={{ scrollMarginTop: 64 }}>
      <div className="mx-auto max-w-6xl">
        <SectionLabel n="02">Milestones</SectionLabel>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
          <h2 id="milestones-heading" style={{ ...serif, fontWeight: 500, fontSize: "clamp(1.8rem, 3.6vw, 2.7rem)", lineHeight: 1.12 }}>
            Milestones &amp; Leadership
          </h2>
          <p className="max-w-xs text-sm leading-relaxed" style={{ color: `${C.ink}B3` }}>
            Open a file to see the story behind it.
          </p>
        </div>

        <Reveal className="mt-10">
          <div
            className="overflow-hidden rounded-2xl sm:rounded-3xl"
            style={{ background: BODY, border: `1px solid ${C.brown}33`, boxShadow: "0 30px 60px -34px rgba(132,96,68,.45), 0 2px 6px rgba(44,34,30,.05)" }}
          >
            {/* title bar with path */}
            <div className="flex items-center gap-3 px-4 py-3 sm:px-5" style={{ background: STRIP, borderBottom: `1px solid ${C.brown}22` }}>
              <div className="flex gap-2" aria-hidden>
                {[C.rose, C.tan, C.sage].map((c) => (
                  <span key={c} className="h-3 w-3 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <div
                aria-hidden
                className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full px-4 py-1 text-[11px]"
                style={{ ...mono, color: C.brown, background: "rgba(255,255,255,.6)", border: `1px solid ${C.brown}22` }}
              >
                <Folder size={11} style={{ color: m.accent }} />
                <span className="truncate">hiba.design / milestones / {m.id}</span>
              </div>
              <div aria-hidden className="hidden w-12 sm:block" />
            </div>

            <div className="grid lg:grid-cols-[310px_1fr]">
              {/* sidebar: files */}
              <div
                role="tablist"
                aria-label="Milestones"
                aria-orientation="vertical"
                onKeyDown={onKeyDown}
                className="flex gap-2 overflow-x-auto border-b p-3 [scrollbar-width:thin] lg:block lg:space-y-1 lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4"
                style={{ background: SIDE, borderColor: `${C.brown}22` }}
              >
                <p className="hidden items-center gap-2 px-3 pb-2 pt-1 text-[11px] uppercase tracking-[0.18em] lg:flex" style={{ ...mono, color: C.brown }}>
                  <Folder size={13} aria-hidden /> Milestones
                </p>
                {milestones.map((f, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={f.id}
                      ref={(el) => { refs.current[i] = el; }}
                      role="tab"
                      id={`milestone-tab-${f.id}`}
                      aria-selected={on}
                      aria-controls="milestone-panel"
                      tabIndex={on ? 0 : -1}
                      onClick={() => setActive(i)}
                      className={`relative flex w-[230px] shrink-0 items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors lg:w-full ${on ? "" : "hover:bg-white/45"} ${focus}`}
                    >
                      {on && (
                        <motion.span
                          layoutId="file-active"
                          aria-hidden
                          className="absolute inset-0 rounded-xl"
                          style={{ background: `${f.accent}30`, boxShadow: `inset 3px 0 0 ${f.accent}` }}
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        />
                      )}
                      <FileText size={17} aria-hidden className="relative mt-0.5 shrink-0" style={{ color: f.accent }} />
                      <span className="relative block min-w-0">
                        <span className="block text-[13px] font-medium leading-snug">{f.title}</span>
                        <span className="mt-0.5 block text-[10px]" style={{ ...mono, color: C.brown }}>{f.org}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* preview pane */}
              <div role="tabpanel" id="milestone-panel" aria-labelledby={`milestone-tab-${m.id}`} className="min-w-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid gap-9 p-6 sm:p-9 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-start"
                  >
                  <motion.figure
  className="relative mx-auto w-full max-w-[340px] pt-4"
  initial={{ rotate: -1.6 }}
  whileHover={{ rotate: 0 }}
  transition={{ type: "spring", stiffness: 220, damping: 18 }}
>
  {/* Washi Tape */}
  <span
    aria-hidden
    className="absolute left-1/2 top-1.5 z-20 h-5 w-24 -translate-x-1/2 -rotate-2"
    style={{
      background: "rgba(255,255,255,.75)",
      backdropFilter: "blur(4px)",
      boxShadow: "0 1px 3px rgba(0,0,0,.1)",
      border: "1px solid rgba(255,255,255,.5)",
    }}
  />

  {/* Polaroid Frame */}
  <div
    className="overflow-hidden rounded-md p-3 pb-3.5"
    style={{
      background: "#FCF8F0",
      boxShadow: "0 16px 32px -18px rgba(44,34,30,.45), 0 1px 3px rgba(44,34,30,.06)",
    }}
  >
    {/* Dynamic container: min-height keeps landscape big; aspect-ratio adapts per image */}
    <div 
      className="relative w-full overflow-hidden rounded-[2px]"
      style={{ 
        aspectRatio: `${m.image.w || 4} / ${m.image.h || 3}`,
        minHeight: "230px",
        maxHeight: "380px",
        background: C.beige 
      }}
    >
      <Photo m={m} />
    </div>

    <figcaption
      className="mt-3 px-1 text-center text-[11px] leading-snug"
      style={{ ...mono, color: C.brown }}
    >
      {m.caption}
    </figcaption>
  </div>
</motion.figure>

                    <div>
                      <p
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.14em]"
                        style={{ ...mono, color: C.ink, background: `${m.accent}2E`, border: `1px solid ${m.accent}88` }}
                      >
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: m.accent }} />
                        {m.tag}
                      </p>
                      <h3 className="mt-4 text-2xl leading-tight sm:text-[1.8rem]" style={{ ...serif, fontWeight: 500 }}>{m.title}</h3>
                      <p className="mt-1.5 text-xs" style={{ ...mono, color: C.brown }}>{m.org}</p>
                      <ul className="mt-5 space-y-3 text-[15px] leading-relaxed" style={{ color: `${C.ink}D9` }}>
                        {m.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <span aria-hidden className="mt-[0.72em] h-px w-4 shrink-0" style={{ background: m.accent }} />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* status bar */}
            <div className="flex items-center justify-between border-t px-5 py-2 text-[11px]" style={{ ...mono, color: C.brown, borderColor: `${C.brown}22`, background: STRIP }}>
              <span>{milestones.length} items</span>
              <span>1 selected</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
