"use client";

import { motion } from "framer-motion";
import { Cpu, Activity, Brain, Building2, Wifi, Code2, Gauge, BarChart, Network } from "lucide-react";

const courses = [
  { icon: <Cpu className="h-5 w-5" />, title: "Embedded Systems", color: "bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300" },
  { icon: <Activity className="h-5 w-5" />, title: "PLC SCADA DCS", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" },
  { icon: <Brain className="h-5 w-5" />, title: "AI ML with Python", color: "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300" },
  { icon: <Building2 className="h-5 w-5" />, title: "Building Management Systems — BMS", color: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300" },
  { icon: <Wifi className="h-5 w-5" />, title: "IOT with NASSCOM Certification", color: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300" },
  { icon: <Code2 className="h-5 w-5" />, title: "Java Full Stack", color: "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300" },
  { icon: <Gauge className="h-5 w-5" />, title: "AI LabView", color: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300" },
  { icon: <BarChart className="h-5 w-5" />, title: "ETAP — Matlab", color: "bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-300" },
  { icon: <Network className="h-5 w-5" />, title: "Salesnet", color: "bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const Courses = () => {
  return (
    <section id="courses" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="mb-3 inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-800 dark:border-brand-900 dark:bg-brand-950/50 dark:text-brand-300">
            Curriculum
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>
            Advanced Courses at Leading Solutions Training Institute
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-muted-foreground">
            Industry-relevant, hands-on programs designed by R&D engineers for working professionals.
          </p>
        </motion.div>

        {/* Course grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {courses.map((course, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -4, boxShadow: "0 10px 24px rgba(0,64,193,0.08)" }}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all cursor-pointer"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${course.color} transition-all`}>
                {course.icon}
              </div>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {course.title}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
