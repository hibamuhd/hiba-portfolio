"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { C, serif, mono, ease, focus } from "../../lib/theme";
import { site, intro, heroFacts } from "../../data/siteData";
import DisciplineExplorer from "./DisciplineExplorer";
import BrowserFrame from "../ui/BrowserFrame";

// Headline from the original site. "code" is set in mono and "community" in italic rose:
// the two worlds the line is about.
const WORDS = [
  { t: "Bridging" }, { t: "the" }, { t: "gap" }, { t: "between" },
  { t: "code", kind: "code" }, { t: "and" }, { t: "community.", kind: "community" },
];

const kindStyle = {
  code: { fontFamily: mono.fontFamily, fontSize: "0.8em", fontWeight: 500, color: C.brown, letterSpacing: "-0.05em", boxShadow: `inset 0 -0.14em 0 ${C.sage}66` },
  community: { fontStyle: "italic", fontWeight: 500, color: C.rose },
};

function Headline() {
  return (
    <h1
      aria-label="Bridging the gap between code and community."
      className="tracking-tight"
      style={{ ...serif, fontWeight: 500, fontSize: "clamp(2rem, 4.6vw, 3.5rem)", lineHeight: 1.12 }}
    >
      {WORDS.map((w, i) => (
        <span key={w.t} aria-hidden="true">
          {i > 0 && " "}
          <span className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.16em", marginBottom: "-0.16em", paddingRight: "0.06em" }}>
            <motion.span
              className="inline-block"
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease }}
              style={w.kind ? kindStyle[w.kind] : undefined}
            >
              {w.t}
            </motion.span>
          </span>
        </span>
      ))}
    </h1>
  );
}

function Portrait() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 110, damping: 16 });
  const sy = useSpring(py, { stiffness: 110, damping: 16 });

  function onMove(e) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * -18);
    py.set(((e.clientY - r.top) / r.height - 0.5) * -18);
  }
  function onLeave() { px.set(0); py.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease }}
      className="relative mx-auto w-full max-w-[230px] sm:max-w-[270px] lg:ml-auto lg:max-w-[290px]"
    >
      {/* offset beige arch that drifts opposite the pointer */}
      <motion.div
        aria-hidden
        className="absolute -bottom-4 -right-4 left-4 top-4"
        style={{ background: C.beige, borderRadius: "999px 999px 14px 14px", x: sx, y: sy }}
      />
      <div
  className="relative aspect-[4/5] overflow-hidden"
  style={{
    borderRadius: "999px 999px 14px 14px",
    background: C.beige
  }}
>
  <motion.div
    className="absolute inset-0"
    style={{ y: imgY, scale: 1 }}
  >
    {failed ? (
      <span
        aria-hidden
        className="absolute inset-0 grid place-items-center text-6xl"
        style={{ ...serif, color: C.rose }}
      >
        H
      </span>
    ) : (
      <Image
        src={site.portrait}
        alt="Portrait of Hiba Muhammed"
        fill
        priority
        sizes="(min-width: 1024px) 290px, 270px"
        className="object-cover object-top"
        onError={() => setFailed(true)}
      />
    )}
  </motion.div>
</div>
      <span aria-hidden className="absolute -left-3 bottom-10 hidden h-3 w-3 rounded-full lg:block" style={{ background: C.rose }} />
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="px-4 pb-20 pt-24 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <BrowserFrame url="hiba.design/product-growth">
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-8 lg:p-12">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ ...mono, color: C.brown }}
              >
                {site.name} · IIT Hyderabad
              </motion.p>
              <Headline />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease }}
                className="mt-6 max-w-lg text-[15px] leading-relaxed sm:text-base"
                style={{ color: `${C.ink}D9` }}
              >
                {intro}
              </motion.p>
            </div>

            <div className="lg:col-span-5">
              <Portrait />
            </div>
          </div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="grid gap-5 border-t px-6 py-6 sm:grid-cols-3 sm:px-10 lg:px-12"
            style={{ borderColor: `${C.brown}22` }}
          >
            {heroFacts.map((f) => (
              <div key={f.title}>
                <dt className="text-[13px] font-medium leading-snug">{f.title}</dt>
                <dd className="mt-1 text-[11px]" style={{ ...mono, color: C.brown }}>{f.detail}</dd>
              </div>
            ))}
          </motion.dl>

          <div className="border-t px-6 py-8 sm:px-10 lg:px-12 lg:py-10" style={{ borderColor: `${C.brown}22` }}>
            <DisciplineExplorer />
          </div>
        </BrowserFrame>
      </div>
    </section>
  );
}
