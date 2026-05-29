"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const references = [
  {
    name: "King Khalid Medical City Hospital Complex",
    location: "Saudi Arabia, Hafr Al-Batin",
    type: "International",
    category: "Embedded Automation",
  },
  {
    name: "ONGC Offshore Control Systems",
    location: "Mumbai, India",
    type: "Domestic",
    category: "Industrial Automation",
  },
  {
    name: "Indian Railways Signal Modernisation",
    location: "New Delhi, India",
    type: "Domestic",
    category: "R&D Engineering",
  },
];

const bulletinItems = [
  "AICTRO PLC, RTD Embedded Modules by Solutions Global — Programmed, Designed & Tested by Our Team of 32 R&D Engineers.",
  "New batch starting for AI ML with Python — Limited seats available.",
  "NASSCOM certified IoT course now open for registration.",
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="mb-3 inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-800 dark:border-brand-900 dark:bg-brand-950/50 dark:text-brand-300">
            Portfolio
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>
            PROJECT REFERENCES
          </h2>
          <p className="mt-3 text-muted-foreground">International &amp; Domestic Projects</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Project cards */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {references.map((ref, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,64,193,0.1)" }}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all"
              >
                <span className="mb-3 inline-block rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800 dark:bg-brand-950/50 dark:text-brand-300">
                  {ref.type}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{ref.name}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{ref.category}</p>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{ref.location}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bulletin board */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-border bg-slate-900 dark:bg-brand-950/20 p-6 h-fit"
          >
            <h3 className="mb-5 text-base font-bold uppercase tracking-widest text-white">
              📋 Bulletin Board
            </h3>
            <ul className="space-y-4">
              {bulletinItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
