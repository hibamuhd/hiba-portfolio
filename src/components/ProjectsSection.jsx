"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import {
  Folder, ArrowLeft, ExternalLink, FileText, Layers, Cpu, X, LayoutGrid, List, Download, ImageIcon,
} from "lucide-react";
import { categories, projects, projectsByCategory } from "../data/projectsData";
import CaseStudySection from "./CaseStudyMarkdown";

const C = { sage: "#98A086", rose: "#A76D5E", tan: "#C4A071", beige: "#DFCCB1", brown: "#846044", text: "#2C221E" };
const serif = { fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif" };
const sans = { fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif" };
const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C221E]";
const icons = { folder: Folder, layers: Layers, cpu: Cpu };
const spring = { type: "spring", stiffness: 260, damping: 30 };

/* ───────── Folder card (overview) ───────── */
function CategoryFolder({ cat, onOpen }) {
  const Icon = icons[cat.icon] || Folder;
  const count = projectsByCategory(cat.id).length;
  return (
    <motion.button
      layoutId={`folder-${cat.id}`} transition={spring} onClick={() => onOpen(cat.id)}
      whileHover={{ y: -4 }} aria-label={`Open folder ${cat.name}, ${count} projects`}
      className={`group relative block w-full text-left pt-8 ${focus}`} style={{ ...sans, color: C.text }}
    >
      {/* tab */}
      <span aria-hidden className="absolute left-0 top-0 h-10 w-2/5 rounded-t-md"
        style={{ background: cat.accent, clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }} />
      {/* back sheet peeking out */}
      <span aria-hidden className="absolute inset-x-3 top-6 h-8 rounded-t-md" style={{ background: "#F3E9D8", border: `1px solid ${C.brown}33` }} />
      {/* folder body */}
      <span className="relative block rounded-md rounded-tl-none p-6 min-h-[260px]"
        style={{ background: C.beige, border: `1px solid ${C.brown}55`, boxShadow: "0 10px 24px -12px rgba(44,34,30,.35)" }}>
        <span className="flex items-start justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-md" style={{ background: cat.accent, color: C.text }}>
            <Icon size={22} aria-hidden />
          </span>
          <span className="rounded-md px-2 py-1 text-[11px] font-medium uppercase tracking-wider"
            style={{ border: `1px solid ${cat.accent}`, color: C.brown }}>{count} projects</span>
        </span>
        <h3 className="mt-6 text-2xl" style={serif}>{cat.name}</h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: `${C.text}CC` }}>{cat.description}</p>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium transition-transform group-hover:translate-x-1" style={{ color: C.brown }}>
          Open Folder →
        </span>
      </span>
    </motion.button>
  );
}

/* ───────── Project card ───────── */
function ProjectCard({ project, accent, mode, index, onOpen }) {
  const list = mode === "list";
  const Type = project.contentType === "pdf" ? FileText : project.contentType === "link" ? ExternalLink : Layers;
  return (
    <motion.button
      layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.3 }}
      whileHover={{ y: -3 }} onClick={() => onOpen(project.id)}
      aria-label={`Open project: ${project.title}`}
      className={`group flex w-full overflow-hidden rounded-md text-left ${list ? "flex-row" : "flex-col"} ${focus}`}
      style={{ ...sans, background: "#E8D9BF", border: `1px solid ${C.brown}44`, color: C.text, boxShadow: "0 6px 16px -10px rgba(44,34,30,.4)" }}
    >
      <span className={`relative block aspect-video overflow-hidden ${list ? "w-44 shrink-0 self-start" : "w-full"}`}
        style={{ background: `${accent}55`, borderBottom: list ? "none" : `1px solid ${C.brown}33` }}>
        {project.coverImage ? (
          <Image src={project.coverImage} alt={`${project.title} cover`} fill
            sizes={list ? "176px" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-wider" style={{ color: C.brown }}>
            <ImageIcon size={20} aria-hidden /> Thumbnail
          </span>
        )}
      </span>
      <span className="flex flex-1 flex-col gap-2 p-4">
        <span className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider" style={{ color: C.brown }}>
          <Type size={13} aria-hidden /> {asList(project.tags)[0]}
          {project.placeholder && <span className="rounded px-1.5 py-0.5" style={{ background: C.tan, color: C.text }}>Placeholder</span>}
        </span>
        <span className="text-lg leading-snug" style={serif}>{project.title}</span>
        <span className="text-sm" style={{ color: `${C.text}CC` }}>{project.summary}</span>
        {asList(project.tools).length > 0 && (
          <span className="flex flex-wrap gap-1.5">
            {asList(project.tools).slice(0, 4).map((t) => (
              <span key={t} className="rounded px-2 py-0.5 text-[11px]" style={{ border: `1px solid ${C.brown}66` }}>{t}</span>
            ))}
          </span>
        )}
        <span className="mt-auto pt-1 text-sm font-medium transition-transform group-hover:translate-x-1" style={{ color: C.brown }}>
          View project →
        </span>
      </span>
    </motion.button>
  );
}

/* ───────── Navigation / breadcrumb ───────── */
function ProjectNavigation({ cat, onBack, mode, setMode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3" style={sans}>
      <div className="flex items-center gap-3">
        <button onClick={onBack} className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm ${focus}`}
          style={{ border: `1px solid ${C.brown}`, color: C.text }}>
          <ArrowLeft size={16} aria-hidden /> Back to all categories
        </button>
        <nav aria-label="Breadcrumb" className="text-sm" style={{ color: C.brown }}>
          <ol className="flex gap-2"><li>Projects</li><li aria-hidden>/</li><li aria-current="page" style={{ color: C.text }}>{cat.name}</li></ol>
        </nav>
      </div>
      <div role="group" aria-label="View mode" className="flex overflow-hidden rounded-md" style={{ border: `1px solid ${C.brown}` }}>
        {[["grid", LayoutGrid, "Grid view"], ["list", List, "List view"]].map(([m, I, label]) => (
          <button key={m} onClick={() => setMode(m)} aria-label={label} aria-pressed={mode === m}
            className={`p-2 ${focus}`} style={{ background: mode === m ? C.brown : "transparent", color: mode === m ? C.beige : C.text }}>
            <I size={16} aria-hidden />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────── Expanded folder ───────── */
function FolderView({ cat, onBack, onOpenProject }) {
  const [mode, setMode] = useState("grid");
  const list = projectsByCategory(cat.id);
  const Icon = icons[cat.icon] || Folder;
  return (
    <div>
      <ProjectNavigation cat={cat} onBack={onBack} mode={mode} setMode={setMode} />
      <motion.div layoutId={`folder-${cat.id}`} transition={spring} className="relative mt-6 pt-8">
        <span aria-hidden className="absolute left-0 top-0 h-10 w-1/4 min-w-[140px] rounded-t-md"
          style={{ background: cat.accent, clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }} />
        <div className="rounded-md rounded-tl-none p-6 sm:p-8"
          style={{ background: C.beige, border: `1px solid ${C.brown}55`, boxShadow: "0 10px 24px -12px rgba(44,34,30,.35)", color: C.text }}>
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md" style={{ background: cat.accent }}><Icon size={24} aria-hidden /></span>
            <div style={sans}>
              <h3 className="text-3xl sm:text-4xl" style={serif}>{cat.name}</h3>
              <p className="mt-1 text-sm" style={{ color: C.brown }}>{list.length} projects</p>
              <p className="mt-2 max-w-xl text-sm" style={{ color: `${C.text}CC` }}>{cat.description}</p>
            </div>
          </div>
          <div className={`mt-8 grid gap-5 ${mode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {list.map((p, i) => <ProjectCard key={p.id} project={p} accent={cat.accent} mode={mode} index={i} onOpen={onOpenProject} />)}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ───────── Detail sub-components ───────── */
function ProjectMetrics({ metrics }) {
  if (!metrics?.length) return null;
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {metrics.map((m) => (
        <div key={m.label} className="rounded-md p-4" style={{ background: "#E8D9BF", border: `1px solid ${C.brown}44` }}>
          <dd className="text-2xl" style={serif}>{m.value}</dd>
          <dt className="mt-1 text-xs uppercase tracking-wider" style={{ color: C.brown }}>{m.label}</dt>
        </div>
      ))}
    </dl>
  );
}

const validSrc = (m) => m && typeof m.src === "string" && m.src.trim() !== "";
const asList = (x) => (Array.isArray(x) ? x : []);

function ProjectGallery({ images, videos }) {
  const [failed, setFailed] = useState(() => new Set());
  const fail = (src) => setFailed((prev) => new Set(prev).add(src));
  const imgs = asList(images).filter(validSrc).filter((m) => !failed.has(m.src));
  const vids = asList(videos).filter(validSrc).filter((m) => !failed.has(m.src));
  const total = imgs.length + vids.length;
  if (total === 0) return null;                       // no section, no label, no empty space
  const cols = total === 1 ? "grid-cols-1" : "sm:grid-cols-2";
  return (
    <section aria-label="Media">
      <Label>Media &amp; artifacts</Label>
      <div className={`grid gap-3 ${cols}`}>
        {imgs.map((im) => (
          <img key={im.src} src={im.src} alt={im.alt || ""} loading="lazy" onError={() => fail(im.src)}
            className="h-auto w-full rounded-md" style={{ border: `1px solid ${C.brown}33` }} />
        ))}
        {vids.map((v) => (
          <video key={v.src} src={v.src} controls onError={() => fail(v.src)} aria-label={v.alt || "Project video"}
            className="h-auto w-full rounded-md" />
        ))}
      </div>
    </section>
  );
}

const Label = ({ children }) => (
  <h4 className="mb-2 text-xs font-medium uppercase tracking-widest" style={{ color: C.brown }}>{children}</h4>
);

/* ───────── Project detail (modal) ───────── */
function ProjectDetail({ project, cat, onClose }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  useEffect(() => {
    const prev = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); }
      if (e.key === "Tab" && panelRef.current) {            // simple focus trap
        const f = panelRef.current.querySelectorAll("button, a[href], iframe, [tabindex]:not([tabindex='-1'])");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => { document.removeEventListener("keydown", onKey, true); document.body.style.overflow = overflow; prev?.focus?.(); };
  }, [onClose]);

  const tools = asList(project.tools).filter(Boolean);
  const hasMeta = Boolean(project.role || project.duration || project.year || tools.length);
  const sections = asList(project.sections).filter((x) => x && x.heading && x.body);
  const links = asList(project.links).filter((l) => l && l.url);
  const docs = asList(project.documents).filter((d) => d && d.url);
  const pdfUrl = project.pdf || (project.contentType === "pdf" ? project.documents?.[0]?.url : null);
  return (
    <motion.div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: "rgba(44,34,30,.6)" }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="project-title"
        initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0 }} transition={spring}
        className="max-h-[92vh] w-full max-w-4xl overflow-x-hidden overflow-y-auto rounded-t-md sm:rounded-md"
        style={{ ...sans, background: C.beige, color: C.text, borderTop: `6px solid ${cat.accent}`, boxShadow: "0 30px 60px -20px rgba(0,0,0,.5)" }}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3" style={{ background: C.beige, borderBottom: `1px solid ${C.brown}33` }}>
          <span className="text-xs uppercase tracking-widest" style={{ color: C.brown }}>{cat.name}</span>
          <button ref={closeRef} onClick={onClose} aria-label="Close project" className={`rounded-md p-1.5 ${focus}`}><X size={20} aria-hidden /></button>
        </div>
        <div className="space-y-8 p-6 sm:p-8">
          <header>
            {project.placeholder && (
              <p className="mb-3 inline-block rounded px-2 py-1 text-xs font-medium" style={{ background: C.tan }}>
                PLACEHOLDER — replace with real project content
              </p>
            )}
            <h3 id="project-title" className="text-3xl sm:text-4xl" style={serif}>{project.title}</h3>
            {project.summary && <p className="mt-3 max-w-2xl" style={{ color: `${C.text}DD` }}>{project.summary}</p>}
            {asList(project.tags).length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {asList(project.tags).map((t) => <span key={t} className="rounded px-2 py-1 text-xs" style={{ background: `${cat.accent}77` }}>{t}</span>)}
              </div>
            )}
          </header>

          {(project.description || project.problem || hasMeta) && (
            <section aria-label="Overview" className={hasMeta ? "grid gap-8 sm:grid-cols-3" : ""}>
              {(project.description || project.problem) && (
                <div className={`space-y-5 ${hasMeta ? "sm:col-span-2" : "max-w-3xl"}`}>
                  {project.description && <div><Label>About</Label><p className="text-sm leading-relaxed">{project.description}</p></div>}
                  {project.problem && <div><Label>Problem</Label><p className="text-sm leading-relaxed">{project.problem}</p></div>}
                </div>
              )}
              {hasMeta && (
                <aside aria-label="Project details" className={`space-y-5 text-sm ${!(project.description || project.problem) ? "sm:col-span-3 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0" : ""}`}>
                  {project.role && <div><Label>My role</Label>{project.role}</div>}
                  {project.duration && <div><Label>Duration</Label>{project.duration}</div>}
                  {project.year && <div><Label>Year</Label>{project.year}</div>}
                  {tools.length > 0 && (
                    <div><Label>Tools</Label>
                      <ul className="flex flex-wrap gap-1.5">{tools.map((t) => <li key={t} className="rounded px-2 py-0.5 text-xs" style={{ border: `1px solid ${C.brown}66` }}>{t}</li>)}</ul>
                    </div>
                  )}
                </aside>
              )}
            </section>
          )}

          <ProjectMetrics metrics={project.metrics} />

          {sections.map((s, i) => (
            <CaseStudySection key={s.heading} section={s} index={i} accent={cat.accent} />
          ))}

          <ProjectGallery images={project.images} videos={project.videos} />

          {pdfUrl && (
            <section aria-label="PDF document">
              <Label>Document</Label>
              <div className="mb-3 flex flex-wrap gap-3">
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm ${focus}`} style={{ background: C.brown, color: C.beige }}>
                  <ExternalLink size={16} aria-hidden /> Open in new tab
                </a>
                <a href={pdfUrl} download
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm ${focus}`} style={{ border: `1px solid ${C.brown}` }}>
                  <Download size={16} aria-hidden /> Download PDF
                </a>
              </div>
              <iframe src={`${pdfUrl}#view=FitH`} title={`${project.title} PDF`} loading="lazy"
                className="h-[70vh] min-h-[420px] w-full rounded-md sm:h-[600px] lg:h-[700px]"
                style={{ border: `1px solid ${C.brown}55`, background: "#fff" }} />
              <p className="mt-2 text-xs" style={{ color: C.brown }}>
                If the preview doesn’t load on your device, use “Open in new tab” or “Download PDF”.
              </p>
            </section>
          )}

          {(links.length > 0 || docs.length > 0) && (
            <div className="flex flex-wrap gap-3">
              {links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm ${focus}`} style={{ background: C.brown, color: C.beige }}>
                  <ExternalLink size={16} aria-hidden /> {l.label}
                </a>
              ))}
              {docs.map((d) => (
                <a key={d.url} href={d.url} target="_blank" rel="noopener noreferrer" download
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm ${focus}`} style={{ border: `1px solid ${C.brown}` }}>
                  <Download size={16} aria-hidden /> {d.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───────── Root ───────── */
export default function ProjectsSection() {
  const [catId, setCatId] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const reduce = useReducedMotion();
  const cat = categories.find((c) => c.id === catId);
  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    if (!catId || projectId) return;       // detail handles its own Escape
    const onKey = (e) => e.key === "Escape" && setCatId(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [catId, projectId]);

  return (
    <MotionConfig reducedMotion={reduce ? "always" : "user"}>
      <section id="projects" aria-labelledby="projects-heading" className="px-5 py-20 sm:px-8"
        style={{ ...sans, color: C.text, background: "#EFE4D0" }}>
        <div className="mx-auto max-w-6xl">
          <header className="mb-12 max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em]" style={{ color: C.brown }}>Projects</p>
            <h2 id="projects-heading" className="mt-3 text-4xl sm:text-5xl" style={serif}>How I Turn Ideas Into Things</h2>
            <p className="mt-4 leading-relaxed" style={{ color: `${C.text}CC` }}>
              Across product, analytics and engineering, I start with a real problem and work toward something that can be tested, measured and shipped. Open a folder to explore.
            </p>
          </header>

          {!cat ? (
            <div className="grid gap-8 md:grid-cols-3">
              {categories.map((c) => <CategoryFolder key={c.id} cat={c} onOpen={setCatId} />)}
            </div>
          ) : (
            <FolderView cat={cat} onBack={() => setCatId(null)} onOpenProject={setProjectId} />
          )}
        </div>

        <AnimatePresence>
          {project && <ProjectDetail key={project.id} project={project} cat={categories.find((c) => c.id === project.category)} onClose={() => setProjectId(null)} />}
        </AnimatePresence>
      </section>
    </MotionConfig>
  );
}