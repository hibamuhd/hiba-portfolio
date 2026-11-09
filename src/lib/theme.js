// Shared design tokens. Mirrors the palette already used in ProjectsSection.jsx so the
// homepage and the Projects section read as one site.
export const C = {
  sage: "#98A086",
  rose: "#A76D5E",
  tan: "#C4A071",
  beige: "#DFCCB1",
  brown: "#846044",
  ink: "#2C221E",
  paper: "#EFE4D0", // same background ProjectsSection uses
};

export const serif = { fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif" };
export const sans = { fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif" };
export const mono = { fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace" };

export const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C221E]";

export const ease = [0.22, 1, 0.36, 1];
