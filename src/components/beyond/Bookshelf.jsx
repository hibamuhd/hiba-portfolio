"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { C, serif, mono, focus } from "../../lib/theme";
import { books } from "../../data/siteData";

const PAPER = "#FCF8F0";
const spring = { type: "spring", stiffness: 260, damping: 26 };

/* Five stars, partially filled to match a /10 rating (9.5/10 shows 4.75 stars). */
function Stars({ value, max = 10 }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <span className="inline-flex items-center gap-2.5" role="img" aria-label={`Rated ${value} out of ${max}`}>
      <span aria-hidden className="relative inline-block text-xl leading-none tracking-[0.12em]">
        <span style={{ color: `${C.brown}2E` }}>★★★★★</span>
        <span className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap" style={{ width: `${pct}%`, color: C.tan }}>★★★★★</span>
      </span>
      <span className="text-xs" style={{ ...mono, color: C.brown }}>{value}/{max}</span>
    </span>
  );
}

/* The review note: a taped, ruled index card. */
function BookNote({ book, onClose }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); return; }
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll("button, a[href], [tabindex]:not([tabindex='-1'])");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => { document.removeEventListener("keydown", onKey, true); document.body.style.overflow = overflow; };
  }, [onClose]);

  const titleId = `note-title-${book.id}`;
  const hasRating = typeof book.rating === "number";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ background: "rgba(44,34,30,.58)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-lg"
        initial={{ opacity: 0, y: 36, rotate: -3, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, rotate: -1, scale: 1 }}
        exit={{ opacity: 0, y: 24, rotate: 2, scale: 0.97 }}
        transition={spring}
      >
        {/* washi tape */}
        <span
          aria-hidden
          className="absolute left-1/2 top-0 z-20 h-6 w-24 -translate-x-1/2 -translate-y-1/2 rotate-2"
          style={{ background: "rgba(223,204,177,.85)", backdropFilter: "blur(2px)", boxShadow: "0 1px 2px rgba(0,0,0,.14)" }}
        />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close note"
          className={`absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full text-base transition-colors hover:bg-[#DFCCB1] ${focus}`}
          style={{ color: C.ink }}
        >
          <span aria-hidden>✕</span>
        </button>

        <div
          className="max-h-[86vh] overflow-y-auto rounded-md py-8 pl-9 pr-7"
          style={{ background: PAPER, boxShadow: "0 30px 60px -24px rgba(0,0,0,.6), 0 2px 4px rgba(0,0,0,.14)", color: C.ink }}
        >
          {/* spine-coloured edge, so you can tell which book the note came from */}
          <span aria-hidden className="absolute inset-y-0 left-0 w-2.5 rounded-l-md" style={{ background: book.color }} />

          <div className="flex items-start gap-4 pr-8">
            {book.cover ? (
              <span className="relative block aspect-[2/3] w-16 shrink-0 overflow-hidden rounded-[3px] sm:w-20" style={{ background: C.beige, boxShadow: "0 6px 14px -6px rgba(44,34,30,.5)" }}>
                <Image src={book.cover} alt={`Cover of ${book.title}`} fill sizes="80px" className="object-cover" />
              </span>
            ) : null}
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.22em]" style={{ ...mono, color: C.brown }}>Book note</p>
              <h3 id={titleId} className="mt-1.5 text-[1.65rem] leading-tight" style={{ ...serif, fontWeight: 500 }}>{book.title}</h3>
              <p className="mt-1 text-xs" style={{ ...mono, color: C.brown }}>{book.author}</p>
              {hasRating && <div className="mt-3"><Stars value={book.rating} /></div>}
            </div>
          </div>

          {book.review ? (
            <>
              <div aria-hidden className="mt-5 h-0.5 w-full" style={{ background: `${C.rose}88` }} />
              <p className="mt-4 text-[11px] uppercase tracking-[0.18em]" style={{ ...mono, color: C.rose }}>What stayed with me</p>
              <blockquote
                className="mt-2 text-base italic"
                style={{
                  ...serif,
                  lineHeight: "32px",
                  backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 31px, ${C.rose}38 31px, ${C.rose}38 32px)`,
                }}
              >
                {book.review}
              </blockquote>
            </>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Bookshelf() {
  const [openId, setOpenId] = useState(null);
  const [hovered, setHovered] = useState(null);
  const trigger = useRef(null);
  const openBook = books.find((b) => b.id === openId) || null;
  const hoverBook = hovered !== null ? books[hovered] : null;

  const close = useCallback(() => {
    setOpenId(null);
    requestAnimationFrame(() => trigger.current?.focus());
  }, []);

  return (
    <div className="p-6 sm:p-9">
      <h2 className="text-2xl sm:text-[1.9rem]" style={{ ...serif, fontWeight: 500 }}>My Bookshelf</h2>
      <p className="mt-2 text-sm" style={{ color: `${C.ink}B3` }}>What stayed with me.</p>

      <div className="-mx-6 mt-10 overflow-x-auto px-6 pb-2 [scrollbar-width:thin] sm:-mx-9 sm:px-9">
        <div className="relative inline-flex min-w-full items-end justify-center gap-[3px] pt-8" role="group" aria-label="Books on the shelf">
          {books.map((b, i) => (
            <motion.button
              key={b.id}
              type="button"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onClick={(e) => { trigger.current = e.currentTarget; setOpenId(b.id); }}
              aria-haspopup="dialog"
              aria-label={`${b.title} by ${b.author}. Open note`}
              animate={{ y: hovered === i ? -14 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`relative flex shrink-0 justify-center rounded-t-[3px] pt-3 ${focus}`}
              style={{ width: b.w, height: b.h, background: b.color, color: b.fg, boxShadow: "inset -3px 0 0 rgba(0,0,0,.16), inset 2px 0 0 rgba(255,255,255,.1)" }}
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
        {/* the shelf */}
        <div aria-hidden className="h-3 min-w-full rounded-b-sm" style={{ background: C.brown, boxShadow: "0 14px 18px -10px rgba(44,34,30,.5)" }} />
      </div>

      <p className="mt-6 min-h-[3rem] text-sm" aria-live="polite" style={{ ...mono, color: C.brown }}>
        {hoverBook ? (
          <>
            <span className="text-base" style={{ ...serif, color: C.ink }}>{hoverBook.title}</span>
            <span className="block text-xs opacity-80">{hoverBook.author}</span>
          </>
        ) : (
          "Click a book to read my note."
        )}
      </p>

      <AnimatePresence>
        {openBook && <BookNote key={openBook.id} book={openBook} onClose={close} />}
      </AnimatePresence>
    </div>
  );
}
