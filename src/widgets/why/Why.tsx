"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const points = [
  "An Avenue Projects, R&D across Middle East, Association with National Advisory Boards.",
  "Technology partnership with Texas, Raspi, Amplifier, DLA, HRD, ELSIE, CSE, Raspi 12B, Raspi 4M.",
  "SCADA, Sigtec Technologies, ETAP, HMI, RTU, SCADA, Automation, map systems, Autonell, FLC, Eltec, Dell Raspi.",
  "Awards: Solve Problems Solutions, S.A. Philip, Solutions of Automation, SurreBisions, more.",
];

export const Why = () => {
  return (
    <section className="py-24 bg-muted/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-800 dark:border-brand-900 dark:bg-brand-950/50 dark:text-brand-300">
              Our Edge
            </div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>
              WHY SOLUTIONS?
            </h2>
            <p className="mb-8 text-base text-muted-foreground leading-relaxed">
              Solutions Global is an Avenue Projects, R&D facility associated with National Advisory Boards.
              We are one of India's most trusted brands for turnkey projects (EPC) training schools,
              with proven delivery across 18+ countries and 200+ live deployments.
            </p>
            <ul className="space-y-4">
              {points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  {pt}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "18+", label: "Countries Served" },
              { value: "200+", label: "Live Deployments" },
              { value: "5000+", label: "Professionals Trained" },
              { value: "12+", label: "Years of Excellence" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <p className="mb-1 text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
