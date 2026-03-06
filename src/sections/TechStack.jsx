import { useState } from "react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiGit,
  SiGithub,
  SiTailwindcss
} from "react-icons/si";

const techStack = [
  { name: "HTML", icon: SiHtml5, color: "text-orange-500", category: "frontend" },
  { name: "CSS", icon: SiCss3, color: "text-blue-500", category: "frontend" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400", category: "frontend" },
  { name: "React", icon: SiReact, color: "text-cyan-400", category: "framework" },

  { name: "Node.js", icon: SiNodedotjs, color: "text-green-500", category: "backend" },
  { name: "Express.js", icon: SiExpress, color: "text-gray-400", category: "backend" },
  { name: "PHP", icon: SiPhp, color: "text-indigo-400", category: "backend" },
  { name: "Laravel", icon: SiLaravel, color: "text-red-500", category: "framework" },

  { name: "MySQL", icon: SiMysql, color: "text-blue-400", category: "database" },

  { name: "Git", icon: SiGit, color: "text-orange-600", category: "tools" },
  { name: "GitHub", icon: SiGithub, color: "text-gray-300", category: "tools" },

  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400", category: "frontend" },
];

export const TechStack = () => {

  const [filter, setFilter] = useState("all");

  const filteredTech =
    filter === "all"
      ? techStack
      : techStack.filter((tech) => tech.category === filter);

  return (
    <section id="TechStack" className="py-24">
      <div className="container mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            My <span className="text-primary">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Technologies and tools I use to build web applications and software projects.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">

          {["all","frontend","backend","framework","database","tools"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-5 py-2 rounded-full text-sm capitalize transition-all
              ${
                filter === category
                  ? "bg-primary text-white"
                  : "glass text-muted-foreground hover:text-white hover:bg-primary/20"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">

          {filteredTech.map((tech, index) => {
            const Icon = tech.icon;

            return (
              <div
                key={index}
                className="group flex flex-col items-center justify-center p-6 rounded-2xl glass hover:bg-primary/10 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Icon
                  className={`text-5xl mb-3 ${tech.color} group-hover:scale-110 transition-transform`}
                />

                <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};