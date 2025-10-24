"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";

const skills = [
  { name: "React", category: "frontend", level: 95 },
  { name: "Next.js", category: "frontend", level: 90 },
  { name: "TypeScript", category: "frontend", level: 90 },
  { name: "Tailwind CSS", category: "frontend", level: 95 },
  { name: "Framer Motion", category: "frontend", level: 85 },
  { name: "Node.js", category: "backend", level: 80 },
  { name: "Express", category: "backend", level: 80 },
  { name: "Prisma", category: "backend", level: 85 },
  { name: "PostgreSQL", category: "backend", level: 75 },
  { name: "MongoDB", category: "backend", level: 70 },
  { name: "Docker", category: "devops", level: 70 },
  { name: "Git", category: "devops", level: 90 },
  { name: "Vercel", category: "devops", level: 85 },
  { name: "AWS", category: "devops", level: 65 },
];

export default function Skills() {
  const [filter, setFilter] = useState("all");

  const filteredSkills =
    filter === "all" ? skills : skills.filter((s) => s.category === filter);

  const categories = [
    { id: "all", label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "devops", label: "DevOps" },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Skills & Technologies
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Technologies I work with on a daily basis
          </p>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-2 rounded-full transition-all ${
                  filter === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{skill.name}</span>
                      <span className="text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}