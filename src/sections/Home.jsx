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
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-visible"
    >
      <div className="container relative z-10 mx-auto px-6 pb-10 pt-24 sm:pb-12 lg:px-8 lg:pb-6 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.76fr)] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_450px]">
          <div className="max-w-3xl">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-surface/60 px-4 py-2 text-sm font-medium text-primary backdrop-blur-md">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                AI-Augmented Software Developer
              </span>
            </div>

            <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-5">
              <h1 className="max-w-3xl text-3xl font-bold leading-[1.06] tracking-tight text-white animate-fade-in animation-delay-100 sm:text-4xl lg:text-5xl xl:text-6xl">
                Building smarter applications,
                <span className="block text-primary glow-text">
                  from frontend to backend.
                </span>
              </h1>

              <p className="max-w-2xl text-base leading-7 text-muted-foreground animate-fade-in animation-delay-200 sm:text-lg sm:leading-8">
                I build practical, user-focused software with AI-augmented
                development workflows. My focus spans responsive frontend
                experiences, reliable backend systems, and workflow automation
                that helps teams move from idea to useful product faster.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-4 animate-fade-in animation-delay-300 sm:mt-8">
              <a href="#projects">
                <Button size="lg">
                  View My Projects <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
              <a href="/CV/Gina_Gamboa_CV.pdf" download="Gina-Gamboa-Resume">
                <AnimatedBorderButton>
                  <Download className="h-5 w-5" />
                  Download CV
                </AnimatedBorderButton>
              </a>
            </div>

            <div className="mt-7 flex items-center gap-4 animate-fade-in animation-delay-400">
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

          <div className="relative mx-auto h-[430px] w-full max-w-[430px] animate-fade-in animation-delay-300 sm:h-[500px] lg:h-[540px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
            <Lanyard
              frontImage="/gina-id-card.svg"
              frontPhoto="/ginagamboa.jpg"
              imageFit="cover"
              cardColor="#f8f3ff"
              cornerRadius={0.35}
              anchor="right"
              intro={false}
              damping={0.55}
              finish="matte"
              strapLength={0.52}
              strapColor="#6f087b"
              strapWidth={0.65}
              metal="graphite"
              size={0.52}
              className="relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
