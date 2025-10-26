"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";

export default function About() {
  const t = useTranslations("about");

  const timeline = [
    {
      title: t("timeline.item1.title"),
      description: t("timeline.item1.description"),
    },
    {
      title: t("timeline.item2.title"),
      description: t("timeline.item2.description"),
    },
    {
      title: t("timeline.item3.title"),
      description: t("timeline.item3.description"),
    },
    {
      title: t("timeline.item4.title"),
      description: t("timeline.item4.description"),
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
            {t("title")}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          {/* Bio */}
          <Card className="mb-12">
            <p className="text-lg leading-relaxed mb-6">
              {t("bio1")}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t("bio2")}
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