"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Factory, FlaskConical } from "lucide-react";

const categories = [
  {
    icon: <Cpu className="h-8 w-8 text-white" />,
    title: "Embedded Automation",
    gradient: "from-brand-700 to-brand-900",
  },
  {
    icon: <Factory className="h-8 w-8 text-white" />,
    title: "Industrial Automation",
    gradient: "from-brand-600 to-brand-800",
  },
  {
    icon: <FlaskConical className="h-8 w-8 text-white" />,
    title: "R&D Engineering Solutions",
    gradient: "from-brand-500 to-brand-700",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const Hero = () => {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-16">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(209,224,255,0.45),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,64,193,0.18),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent" />

      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-800 dark:border-brand-900 dark:bg-brand-950/60 dark:text-brand-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
          India&apos;s Top R&D Facility
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Projects <span className="text-muted-foreground/40 font-light">|</span>{" "}
          <span className="text-primary">R&D</span>{" "}
          <span className="text-muted-foreground/40 font-light">|</span> Trainings
        </motion.h1>

        {/* Sub-description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          Solutions Global is India&apos;s top R&D facility providing manufacturing training in
          Embedded Systems, PLC Stack, AI, Labview, ETAP and more.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mb-20"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06, boxShadow: "0px 10px 24px rgba(0,64,193,0.35)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="group inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-8 text-base font-semibold text-white"
          >
            Enquire Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        {/* Category cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.gradient} p-6 text-left shadow-lg cursor-pointer`}
            >
              <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                {cat.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{cat.title}</h3>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/5" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
