"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Placeholder data - you will update this with your actual projects later!
const projects = [
  {
    title: "MSME Financial Management System",
    description:
      "Built during my SSBI Group internship to configure complex loan parameters, interest rates, and repayment tenures.",
    tech: "React • TypeScript • TanStack Query • ShadcnUI",
  },
  {
    title: "Real-Time Web App Architecture",
    description:
      "A project developed at Amnex Infotechnologies involving backend workflows, API integrations, and database modeling.",
    tech: "Python • Django • JavaScript • APIs",
  },
  {
    title: "Hanumant Car Enterprise Chatbot",
    description:
      "An auto-responsive, cloud-based chatbot deployment utilizing prompt engineering.",
    tech: "IBM Watsonx.ai • Cloud Services",
  },
  {
    title: "Advanced Scientific Calculator",
    description:
      "A desktop application implementing complex mathematical operations including trigonometry and exponentiation.",
    tech: "Core Java • OOP Principles",
  },
];

export default function Projects() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-10 text-center tracking-tight">
          Featured Work
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="h-full hover:border-primary transition-colors duration-300 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground font-mono mt-4">
                  {project.tech}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
