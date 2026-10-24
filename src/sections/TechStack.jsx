import LogoLoop from "../components/LogoLoop";
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
  const logoItems = techStack.map((tech) => {
    const Icon = tech.icon;

    return {
      title: tech.name,
      ariaLabel: tech.name,
      hoverColor: "#f03b82",
      node: <Icon className={`h-[38px] w-[38px] ${tech.color}`} aria-hidden="true" />,
    };
  });

  return (
    <section id="TechStack" className="relative overflow-hidden py-12 sm:py-16">
      <LogoLoop
        logos={logoItems}
        speed={72}
        logoHeight={38}
        gap={52}
        pauseOnHover
        labels="below"
        fadeOut
        fadeOutWidth={0.12}
        scaleOnHover
        draggable
        intro
        ariaLabel="Technology stack"
        style={{ width: "100%" }}
      />
    </section>
  );
};
