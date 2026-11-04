import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    Code,
    ExternalLink,
    Github,
    Mail,
    Linkedin,
    Download,
    Menu,
    X,
    Briefcase,
    User,
    Phone,
    Home,
    Eye,
    ArrowUp,
    CheckCircle,
    Star,
    Send,
    Globe,
    Bot,
    Palette,
    Server,
    ChevronRight,
    MapPin,
    Loader2,
} from "lucide-react";
import "./portfolio.css";
import { motion } from "framer-motion";
import ProjectShowcase from "./ProjectShowcase";
import emailjs from "@emailjs/browser";
import logoImg from "../assets/logo/logo1.JPG";

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

const Portfolio = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

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

    // ── Stars generation ──
    useEffect(() => {
        const container = document.getElementById("stars-bg");
        if (!container || container.children.length > 0) return;
        for (let i = 0; i < 120; i++) {
            const star = document.createElement("div");
            star.className = "star";
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";
            star.style.setProperty("--delay", Math.random() * 5 + "s");
            star.style.setProperty("--duration", (2 + Math.random() * 4) + "s");
            star.style.width = (1 + Math.random() * 2) + "px";
            star.style.height = star.style.width;
            container.appendChild(star);
        }
    }, []);

    // ── Scroll tracking ──
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ── Intersection observer for active section ──
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3 }
        );
        document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const scrollTo = useCallback((id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
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
            console.error("EmailJS is not configured: set the VITE_EMAILJS_* environment variables.");
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
            // Reset success state after 5 seconds
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
        // Clear error on type
        if (formErrors[name]) {
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // ── DATA ──
    const navItems = [
        { id: "home", label: "Home", icon: <Home size={16} /> },
        { id: "about", label: "About", icon: <User size={16} /> },
        { id: "projects", label: "Projects", icon: <Briefcase size={16} /> },
        { id: "contact", label: "Contact", icon: <Phone size={16} /> },
    ];

    const coreSkills = [
        "Python", "React", "PHP", "JavaScript", "TypeScript",
        "Video Editing", "AI Integration", "Bot Development",
    ];

    const skillCategories = [
        {
            icon: "🎨",
            title: "Frontend",
            items: ["React", "Vue.js", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript", "HTML5", "CSS3"],
        },
        {
            icon: "⚙️",
            title: "Backend",
            items: ["Node.js", "Express", "PHP", "Python", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL"],
        },
        {
            icon: "🛠",
            title: "Tools & DevOps",
            items: ["Git", "Docker", "AWS", "Figma", "Postman", "Jest", "CI/CD", "Linux"],
        },
    ];

    const services = [
        {
            icon: "💻",
            title: "Web Development",
            desc: "Building responsive, high-performance websites and web applications with modern frameworks.",
        },
        {
            icon: "🤖",
            title: "AI Integration",
            desc: "Integrating AI-powered solutions — chatbots, automation, and intelligent systems into your products.",
        },
        {
            icon: "🤖",
            title: "Bot Development",
            desc: "Custom Telegram, Discord, and WhatsApp bots for automation, payments, and customer engagement.",
        },
        {
            icon: "🎬",
            title: "Video Editing",
            desc: "Professional video editing with motion graphics, color grading, and cinematic storytelling.",
        },
    ];

    // Projects data is now managed by the ProjectShowcase component

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

    // ── Fade-in animation variants ──
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const stagger = {
        visible: { transition: { staggerChildren: 0.1 } },
    };

    return (
        <div className="portfolio-wrapper">
            {/* Skip navigation for accessibility */}
            <a href="#main-content" className="skip-nav">
                Skip to main content
            </a>

            {/* Ambient effects */}
            <div className="stars-canvas" id="stars-bg" aria-hidden="true" />
            <div className="ambient-orb orb-1" aria-hidden="true" />
            <div className="ambient-orb orb-2" aria-hidden="true" />
            <div className="ambient-orb orb-3" aria-hidden="true" />

            {/* ─── NAVIGATION ─── */}
            <nav className={`premium-nav ${scrolled ? "scrolled" : ""}`} aria-label="Main navigation">
                <div className="nav-inner">
                    <button
                        className="nav-logo"
                        onClick={() => scrollTo("home")}
                        aria-label="Go to top"
                        tabIndex={0}
                    >
                        <div className="nav-logo-icon" aria-hidden="true">
                            <img src={logoImg} alt="Jayy Tech Logo" className="nav-logo-img" />
                        </div>
                        <div className="nav-logo-text">
                            <span className="nav-logo-name">Jayy Tech</span>
                            <span className="nav-logo-role">Full Stack Developer</span>
                        </div>
                    </button>

                    <div className="nav-links">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                                aria-current={activeSection === item.id ? "true" : undefined}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>

                    <button className="nav-cta" onClick={() => scrollTo("contact")}>
                        <Send size={16} /> Hire Me
                    </button>

                    <button
                        className="nav-mobile-btn"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open navigation menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile drawer */}
            <div
                className={`mobile-overlay ${menuOpen ? "visible" : ""}`}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
            />
            <div
                className={`mobile-drawer ${menuOpen ? "open" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
            >
                <div className="mobile-drawer-header">
                    <span className="nav-logo-name">Jayy Tech</span>
                    <button
                        className="mobile-drawer-close"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close navigation menu"
                    >
                        <X size={24} />
                    </button>
                </div>
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`mobile-drawer-link ${activeSection === item.id ? "active" : ""}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <main id="main-content">
                {/* ─── HERO ─── */}
                <section id="home" className="hero">
                    <motion.div
                        className="hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp}>
                            <div className="hero-badge">
                                <span className="badge-dot" aria-hidden="true" />
                                Available for Projects
                            </div>
                        </motion.div>

                        <motion.p className="hero-greeting" variants={fadeUp}>
                            Hello, I'm
                        </motion.p>

                        <motion.h1 className="hero-title" variants={fadeUp}>
                            <span className="hero-name">Jayy Tech</span>
                        </motion.h1>

                        <motion.p className="hero-subtitle" variants={fadeUp}>
                            Premium <span className="hero-highlight">Full Stack Developer</span> &amp; Technology Architect
                        </motion.p>

                        <motion.p className="hero-desc" variants={fadeUp}>
                            Crafting exceptional digital experiences with cutting-edge technologies.
                            Specializing in scalable web applications, AI integration, and enterprise
                            solutions that drive innovation and business growth.
                        </motion.p>

                        <motion.div className="hero-actions" variants={fadeUp}>
                            <button onClick={() => scrollTo("projects")} className="btn-hero-primary">
                                <Eye size={18} /> View My Work <ChevronRight size={16} />
                            </button>
                            <button onClick={() => scrollTo("contact")} className="btn-hero-secondary">
                                <Mail size={18} /> Let's Connect
                            </button>
                        </motion.div>

                        <motion.div className="hero-tech-stack" variants={fadeUp}>
                            <div className="stack-label">Core Expertise</div>
                            <div className="stack-tags">
                                {coreSkills.map((skill) => (
                                    <span key={skill} className="stack-tag">{skill}</span>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div className="hero-socials" variants={fadeUp}>
                            <a
                                href={SITE_CONFIG.github}
                                target="_blank"
                                rel="noreferrer"
                                className="social-btn"
                                aria-label="Visit GitHub profile"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href={SITE_CONFIG.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="social-btn"
                                aria-label="Visit LinkedIn profile"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href={`mailto:${SITE_CONFIG.email}`}
                                className="social-btn"
                                aria-label="Send email"
                            >
                                <Mail size={20} />
                            </a>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ─── ABOUT ─── */}
                <section id="about" className="section">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <div className="section-eyebrow">About Me</div>
                        <h2 className="section-title">The Developer Behind the Code</h2>
                        <p className="section-subtitle">
                            Passionate about building digital products that make a real impact
                        </p>
                    </motion.div>

                    <motion.div
                        className="about-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div className="about-image-wrapper" variants={fadeUp}>
                            {/* TODO: Replace with your actual professional headshot */}
                            <img
                                src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=400&h=400&fit=crop"
                                alt="Jayy Tech - Full Stack Developer"
                                className="about-image"
                                loading="lazy"
                            />
                            <div className="about-image-glow" aria-hidden="true" />
                        </motion.div>

                        <motion.div className="about-text-content" variants={fadeUp}>
                            <h3>Building the Future, One Line at a Time</h3>
                            <p className="about-desc">
                                I'm a passionate full-stack developer with over 5 years of experience
                                building modern web applications, AI-powered solutions, and custom
                                automation tools. I believe in clean, efficient code that not only works
                                flawlessly but delivers exceptional user experiences.
                            </p>
                            <div className="about-highlights">
                                {[
                                    "Full Stack Development",
                                    "AI & Machine Learning",
                                    "Bot Development",
                                    "Video Production",
                                    "API Architecture",
                                    "UI/UX Design",
                                ].map((item) => (
                                    <div key={item} className="highlight-item">
                                        <CheckCircle size={16} className="highlight-check" aria-hidden="true" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                            {SITE_CONFIG.hasResume && (
                                <a href="/resume.pdf" download className="btn-resume">
                                    <Download size={16} /> Download Resume
                                </a>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Skills */}
                    <motion.div
                        className="skills-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        {skillCategories.map((cat) => (
                            <motion.div key={cat.title} className="skill-card" variants={fadeUp}>
                                <div className="skill-card-icon" aria-hidden="true">{cat.icon}</div>
                                <h3 className="skill-card-title">{cat.title}</h3>
                                <div className="skill-pills">
                                    {cat.items.map((s) => (
                                        <span key={s} className="skill-pill">{s}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* ─── SERVICES ─── */}
                <section className="section">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <div className="section-eyebrow">Services</div>
                        <h2 className="section-title">What I Can Do For You</h2>
                        <p className="section-subtitle">
                            End-to-end digital solutions tailored to your business needs
                        </p>
                    </motion.div>

                    <motion.div
                        className="services-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        {services.map((svc) => (
                            <motion.div key={svc.title} className="service-card" variants={fadeUp}>
                                <div className="service-icon" aria-hidden="true">{svc.icon}</div>
                                <h3 className="service-title">{svc.title}</h3>
                                <p className="service-desc">{svc.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* ─── PROJECTS SHOWCASE ─── */}
                <ProjectShowcase />

                {/* ─── EXPERIENCE TIMELINE ─── */}
                <section className="section">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <div className="section-eyebrow">Experience</div>
                        <h2 className="section-title">My Journey</h2>
                        <p className="section-subtitle">
                            Key milestones in my professional career
                        </p>
                    </motion.div>

                    <motion.div
                        className="timeline"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        {experience.map((exp) => (
                            <motion.div key={exp.year} className="timeline-item" variants={fadeUp}>
                                <div className="timeline-dot" aria-hidden="true" />
                                <div className="timeline-year">{exp.year}</div>
                                <div className="timeline-role">{exp.role}</div>
                                <div className="timeline-company">{exp.company}</div>
                                <p className="timeline-desc">{exp.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* ─── TESTIMONIALS ─── */}
                <section className="section projects-bg">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <div className="section-eyebrow">Testimonials</div>
                        <h2 className="section-title">What Clients Say</h2>
                        <p className="section-subtitle">
                            Feedback from people I've had the pleasure of working with
                        </p>
                    </motion.div>

                    <motion.div
                        className="testimonials-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        {testimonials.map((t) => (
                            <motion.div key={t.name} className="testimonial-card" variants={fadeUp}>
                                <div className="testimonial-stars" aria-label="5 out of 5 stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
                                    ))}
                                </div>
                                <p className="testimonial-text">"{t.text}"</p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar" aria-hidden="true">{t.initials}</div>
                                    <div>
                                        <div className="testimonial-name">{t.name}</div>
                                        <div className="testimonial-role">{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* ─── CONTACT ─── */}
                <section id="contact" className="section">
                    <motion.div
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <div className="section-eyebrow">Get in Touch</div>
                        <h2 className="section-title">Let's Work Together</h2>
                        <p className="section-subtitle">
                            Have a project in mind? I'd love to hear about it.
                        </p>
                    </motion.div>

                    <motion.div
                        className="contact-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        <motion.div className="contact-info" variants={fadeUp}>
                            <div className="contact-info-header">
                                <h3>Let's Build Something Amazing</h3>
                                <p>
                                    I'm always open to discussing new projects, creative ideas, or
                                    opportunities to be part of your vision.
                                </p>
                            </div>

                            <div className="contact-item">
                                <div className="contact-item-icon"><Mail size={18} /></div>
                                <div>
                                    <div className="contact-item-label">Email</div>
                                    <a href={`mailto:${SITE_CONFIG.email}`} className="contact-item-text contact-link">
                                        {SITE_CONFIG.email}
                                    </a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-item-icon"><MapPin size={18} /></div>
                                <div>
                                    <div className="contact-item-label">Location</div>
                                    <div className="contact-item-text">Lagos, Nigeria</div>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-item-icon"><Globe size={18} /></div>
                                <div>
                                    <div className="contact-item-label">Availability</div>
                                    <div className="contact-item-text">Open for freelance projects</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.form
                            ref={formRef}
                            className="contact-form"
                            variants={fadeUp}
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            {/* Success / Error toast */}
                            {formStatus === "success" && (
                                <div className="form-toast form-toast--success">
                                    <CheckCircle size={18} />
                                    <span>Message sent successfully! I'll get back to you soon.</span>
                                </div>
                            )}
                            {formStatus === "error" && (
                                <div className="form-toast form-toast--error">
                                    <X size={18} />
                                    <span>Failed to send. Please email me directly or try again.</span>
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="contact-name" className="form-label">Your Name</label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    className={`form-input ${formErrors.name ? "form-input--error" : ""}`}
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="name"
                                />
                                {formErrors.name && <span className="form-error">{formErrors.name}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-email" className="form-label">Your Email</label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    className={`form-input ${formErrors.email ? "form-input--error" : ""}`}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="email"
                                />
                                {formErrors.email && <span className="form-error">{formErrors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-subject" className="form-label">Subject</label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    name="subject"
                                    placeholder="Project Discussion"
                                    className={`form-input ${formErrors.subject ? "form-input--error" : ""}`}
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                />
                                {formErrors.subject && <span className="form-error">{formErrors.subject}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-message" className="form-label">Message</label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows="5"
                                    placeholder="Tell me about your project..."
                                    className={`form-textarea ${formErrors.message ? "form-input--error" : ""}`}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                />
                                {formErrors.message && <span className="form-error">{formErrors.message}</span>}
                            </div>
                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={formStatus === "sending"}
                            >
                                {formStatus === "sending" ? (
                                    <>
                                        <Loader2 size={16} className="spin" /> Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} /> Send Message
                                    </>
                                )}
                            </button>
                        </motion.form>
                    </motion.div>
                </section>
            </main>

            {/* ─── FOOTER ─── */}
            <footer className="premium-footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <div className="footer-logo" aria-hidden="true">
                            <img src={logoImg} alt="Jayy Tech Logo" className="footer-logo-img" />
                        </div>
                        <span className="footer-name">Jayy Tech</span>
                    </div>

                    <span className="footer-copy">
                        © {new Date().getFullYear()} Jayy Tech. All rights reserved.
                    </span>

                    <div className="footer-socials">
                        <a
                            href={SITE_CONFIG.github}
                            target="_blank"
                            rel="noreferrer"
                            className="footer-social-btn"
                            aria-label="GitHub"
                        >
                            <Github size={16} />
                        </a>
                        <a
                            href={SITE_CONFIG.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="footer-social-btn"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={16} />
                        </a>
                        <a
                            href={`mailto:${SITE_CONFIG.email}`}
                            className="footer-social-btn"
                            aria-label="Email"
                        >
                            <Mail size={16} />
                        </a>
                    </div>
                </div>
            </footer>

            {/* Scroll-to-top */}
            <button
                className={`scroll-top-btn ${showScrollTop ? "visible" : ""}`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Scroll to top"
            >
                <ArrowUp size={20} />
            </button>
        </div>
    );
};

export default Portfolio;