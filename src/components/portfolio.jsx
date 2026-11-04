import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    Code2,
    Github,
    Mail,
    Linkedin,
    Download,
    Menu,
    X,
    ArrowUp,
    ArrowRight,
    CheckCircle,
    Star,
    Send,
    Globe,
    Bot,
    Server,
    Wrench,
    Monitor,
    Cpu,
    Clapperboard,
    MapPin,
    Loader2,
} from "lucide-react";
import "./portfolio.css";
import { motion, MotionConfig } from "framer-motion";
import ProjectShowcase from "./ProjectShowcase";
import ThemeToggle from "./ThemeToggle";
import useTheme from "../hooks/useTheme";
import emailjs from "@emailjs/browser";
import logoImg from "../assets/logo/logo-mark.webp"; // 128px crop of logo1.JPG

// ── CONFIGURATION — UPDATE THESE WITH YOUR REAL INFO ──
const env = import.meta.env;

const SITE_CONFIG = {
    // Personal links — set these in .env (local) and in Vercel → Settings → Environment Variables
    github: env.VITE_GITHUB_URL || "https://github.com/dejoseman",
    linkedin: env.VITE_LINKEDIN_URL || "https://linkedin.com/in/okechukwu-joseph",
    email: env.VITE_CONTACT_EMAIL || "jayytech77@gmail.com",

    // EmailJS — values from https://dashboard.emailjs.com
    emailjs: {
        serviceId: env.VITE_EMAILJS_SERVICE_ID || "",
        templateId: env.VITE_EMAILJS_TEMPLATE_ID || "",
        publicKey: env.VITE_EMAILJS_PUBLIC_KEY || "",
    },

    // Set VITE_HAS_RESUME=true once resume.pdf is in /public
    hasResume: env.VITE_HAS_RESUME === "true",
};

const isEmailJSConfigured = Boolean(
    SITE_CONFIG.emailjs.serviceId &&
    SITE_CONFIG.emailjs.templateId &&
    SITE_CONFIG.emailjs.publicKey
);

// ── DATA ──
const navItems = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
];

const coreSkills = [
    "Python", "React", "PHP", "JavaScript", "TypeScript",
    "Video Editing", "AI Integration", "Bot Development",
];

const skillCategories = [
    {
        icon: <Monitor size={20} />,
        title: "Frontend",
        items: ["React", "Vue.js", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript", "HTML5", "CSS3"],
    },
    {
        icon: <Server size={20} />,
        title: "Backend",
        items: ["Node.js", "Express", "PHP", "Python", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL"],
    },
    {
        icon: <Wrench size={20} />,
        title: "Tools & DevOps",
        items: ["Git", "Docker", "AWS", "Figma", "Postman", "Jest", "CI/CD", "Linux"],
    },
];

const services = [
    {
        icon: <Globe size={22} />,
        title: "Web Development",
        desc: "Building responsive, high-performance websites and web applications with modern frameworks.",
    },
    {
        icon: <Cpu size={22} />,
        title: "AI Integration",
        desc: "Integrating AI-powered solutions — chatbots, automation, and intelligent systems into your products.",
    },
    {
        icon: <Bot size={22} />,
        title: "Bot Development",
        desc: "Custom Telegram, Discord, and WhatsApp bots for automation, payments, and customer engagement.",
    },
    {
        icon: <Clapperboard size={22} />,
        title: "Video Editing",
        desc: "Professional video editing with motion graphics, color grading, and cinematic storytelling.",
    },
];

const experience = [
    {
        year: "2023 — Present",
        role: "Full Stack Developer",
        company: "Freelance / Contract",
        desc: "Building enterprise-grade web applications, AI integrations, and bespoke digital solutions for clients worldwide.",
    },
    {
        year: "2021 — 2023",
        role: "Frontend Developer",
        company: "Tech Agency",
        desc: "Led frontend architecture for multiple client projects using React, Next.js, and modern CSS frameworks.",
    },
    {
        year: "2019 — 2021",
        role: "Junior Developer",
        company: "Startup Studio",
        desc: "Built MVPs and prototypes for early-stage startups. Gained experience across the entire development stack.",
    },
];

const testimonials = [
    {
        text: "Jayy Tech delivered an outstanding platform that exceeded our expectations. The attention to detail and code quality was exceptional.",
        name: "Sarah M.",
        role: "CEO, AgroInvest",
        initials: "SM",
    },
    {
        text: "Working with Jayy was a game-changer for our business. He built a custom bot that automated 80% of our customer support.",
        name: "David K.",
        role: "Founder, TechStart",
        initials: "DK",
    },
    {
        text: "The portfolio website Jayy designed for me was modern, fast, and beautiful. I've gotten more client inquiries since the launch.",
        name: "Amina O.",
        role: "Creative Director",
        initials: "AO",
    },
];

const aboutHighlights = [
    "Full Stack Development",
    "AI & Machine Learning",
    "Bot Development",
    "Video Production",
    "API Architecture",
    "UI/UX Design",
];

// ── Animation variants (subtle; disabled automatically for reduced-motion users) ──
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.08 } },
};

const scrollBehavior = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";

const inView = { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.15 } };

const SectionHeader = ({ eyebrow, title, subtitle }) => (
    <motion.div className="section-header" {...inView} variants={fadeUp}>
        <div className="section-eyebrow">{eyebrow}</div>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.div>
);

const SocialLinks = ({ className = "social-btn", size = 18 }) => (
    <>
        <a href={SITE_CONFIG.github} target="_blank" rel="noreferrer" className={className} aria-label="GitHub profile">
            <Github size={size} aria-hidden="true" />
        </a>
        <a href={SITE_CONFIG.linkedin} target="_blank" rel="noreferrer" className={className} aria-label="LinkedIn profile">
            <Linkedin size={size} aria-hidden="true" />
        </a>
        <a href={`mailto:${SITE_CONFIG.email}`} className={className} aria-label="Send an email">
            <Mail size={size} aria-hidden="true" />
        </a>
    </>
);

const Portfolio = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const drawerRef = useRef(null);
    const menuBtnRef = useRef(null);
    const closeBtnRef = useRef(null);

    // Contact form state
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error
    const [formErrors, setFormErrors] = useState({});

    // ── Stars (dark theme only; hidden by CSS in light mode) ──
    useEffect(() => {
        const container = document.getElementById("stars-bg");
        if (!container || container.children.length > 0) return;
        const frag = document.createDocumentFragment();
        for (let i = 0; i < 70; i++) {
            const star = document.createElement("div");
            const size = (1 + Math.random() * 1.5).toFixed(2) + "px";
            star.className = "star";
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";
            star.style.width = size;
            star.style.height = size;
            star.style.setProperty("--delay", Math.random() * 6 + "s");
            star.style.setProperty("--duration", 4 + Math.random() * 5 + "s");
            frag.appendChild(star);
        }
        container.appendChild(frag);
    }, []);

    // ── Scroll tracking ──
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 24);
            setShowScrollTop(window.scrollY > 600);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ── Active section: a thin band across the middle of the viewport decides
    //    which section is "current" — works for very tall sections too. ──
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
        );
        ["home", ...navItems.map((n) => n.id)].forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    // Keep the closed drawer out of the tab order / accessibility tree
    useEffect(() => {
        const el = drawerRef.current;
        if (!el) return;
        if (menuOpen) el.removeAttribute("inert");
        else el.setAttribute("inert", "");
    }, [menuOpen]);

    // ── Mobile drawer: Esc to close, lock page scroll, move focus in/out ──
    useEffect(() => {
        if (!menuOpen) return undefined;
        document.body.classList.add("no-scroll");
        // Defer one frame: the drawer must be visible before it can take focus
        const focusFrame = requestAnimationFrame(() => closeBtnRef.current?.focus());
        const onKey = (e) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        const onResize = () => {
            if (window.innerWidth > 960) setMenuOpen(false);
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("resize", onResize);
        const menuBtn = menuBtnRef.current;
        return () => {
            cancelAnimationFrame(focusFrame);
            document.body.classList.remove("no-scroll");
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("resize", onResize);
            menuBtn?.focus({ preventScroll: true });
        };
    }, [menuOpen]);

    const scrollTo = useCallback((id) => {
        setMenuOpen(false);
        // Wait a frame so the body scroll-lock is released before scrolling
        requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
        });
    }, []);

    // ── Form validation ──
    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Please enter a valid email";
        }
        if (!formData.subject.trim()) errors.subject = "Subject is required";
        if (!formData.message.trim()) errors.message = "Message is required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // ── Form submission with EmailJS ──
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (!isEmailJSConfigured) {
            console.warn("EmailJS is not configured: set the VITE_EMAILJS_* environment variables.");
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 5000);
            return;
        }

        setFormStatus("sending");

        try {
            await emailjs.sendForm(
                SITE_CONFIG.emailjs.serviceId,
                SITE_CONFIG.emailjs.templateId,
                formRef.current,
                SITE_CONFIG.emailjs.publicKey
            );
            setFormStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setFormErrors({});
            setTimeout(() => setFormStatus("idle"), 5000);
        } catch (error) {
            console.error("EmailJS Error:", error);
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 5000);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const fieldProps = (name) => ({
        name,
        value: formData[name],
        onChange: handleInputChange,
        "aria-invalid": formErrors[name] ? "true" : undefined,
        "aria-describedby": formErrors[name] ? `contact-${name}-error` : undefined,
    });

    return (
        <MotionConfig reducedMotion="user">
            <div className="portfolio-wrapper">
                <a href="#main-content" className="skip-nav">
                    Skip to main content
                </a>

                {/* Ambient background (decorative) */}
                <div className="ambient" aria-hidden="true">
                    <div className="stars-canvas" id="stars-bg" />
                    <div className="ambient-orb orb-1" />
                    <div className="ambient-orb orb-2" />
                    <div className="ambient-grid" />
                </div>

                {/* ─── HEADER ─── */}
                <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
                    <div className="nav-inner">
                        <a
                            href="#home"
                            className="nav-logo"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollTo("home");
                            }}
                            aria-label="Jayy Tech — back to top"
                        >
                            <span className="nav-logo-icon">
                                <img src={logoImg} alt="" width="40" height="40" className="nav-logo-img" />
                            </span>
                            <span className="nav-logo-text">
                                <span className="nav-logo-name">Jayy Tech</span>
                                <span className="nav-logo-role">Full-Stack Engineer</span>
                            </span>
                        </a>

                        <nav className="nav-links" aria-label="Primary">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollTo(item.id);
                                    }}
                                    className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                                    aria-current={activeSection === item.id ? "location" : undefined}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <div className="nav-actions">
                            <ThemeToggle theme={theme} onToggle={toggleTheme} />
                            <button type="button" className="btn btn-primary btn-sm nav-cta" onClick={() => scrollTo("contact")}>
                                Hire Me <ArrowRight size={15} aria-hidden="true" />
                            </button>
                            <button
                                ref={menuBtnRef}
                                type="button"
                                className="nav-mobile-btn"
                                onClick={() => setMenuOpen(true)}
                                aria-label="Open navigation menu"
                                aria-expanded={menuOpen}
                                aria-controls="mobile-drawer"
                            >
                                <Menu size={22} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* ─── MOBILE DRAWER ─── */}
                <div
                    className={`mobile-overlay ${menuOpen ? "visible" : ""}`}
                    onClick={() => setMenuOpen(false)}
                    aria-hidden="true"
                />
                <aside
                    id="mobile-drawer"
                    ref={drawerRef}
                    className={`mobile-drawer ${menuOpen ? "open" : ""}`}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation menu"
                >
                    <div className="mobile-drawer-header">
                        <span className="nav-logo-name">Jayy Tech</span>
                        <button
                            ref={closeBtnRef}
                            type="button"
                            className="icon-btn"
                            onClick={() => setMenuOpen(false)}
                            aria-label="Close navigation menu"
                        >
                            <X size={22} aria-hidden="true" />
                        </button>
                    </div>
                    <nav className="mobile-drawer-nav" aria-label="Mobile">
                        {[{ id: "home", label: "Home" }, ...navItems].map((item, i) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollTo(item.id);
                                }}
                                className={`mobile-drawer-link ${activeSection === item.id ? "active" : ""}`}
                                style={{ "--i": i }}
                            >
                                <span>{item.label}</span>
                                <ArrowRight size={16} aria-hidden="true" />
                            </a>
                        ))}
                    </nav>
                    <ThemeToggle theme={theme} onToggle={toggleTheme} variant="row" />
                    <button type="button" className="btn btn-primary drawer-cta" onClick={() => scrollTo("contact")}>
                        <Send size={16} aria-hidden="true" /> Hire Me
                    </button>
                    <div className="drawer-socials">
                        <SocialLinks className="social-btn" />
                    </div>
                </aside>

                <main id="main-content">
                    {/* ─── HERO ─── */}
                    <section id="home" className="hero" aria-labelledby="hero-title">
                        <div className="hero-inner">
                            <motion.div className="hero-content" initial="hidden" animate="visible" variants={stagger}>
                                <motion.div variants={fadeUp}>
                                    <div className="hero-badge">
                                        <span className="badge-dot" aria-hidden="true" />
                                        Available for Projects
                                    </div>
                                </motion.div>

                                <motion.p className="hero-greeting" variants={fadeUp}>
                                    Hello, I'm
                                </motion.p>

                                <motion.h1 id="hero-title" className="hero-title" variants={fadeUp}>
                                    <span className="hero-name">Jayy Tech</span>
                                    <span className="hero-role">
                                        Full-Stack Developer <span className="hero-amp">&amp;</span> Software Engineer
                                    </span>
                                </motion.h1>

                                <motion.p className="hero-desc" variants={fadeUp}>
                                    I design and build scalable, reliable software — from polished, accessible
                                    interfaces to robust APIs, AI integrations and automation — turning
                                    complex problems into digital products that create real business impact.
                                </motion.p>

                                <motion.div className="hero-actions" variants={fadeUp}>
                                    <button type="button" onClick={() => scrollTo("projects")} className="btn btn-primary btn-lg">
                                        View My Work <ArrowRight size={18} aria-hidden="true" />
                                    </button>
                                    <button type="button" onClick={() => scrollTo("contact")} className="btn btn-secondary btn-lg">
                                        <Mail size={18} aria-hidden="true" /> Let's Connect
                                    </button>
                                </motion.div>

                                <motion.div className="hero-socials" variants={fadeUp}>
                                    <SocialLinks />
                                    <span className="hero-location">
                                        <MapPin size={15} aria-hidden="true" /> Lagos, Nigeria · Working globally
                                    </span>
                                </motion.div>
                            </motion.div>

                            {/* Code-window visual: communicates the engineering focus without stock imagery */}
                            <motion.div
                                className="hero-visual"
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                aria-hidden="true"
                            >
                                <div className="code-window">
                                    <div className="code-window__bar">
                                        <span className="code-window__dots">
                                            <i /><i /><i />
                                        </span>
                                        <span className="code-window__file">
                                            <Code2 size={13} /> engineer.ts
                                        </span>
                                    </div>
                                    <pre className="code-window__body">
                                        <code>
                                            <span className="tk-k">const</span> <span className="tk-v">jayy</span> <span className="tk-p">=</span> {"{"}
                                            {"\n  "}<span className="tk-prop">role</span>: <span className="tk-s">"Full-Stack Engineer"</span>,
                                            {"\n  "}<span className="tk-prop">frontend</span>: [<span className="tk-s">"React"</span>, <span className="tk-s">"Next.js"</span>, <span className="tk-s">"TypeScript"</span>],
                                            {"\n  "}<span className="tk-prop">backend</span>: [<span className="tk-s">"Node.js"</span>, <span className="tk-s">"Python"</span>, <span className="tk-s">"PHP"</span>],
                                            {"\n  "}<span className="tk-prop">data</span>: [<span className="tk-s">"PostgreSQL"</span>, <span className="tk-s">"MongoDB"</span>],
                                            {"\n  "}<span className="tk-prop">focus</span>: [<span className="tk-s">"AI"</span>, <span className="tk-s">"Automation"</span>, <span className="tk-s">"Scale"</span>],
                                            {"\n  "}<span className="tk-prop">ships</span>: <span className="tk-k">true</span>,
                                            {"\n"}{"}"};
                                            {"\n\n"}<span className="tk-c">{"// Clean code. Measurable impact."}</span>
                                            {"\n"}<span className="tk-k">export default</span> <span className="tk-v">jayy</span>;<span className="code-caret" />
                                        </code>
                                    </pre>
                                </div>
                                <div className="hero-visual__chip hero-visual__chip--top">
                                    <CheckCircle size={14} /> Production-ready
                                </div>
                                <div className="hero-visual__chip hero-visual__chip--bottom">
                                    <Server size={14} /> Frontend · Backend · AI
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="hero-tech-stack"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <div className="stack-label">Core Expertise</div>
                            <ul className="stack-tags">
                                {coreSkills.map((skill) => (
                                    <li key={skill} className="stack-tag">{skill}</li>
                                ))}
                            </ul>
                        </motion.div>
                    </section>

                    {/* ─── ABOUT ─── */}
                    <section id="about" className="section">
                        <SectionHeader
                            eyebrow="About Me"
                            title="The Developer Behind the Code"
                            subtitle="Passionate about building digital products that make a real impact"
                        />

                        <motion.div className="about-grid" {...inView} variants={stagger}>
                            <motion.div className="about-image-wrapper" variants={fadeUp}>
                                {/* TODO: Replace with your actual professional headshot */}
                                <img
                                    src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=640&h=640&fit=crop&auto=format&q=75"
                                    alt="Jayy Tech - Full Stack Developer"
                                    className="about-image"
                                    width="640"
                                    height="640"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="about-image-frame" aria-hidden="true" />
                            </motion.div>

                            <motion.div className="about-text-content" variants={fadeUp}>
                                <h3>Building the Future, One Line at a Time</h3>
                                <p className="about-desc">
                                    I'm a passionate full-stack developer with over 5 years of experience
                                    building modern web applications, AI-powered solutions, and custom
                                    automation tools. I believe in clean, efficient code that not only works
                                    flawlessly but delivers exceptional user experiences.
                                </p>
                                <ul className="about-highlights">
                                    {aboutHighlights.map((item) => (
                                        <li key={item} className="highlight-item">
                                            <CheckCircle size={16} className="highlight-check" aria-hidden="true" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="about-actions">
                                    {SITE_CONFIG.hasResume && (
                                        <a href="/resume.pdf" download className="btn btn-primary">
                                            <Download size={16} aria-hidden="true" /> Download Resume
                                        </a>
                                    )}
                                    <button type="button" className="btn btn-ghost" onClick={() => scrollTo("contact")}>
                                        Start a conversation <ArrowRight size={16} aria-hidden="true" />
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Skills */}
                        <motion.div className="skills-grid" {...inView} variants={stagger}>
                            {skillCategories.map((cat) => (
                                <motion.article key={cat.title} className="card skill-card" variants={fadeUp}>
                                    <div className="card-icon" aria-hidden="true">{cat.icon}</div>
                                    <h3 className="skill-card-title">{cat.title}</h3>
                                    <ul className="skill-pills">
                                        {cat.items.map((s) => (
                                            <li key={s} className="skill-pill">{s}</li>
                                        ))}
                                    </ul>
                                </motion.article>
                            ))}
                        </motion.div>
                    </section>

                    {/* ─── SERVICES ─── */}
                    <section id="services" className="section section--tinted">
                        <SectionHeader
                            eyebrow="Services"
                            title="What I Can Do For You"
                            subtitle="End-to-end digital solutions tailored to your business needs"
                        />

                        <motion.div className="services-grid" {...inView} variants={stagger}>
                            {services.map((svc) => (
                                <motion.article key={svc.title} className="card service-card" variants={fadeUp}>
                                    <div className="card-icon" aria-hidden="true">{svc.icon}</div>
                                    <h3 className="service-title">{svc.title}</h3>
                                    <p className="service-desc">{svc.desc}</p>
                                </motion.article>
                            ))}
                        </motion.div>
                    </section>

                    {/* ─── PROJECTS SHOWCASE ─── */}
                    <ProjectShowcase />

                    {/* ─── EXPERIENCE TIMELINE ─── */}
                    <section id="experience" className="section">
                        <SectionHeader
                            eyebrow="Experience"
                            title="My Journey"
                            subtitle="Key milestones in my professional career"
                        />

                        <motion.ol className="timeline" {...inView} variants={stagger}>
                            {experience.map((exp) => (
                                <motion.li key={exp.year} className="timeline-item" variants={fadeUp}>
                                    <span className="timeline-dot" aria-hidden="true" />
                                    <div className="timeline-card">
                                        <div className="timeline-meta">
                                            <span className="timeline-year">{exp.year}</span>
                                            <span className="timeline-company">{exp.company}</span>
                                        </div>
                                        <h3 className="timeline-role">{exp.role}</h3>
                                        <p className="timeline-desc">{exp.desc}</p>
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ol>
                    </section>

                    {/* ─── TESTIMONIALS ─── */}
                    <section className="section section--tinted" aria-labelledby="testimonials-title">
                        <motion.div className="section-header" {...inView} variants={fadeUp}>
                            <div className="section-eyebrow">Testimonials</div>
                            <h2 id="testimonials-title" className="section-title">What Clients Say</h2>
                            <p className="section-subtitle">
                                Feedback from people I've had the pleasure of working with
                            </p>
                        </motion.div>

                        <motion.div className="testimonials-grid" {...inView} variants={stagger}>
                            {testimonials.map((t) => (
                                <motion.figure key={t.name} className="card testimonial-card" variants={fadeUp}>
                                    <div className="testimonial-stars" role="img" aria-label="5 out of 5 stars">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
                                        ))}
                                    </div>
                                    <blockquote className="testimonial-text">“{t.text}”</blockquote>
                                    <figcaption className="testimonial-author">
                                        <span className="testimonial-avatar" aria-hidden="true">{t.initials}</span>
                                        <span>
                                            <span className="testimonial-name">{t.name}</span>
                                            <span className="testimonial-role">{t.role}</span>
                                        </span>
                                    </figcaption>
                                </motion.figure>
                            ))}
                        </motion.div>
                    </section>

                    {/* ─── CONTACT ─── */}
                    <section id="contact" className="section">
                        <SectionHeader
                            eyebrow="Get in Touch"
                            title="Let's Work Together"
                            subtitle="Have a project in mind? I'd love to hear about it."
                        />

                        <motion.div className="contact-grid" {...inView} variants={stagger}>
                            <motion.div className="contact-info" variants={fadeUp}>
                                <div className="contact-info-header">
                                    <h3>Let's Build Something Amazing</h3>
                                    <p>
                                        I'm always open to discussing new projects, creative ideas, or
                                        opportunities to be part of your vision.
                                    </p>
                                </div>

                                <ul className="contact-list">
                                    <li className="contact-item">
                                        <span className="contact-item-icon" aria-hidden="true"><Mail size={18} /></span>
                                        <span className="contact-item-body">
                                            <span className="contact-item-label">Email</span>
                                            <a href={`mailto:${SITE_CONFIG.email}`} className="contact-item-text contact-link">
                                                {SITE_CONFIG.email}
                                            </a>
                                        </span>
                                    </li>
                                    <li className="contact-item">
                                        <span className="contact-item-icon" aria-hidden="true"><MapPin size={18} /></span>
                                        <span className="contact-item-body">
                                            <span className="contact-item-label">Location</span>
                                            <span className="contact-item-text">Lagos, Nigeria</span>
                                        </span>
                                    </li>
                                    <li className="contact-item">
                                        <span className="contact-item-icon" aria-hidden="true"><Globe size={18} /></span>
                                        <span className="contact-item-body">
                                            <span className="contact-item-label">Availability</span>
                                            <span className="contact-item-text">Open for freelance projects</span>
                                        </span>
                                    </li>
                                </ul>

                                <div className="contact-socials">
                                    <SocialLinks />
                                </div>
                            </motion.div>

                            <motion.form
                                ref={formRef}
                                className="card contact-form"
                                variants={fadeUp}
                                onSubmit={handleSubmit}
                                noValidate
                                aria-label="Contact form"
                            >
                                <div aria-live="polite">
                                    {formStatus === "success" && (
                                        <div className="form-toast form-toast--success" role="status">
                                            <CheckCircle size={18} aria-hidden="true" />
                                            <span>Message sent successfully! I'll get back to you soon.</span>
                                        </div>
                                    )}
                                    {formStatus === "error" && (
                                        <div className="form-toast form-toast--error" role="alert">
                                            <X size={18} aria-hidden="true" />
                                            <span>Failed to send. Please email me directly or try again.</span>
                                        </div>
                                    )}
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="contact-name" className="form-label">Your Name</label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            placeholder="John Doe"
                                            className={`form-input ${formErrors.name ? "form-input--error" : ""}`}
                                            required
                                            autoComplete="name"
                                            {...fieldProps("name")}
                                        />
                                        {formErrors.name && <span id="contact-name-error" className="form-error">{formErrors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contact-email" className="form-label">Your Email</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            placeholder="john@example.com"
                                            className={`form-input ${formErrors.email ? "form-input--error" : ""}`}
                                            required
                                            autoComplete="email"
                                            inputMode="email"
                                            {...fieldProps("email")}
                                        />
                                        {formErrors.email && <span id="contact-email-error" className="form-error">{formErrors.email}</span>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-subject" className="form-label">Subject</label>
                                    <input
                                        id="contact-subject"
                                        type="text"
                                        placeholder="Project Discussion"
                                        className={`form-input ${formErrors.subject ? "form-input--error" : ""}`}
                                        required
                                        {...fieldProps("subject")}
                                    />
                                    {formErrors.subject && <span id="contact-subject-error" className="form-error">{formErrors.subject}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-message" className="form-label">Message</label>
                                    <textarea
                                        id="contact-message"
                                        rows="5"
                                        placeholder="Tell me about your project..."
                                        className={`form-textarea ${formErrors.message ? "form-input--error" : ""}`}
                                        required
                                        {...fieldProps("message")}
                                    />
                                    {formErrors.message && <span id="contact-message-error" className="form-error">{formErrors.message}</span>}
                                </div>
                                <button type="submit" className="btn btn-primary btn-block" disabled={formStatus === "sending"}>
                                    {formStatus === "sending" ? (
                                        <>
                                            <Loader2 size={16} className="spin" aria-hidden="true" /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={16} aria-hidden="true" /> Send Message
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        </motion.div>
                    </section>
                </main>

                {/* ─── FOOTER ─── */}
                <footer className="site-footer">
                    <div className="footer-inner">
                        <div className="footer-brand">
                            <span className="footer-logo">
                                <img src={logoImg} alt="" width="36" height="36" className="footer-logo-img" loading="lazy" />
                            </span>
                            <span>
                                <span className="footer-name">Jayy Tech</span>
                                <span className="footer-tagline">Full-Stack Developer &amp; Software Engineer</span>
                            </span>
                        </div>

                        <nav className="footer-nav" aria-label="Footer">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollTo(item.id);
                                    }}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <div className="footer-socials">
                            <SocialLinks className="social-btn social-btn--sm" size={16} />
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <span>© {new Date().getFullYear()} Jayy Tech. All rights reserved.</span>
                        <span className="footer-built">Designed &amp; engineered in Lagos</span>
                    </div>
                </footer>

                {/* Scroll-to-top */}
                <button
                    type="button"
                    className={`scroll-top-btn ${showScrollTop ? "visible" : ""}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: scrollBehavior() })}
                    aria-label="Scroll to top"
                    tabIndex={showScrollTop ? 0 : -1}
                >
                    <ArrowUp size={20} aria-hidden="true" />
                </button>
            </div>
        </MotionConfig>
    );
};

export default Portfolio;
