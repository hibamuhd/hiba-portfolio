"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChefHat, Cpu, Folder, Layers, Lock } from "lucide-react";
import { C, mono, focus } from "../../lib/theme";

const ICONS = { folder: Folder, layers: Layers, cpu: Cpu, book: BookOpen, chef: ChefHat };
const BODY = "#F6EEDF";
const STRIP = "#E7D8BD";

// A browser window whose tabs are the content categories. Click a tab (or use the
// arrow keys) to switch the page inside. Each tab is { id, label, icon, accent, url, panel }.
export default function BrowserTabs({ tabs, ariaLabel, toolbarRight = null, idPrefix = "tabs" }) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  const current = tabs[active];

  function onKeyDown(e) {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    let next = null;
    if (step) next = (active + step + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div
      className="overflow-hidden rounded-2xl sm:rounded-3xl"
      style={{ background: BODY, border: `1px solid ${C.brown}33`, boxShadow: "0 30px 60px -34px rgba(132,96,68,.45), 0 2px 6px rgba(44,34,30,.05)" }}
    >
      {/* tab strip */}
      <div className="flex items-end gap-4 px-3 pt-3 sm:px-5" style={{ background: STRIP }}>
        <div className="mb-3.5 hidden gap-2 sm:flex" aria-hidden>
          {[C.rose, C.tan, C.sage].map((c) => (
            <span key={c} className="h-3 w-3 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div
          role="tablist"
          aria-label={ariaLabel}
          onKeyDown={onKeyDown}
          className="flex min-w-0 flex-1 items-end gap-1 overflow-x-auto [scrollbar-width:none]"
        >
          {tabs.map((t, i) => {
            const on = i === active;
            const Icon = ICONS[t.icon] || Folder;
            return (
              <button
                key={t.id}
                ref={(el) => { refs.current[i] = el; }}
                role="tab"
                id={`${idPrefix}-tab-${t.id}`}
                aria-selected={on}
                aria-controls={`${idPrefix}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative flex shrink-0 items-center gap-2 rounded-t-xl px-4 py-2.5 text-[13px] font-medium transition-colors ${on ? "" : "hover:bg-white/40"} ${focus}`}
                style={{ color: on ? C.ink : `${C.ink}A6` }}
              >
                {on && (
                  <motion.span
                    layoutId={`${idPrefix}-tab-bg`}
                    aria-hidden
                    className="absolute inset-0 rounded-t-xl"
                    style={{ background: BODY }}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  >
                    <span className="absolute inset-x-3 top-0 h-[2px] rounded-b-full" style={{ background: t.accent }} />
                  </motion.span>
                )}
                <Icon size={15} aria-hidden className="relative" style={{ color: t.accent }} />
                <span className="relative whitespace-nowrap">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* address bar */}
      <div className="flex items-center gap-3 border-b px-4 py-2.5 sm:px-5" style={{ background: BODY, borderColor: `${C.brown}22` }}>
        <div
          aria-hidden
          className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px]"
          style={{ ...mono, color: C.brown, background: "rgba(255,255,255,.6)", border: `1px solid ${C.brown}22`, maxWidth: 460 }}
        >
          <Lock size={10} style={{ color: C.sage }} />
          <span className="truncate">{current.url}</span>
        </div>
        {toolbarRight}
      </div>

      {/* page */}
      <div role="tabpanel" id={`${idPrefix}-panel`} aria-labelledby={`${idPrefix}-tab-${current.id}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {current.panel}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
