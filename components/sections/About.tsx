"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

export default function About() {
  const timeline = [
    {
      title: "Biotechnology Researcher",
      description: "Learned systems thinking & scientific rigor",
    },
    {
      title: "Customer Service Lead",
      description: "Mastered user empathy at Bell Canada & Djezzy",
    },
    {
      title: "Self-Taught Developer",
      description: "Built production apps used by thousands",
    },
    {
      title: "EdTech Founder",
      description: "Currently launching NeQra Academy",
    },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            About Me
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A unique blend of biotechnology, customer service, and full-stack
            development
          </p>

          {/* Bio */}
          <Card className="mb-12">
            <p className="text-lg leading-relaxed mb-6">
              I&apos;m a full-stack developer who codes in React by day and dreams
              in TypeScript by night. With a unique background in biotechnology
              and multilingual customer service, I bring a rare blend of
              technical precision and human-centered design to every project I
              build.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              When I&apos;m not coding, I&apos;m researching longevity science,
              debunking health myths, or perfecting my coffee brewing technique
              ☕
            </p>
          </Card>

          {/* Timeline */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}