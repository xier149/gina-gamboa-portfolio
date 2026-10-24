import GooeyNav from "../components/GooeyNav";
import { useEffect, useState } from "react";

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
    const updateFromLocation = () => setActiveIndex(getIndexFromHash());

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
      <nav className="mx-auto flex max-w-7xl justify-center">
        <div className="max-w-full overflow-x-auto rounded-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
      </nav>
    </header>
  );
};
export default Navbar;
