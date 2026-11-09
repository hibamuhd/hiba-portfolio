"use client";
import { MotionConfig } from "framer-motion";
import { C, sans, focus } from "../../lib/theme";
import Header from "./Header";
import Footer from "./Footer";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap";

// Persistent chrome (header + footer) shared by Home and Projects.
// Rendered from app/(site)/layout.jsx, so it does not remount between routes.
export default function SiteShell({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      {/* React 19 hoists these into <head>. They make the font names used by
          ProjectsSection.jsx ('Playfair Display', Inter) resolve to real fonts. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={FONTS} precedence="default" />

      <div className="flex min-h-screen flex-col" style={{ ...sans, background: C.paper, color: C.ink }}>
        <a
          href="#main"
          className={`sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[#2C221E] focus:px-4 focus:py-2 focus:text-[#EFE4D0] ${focus}`}
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
