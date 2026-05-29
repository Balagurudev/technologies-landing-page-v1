"use client";

import { motion } from "framer-motion";
import { Cog, FlaskConical, GraduationCap } from "lucide-react";

const services = [
  {
    icon: <Cog className="h-8 w-8" />,
    title: "PROJECTS",
    description:
      "Solutions Global delivers advanced automation projects in Oil and Gas, and Chemicals, embedded solutions, and intelligent building management for global clients.",
    accent: "from-brand-600 to-brand-800",
  },
  {
    icon: <FlaskConical className="h-8 w-8" />,
    title: "R&D",
    description:
      "Solutions Global drives innovative R&D projects in embedded systems, robotics, IOT, and automation technologies integrated in our world applications.",
    accent: "from-brand-500 to-brand-700",
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: "TRAININGS",
    description:
      "Solutions Global offers industry-relevant, hands-on training in embedded systems, and latest technologies to upskill part-time professionals.",
    accent: "from-brand-700 to-brand-900",
  },
];

export const Services = () => {
  return (
    <section id="services" className="relative overflow-hidden bg-slate-900 py-28">
      {/* Glow accents */}
      <div className="absolute left-1/3 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-700/20 blur-3xl" />
      <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-brand-500/10 blur-2xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center"
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-brand-700 bg-brand-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-300">
            What We Offer
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>
            Services
          </h2>
          <p className="mt-3 text-slate-400">
            India&apos;s most trusted brand of turnkey projects (EPC) training school.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all"
            >
              {/* Top gradient bar */}
              <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${svc.accent} text-white shadow-lg`}>
                {svc.icon}
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">{svc.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{svc.description}</p>
              {/* Bottom glow on hover */}
              <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${svc.accent} transition-all duration-300 group-hover:w-full`} />
            </motion.div>
          ))}
        </div>

        {/* Sub-section: Cutting Edge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-20 rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-sm"
        >
          <h3 className="mb-5 text-2xl font-bold text-white">
            Cutting-Edge Technologies Training and R&D Projects
          </h3>
          <p className="mx-auto mb-4 max-w-2xl text-sm leading-relaxed text-slate-400">
            With years of experience and an industry-first attitude, Solutions Global has always been
            Technology-First and Training-First. Our team of professionals are seasoned and
            experienced to deliver global-scale automation projects.
          </p>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-400">
            Our lab facilities are equipped with thousands of training kits and practices — a dedicated
            Certified PLC, Grade OT, pre-line ETAP Training. These bring a world-class practice into
            classroom, ensuring you stay in cutting-edge territory.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
