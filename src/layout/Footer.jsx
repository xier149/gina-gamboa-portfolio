import { Github, Linkedin } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/xier149", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/gina-gamboa/", label: "LinkedIn" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/60 py-5 sm:py-6">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground sm:text-sm">
            &copy; {currentYear} Gina Gamboa
          </p>

          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
              >
                <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
