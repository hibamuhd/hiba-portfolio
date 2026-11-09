import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { C, serif, mono } from "../../lib/theme";
import { categories, projects } from "../../data/projectsData";
import BrowserTabs from "../ui/BrowserTabs";
import SectionLabel from "../ui/SectionLabel";
import Reveal from "../ui/Reveal";

const linkBtn = "group inline-flex items-center gap-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C221E]";

function WorkPanel({ cat, items }) {
  return (
    <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]" style={{ ...mono, color: C.brown }}>
          <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: cat.accent }} />
          Folder
        </p>
        <h3 className="mt-3 text-2xl sm:text-[1.9rem]" style={{ ...serif, fontWeight: 500, lineHeight: 1.15 }}>{cat.name}</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed" style={{ color: `${C.ink}CC` }}>{cat.description}</p>
        <Link href="/projects" className={`${linkBtn} mt-6`} style={{ color: C.ink }}>
          <span className="border-b pb-0.5" style={{ borderColor: cat.accent }}>Open this folder</span>
          <ArrowRight size={15} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <ul className="lg:col-span-7" aria-label={`${cat.name} projects`}>
        {items.map((it) => (
          <li key={it.id}>
            <Link
              href="/projects"
              className="group flex items-start justify-between gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C221E]"
            >
              <span className="block min-w-0">
                <span className="block text-[15px] leading-snug" style={{ ...serif, fontWeight: 500 }}>{it.title}</span>
                {it.summary && <span className="mt-0.5 block text-xs leading-relaxed" style={{ color: `${C.ink}B3` }}>{it.summary}</span>}
              </span>
              <ArrowUpRight size={16} aria-hidden className="mt-1 shrink-0 opacity-30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" style={{ color: cat.accent }} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Entry point to the existing Projects section. It only READS categories/projects from
// projectsData.js; the folders, grid/list toggle, modal and PDF viewer all live on
// /projects, in the untouched ProjectsSection.jsx. Placeholder entries are not listed here.
export default function ProjectsGateway() {
  const tabs = categories.map((cat) => {
    const items = projects
      .filter((p) => p.category === cat.id && !p.placeholder)
      .slice(0, 6)
      .map(({ id, title, summary }) => ({ id, title, summary }));
    return {
      id: cat.id,
      label: cat.name,
      icon: cat.icon,
      accent: cat.accent,
      url: `hiba.design/projects/${cat.id}`,
      panel: <WorkPanel cat={cat} items={items} />,
    };
  });

  return (
    <section id="work" aria-labelledby="work-heading" className="px-4 py-20 sm:px-8 sm:py-28" style={{ background: "#E9DBC2", scrollMarginTop: 64 }}>
      <div className="mx-auto max-w-6xl">
        <SectionLabel n="03">Work</SectionLabel>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
          <h2 id="work-heading" style={{ ...serif, fontWeight: 500, fontSize: "clamp(1.8rem, 3.6vw, 2.7rem)", lineHeight: 1.12 }}>
            How I turn ideas <em style={{ color: C.rose }}>into things</em>
          </h2>
          <p className="max-w-xs text-sm leading-relaxed" style={{ color: `${C.ink}B3` }}>
            Product, analytics and engineering. Switch tabs to browse each folder.
          </p>
        </div>

        <Reveal className="mt-10">
          <BrowserTabs
            tabs={tabs}
            ariaLabel="Project folders"
            idPrefix="work"
            toolbarRight={
              <Link
                href="/projects"
                className="group hidden shrink-0 items-center gap-1.5 rounded-full bg-[#2C221E] px-4 py-1.5 text-xs font-medium text-[#EFE4D0] transition-colors hover:bg-[#A76D5E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C221E] sm:inline-flex"
              >
                Open all projects
                <ArrowRight size={13} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            }
          />
        </Reveal>

        <div className="mt-6 sm:hidden">
          <Link href="/projects" className={linkBtn} style={{ color: C.ink }}>
            <span className="border-b pb-0.5" style={{ borderColor: C.rose }}>Open all projects</span>
            <ArrowRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
