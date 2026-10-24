import { useState } from "react";
import { AlertCircle, CheckCircle, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import AnimatedContent from "../components/AnimatedContent";
import ClickSpark from "../components/ClickSpark";
import Magnet from "../components/Magnet";
import SpotlightCard from "../components/SpotlightCard";
import BlurText from "../components/BlurText";

const contactInfo = [
  { icon: Mail, label: "Email", value: "gina18gamboa@gmail.com", href: "mailto:gina18gamboa@gmail.com" },
  { icon: Phone, label: "Phone", value: "0965-162-3907", href: "tel:0965-162-3907" },
  { icon: MapPin, label: "Location", value: "Asha Plaza Building, Brgy. Pahina Central, Cebu City", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/xier149", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gina-gamboa/", icon: Linkedin },
];

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: "" });

  const updateField = (field) => (event) => {
    setFormData((current) => ({ ...current, [field]: event.target.value }));
    if (submitStatus.type) setSubmitStatus({ type: null, message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    if (!name || !email || !message) {
      setSubmitStatus({ type: "error", message: "Please complete all fields before sending your message." });
      return;
    }
    if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitStatus({ type: "error", message: "Please enter a valid email, a name, and a message of at least 10 characters." });
      return;
    }

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) throw new Error("EmailJS configuration is missing. Please check your environment variables.");
      await emailjs.send(serviceId, templateId, { name, email, message }, publicKey);
      setSubmitStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus({ type: "error", message: error.text || error.message || "Failed to send message. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <AnimatedContent distance={28} duration={0.7} blur={1} className="mx-auto mb-8 max-w-2xl text-center lg:mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Get in touch</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl lg:text-5xl">
            <BlurText
              text="Let's build"
              trigger="view"
              color="currentColor"
              highlightColor="currentColor"
              animateBy="words"
              blur={12}
              distance={24}
              duration={0.55}
              className="inline-block w-auto align-baseline"
            />{" "}<span className="font-serif font-normal italic text-white">something great.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Have a project in mind? Send a message and let&apos;s discuss how we can work together.
          </p>
        </AnimatedContent>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-stretch lg:gap-8">
          <AnimatedContent distance={26} duration={0.65} delay={0.08} blur={1} className="lg:h-full">
            <div className="flex rounded-2xl border border-border/70 bg-surface/45 p-4 backdrop-blur-sm sm:p-5 lg:h-full lg:flex-col">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Contact information</p>
                <h3 className="mt-2.5 text-xl font-semibold text-foreground">Let&apos;s start a conversation.</h3>
                <p className="mt-2.5 max-w-md text-xs leading-5 text-muted-foreground sm:text-sm">
                  I&apos;m open to discussing software projects, development opportunities, and ideas that solve useful problems.
                </p>
                <div className="mt-5 space-y-1">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => (
                    <a key={label} href={href} className="group flex items-center gap-2.5 rounded-lg p-2.5 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20"><Icon className="h-3.5 w-3.5" /></span>
                      <span className="min-w-0"><span className="block text-[11px] text-muted-foreground">{label}</span><span className="block truncate text-xs font-medium text-foreground sm:text-sm">{value}</span></span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-5 border-t border-border/60 pt-3 lg:mt-auto">
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Find me online</p>
                <div className="mt-2 flex gap-2">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="rounded-lg border border-border/70 bg-surface/40 p-2.5 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"><Icon className="h-4 w-4" /></a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={26} duration={0.65} delay={0.16} blur={1} className="lg:h-full">
            <SpotlightCard spotlightColor="var(--color-highlight)" intensity={0.12} spotlightSize={220} softness={0.82} borderGlow={0.28} proximity={80} smoothing={0.4} theme="dark" style={{ "--spotlight-card-surface": "color-mix(in srgb, var(--color-surface) 58%, transparent)", "--spotlight-card-shadow": "0 18px 40px -28px rgba(0, 0, 0, 0.6)" }} className="rounded-2xl border border-primary/15 p-4 sm:p-5 lg:h-full">
              <form className="space-y-3" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
                    <input id="contact-name" name="name" type="text" required minLength={2} autoComplete="name" value={formData.name} onChange={updateField("name")} placeholder="Your name" className="w-full rounded-lg border border-border bg-surface/70 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                    <input id="contact-email" name="email" type="email" required autoComplete="email" value={formData.email} onChange={updateField("email")} placeholder="you@example.com" className="w-full rounded-lg border border-border bg-surface/70 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
                  <textarea id="contact-message" name="message" rows={4} required minLength={10} value={formData.message} onChange={updateField("message")} placeholder="Tell me a little about your project..." className="w-full resize-none rounded-lg border border-border bg-surface/70 px-3.5 py-2.5 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <ClickSpark sparkColor="#ed1268" sparkSize={7} sparkRadius={22} sparkCount={7} sparkWidth={1.5} duration={420} className="inline-block">
                  <Magnet padding={55} magnetStrength={5} maxOffset={7} wrapperClassName="inline-block" innerClassName="inline-block">
                    <button type="submit" disabled={isLoading} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70">
                      {isLoading ? "Sending..." : "Send Message"}<Send className="h-4 w-4" />
                    </button>
                  </Magnet>
                </ClickSpark>
                {submitStatus.type && (
                  <div role={submitStatus.type === "error" ? "alert" : "status"} aria-live="polite" className={`flex items-start gap-2 rounded-lg border p-3 text-sm ${submitStatus.type === "success" ? "border-green-500/20 bg-green-500/10 text-green-400" : "border-red-500/20 bg-red-500/10 text-red-400"}`}>
                    {submitStatus.type === "success" ? <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
                    <p>{submitStatus.message}</p>
                  </div>
                )}
              </form>
            </SpotlightCard>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};
