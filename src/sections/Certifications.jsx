import { useEffect, useMemo, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import AnimatedContent from "../components/AnimatedContent";
import GlareHover from "../components/GlareHover";
import BlurText from "../components/BlurText";

const certifications = [
  ["Google IT Automation with Python", "Coursera", "2025", "cer01.png", "1G8bfkjHHQubEYhhWCGiuZZME8m3gt7Ye"],
  ["Google IT Support", "Coursera", "2025", "cer02.png", "1PIu1TikHdI-lNbeGLS4DPIWiuVH5qpz9"],
  ["Google UX Design", "Coursera", "2026", "cer03.png", "1bzQ8VL1ivPZAC8lUXk33e5_DQqE2Rk9-"],
  ["Troubleshooting and Debugging Techniques", "Coursera", "2026", "cer04.png", "1zaoog0YV9mQTA4mdPTjAZiI98xO-gAWY"],
  ["Foundation of Project Management", "Coursera", "2026", "cer05.png", "1hHDp7ZgOcKyL22RSP0aOqRRyU0oEUDZu"],
  ["Project Planning", "Coursera", "2026", "cer06.png", "1AgMTsEdxZ4tHLcIzus8OmWVKyt12kv6-"],
  ["Design User Experience", "Coursera", "2026", "cer07.png", "1iW2trQt_WpvDVBTVjru51ivq_sAwDlnT"],
  ["Build Wireframes and Prototypes", "Coursera", "2026", "cer08.png", "17CSKwYf8W0kfrnIL29FAgrQt0rTYmya3"],
  ["Conduct UX Research", "Coursera", "2026", "cer09.png", "19qTOOuMyhR7vOBY1CIg13en5CCLnjmyb"],
  ["Automating Real-World Tasks with Python", "Coursera", "2026", "cer10.png", "1kJVoM3gY-NQmrlQKQ2NHBJ49i551sYC9"],
  ["Create High-Fidelity Designs and Prototypes in Figma", "Coursera", "2026", "cer11.png", "1nS1P4o2BFLJAXHVErGiKZf7wicSOPB2R"],
  ["Ask Questions to Make Data-Driven Decisions", "Coursera", "2026", "cer12.png", "11DrPklPMbO0LDXb47RLBg-aWIudTq3y_"],
  ["Project Initiation: Starting a Successful Project", "Coursera", "2026", "cer13.png", "1XY0CXXrZBJLPrUvnHL68-5CbSXTv82WU"],
  ["IT Security: Defense against the digital dark arts", "Coursera", "2026", "cer14.png", "1uWzE5vG7W2ywVSorRfv8xABnwanY3OJu"],
  ["Operating Systems and You: Becoming a Power User", "Coursera", "2026", "cer15.png", "1l7rfo_inOtDDG9j6UKo-6FUG56v3Gi0C"],
  ["System Administration and IT Infrastructure Services", "Coursera", "2026", "cer16.png", "1xtqCJEvRQKtf4v-d_6DyM71rfNu2MSmC"],
  ["Introduction to Git and GitHub", "Coursera", "2026", "cer17.png", "1HnPu65esO2yGbSpGdHiYSQbJeu3oOwQ4"],
  ["Using Python to Interact with the Operating System", "Coursera", "2026", "cer18.png", "1_N1l3v-T7NX8KjMi-wRxO9t9qKGGVoLq"],
  ["Configuration Management and the Cloud", "Coursera", "2026", "cer19.png", "1AbcV4VYHkOW-AWiZYNfJ0Q6f5EIGxL76"],
  ["Start the UX Design Process: Empathize, Define, and Ideate", "Coursera", "2026", "cer20.png", "19YPB80G4s21OBduts7iGpRlmef8Jy41R"],
  ["Crash Course on Python", "Coursera", "2026", "cer21.png", "1J8St2aGPXFNwfdr7fnIpVkJaE7R07Q6J"],
  ["Accelerate Your Job Search with AI", "Coursera", "2026", "cer22.png", "1V7Ldqn_zVb1EkhervsPArUWspQQ8Lxlm"],
  ["Foundations: Data, Data, Everywhere", "Coursera", "2026", "cer23.png", "14HdytAjdKQKzqlavjzAStK8FkNeYXO9m"],
  ["The Bits and Bytes of Computer Networking", "Coursera", "2026", "cer24.png", "15uWFAZDGiiOsTP7cx4k5Z43BYHHzxNcB"],
  ["Technical Support Fundamentals", "Coursera", "2026", "cer25.png", "1ZPXtVMaeWdTUd19w3wmTXNfy-STDO-7d"],
  ["Build Dynamic User Interfaces (UI) for Websites", "Coursera", "2026", "cer26.png", "1SFGaf7Iao7eJdZB8U2nfaSMa5kvNxSlj"],
  ["Foundations of User Experience (UX) Design", "Coursera", "2026", "cer27.png", "1xcMTf74bhJiUakLkVxuECKDICRElIqWm"],
  ["Outstanding Performance - Alliance RAD Training", "Alliance RAD Training", "2025", "cer28.png", "175rhuHz-9mCBiJeD8NLL_FeidyzhiqiM"],
  ["Completion - Alliance RAD Training", "Alliance RAD Training", "2025", "cer29.png", "1eLJiOfwVSt-6rAGZqoe8gXTgFNihXDFD"],
].map(([title, issuer, date, image, driveId]) => ({
  title,
  issuer,
  date,
  image: `/certificates/${image}`,
  link: `https://drive.google.com/file/d/${driveId}/view?usp=sharing`,
}));

const INITIAL_COUNT = 6;

export const Certifications = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const initialCertificates = useMemo(
    () => [...certifications.slice(0, INITIAL_COUNT - 2), ...certifications.slice(-2)],
    [],
  );
  const visibleCertificates = showAll ? certifications : initialCertificates;

  useEffect(() => {
    if (!selectedCertificate) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedCertificate(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [selectedCertificate]);

  return (
    <section id="certifications" className="relative overflow-hidden py-14 sm:py-24">
      <div className="container relative z-10 mx-auto px-5 sm:px-6 lg:px-8">
        <AnimatedContent distance={28} duration={0.7} blur={1} className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Continuous learning</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl">
            <BlurText
              text="My"
              trigger="view"
              color="currentColor"
              highlightColor="currentColor"
              animateBy="words"
              blur={12}
              distance={24}
              duration={0.55}
              className="inline-block w-auto align-baseline"
            />{" "}<span className="text-primary">Certifications</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            Courses and certifications that support my journey in software development.
          </p>
        </AnimatedContent>

        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
            showAll
              ? "max-h-[10000px] opacity-100 sm:max-h-[6000px] lg:max-h-[3000px]"
              : "max-h-[3000px] opacity-100 sm:max-h-[1800px] lg:max-h-[850px]"
          }`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {visibleCertificates.map((certificate, index) => (
            <AnimatedContent
              key={certificate.image}
              distance={22}
              duration={0.55}
              delay={Math.min(index * 0.045, 0.8)}
              blur={1}
              className="h-full"
            >
              <GlareHover
                width="100%"
                height="100%"
                background="rgba(13, 37, 53, 0.74)"
                borderRadius="0.9rem"
                borderColor="rgba(237, 18, 104, 0.22)"
                glareColor="var(--color-highlight)"
                glareOpacity={0.22}
                glareSize={24}
                softness={0.75}
                className="h-full min-w-0 transition-transform duration-300 hover:-translate-y-1"
              >
                <button
                  type="button"
                  className="group relative z-10 flex h-full w-full min-w-0 flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                  onClick={() => setSelectedCertificate(certificate)}
                  aria-label={`View ${certificate.title} certificate`}
                >
                  <div className="flex aspect-[1.48] w-full items-center justify-center overflow-hidden border-b border-border/60 bg-background/60 p-2">
                    <img src={certificate.image} alt="" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-foreground">{certificate.title}</h3>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-xs text-muted-foreground">
                      <span className="truncate">{certificate.issuer}</span>
                      <span className="shrink-0 text-primary">{certificate.date}</span>
                    </div>
                  </div>
                </button>
              </GlareHover>
            </AnimatedContent>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="rounded-full border border-primary/40 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            aria-expanded={showAll}
          >
            {showAll ? "Show Less" : `View All Certificates (${certifications.length})`}
          </button>
        </div>
      </div>

      {selectedCertificate && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedCertificate(null); }}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-y-auto rounded-2xl border border-primary/20 bg-card p-4 shadow-2xl sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
          >
            <button
              type="button"
              onClick={() => setSelectedCertificate(null)}
              aria-label="Close certificate details"
              className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="grid gap-5 md:grid-cols-[minmax(0,1.45fr)_minmax(220px,0.55fr)] md:items-center">
              <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-border/70 bg-background/70 p-3 sm:min-h-[360px]">
                <img src={selectedCertificate.image} alt={selectedCertificate.title} className="max-h-[65vh] w-full object-contain" />
              </div>
              <div className="pr-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Certificate details</p>
                <h3 id="certificate-modal-title" className="mt-3 text-xl font-semibold leading-tight text-foreground">{selectedCertificate.title}</h3>
                <p className="mt-4 text-sm text-muted-foreground">Issued by {selectedCertificate.issuer}</p>
                <p className="mt-1 text-sm text-primary">{selectedCertificate.date}</p>
                <a
                  href={selectedCertificate.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-white"
                >
                  Open certificate <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
