"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  const t = useTranslations("projects");

  const projects = [
    {
      title: t("neqra.title"),
      description: t("neqra.description"),
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800",
      tags: ["Next.js", "TypeScript", "Tailwind", "Prisma", "PostgreSQL"],
      liveUrl: "https://neqra-academy.com",
      githubUrl: "https://github.com/yourusername/neqra-academy",
      slug: "neqra-academy",
    },
    {
      title: t("ecommerce.title"),
      description: t("ecommerce.description"),
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/ecommerce",
      slug: "ecommerce",
    },
    {
      title: t("taskManager.title"),
      description: t("taskManager.description"),
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
      tags: ["Next.js", "tRPC", "Prisma", "Tailwind"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/tasks",
      slug: "task-management",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            {t("title")}
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            {t("subtitle")}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}