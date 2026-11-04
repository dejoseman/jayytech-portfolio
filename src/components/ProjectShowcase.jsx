import React, { useState } from "react";
import {
    ExternalLink,
    Github,
    Layers,
    Smartphone,
    Palette,
    Bot,
    Zap,
    ArrowRight,
    TrendingUp,
    Clock,
    Code2,
    Users,
    Globe,
    Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import "./ProjectShowcase.css";

/* ─────────────────────────────────────────────
   PROJECT DATA — Organized by Category
   ───────────────────────────────────────────── */

const projectCategories = [
    {
        id: "fullstack",
        icon: <Layers size={22} />,
        title: "Full-Stack Web Apps",
        hook: "Not Just Code. Digital Experiences.",
        description:
            "End-to-end platforms built for scale — from payment gateways to real-time dashboards. Every line of code is engineered to deliver measurable business impact and flawless user journeys.",
        metrics: [
            { label: "Projects Shipped", value: "15+" },
            { label: "Technologies", value: "React, Node, Python" },
            { label: "Uptime Achieved", value: "99.9%" },
            { label: "Users Served", value: "10K+" },
        ],
        projects: [
            {
                title: "AgroInvest Platform",
                category: "fullstack",
                description:
                    "A full-featured agricultural investment platform with Paystack payment integration, admin dashboards, real-time portfolio tracking, and automated ROI calculations.",
                imageURL:
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
                techStack: ["React", "Node.js", "MongoDB", "Paystack", "Express"],
                liveLink: "#",
                codeLink: "#",
                featured: true,
            },
            {
                title: "GymNTonic E-Commerce",
                category: "fullstack",
                description:
                    "Modern fitness e-commerce platform with shopping cart, secure checkout, inventory management, and analytics dashboard for store owners.",
                imageURL:
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
                techStack: ["React", "Express", "PostgreSQL", "Stripe", "Redis"],
                liveLink: "#",
                codeLink: "#",
                featured: false,
            },
            {
                title: "Real-Time Chat Application",
                category: "fullstack",
                description:
                    "WebSocket-powered messaging platform with end-to-end encryption, file sharing, read receipts, and group chat functionality.",
                imageURL:
                    "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop",
                techStack: ["Next.js", "Socket.io", "MongoDB", "Redis"],
                liveLink: "#",
                codeLink: "#",
                featured: false,
            },
            {
                title: "SaaS Analytics Dashboard",
                category: "fullstack",
                description:
                    "Enterprise-grade analytics platform with real-time data visualization, custom report generation, and team collaboration features.",
                imageURL:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
                techStack: ["React", "Python", "PostgreSQL", "D3.js", "AWS"],
                liveLink: "#",
                codeLink: "#",
                featured: true,
            },
        ],
    },
    {
        id: "mobile",
        icon: <Smartphone size={22} />,
        title: "Mobile Applications",
        hook: "Pocket-Sized Powerhouses.",
        description:
            "Native-feel mobile experiences that users love and keep coming back to. Crafted with performance-first architecture and buttery-smooth animations that feel right at home on any device.",
        metrics: [
            { label: "Apps Delivered", value: "8+" },
            { label: "Platforms", value: "iOS & Android" },
            { label: "Avg Rating", value: "4.8★" },
            { label: "Downloads", value: "5K+" },
        ],
        projects: [
            {
                title: "FitTrack Pro",
                category: "mobile",
                description:
                    "Comprehensive fitness tracking app with workout plans, calorie counting, progress analytics, and social features for community challenges.",
                imageURL:
                    "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=600&fit=crop",
                techStack: ["React Native", "Firebase", "Redux", "Node.js"],
                liveLink: "#",
                codeLink: "#",
                featured: true,
            },
            {
                title: "TaskFlow Mobile",
                category: "mobile",
                description:
                    "Productivity app with drag-and-drop task management, smart notifications, real-time collaboration, and intelligent task prioritization using AI.",
                imageURL:
                    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
                techStack: ["React Native", "Firebase", "Tailwind"],
                liveLink: "#",
                codeLink: "#",
                featured: false,
            },
            {
                title: "QuickPay Wallet",
                category: "mobile",
                description:
                    "Digital wallet application with peer-to-peer transfers, bill payments, transaction history, and biometric authentication security.",
                imageURL:
                    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
                techStack: ["Flutter", "Dart", "Firebase", "Stripe SDK"],
                liveLink: "#",
                codeLink: "#",
                featured: false,
            },
        ],
    },
    {
        id: "ai-bots",
        icon: <Bot size={22} />,
        title: "AI & Bot Development",
        hook: "Intelligence, Automated.",
        description:
            "From customer-facing chatbots to complex AI integrations — building intelligent systems that automate the mundane and amplify human capability, saving businesses thousands of hours.",
        metrics: [
            { label: "Bots Deployed", value: "12+" },
            { label: "Automation Rate", value: "80%+" },
            { label: "Platforms", value: "Telegram, Discord" },
            { label: "Messages Handled", value: "1M+" },
        ],
        projects: [
            {
                title: "AI Customer Support Bot",
                category: "ai-bots",
                description:
                    "GPT-powered customer service bot that handles 80% of inquiries autonomously, with seamless handoff to human agents and learning from past interactions.",
                imageURL:
                    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
                techStack: ["Python", "OpenAI API", "FastAPI", "PostgreSQL"],
                liveLink: "#",
                codeLink: "#",
                featured: true,
            },
            {
                title: "Telegram Payment Bot",
                category: "ai-bots",
                description:
                    "Multi-currency payment bot for Telegram with escrow services, automated invoicing, dispute resolution, and real-time transaction notifications.",
                imageURL:
                    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
                techStack: ["Node.js", "Telegraf", "MongoDB", "Paystack"],
                liveLink: "#",
                codeLink: "#",
                featured: false,
            },
            {
                title: "Content Generation Engine",
                category: "ai-bots",
                description:
                    "AI-powered content creation platform that generates blog posts, social media captions, and marketing copy with brand voice consistency.",
                imageURL:
                    "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&h=600&fit=crop",
                techStack: ["Python", "LangChain", "React", "OpenAI"],
                liveLink: "#",
                codeLink: "#",
                featured: true,
            },
        ],
    },
    {
        id: "uiux",
        icon: <Palette size={22} />,
        title: "UI/UX Design",
        hook: "Where Pixels Meet Purpose.",
        description:
            "Designing interfaces that don't just look stunning — they convert. Every interaction is intentional, every layout is data-informed, and every pixel serves the user's journey toward their goal.",
        metrics: [
            { label: "Designs Delivered", value: "20+" },
            { label: "Tools", value: "Figma, Adobe XD" },
            { label: "Conversion Lift", value: "35%+" },
            { label: "Client Satisfaction", value: "100%" },
        ],
        projects: [
            {
                title: "FinTech Dashboard Redesign",
                category: "uiux",
                description:
                    "Complete redesign of a financial technology platform with improved data visualization, streamlined workflows, and a 40% reduction in user drop-off rates.",
                imageURL:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
                techStack: ["Figma", "Prototyping", "User Research", "A/B Testing"],
                liveLink: "#",
                codeLink: "#",
                featured: true,
            },
            {
                title: "E-Learning Platform UI",
                category: "uiux",
                description:
                    "Designed an intuitive learning management system with gamification elements, progress tracking, and accessible design for diverse user demographics.",
                imageURL:
                    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
                techStack: ["Figma", "Adobe XD", "Illustrator", "Miro"],
                liveLink: "#",
                codeLink: "#",
                featured: false,
            },
            {
                title: "Health & Wellness App Design",
                category: "uiux",
                description:
                    "Crafted a calming, accessible mobile app interface for mental wellness tracking with soothing color palettes and micro-interaction design.",
                imageURL:
                    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
                techStack: ["Figma", "Principle", "User Testing", "Design System"],
                liveLink: "#",
                codeLink: "#",
                featured: false,
            },
        ],
    },
];

/* Unsplash: let the CDN serve WebP/AVIF at a sensible quality */
const optimizeImage = (url) =>
    url.includes("images.unsplash.com") && !url.includes("auto=format") ? `${url}&auto=format&q=70` : url;

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────── */

const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.12 } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─────────────────────────────────────────────
   CATEGORY FILTER TABS
   ───────────────────────────────────────────── */

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }) => (
    <motion.div
        role="group"
        aria-label="Filter projects by category"
        className="showcase-tabs"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
    >
        <button
            type="button"
            className={`showcase-tab ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => onCategoryChange("all")}
            aria-pressed={activeCategory === "all"}
            aria-label="All Work"
        >
            <Sparkles size={16} />
            <span>All Work</span>
        </button>
        {categories.map((cat) => (
            <button
                type="button"
                key={cat.id}
                className={`showcase-tab ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => onCategoryChange(cat.id)}
                aria-pressed={activeCategory === cat.id}
                aria-label={cat.title}
            >
                {cat.icon}
                <span>{cat.title}</span>
            </button>
        ))}
    </motion.div>
);

/* ─────────────────────────────────────────────
   PROJECT CARD COMPONENT
   ───────────────────────────────────────────── */

const ProjectCard = ({ project, featured }) => {
    const hasLiveLink = project.liveLink && project.liveLink !== "#";
    const hasCodeLink = project.codeLink && project.codeLink !== "#";

    return (
        <motion.article
            className={`showcase-card ${featured ? "showcase-card--featured" : ""}`}
            variants={scaleIn}
        >
            {/* Image area */}
            <div className="showcase-card__image-wrapper">
                <img
                    src={optimizeImage(project.imageURL)}
                    alt={`${project.title} preview`}
                    className="showcase-card__image"
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                />
                {/* Gradient overlay */}
                <div className="showcase-card__overlay" aria-hidden="true" />

                {/* Hover actions */}
                <div className="showcase-card__actions">
                    {hasLiveLink ? (
                        <a
                            href={project.liveLink}
                            className="showcase-card__action-btn showcase-card__action-btn--primary"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <ExternalLink size={15} />
                            <span>View Live Project</span>
                            <span className="showcase-card__btn-glow" aria-hidden="true" />
                        </a>
                    ) : (
                        <a
                            href="#contact"
                            className="showcase-card__action-btn showcase-card__action-btn--primary"
                            title="Live demo available upon inquiry"
                        >
                            <ExternalLink size={15} />
                            <span>Demo on Request</span>
                            <span className="showcase-card__btn-glow" aria-hidden="true" />
                        </a>
                    )}
                    {hasCodeLink ? (
                        <a
                            href={project.codeLink}
                            className="showcase-card__action-btn showcase-card__action-btn--secondary"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Github size={15} />
                            <span>Source Code</span>
                        </a>
                    ) : (
                        <span
                            className="showcase-card__action-btn showcase-card__action-btn--secondary showcase-card__action-btn--disabled"
                            title="Code protected under client NDA / proprietary"
                        >
                            <Github size={15} />
                            <span>Private Repo (NDA)</span>
                        </span>
                    )}
                </div>

                {/* Featured badge */}
                {featured && (
                    <div className="showcase-card__badge">
                        <Zap size={12} />
                        Featured
                    </div>
                )}
            </div>

            {/* Content area */}
            <div className="showcase-card__content">
                <div className="showcase-card__tech-stack">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="showcase-card__tech-pill">
                            {tech}
                        </span>
                    ))}
                </div>
                <h4 className="showcase-card__title">{project.title}</h4>
                <p className="showcase-card__description">{project.description}</p>

                <div className="showcase-card__footer">
                    {hasLiveLink ? (
                        <a
                            href={project.liveLink}
                            className="showcase-card__case-study-link"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Read Case Study <ArrowRight size={14} />
                        </a>
                    ) : (
                        <a
                            href="#contact"
                            className="showcase-card__case-study-link"
                        >
                            Inquire About Project <ArrowRight size={14} />
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

/* ─────────────────────────────────────────────
   CATEGORY SECTION COMPONENT
   ───────────────────────────────────────────── */

const CategorySection = ({ category, index }) => {
    const isReversed = index % 2 !== 0;

    return (
        <div className="showcase-category" id={`category-${category.id}`}>
            {/* Decorative background element */}
            <div className="showcase-category__bg-accent" aria-hidden="true" />

            <div className={`showcase-category__layout ${isReversed ? "reversed" : ""}`}>
                {/* ── Header & Hook ── */}
                <motion.div
                    className="showcase-category__header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={isReversed ? fadeRight : fadeLeft}
                >
                    <div className="showcase-category__header-inner">
                        <div className="showcase-category__icon-badge">
                            {category.icon}
                        </div>

                        <span className="showcase-category__label">{category.title}</span>

                        <h3 className="showcase-category__hook">{category.hook}</h3>

                        <p className="showcase-category__description">
                            {category.description}
                        </p>

                        {/* Trust Metrics */}
                        <div className="showcase-category__metrics">
                            {category.metrics.map((metric) => (
                                <div key={metric.label} className="showcase-metric">
                                    <span className="showcase-metric__value">{metric.value}</span>
                                    <span className="showcase-metric__label">{metric.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="showcase-category__header-line" />
                    </div>
                </motion.div>

                {/* ── Project Grid ── */}
                <motion.div
                    className="showcase-category__grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={stagger}
                >
                    {category.projects.map((project, idx) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={idx}
                            featured={project.featured}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   MAIN SHOWCASE COMPONENT
   ───────────────────────────────────────────── */

const ProjectShowcase = () => {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredCategories =
        activeCategory === "all"
            ? projectCategories
            : projectCategories.filter((c) => c.id === activeCategory);

    return (
        <section id="projects" className="showcase-section">
            {/* Section header */}
            <motion.div
                className="showcase-section__header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
            >
                <div className="showcase-section__eyebrow">
                    <Code2 size={16} />
                    <span>Portfolio</span>
                </div>
                <h2 className="showcase-section__title">
                    Crafted with <span className="showcase-section__title-accent">Precision</span>
                </h2>
                <p className="showcase-section__subtitle">
                    A curated collection of projects across domains — each one designed to solve
                    real-world problems with elegant, scalable solutions.
                </p>
            </motion.div>

            {/* Quick stats bar */}
            <motion.div
                className="showcase-global-stats"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
            >
                {[
                    { icon: <TrendingUp size={18} />, value: "50+", label: "Projects Delivered" },
                    { icon: <Users size={18} />, value: "30+", label: "Happy Clients" },
                    { icon: <Clock size={18} />, value: "5+", label: "Years Experience" },
                    { icon: <Globe size={18} />, value: "10+", label: "Countries Served" },
                ].map((stat) => (
                    <motion.div key={stat.label} className="showcase-global-stat" variants={fadeUp}>
                        <div className="showcase-global-stat__icon">{stat.icon}</div>
                        <div className="showcase-global-stat__value">{stat.value}</div>
                        <div className="showcase-global-stat__label">{stat.label}</div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Category filter tabs */}
            <CategoryTabs
                categories={projectCategories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            {/* Categorized project sections */}
            <div className="showcase-categories">
                {filteredCategories.map((category, index) => (
                    <CategorySection
                        key={category.id}
                        category={category}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProjectShowcase;
