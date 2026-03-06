import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Award,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock,
  Dumbbell,
  Facebook,
  Flame,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Star,
  Target,
  TrendingUp,
  Twitter,
  Users,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "./hooks/useActor";

/* ─── Section Reveal Hook ─── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ─── Reveal Wrapper ─── */
function RevealSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={`reveal-hidden ${visible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

/* ─── Navigation ─── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", ocid: "nav.home_link" },
    { label: "About", href: "#about", ocid: "nav.about_link" },
    { label: "Services", href: "#services", ocid: "nav.services_link" },
    { label: "Pricing", href: "#pricing", ocid: "nav.pricing_link" },
    {
      label: "Transformations",
      href: "#transformations",
      ocid: "nav.transformations_link",
    },
    { label: "Contact", href: "#contact", ocid: "nav.contact_link" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.12_0.005_270/0.95)] backdrop-blur-md border-b border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
            data-ocid="footer.home_link"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-ip-orange rounded-sm flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="font-display text-xl font-black tracking-tight text-foreground">
                IRON <span className="text-ip-orange">PULSE</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={link.ocid}
                className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.70_0.010_85)] hover:text-ip-orange transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              data-ocid="nav.join_button"
              className="bg-ip-orange hover:bg-ip-orange-bright text-white font-bold uppercase tracking-widest px-6 py-2 text-sm transition-all duration-200 hover:shadow-orange-glow"
              onClick={() =>
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Join Now
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[oklch(0.14_0.006_265)] border-t border-white/5">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={link.ocid}
                onClick={() => setMenuOpen(false)}
                className="py-3 px-2 text-sm font-semibold uppercase tracking-widest text-[oklch(0.70_0.010_85)] hover:text-ip-orange border-b border-white/5 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <Button
              data-ocid="nav.join_button"
              className="mt-4 bg-ip-orange hover:bg-ip-orange-bright text-white font-bold uppercase tracking-widest"
              onClick={() => {
                setMenuOpen(false);
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Join Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1600x900.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-[oklch(0.08_0.005_265/0.72)]" />
      {/* Gradient fade to bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[oklch(0.12_0.005_270)]" />
      {/* Subtle orange vignette */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.68_0.185_38/0.06)] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Badge className="mb-6 bg-[oklch(0.68_0.185_38/0.15)] text-ip-orange border border-[oklch(0.68_0.185_38/0.3)] uppercase tracking-widest text-xs font-bold px-4 py-1.5">
            <Zap className="w-3 h-3 mr-1.5" />
            Austin, Texas · Premier Fitness
          </Badge>
        </div>

        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight mb-6 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="block text-white">Stop Wishing.</span>
          <span className="block text-ip-orange">Start Lifting.</span>
          <span className="block text-white">Transform Your Life.</span>
        </h1>

        <p
          className="max-w-2xl mx-auto text-lg sm:text-xl text-[oklch(0.80_0.008_85)] font-medium leading-relaxed mb-10 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          Elite coaching, proven programs, and a community that pushes you
          beyond your limits — in the heart of Texas.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
          style={{ animationDelay: "0.8s" }}
        >
          <Button
            data-ocid="hero.primary_button"
            size="lg"
            className="bg-ip-orange hover:bg-ip-orange-bright text-white font-black uppercase tracking-widest text-base px-10 py-6 transition-all duration-200 hover:shadow-orange-glow hover:scale-105"
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Zap className="w-5 h-5 mr-2" />
            Join Now
          </Button>
          <Button
            data-ocid="hero.secondary_button"
            size="lg"
            variant="outline"
            className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white font-bold uppercase tracking-widest text-base px-10 py-6 transition-all duration-200 bg-transparent"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Get Free Trial
          </Button>
        </div>

        {/* Stats bar */}
        <div
          className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto animate-fade-up"
          style={{ animationDelay: "1s" }}
        >
          {[
            { label: "Members", value: "500+" },
            { label: "Trainers", value: "12" },
            { label: "Retention", value: "98%" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-black text-ip-orange">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-[oklch(0.60_0.008_85)] mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
        <span className="text-xs uppercase tracking-widest text-[oklch(0.55_0.008_85)]">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-ip-orange" />
      </div>
    </section>
  );
}

/* ─── About Section ─── */
function AboutSection() {
  const bullets = [
    {
      icon: <Award className="w-5 h-5" />,
      text: "Expert Certified Trainers with 10+ years average experience",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      text: "Science-backed programs proven to deliver real results",
    },
    {
      icon: <Dumbbell className="w-5 h-5" />,
      text: "State-of-the-art equipment updated annually",
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "A relentless community that shows up when you don't feel like it",
    },
  ];

  return (
    <RevealSection
      id="about"
      className="py-24 lg:py-32 bg-[oklch(0.14_0.006_265)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <Badge className="mb-4 bg-[oklch(0.68_0.185_38/0.12)] text-ip-orange border border-[oklch(0.68_0.185_38/0.25)] uppercase tracking-widest text-xs font-bold">
              Our Story
            </Badge>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight mb-6">
              We Don't Just Build Bodies.
              <span className="block text-ip-orange">We Build Champions.</span>
            </h2>
            <p className="text-[oklch(0.72_0.010_85)] text-lg leading-relaxed mb-8">
              At Iron Pulse Fitness, we believe every rep, every drop of sweat,
              every early morning is a vote for the person you're becoming. Our
              world-class trainers and battle-tested programs are designed for
              one purpose — your total transformation.
            </p>

            <ul className="space-y-4">
              {bullets.map((bullet, i) => (
                <li
                  key={bullet.text}
                  className={`flex items-start gap-3 reveal-visible stagger-${i + 1}`}
                >
                  <div className="mt-0.5 w-8 h-8 rounded-sm bg-[oklch(0.68_0.185_38/0.15)] border border-[oklch(0.68_0.185_38/0.25)] flex items-center justify-center text-ip-orange flex-shrink-0">
                    {bullet.icon}
                  </div>
                  <span className="text-[oklch(0.82_0.008_85)] font-medium leading-snug">
                    {bullet.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Trainer image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/assets/generated/trainer-hero.dim_800x1000.jpg"
                alt="Iron Pulse personal trainer"
                className="w-full max-h-[600px] object-cover object-top"
              />
              {/* Orange overlay accent */}
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.006_265)] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-[oklch(0.68_0.185_38)] px-4 py-3 rounded-sm inline-block">
                  <div className="font-display text-2xl font-black text-white uppercase">
                    10+
                  </div>
                  <div className="text-white/90 text-xs uppercase tracking-widest font-bold">
                    Years Experience
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-4 -right-4 w-32 h-32 border-2 border-[oklch(0.68_0.185_38/0.3)] rounded-sm -z-10" />
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Services Section ─── */
function ServicesSection() {
  const services = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personal Training",
      description:
        "One-on-one sessions engineered around your body, your goals, and your schedule. Your trainer becomes your competitive advantage.",
    },
    {
      icon: <Flame className="w-8 h-8" />,
      title: "Weight Loss Programs",
      description:
        "Forget crash diets. Our metabolic programs combine strategic nutrition and smart training to torch fat — and keep it off for good.",
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: "Strength Training",
      description:
        "From beginner to beast mode. Our periodized strength programs add real muscle, boost your metabolism, and make you bulletproof.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Classes",
      description:
        "High-energy, coach-led classes that make you push harder than you ever would alone. HIIT, bootcamp, and more — 6 days a week.",
    },
  ];

  return (
    <RevealSection id="services" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[oklch(0.68_0.185_38/0.12)] text-ip-orange border border-[oklch(0.68_0.185_38/0.25)] uppercase tracking-widest text-xs font-bold">
            What We Offer
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight">
            Everything You Need to{" "}
            <span className="text-ip-orange">Dominate</span> Your Goals
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative bg-[oklch(0.16_0.008_265)] border border-[oklch(0.28_0.01_265)] rounded-lg p-6 hover:border-[oklch(0.68_0.185_38/0.5)] transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1"
            >
              {/* Top orange line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-ip-orange rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="mb-4 w-14 h-14 rounded-sm bg-[oklch(0.68_0.185_38/0.12)] border border-[oklch(0.68_0.185_38/0.2)] flex items-center justify-center text-ip-orange group-hover:bg-[oklch(0.68_0.185_38/0.2)] transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="font-display text-xl font-black uppercase mb-3 text-foreground group-hover:text-ip-orange transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-[oklch(0.65_0.008_85)] text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Pricing Section ─── */
function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "$49",
      period: "/mo",
      tag: "Perfect for self-starters",
      features: [
        "Full gym access",
        "Locker room & showers",
        "Basic equipment",
        "Member app access",
        "2 guest passes/month",
      ],
      cta: "Start Basic",
      popular: false,
      ocid: "pricing.basic_button",
    },
    {
      name: "Pro",
      price: "$99",
      period: "/mo",
      tag: "Best value for most members",
      features: [
        "Everything in Basic",
        "4 PT sessions / month",
        "Custom nutrition guide",
        "All group classes",
        "Progress tracking app",
        "Priority class booking",
      ],
      cta: "Go Pro",
      popular: true,
      ocid: "pricing.pro_button",
    },
    {
      name: "Elite",
      price: "$179",
      period: "/mo",
      tag: "For those who want it all",
      features: [
        "Unlimited PT sessions",
        "Custom meal plan",
        "Priority booking",
        "Recovery suite access",
        "Monthly body composition",
        "Dedicated trainer hotline",
      ],
      cta: "Go Elite",
      popular: false,
      ocid: "pricing.elite_button",
    },
  ];

  return (
    <RevealSection
      id="pricing"
      className="py-24 lg:py-32 bg-[oklch(0.14_0.006_265)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <Badge className="mb-4 bg-[oklch(0.68_0.185_38/0.12)] text-ip-orange border border-[oklch(0.68_0.185_38/0.25)] uppercase tracking-widest text-xs font-bold">
            Membership Plans
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight mb-3">
            Invest In <span className="text-ip-orange">Your Best Self</span>
          </h2>
          <p className="text-[oklch(0.60_0.008_85)] text-lg font-medium">
            No contracts. No BS. Cancel anytime.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border transition-all duration-300 ${
                plan.popular
                  ? "border-ip-orange bg-[oklch(0.16_0.010_265)] shadow-orange-glow scale-[1.03]"
                  : "border-[oklch(0.28_0.01_265)] bg-[oklch(0.16_0.008_265)]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="pulse-badge bg-ip-orange text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="mb-2">
                  <span
                    className={`text-xs font-black uppercase tracking-widest ${plan.popular ? "text-ip-orange" : "text-[oklch(0.55_0.008_85)]"}`}
                  >
                    {plan.name}
                  </span>
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="font-display text-5xl font-black text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-[oklch(0.55_0.008_85)] font-semibold mb-2">
                    {plan.period}
                  </span>
                </div>
                <p className="text-[oklch(0.60_0.008_85)] text-sm mb-6">
                  {plan.tag}
                </p>

                <Button
                  data-ocid={plan.ocid}
                  className={`w-full font-bold uppercase tracking-widest py-5 transition-all duration-200 ${
                    plan.popular
                      ? "bg-ip-orange hover:bg-ip-orange-bright text-white hover:shadow-orange-glow"
                      : "bg-[oklch(0.22_0.010_265)] hover:bg-[oklch(0.28_0.012_265)] text-foreground border border-[oklch(0.32_0.012_265)]"
                  }`}
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {plan.cta}
                </Button>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle2
                        className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "text-ip-orange" : "text-[oklch(0.50_0.008_85)]"}`}
                      />
                      <span className="text-[oklch(0.72_0.008_85)] text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Transformations Section ─── */
function TransformationsSection() {
  const stats = [
    {
      value: "500+",
      label: "Members Transformed",
      icon: <Users className="w-6 h-6" />,
    },
    {
      value: "12",
      label: "Expert Trainers",
      icon: <Award className="w-6 h-6" />,
    },
    {
      value: "98%",
      label: "Member Retention",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      value: "5★",
      label: "Rated",
      icon: <Star className="w-6 h-6" fill="currentColor" />,
    },
  ];

  return (
    <RevealSection
      id="transformations"
      className="py-24 lg:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[oklch(0.68_0.185_38/0.12)] text-ip-orange border border-[oklch(0.68_0.185_38/0.25)] uppercase tracking-widest text-xs font-bold">
            Success Stories
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight">
            Real People. Real Results.{" "}
            <span className="text-ip-orange">No Filters.</span>
          </h2>
        </div>

        {/* Transformation image + story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="/assets/generated/transformation.dim_800x500.jpg"
              alt="Marcus T. transformation - before and after Iron Pulse Fitness"
              className="w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[oklch(0.10_0.005_265/0.9)] to-transparent p-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-ip-orange" />
                <span className="text-white font-bold text-sm uppercase tracking-widest">
                  Before & After — 5 Months
                </span>
              </div>
            </div>
          </div>

          <div>
            {/* Quote marks */}
            <div className="text-ip-orange font-display text-7xl font-black leading-none mb-2 opacity-60">
              "
            </div>
            <blockquote className="text-[oklch(0.88_0.008_85)] text-xl leading-relaxed font-medium mb-6">
              I tried every program out there. Nothing stuck until Iron Pulse.
              My trainer held me accountable, my nutrition was dialed in, and
              for the first time in my adult life, I actually look forward to
              Monday mornings.
            </blockquote>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-ip-orange flex items-center justify-center">
                <span className="font-display font-black text-white text-lg">
                  M
                </span>
              </div>
              <div>
                <div className="font-bold text-foreground">Marcus T., 34</div>
                <div className="text-ip-orange text-sm font-semibold">
                  Houston, TX — Lost 47 lbs, gained lean muscle
                </div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                  <Star
                    key={k}
                    className="w-4 h-4 text-ip-orange"
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>

            {/* Motivational callout */}
            <div className="bg-[oklch(0.68_0.185_38/0.10)] border border-[oklch(0.68_0.185_38/0.25)] rounded-lg p-6">
              <p className="text-[oklch(0.85_0.010_85)] font-bold text-lg italic leading-snug">
                "The only bad workout is the one that didn't happen. Show up.
                We'll take care of the rest."
              </p>
              <div className="mt-2 text-ip-orange text-sm font-bold uppercase tracking-widest">
                — Iron Pulse Fitness
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[oklch(0.16_0.008_265)] border border-[oklch(0.28_0.01_265)] rounded-lg p-6 text-center hover:border-[oklch(0.68_0.185_38/0.4)] transition-colors duration-300"
            >
              <div className="text-ip-orange mb-2 flex justify-center">
                {stat.icon}
              </div>
              <div className="font-display text-4xl font-black text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-[oklch(0.60_0.008_85)] text-sm uppercase tracking-widest font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── CTA Banner ─── */
function CTABanner() {
  return (
    <RevealSection className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.14_0.006_265)] via-[oklch(0.12_0.005_265)] to-[oklch(0.10_0.005_270)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.68_0.185_38/0.08)] via-transparent to-transparent" />
      {/* Decorative */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[oklch(0.68_0.185_38/0.05)] to-transparent" />
      <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-[oklch(0.68_0.185_38/0.04)] blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge className="mb-6 bg-[oklch(0.68_0.185_38/0.15)] text-ip-orange border border-[oklch(0.68_0.185_38/0.35)] uppercase tracking-widest text-xs font-bold">
          <Zap className="w-3 h-3 mr-1.5" />
          Limited Spots Available
        </Badge>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black uppercase leading-tight mb-4">
          Your Transformation
          <br />
          <span className="text-ip-orange">Starts This Week.</span>
        </h2>

        <p className="text-[oklch(0.72_0.010_85)] text-xl font-medium mb-8 leading-relaxed">
          Join now and get your first{" "}
          <strong className="text-white">7 days completely free.</strong>
          <br />
          No credit card required.
        </p>

        <Button
          data-ocid="cta.primary_button"
          size="lg"
          className="bg-ip-orange hover:bg-ip-orange-bright text-white font-black uppercase tracking-widest text-lg px-12 py-7 transition-all duration-200 hover:shadow-orange-glow hover:scale-105"
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <Zap className="w-5 h-5 mr-2" />
          Claim Your Free Trial
        </Button>

        <p className="mt-4 text-[oklch(0.50_0.008_85)] text-sm italic">
          Limited spots available — we keep our community small on purpose.
        </p>
      </div>
    </RevealSection>
  );
}

/* ─── Contact Section ─── */
function ContactSection() {
  const { actor } = useActor();
  const [formState, setFormState] = useState<{
    name: string;
    email: string;
    message: string;
  }>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      if (!actor) throw new Error("Not connected");
      const result = await actor.submitContactForm(
        formState.name,
        formState.email,
        formState.message,
      );
      if (result) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Something went wrong. Please try again or call us directly.",
      );
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "(512) 847-3920",
      href: "tel:+15128473920",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "info@ironpulsefitness.com",
      href: "mailto:info@ironpulsefitness.com",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "4801 Burnet Rd, Austin, TX 78756",
      href: "https://maps.google.com/?q=4801+Burnet+Rd,+Austin,+TX+78756",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Hours",
      value: "Mon–Fri 5am–11pm · Sat–Sun 6am–10pm",
      href: null,
    },
  ];

  return (
    <RevealSection
      id="contact"
      className="py-24 lg:py-32 bg-[oklch(0.14_0.006_265)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[oklch(0.68_0.185_38/0.12)] text-ip-orange border border-[oklch(0.68_0.185_38/0.25)] uppercase tracking-widest text-xs font-bold">
            Get In Touch
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight">
            Ready to Start? <span className="text-ip-orange">Let's Talk.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact info */}
          <div>
            <p className="text-[oklch(0.72_0.010_85)] text-lg leading-relaxed mb-8">
              Take the first step. Our team is ready to help you find the right
              program, answer your questions, and set you up for success.
            </p>

            <div className="space-y-5">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-[oklch(0.68_0.185_38/0.12)] border border-[oklch(0.68_0.185_38/0.25)] flex items-center justify-center text-ip-orange flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[oklch(0.55_0.008_85)] font-bold mb-0.5">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[oklch(0.88_0.008_85)] font-medium hover:text-ip-orange transition-colors duration-200"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-[oklch(0.88_0.008_85)] font-medium">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Free trial call-out */}
            <div className="mt-10 bg-[oklch(0.68_0.185_38/0.10)] border border-[oklch(0.68_0.185_38/0.25)] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-ip-orange" />
                <span className="font-bold text-foreground uppercase tracking-widest text-sm">
                  Zero Risk
                </span>
              </div>
              <p className="text-[oklch(0.72_0.010_85)] text-sm leading-relaxed">
                Your first 7 days are completely free. Walk in, train hard, and
                decide if we're the right fit. No credit card. No commitment.
              </p>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="bg-[oklch(0.16_0.008_265)] border border-[oklch(0.28_0.01_265)] rounded-lg p-8">
            {status === "success" ? (
              <div
                data-ocid="contact.success_state"
                className="flex flex-col items-center justify-center h-full min-h-[300px] text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[oklch(0.68_0.185_38/0.15)] border border-[oklch(0.68_0.185_38/0.4)] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-ip-orange" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase mb-2">
                  Message Sent!
                </h3>
                <p className="text-[oklch(0.70_0.008_85)] mb-6">
                  We'll get back to you within 24 hours. Get ready to transform.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setStatus("idle")}
                  className="border-[oklch(0.68_0.185_38/0.5)] text-ip-orange hover:bg-[oklch(0.68_0.185_38/0.1)] font-bold uppercase tracking-widest"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label
                    htmlFor="contact-name"
                    className="text-xs uppercase tracking-widest font-bold text-[oklch(0.60_0.008_85)] mb-2 block"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="contact-name"
                    data-ocid="contact.name_input"
                    placeholder="Your full name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                    className="bg-[oklch(0.20_0.010_265)] border-[oklch(0.28_0.01_265)] text-foreground placeholder:text-[oklch(0.42_0.008_85)] focus-visible:ring-ip-orange focus-visible:border-ip-orange"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="contact-email"
                    className="text-xs uppercase tracking-widest font-bold text-[oklch(0.60_0.008_85)] mb-2 block"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    data-ocid="contact.email_input"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                    className="bg-[oklch(0.20_0.010_265)] border-[oklch(0.28_0.01_265)] text-foreground placeholder:text-[oklch(0.42_0.008_85)] focus-visible:ring-ip-orange focus-visible:border-ip-orange"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="contact-message"
                    className="text-xs uppercase tracking-widest font-bold text-[oklch(0.60_0.008_85)] mb-2 block"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    data-ocid="contact.message_textarea"
                    placeholder="Tell us your goals, questions, or how we can help..."
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    required
                    className="bg-[oklch(0.20_0.010_265)] border-[oklch(0.28_0.01_265)] text-foreground placeholder:text-[oklch(0.42_0.008_85)] focus-visible:ring-ip-orange focus-visible:border-ip-orange resize-none"
                  />
                </div>

                {status === "error" && (
                  <div
                    data-ocid="contact.error_state"
                    className="flex items-center gap-2 text-destructive bg-[oklch(0.577_0.245_27.325/0.1)] border border-[oklch(0.577_0.245_27.325/0.3)] rounded-sm px-4 py-3 text-sm"
                  >
                    <X className="w-4 h-4 flex-shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={status === "loading"}
                  className="w-full bg-ip-orange hover:bg-ip-orange-bright text-white font-black uppercase tracking-widest py-6 transition-all duration-200 hover:shadow-orange-glow disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2
                        data-ocid="contact.loading_state"
                        className="w-5 h-5 mr-2 animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Footer ─── */
function Footer() {
  const year = new Date().getFullYear();
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Transformations", href: "#transformations" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-[oklch(0.10_0.005_270)] border-t border-[oklch(0.22_0.008_265)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#home"
              data-ocid="footer.home_link"
              className="flex items-center gap-2 mb-4 group"
            >
              <div className="w-8 h-8 bg-ip-orange rounded-sm flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="font-display text-xl font-black tracking-tight">
                IRON <span className="text-ip-orange">PULSE</span> FITNESS
              </span>
            </a>
            <p className="text-[oklch(0.55_0.008_85)] text-sm leading-relaxed max-w-xs mb-6">
              Built for champions. Open to all.
              <br />
              Austin's premier transformation gym.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-sm bg-[oklch(0.18_0.008_265)] border border-[oklch(0.28_0.01_265)] flex items-center justify-center text-[oklch(0.55_0.008_85)] hover:text-ip-orange hover:border-[oklch(0.68_0.185_38/0.5)] transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-black text-[oklch(0.55_0.008_85)] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[oklch(0.65_0.008_85)] text-sm hover:text-ip-orange transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-black text-[oklch(0.55_0.008_85)] mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-[oklch(0.65_0.008_85)]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-ip-orange mt-0.5 flex-shrink-0" />
                <span>
                  4801 Burnet Rd
                  <br />
                  Austin, TX 78756
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-ip-orange flex-shrink-0" />
                <a
                  href="tel:+15128473920"
                  className="hover:text-ip-orange transition-colors duration-200"
                >
                  (512) 847-3920
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-ip-orange flex-shrink-0" />
                <a
                  href="mailto:info@ironpulsefitness.com"
                  className="hover:text-ip-orange transition-colors duration-200"
                >
                  info@ironpulsefitness.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[oklch(0.20_0.008_265)] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[oklch(0.45_0.006_85)]">
          <span>
            © {year} Iron Pulse Fitness. All rights reserved. Austin, TX.
          </span>
          <span>
            Built with ❤️ using{" "}
            <a
              href={utmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[oklch(0.60_0.008_85)] hover:text-ip-orange transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root App ─── */
export default function App() {
  return (
    <div className="dark min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PricingSection />
        <TransformationsSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
