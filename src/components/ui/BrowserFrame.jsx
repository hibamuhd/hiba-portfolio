import { Lock } from "lucide-react";
import { C, mono } from "../../lib/theme";

// A soft browser-window frame (palette-coloured window dots + URL pill), echoing the
// frame on the original site. Purely presentational.
export default function BrowserFrame({ url, children }) {
  return (
    <div
      className="overflow-hidden rounded-2xl sm:rounded-3xl"
      style={{
        background: "#F6EEDF",
        border: `1px solid ${C.brown}33`,
        boxShadow: "0 30px 60px -34px rgba(132,96,68,.45), 0 2px 6px rgba(44,34,30,.05)",
      }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 sm:px-5"
        style={{ background: `${C.beige}8C`, borderBottom: `1px solid ${C.brown}22` }}
      >
        <div className="flex gap-2" aria-hidden>
          {[C.rose, C.tan, C.sage].map((c) => (
            <span key={c} className="h-3 w-3 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div
          className="mx-auto flex items-center gap-1.5 rounded-full px-4 py-1 text-[11px]"
          style={{ ...mono, color: C.brown, background: "rgba(255,255,255,.6)", border: `1px solid ${C.brown}22` }}
        >
          <Lock size={10} aria-hidden style={{ color: C.sage }} />
          {url}
        </div>
        <div aria-hidden className="hidden w-12 sm:block" />
      </div>
      {children}
    </div>
  );
}
