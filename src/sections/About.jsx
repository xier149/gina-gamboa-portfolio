import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  {
    icon: Code2,
    title: "System Development",
    description:
      "Designing and developing web-based systems that solve real-world community problems.",
  },
  {
    icon: Rocket,
    title: "Continuous Learning",
    description:
      "Constantly improving my skills in software development and modern web technologies.",
  },
  {
    icon: Users,
    title: "Community Solutions",
    description:
      "Building systems that support communities like barangay management and relief tracking.",
  },
  {
    icon: Lightbulb,
    title: "Creative Problem Solving",
    description:
      "Turning ideas into functional applications through code and thoughtful system design.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* Top Content */}
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
            About Me
          </span>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-secondary-foreground">
            Learning to build
            <span className="font-serif italic font-normal text-white">
              {" "}impactful software systems.
            </span>
          </h2>

          <div className="space-y-4 text-muted-foreground">
  <p>
    I'm Gina Gamboa, an ACT student specializing in Software Development at the
    University of San Jose–Recoletos. I am passionate about creating software
    solutions that improve everyday processes and solve real-world problems.
  </p>

  <p>
    I focus on building efficient, user-centered systems by combining frontend
    design and backend logic. My approach is rooted in structured
    problem-solving, continuous learning, and writing clean, maintainable code
    that can scale and adapt over time.
  </p>

  <p>
    I enjoy working both independently and collaboratively, where I can contribute
    ideas, adapt to feedback, and continuously improve my solutions. I value
    clarity, functionality, and simplicity in every system I build.
  </p>

  <p>
    As I grow in my development journey, my goal is to become a reliable software
    developer who creates impactful systems that support communities,
    organizations, and everyday users.
  </p>
</div>



          <motion.div
            className="glass rounded-2xl p-6 glow-border"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-lg font-medium italic text-foreground">
              "My goal is to become a skilled software developer by continuously learning,
              building meaningful projects, and creating systems that make processes
              easier for people and communities."
            </p>
          </motion.div>

        </motion.div>

        {/* Bottom Highlights */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              className="glass p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 hover:bg-primary/20">
                <item.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};