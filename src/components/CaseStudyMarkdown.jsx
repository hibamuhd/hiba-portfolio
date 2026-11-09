"use client";
import React, { Children, isValidElement, createContext, useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const C = { sage: "#98A086", rose: "#A76D5E", tan: "#C4A071", beige: "#DFCCB1", brown: "#846044", text: "#2C221E" };
const serif = { fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif" };
const line = `1px solid ${C.brown}44`;
const Depth = createContext(0);
const kids = (children) => Children.toArray(children).filter(isValidElement);
const plain = (n) => Children.toArray(n).map((c) => (typeof c === "string" ? c : isValidElement(c) ? plain(c.props.children) : "")).join("");

/* Layout is chosen by section.layout, or inferred from the section heading. */
export function inferLayout(heading = "") {
  const h = heading.toLowerCase();
  if (h.includes("research") || h.includes("discovery") || h.includes("analysis")) return "research";
  if (h.includes("strategy")) return "strategy";
  if (h.includes("implementation") || h.includes("execution")) return "implementation";
  return "default";
}

function makeComponents(layout, accent) {
  const Num = ({ i }) => (
    <span className="text-xs font-medium tracking-widest" style={{ color: accent === C.beige ? C.brown : C.brown }}>
      {String(i + 1).padStart(2, "0")}
    </span>
  );
  return {
    h1: ({ children }) => <h3 className="mb-4 mt-12 text-3xl leading-tight first:mt-0" style={serif}>{children}</h3>,
    h2: ({ children }) => <h3 className="mb-4 mt-12 text-3xl leading-tight first:mt-0" style={serif}>{children}</h3>,
    h3: ({ children }) => <h4 className="mb-3 mt-10 text-2xl leading-snug first:mt-0" style={serif}>{children}</h4>,
    h4: ({ children }) => (
      <h5 className="mb-2 mt-8 text-[11px] font-medium uppercase tracking-[0.2em] first:mt-0" style={{ color: C.brown }}>{children}</h5>
    ),
    p: ({ children }) => {
      const only = kids(children);
      const focal = only.length === 1 && only[0].type === "strong" && plain(children).length > 20 && Children.count(children) === 1;
      if (focal) return <FocalLine>{children}</FocalLine>;
      return <p className="mb-5 max-w-[68ch] text-[15px] leading-7" style={{ color: `${C.text}E6` }}>{children}</p>;
    },
    strong: ({ children }) => <strong className="font-semibold" style={{ color: C.text }}>{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 focus-visible:outline focus-visible:outline-2" style={{ color: C.brown }}>{children}</a>
    ),
    hr: () => <hr className="my-10 border-0" style={{ borderTop: `1px solid ${C.brown}55` }} />,
    blockquote: ({ children }) => <FocalLine>{children}</FocalLine>,
    code: ({ children }) => <code className="rounded px-1.5 py-0.5 text-[13px]" style={{ background: `${C.brown}22` }}>{children}</code>,

    /* Tables → real, horizontally scrollable tables */
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto rounded-md" style={{ border: line }} tabIndex={0} role="region" aria-label="Table">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead style={{ background: C.brown, color: C.beige }}>{children}</thead>,
    tr: ({ children }) => <tr className="even:bg-[#E8D9BF]">{children}</tr>,
    th: ({ children }) => <th className="px-4 py-3 text-[11px] font-medium uppercase tracking-wider">{children}</th>,
    td: ({ children }) => <td className="px-4 py-3 align-top leading-6" style={{ borderTop: line }}>{children}</td>,

    /* Ordered lists → numbered grid (research) / vertical timeline (implementation) / plain */
    ol: ({ children }) => {
      const items = kids(children);
      if (layout === "research" && items.length >= 3)
        return (
          <ol className="my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((li, i) => (
              <li key={i} className="rounded-md p-4 text-sm leading-6" style={{ background: "#E8D9BF", border: line }}>
                <Num i={i} /><div className="mt-2 [&>p]:mb-0 [&>p]:text-sm">{li.props.children}</div>
              </li>
            ))}
          </ol>
        );
      if (layout === "implementation" && items.length >= 3)
        return (
          <ol className="my-8 ml-3 space-y-6 border-l pl-8" style={{ borderColor: `${C.brown}66` }}>
            {items.map((li, i) => (
              <li key={i} className="relative text-sm leading-6">
                <span aria-hidden className="absolute -left-[46px] grid h-7 w-7 place-items-center rounded-full text-xs font-medium"
                  style={{ background: C.brown, color: C.beige }}>{i + 1}</span>
                <div className="[&>p]:mb-1 [&>p]:text-sm">{li.props.children}</div>
              </li>
            ))}
          </ol>
        );
      return <ol className="mb-5 ml-5 max-w-[68ch] list-decimal space-y-1.5 text-[15px] leading-7 marker:text-[#846044]">{children}</ol>;
    },

    /* Top-level bullet lists in research/implementation → compact label cards; nested → normal */
    ul: function UL({ children }) {
      const depth = useContext(Depth);
      const items = kids(children);
      const cards = depth === 0 && (layout === "research" || layout === "implementation") && items.length >= 3 && items.length <= 6;
      return (
        <Depth.Provider value={depth + 1}>
          {cards ? (
            <ul className="my-6 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(170px,1fr))]">
              {items.map((li, i) => (
                <li key={i} className="rounded-md px-4 py-3 text-sm leading-6" style={{ border: `1px solid ${accent}`, background: `${accent}22` }}>
                  <div className="[&>p]:mb-0 [&>p]:text-sm">{li.props.children}</div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className={`mb-5 max-w-[68ch] list-disc space-y-1.5 text-[15px] leading-7 marker:text-[#846044] ${depth ? "mt-1.5 ml-5" : "ml-5"}`}>{children}</ul>
          )}
        </Depth.Provider>
      );
    },
    li: ({ children }) => <li className="pl-1 [&>p]:mb-1">{children}</li>,
  };
}

/* Big pull-line used for the key idea of a section */
function FocalLine({ children }) {
  return (
    <div className="my-8 rounded-md px-6 py-7 sm:px-8" style={{ background: C.text, color: C.beige }}>
      <p className="text-[10px] font-medium uppercase tracking-[0.25em]" style={{ color: C.tan }}>Core idea</p>
      <div className="mt-2 text-2xl leading-snug sm:text-3xl [&_p]:m-0 [&_strong]:font-normal [&_strong]:text-inherit" style={serif}>{children}</div>
    </div>
  );
}

function Md({ body, layout, accent }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={makeComponents(layout, accent)}>
      {body}
    </ReactMarkdown>
  );
}

/* Strategy: split on "### " so each group becomes one of a few visual blocks */
function Pillars({ body, accent }) {
  const parts = body.split(/^###\s+/m);
  const intro = parts.shift();
  return (
    <>
      {intro.trim() && <Md body={intro} layout="strategy" accent={accent} />}
      <div className="my-8 grid gap-4 md:grid-cols-3">
        {parts.map((p, i) => {
          const [title, ...rest] = p.split("\n");
          return (
            <article key={i} className="rounded-md p-5" style={{ background: "#E8D9BF", border: line, borderTop: `4px solid ${accent}` }}>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: C.brown }}>{String(i + 1).padStart(2, "0")}</p>
              <h5 className="mb-3 mt-1 text-xl" style={serif}>{title.trim()}</h5>
              <div className="text-sm [&_p]:mb-2 [&_p]:text-sm [&_ul]:text-sm"><Md body={rest.join("\n")} layout="strategy" accent={accent} /></div>
            </article>
          );
        })}
      </div>
    </>
  );
}

/* One case-study section: kicker + serif heading + rendered Markdown */
export default function CaseStudySection({ section, index, accent = C.tan }) {
  const layout = section.layout || inferLayout(section.heading);
  const h3Count = (section.body.match(/^###\s+/gm) || []).length;
  const usePillars = section.layout === "pillars" || (layout === "strategy" && h3Count >= 2 && h3Count <= 4);
  return (
    <section aria-labelledby={`sec-${index}`} className="border-t pt-10" style={{ borderColor: `${C.brown}33` }}>
      <p className="text-[11px] font-medium uppercase tracking-[0.25em]" style={{ color: C.brown }}>
        {String(index + 1).padStart(2, "0")} — {section.kicker || "Case study"}
      </p>
      <h4 id={`sec-${index}`} className="mb-6 mt-2 text-3xl sm:text-4xl" style={serif}>{section.heading}</h4>
      {usePillars ? <Pillars body={section.body} accent={accent} /> : <Md body={section.body} layout={layout} accent={accent} />}
    </section>
  );
}
