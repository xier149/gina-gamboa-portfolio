import { Button } from "../components/Button";

import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Twitter,
  Download,
} from "lucide-react";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";



export const Home = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      

      {/* Green Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "#20B2A6",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `slow-drift ${
                15 + Math.random() * 20
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Aspiring Software Developer • ACT Student
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight animate-fade-in animation-delay-100"> 
                Building <span className="text-primary glow-text">digital solutions</span> 
                <br /> that solve <br /> <span className="font-serif italic font-normal text-white"> real-world problems. 
                </span> </h1>
              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
  Hi, I'm <span className="text-primary font-semibold">Gina Gamboa</span>, an ACT student at
  the University of San Jose–Recoletos with a strong interest in web
  development. I enjoy building modern, user-friendly applications and
  continuously improving my skills to create impactful digital solutions.
</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <Button size="lg">
                View My Work <ArrowRight className="w-5 h-5" />
              </Button>
              <a href="/CV/Gina_Gamboa_CV.pdf" download = "Gina-Gamboa-Resume">
              <AnimatedBorderButton>
                <Download className="w-5 h-5" />
                Download CV
              </AnimatedBorderButton>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 animate-fade-in animation-delay-400">
              <span className="text-sm text-muted-foreground">Follow me: </span>
              {[
                { icon: Github, href: "https://github.com/xier149" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/gina-gamboa/" },
                
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  {<social.icon className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>
          
{/* Right Column - Profile Image */}
<div className="relative flex justify-center items-center animate-fade-in animation-delay-300">

  <div className="relative w-100 h-100">

    {/* Glow Background */}
    <div
      className="absolute inset-0 
      rounded-full 
      bg-linear-to-br 
      from-primary/30 via-transparent 
      to-primary/10 
      blur-2xl animate-pulse"
    />

    {/* Profile Image */}
    <div className="relative glass rounded-full p-2 glow-border w-full h-full">
      <img
        src="/ginagamboa.jpg"
        alt="Gina Gamboa"
        className="w-full h-full object-cover rounded-full"
      />
    </div>

  </div>

</div>


        </div>
        
      </div>
    </section>
  );
};
