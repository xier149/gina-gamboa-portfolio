import GooeyNav from "../components/GooeyNav";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#Home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#TechStack", label: "Tech Stack" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];
const sectionIds = navLinks.map(({ href }) => href.slice(1));

export const Navbar = () => {
  const getIndexFromHash = () => {
    const hash = window.location.hash.slice(1);
    const index = sectionIds.indexOf(hash);
    return index >= 0 ? index : 0;
  };
  const [activeIndex, setActiveIndex] = useState(() => (
    typeof window === "undefined" ? 0 : getIndexFromHash()
  ));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateFromScroll = () => {
      frame = 0;
      const marker = window.scrollY + window.innerHeight * 0.36;
      let nextIndex = 0;
      sectionIds.forEach((id, index) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) nextIndex = index;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        nextIndex = sectionIds.length - 1;
      }
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };
    const scheduleScrollUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateFromScroll);
    };
    const updateFromLocation = () => {
      setActiveIndex(getIndexFromHash());
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
    window.addEventListener("hashchange", updateFromLocation);
    window.addEventListener("popstate", updateFromLocation);
    updateFromScroll();
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleScrollUpdate);
      window.removeEventListener("hashchange", updateFromLocation);
      window.removeEventListener("popstate", updateFromLocation);
    };
  }, [sectionIds]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 py-3 sm:px-6 sm:py-4">
      <nav className="relative mx-auto max-w-7xl">
        <div className="flex justify-end sm:justify-center">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-surface/85 text-foreground shadow-lg shadow-background/30 backdrop-blur-md transition-colors hover:border-primary/70 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:hidden"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="portfolio-nav-scroll hidden max-w-full overflow-x-auto rounded-full px-1 sm:block [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <GooeyNav
            items={navLinks}
            activeIndex={activeIndex}
            onChange={(index) => setActiveIndex(index)}
            theme="dark"
            color="#ed1268"
            activeTextColor="#140021"
            colors={["#6f087b", "#a30ba9", "#ed1268", "#f03b82"]}
            size="sm"
            frame
            className="portfolio-gooey-nav"
          />
        </div>

        {isMobileMenuOpen && (
          <div id="mobile-navigation" className="mobile-menu absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-primary/25 bg-card/95 p-2 shadow-2xl shadow-background/50 backdrop-blur-xl sm:hidden">
            <div className="grid gap-1">
              {navLinks.map(({ href, label }, index) => (
                <a
                  key={href}
                  href={href}
                  className={`flex min-h-11 items-center justify-between rounded-xl px-4 text-sm font-medium transition-colors ${activeIndex === index ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"}`}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {label}
                  {activeIndex === index && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
export default Navbar;
