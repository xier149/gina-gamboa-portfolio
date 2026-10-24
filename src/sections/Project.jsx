import { useEffect, useState } from "react";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import AnimatedContent from "../components/AnimatedContent";
import SpotlightCard from "../components/SpotlightCard";
import TiltedCard from "../components/TiltedCard";
import BlurText from "../components/BlurText";

const projects = [
  {
    title: "PNPh Lost and Found",
    description:
      "A web-based lost and found system that allows users to report, search, and manage lost items. The platform helps organize item records and makes it easier for owners to reconnect with their belongings.",
    image: "/project/project01.png",
    tags: ["JavaScript", "CSS", "Express.js"],
    link: "#",
    github: "https://github.com/xier149/LOST-AND-FOUND-SYSTEM",
  },
  {
    title: "ClickMart E-Commerce Platform",
    description:
      "An e-commerce application built using Microsoft Power Apps and Power Automate that allows users to browse products, manage orders, and automate certain store processes.",
    image: "/project/project02.png",
    tags: ["Power Apps", "Power Automate"],
    link: "#",
    github: "https://github.com/xier149/ClickMart-Ecommerce-Using-Power-Apps",
  },
  {
    title: "Jump Race Dashboard",
    description:
      "A simple game dashboard interface designed for the Lily Pad Games project, displaying game information and providing a visual layout for managing game-related data.",
    image: "/project/project03.png",
    tags: ["HTML", "CSS"],
    link: "#",
    github: "https://github.com/xier149/Dashboard-for-Lily-Pad-Games",
  },
  {
    title: "Ghibli E-commerce Platform",
    description:
      "A themed e-commerce website inspired by Studio Ghibli, where users can browse and order products. The platform includes product filtering and a responsive interface for a smooth shopping experience.",
    image: "/project/project04.png",
    tags: ["JavaScript", "HTML", "CSS"],
    link: "#",
    github: "#",
  },
];

const isRealLink = (href) => href && href !== "#";

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="relative overflow-hidden py-24 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-highlight/5 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <AnimatedContent
          distance={36}
          duration={0.7}
          ease="power3.out"
          initialOpacity={0}
          blur={2}
          className="mx-auto mb-10 max-w-3xl text-center lg:mb-12"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Featured Work
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl lg:text-5xl">
            <BlurText
              text="Projects that"
              trigger="view"
              color="currentColor"
              highlightColor="currentColor"
              animateBy="words"
              blur={12}
              distance={24}
              duration={0.55}
              className="inline-block w-auto align-baseline"
            />{" "}
            <span className="font-serif font-normal italic text-white">make an impact.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            A selection of web applications and software projects that reflect my growth in development.
          </p>
        </AnimatedContent>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <AnimatedContent
              key={project.title}
              distance={28}
              direction="vertical"
              duration={0.65}
              delay={index * 0.08}
              ease="power3.out"
              initialOpacity={0}
              blur={1}
              className="h-full"
            >
              <SpotlightCard
                spotlightColor="var(--color-highlight)"
                intensity={0.18}
                spotlightSize={220}
                softness={0.78}
                borderGlow={0.35}
                proximity={90}
                smoothing={0.35}
                theme="dark"
                className="flex h-full flex-col p-3 sm:p-4"
                style={{
                  borderRadius: "1rem",
                  backgroundColor: "color-mix(in srgb, var(--color-surface) 66%, transparent)",
                }}
              >
                <TiltedCard
                  imageSrc={project.image}
                  altText={project.title + " screenshot"}
                  captionText={project.title}
                  containerHeight="178px"
                  containerWidth="100%"
                  imageHeight="178px"
                  imageWidth="100%"
                  scaleOnHover={1.035}
                  rotateAmplitude={8}
                  showTooltip={false}
                  radius={12}
                  perspective={900}
                  smoothness={0.7}
                  glare={0.28}
                  glareColor="var(--color-highlight)"
                  shadow={0.28}
                  parallax={0.7}
                  intro={false}
                  className="shrink-0"
                />

                <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold leading-tight text-foreground">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/70 bg-surface/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-3 border-t border-border/60 pt-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="text-sm font-medium text-primary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      View Details
                    </button>
                    {isRealLink(project.github) && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={"View " + project.title + " on GitHub"}
                        className="ml-auto rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null);
          }}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-7"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(240px,0.9fr)] md:items-start">
              <img
                src={selectedProject.image}
                alt={selectedProject.title + " full screenshot"}
                className="aspect-video w-full rounded-xl border border-border/70 object-contain bg-background"
              />
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Project Details</p>
                <h3 id="project-modal-title" className="mt-2 pr-8 text-2xl font-bold text-foreground">
                  {selectedProject.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {selectedProject.description}
                </p>
                <p className="mt-5 text-sm font-semibold text-foreground">Technologies</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-surface px-3 py-1 text-xs text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm font-semibold text-foreground">Contribution</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Developed and refined the project interface and core functionality using the technologies listed above.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {isRealLink(selectedProject.github) && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  )}
                  {isRealLink(selectedProject.link) && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-highlight"
                    >
                      <ExternalLink className="h-4 w-4" /> Live Project
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
