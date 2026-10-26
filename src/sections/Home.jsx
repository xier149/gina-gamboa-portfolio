import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "../components/Button";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";
import Lanyard from "../components/Lanyard";

export const Home = () => {
  return (
    <section
      id="Home"
      className="relative flex min-h-[calc(100vh-4rem)] items-start overflow-visible lg:items-center"
    >
      <div className="container relative z-10 mx-auto px-5 pb-8 pt-20 sm:px-6 sm:pb-12 sm:pt-24 lg:px-8 lg:pb-6 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.76fr)] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_450px]">
          <div className="order-1 max-w-3xl md:order-2 lg:order-1">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-surface/60 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                AI-Augmented Software Developer Intern
              </span>
            </div>

            <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-5">
              <h1 className="max-w-3xl text-3xl font-bold leading-[1.06] tracking-tight text-white animate-fade-in animation-delay-100 sm:text-4xl lg:text-5xl xl:text-6xl">
                Building practical software,
                <span className="block text-primary glow-text">
                  from interface to integration.
                </span>
              </h1>

              <p className="max-w-2xl text-base leading-7 text-muted-foreground animate-fade-in animation-delay-200 sm:text-lg sm:leading-8">
                I contribute across frontend and backend development, API
                integration, workflow automation, and database-backed systems.
                I use AI-assisted tools to investigate problems, test ideas,
                and collaborate on software that is useful and maintainable.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 animate-fade-in animation-delay-300 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <a href="#projects" className="w-full sm:w-auto">
                <Button size="lg" className="w-full px-5 py-3 text-sm sm:w-auto sm:px-8 sm:py-4 sm:text-lg">
                  View My Projects <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
              <a href="/CV/Gina_Gamboa_CV.pdf" download="Gina-Gamboa-Resume" className="w-full sm:w-auto">
                <AnimatedBorderButton className="w-full px-5 py-3 text-sm sm:w-auto sm:px-8 sm:py-4 sm:text-lg">
                  <Download className="h-5 w-5" />
                  Download CV
                </AnimatedBorderButton>
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3 animate-fade-in animation-delay-400 sm:mt-7 sm:justify-start sm:gap-4">
              <span className="text-sm text-muted-foreground">Connect with me</span>
              <div className="h-px w-8 bg-border" />
              <a
                href="https://github.com/xier149"
                aria-label="GitHub"
                className="rounded-full border border-border/70 bg-surface/40 p-2.5 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/gina-gamboa/"
                aria-label="LinkedIn"
                className="rounded-full border border-border/70 bg-surface/40 p-2.5 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="order-2 relative mx-auto hidden h-[360px] w-full max-w-[360px] animate-fade-in animation-delay-300 md:order-1 md:block lg:order-2 lg:h-[600px] lg:max-w-[480px] xl:h-[640px] xl:max-w-[500px]">
            <div className="hero-lanyard-ambient pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <div className="hero-lanyard-float relative z-10 h-full w-full">
              <Lanyard
                frontImage="/gina-id-card.svg"
                frontPhoto="/ginagamboa.jpg"
                imageFit="cover"
                cardColor="#f8f3ff"
                cornerRadius={0.35}
                anchor="center"
                mobileAnchor="center"
                intro={false}
                damping={0.55}
                finish="matte"
                strapLength={0.52}
                strapColor="#6f087b"
                strapWidth={0.65}
                metal="graphite"
                size={0.52}
                mobileSize={0.40}
                className="relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
