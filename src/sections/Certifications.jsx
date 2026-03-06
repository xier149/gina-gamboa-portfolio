
import { ExternalLink } from "lucide-react";

export const Certifications = () => {
  const certifications = [
    {
      title: "Google IT Automation with Python",
      issuer: "Coursera",
      date: "2025",
      image: "/certificates/cer01.png",
      link: "https://drive.google.com/file/d/1G8bfkjHHQubEYhhWCGiuZZME8m3gt7Ye/view?usp=sharing",
    },
    {
      title: "Google IT Support",
      issuer: "Coursera",
      date: "2025",
      image: "/certificates/cer02.png",
      link: "https://drive.google.com/file/d/1PIu1TikHdI-lNbeGLS4DPIWiuVH5qpz9/view?usp=sharing",
    },
    {
      title: "Google UX Design",
      issuer: "Coursera",
      date: "2026",
      image: "/certificates/cer03.png",
      link: "https://drive.google.com/file/d/1bzQ8VL1ivPZAC8lUXk33e5_DQqE2Rk9-/view?usp=sharing",
    },
  ];

  return (
    <section id="certifications" className="py-24 bg-background">
      <div className="container mx-auto px-6">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            My <span className="text-primary">Certifications</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Courses and certifications that support my journey in software development.
          </p>
        </div>

        {/* Certification Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 border border-primary/20"
            >
              {/* Certificate Image */}
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-48 object-cover"
              />

              {/* Certificate Info */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">{cert.title}</h3>

                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                <p className="text-sm text-muted-foreground">
                  {cert.issuer}
                </p>

                <p className="text-sm text-primary mt-2">
                  {cert.date}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

