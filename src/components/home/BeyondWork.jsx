"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { C, serif, mono, focus } from "../../lib/theme";
import { books, bakes, kitchenIntro } from "../../data/siteData";
import SectionLabel from "../ui/SectionLabel";
import Reveal from "../ui/Reveal";

function Bookshelf() {
  const [picked, setPicked] = useState(null);
  const [hovered, setHovered] = useState(null);
  const shown = hovered ?? picked;
  const book = shown !== null ? books[shown] : null;

  return (
    <div>
      <h3 className="text-3xl sm:text-4xl" style={serif}>The Bookshelf</h3>
      <p className="mt-2 text-sm" style={{ color: `${C.ink}B3` }}>Books I&rsquo;ve spent time with.</p>

      <div className="-mx-5 mt-10 overflow-x-auto px-5 pb-2 [scrollbar-width:thin] sm:mx-0 sm:px-0">
        <div className="relative inline-flex min-w-full items-end justify-center gap-[3px] pb-0 pt-8" role="group" aria-label="Books">
          {books.map((b, i) => (
            <motion.button
              key={b.title}
              type="button"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onClick={() => setPicked(picked === i ? null : i)}
              aria-pressed={picked === i}
              aria-label={`${b.title} by ${b.author}`}
              animate={{ y: shown === i ? -14 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`relative flex shrink-0 justify-center pt-3 rounded-t-[3px] ${focus}`}
              style={{ width: b.w, height: b.h, background: b.bg, color: b.fg, boxShadow: "inset -3px 0 0 rgba(0,0,0,.16), inset 2px 0 0 rgba(255,255,255,.1)" }}
            >
              <span
                aria-hidden
                className="block overflow-hidden text-ellipsis whitespace-nowrap text-[11px] tracking-wide"
                style={{ writingMode: "vertical-rl", maxHeight: b.h - 24, ...serif }}
              >
                {b.title}
              </span>
            </motion.button>
          ))}
        </div>
        <div aria-hidden className="h-3 min-w-full rounded-b-sm" style={{ background: C.brown, boxShadow: "0 14px 18px -10px rgba(44,34,30,.5)" }} />
      </div>

      <p className="mt-6 min-h-[3rem] text-sm" aria-live="polite" style={{ ...mono, color: C.brown }}>
        {book ? (
          <>
            <span className="text-base" style={{ ...serif, color: C.ink }}>{book.title}</span>
            <span className="block text-xs opacity-80">{book.author}</span>
          </>
        ) : (
          "Hover or tap a spine."
        )}
      </p>
    </div>
  );
}

function KitchenJournal() {
  const strip = useRef(null);
  function scrollBy(dir) {
    strip.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  }
  const arrow = `grid h-11 w-11 place-items-center rounded-full border transition-colors hover:bg-[#2C221E] hover:text-[#EFE4D0] ${focus}`;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <h3 className="text-3xl sm:text-4xl" style={serif}>The Kitchen Journal</h3>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: `${C.ink}CC` }}>{kitchenIntro}</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll photos left" className={arrow} style={{ borderColor: `${C.brown}66` }}><ArrowLeft size={18} aria-hidden /></button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll photos right" className={arrow} style={{ borderColor: `${C.brown}66` }}><ArrowRight size={18} aria-hidden /></button>
        </div>
      </div>

      <div
        ref={strip}
        tabIndex={0}
        role="region"
        aria-label="Kitchen Journal photos, scrollable"
        className={`-mx-5 mt-10 flex snap-x snap-mandatory items-start gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:thin] sm:-mx-8 sm:px-8 ${focus}`}
      >
        {bakes.map((b, i) => (
          <figure key={b.src} className={`group w-auto shrink-0 snap-start ${i % 2 ? "mt-10" : ""}`}>
            <div
              className="relative overflow-hidden rounded-md"
              style={{ "--h": "clamp(280px, 32vw, 360px)", height: "var(--h)", width: `calc(var(--h) * ${(b.w / b.h).toFixed(4)})`, background: C.beige }}
            >
              <Image
                src={b.src}
                alt={b.title}
                fill
                sizes="(min-width: 640px) 360px, 300px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
            </div>
            <figcaption className="mt-3" style={{ maxWidth: 260 }}>
              <span className="block text-lg leading-snug" style={serif}>{b.title}</span>
              <span className="mt-1 block text-xs leading-relaxed" style={{ color: `${C.ink}B3` }}>{b.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function BeyondWork() {
  return (
    <section id="beyond" aria-labelledby="beyond-heading" className="px-5 py-24 sm:px-8 sm:py-32" style={{ scrollMarginTop: 64 }}>
      <div className="mx-auto max-w-6xl">
        <SectionLabel n="04">Beyond work</SectionLabel>
        <h2 id="beyond-heading" className="sr-only">Beyond work: bookshelf and kitchen journal</h2>
        <Reveal className="mt-10"><Bookshelf /></Reveal>
        <div className="mt-28"><KitchenJournal /></div>
      </div>
    </section>
  );
}
