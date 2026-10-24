import { Bot, Monitor, Server, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import BlurText from "../components/BlurText";

const focusAreas = [
  { icon: Monitor, label: "Frontend Development" },
  { icon: Server, label: "Backend Development" },
  { icon: Workflow, label: "Workflow Automation" },
  { icon: Bot, label: "AI-Assisted Development" },
];

export const About = () => {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:gap-20">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              About Me
            </span>
            <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight text-secondary-foreground sm:text-4xl lg:text-5xl">
              <BlurText
                text="The developer behind the code."
                trigger="view"
                color="currentColor"
                highlightColor="currentColor"
                animateBy="words"
                blur={12}
                distance={24}
                duration={0.55}
              />
            </h2>

            <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              <p>
                I&apos;m Gina Gamboa, an ACT student building my foundation in
                software development through hands-on projects and continuous
                learning. I enjoy turning practical ideas into clear, useful
                digital experiences.
              </p>
              <p>
                My interests span frontend interfaces, backend logic, workflow
                automation, and AI-assisted development. I use modern tools to
                work thoughtfully, learn faster, and create software that is
                functional, maintainable, and easy to use.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="lg:pt-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              What I Focus On
            </p>
            <div className="mt-5 divide-y divide-border/70 border-y border-border/70">
              {focusAreas.map(({ icon: Icon, label }, index) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-4 py-4 text-foreground transition-colors duration-300 hover:text-primary"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-base font-medium sm:text-lg">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-14 flex items-center gap-4 border-t border-border/60 pt-5 text-sm text-muted-foreground sm:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          <span>
            ACT student at the University of San Jose–Recoletos
          </span>
        </motion.div>
      </div>
    </section>
  );
};
