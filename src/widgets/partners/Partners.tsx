"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "ISRO", abbr: "ISRO" },
  { name: "AI Language", abbr: "AI Language" },
  { name: "EduIndia", abbr: "EduIndia" },
  { name: "NASSCOM", abbr: "NASSCOM" },
  { name: "Ministry of Education", abbr: "MoE" },
];

export const Partners = () => {
  return (
    <section className="border-y border-border bg-muted/40 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Recognized &amp; Partnered With
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 lg:gap-16"
        >
          {partners.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.2 }}
              className="flex h-12 min-w-[80px] items-center justify-center rounded-lg border border-border bg-card px-4 text-sm font-bold text-muted-foreground shadow-sm grayscale hover:grayscale-0 transition-all"
            >
              {p.abbr}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
