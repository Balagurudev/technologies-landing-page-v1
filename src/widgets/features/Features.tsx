"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, Globe, Trophy } from "lucide-react";

const features = [
  {
    icon: <Brain className="h-6 w-6 text-brand-600" />,
    title: "AI-Powered Learning",
    description: "Our adaptive engine personalizes your curriculum based on your progress and learning style."
  },
  {
    icon: <Globe className="h-6 w-6 text-brand-600" />,
    title: "Global Community",
    description: "Connect with learners and mentors from around the world to collaborate and grow."
  },
  {
    icon: <Trophy className="h-6 w-6 text-brand-600" />,
    title: "Gamified Progress",
    description: "Earn achievements and track your progress with our immersive reward system."
  },
  {
    icon: <BookOpen className="h-6 w-6 text-brand-600" />,
    title: "Vast Library",
    description: "Access thousands of high-quality courses across technology, business, and arts."
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const Features = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Everything you need to excel
          </h2>
          <p className="text-lg text-secondary-foreground">
            Solutions provides a comprehensive suite of tools designed to make your learning journey as effective and enjoyable as possible.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0,0,0,0.05)" }}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm transition-all"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950/30">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
