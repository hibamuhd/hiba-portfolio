import { C, mono } from "../../lib/theme";

export default function SectionLabel({ n, children, light = false }) {
  return (
    <p
      className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em]"
      style={{ ...mono, color: light ? C.tan : C.brown }}
    >
      <span>{n}</span>
      <span aria-hidden className="h-px w-10" style={{ background: "currentColor", opacity: 0.5 }} />
      <span>{children}</span>
    </p>
  );
}
