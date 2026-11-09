"use client";
import { motion } from "framer-motion";

// Re-mounts on every navigation: a soft fade for the page content only.
// Opacity-only on purpose, so no transform is left on an ancestor of the
// Projects modal (position: fixed).
export default function Template({ children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      {children}
    </motion.div>
  );
}
