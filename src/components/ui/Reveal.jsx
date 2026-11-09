"use client";
import { motion } from "framer-motion";
import { ease } from "../../lib/theme";

// Fades/lifts content in once as it enters the viewport. Honors reduced-motion
// via <MotionConfig reducedMotion="user"> in SiteShell.
export default function Reveal({ children, delay = 0, y = 18, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
