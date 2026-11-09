"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { C, serif } from "../../lib/theme";
import { bakes, kitchenIntro } from "../../data/siteData";

export default function KitchenJournal() {
  return (
    <div className="p-6 sm:p-9">
      <div className="max-w-xl">
        <h2 className="text-2xl sm:text-[1.9rem]" style={{ ...serif, fontWeight: 500 }}>The Kitchen Journal</h2>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: `${C.ink}CC` }}>{kitchenIntro}</p>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {bakes.map((b, i) => (
          <motion.li
            key={b.src}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          >
            <figure>
              <div className="relative aspect-square overflow-hidden rounded-2xl" style={{ background: C.beige }}>
                <Image
                  src={b.src}
                  alt={b.title}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-300 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
                />
              </div>
              <figcaption className="mt-3">
                <span className="block text-lg leading-snug" style={{ ...serif, fontWeight: 500 }}>{b.title}</span>
                <span className="mt-1 block text-sm leading-relaxed" style={{ color: `${C.ink}B3` }}>{b.caption}</span>
              </figcaption>
            </figure>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
