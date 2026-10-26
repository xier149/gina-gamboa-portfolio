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

const skillGroups = [
  { label: "Frontend", items: techStack.filter((tech) => tech.category === "frontend" || tech.name === "React") },
  { label: "Backend", items: techStack.filter((tech) => tech.category === "backend" || tech.name === "Laravel") },
  { label: "Databases", items: techStack.filter((tech) => tech.category === "database") },
  { label: "AI & Automation", items: [{ name: "AI-assisted development" }, { name: "Workflow automation" }, { name: "API integration" }] },
  { label: "Development Tools", items: techStack.filter((tech) => tech.category === "tools") },
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
    <section id="TechStack" className="relative overflow-hidden py-10 sm:py-16">
      <div className="hidden lg:block">
        <LogoLoop
        logos={logoItems}
        speed={72}
        gap="clamp(24px, 8vw, 52px)"
        pauseOnHover
        labels="below"
        fadeOut
        fadeOutWidth={0.12}
        scaleOnHover
        draggable
        intro
        ariaLabel="Technology stack"
        logoHeight="clamp(30px, 9vw, 38px)"
        style={{ width: "100%" }}
        />
      </div>
      <div className="container mx-auto px-5 sm:px-6 lg:hidden">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Technical toolkit</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Tools I use to build and improve software.</h2>
        </div>
        <div className="mt-7 grid gap-3 min-[360px]:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label} className="rounded-2xl border border-border/60 bg-surface/40 p-4 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-foreground">{group.label}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item.name} className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1.5 text-xs text-muted-foreground">{item.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
