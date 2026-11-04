# ⚡ Jayy Tech — Full Stack Developer & Technology Architect Portfolio

A world-class, high-performance portfolio website crafted with **React 19**, **Vite 7**, **Framer Motion**, and **Tailwind CSS**. Designed for speed, responsive elegance, accessibility, and measurable client conversion.

![Portfolio Preview](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop)

---

## 🌟 Highlights & Features

- **🎨 Modern Dark Glassmorphism UI**: Curated color palette featuring deep midnight navy, electric violet, and opulent gold accents.
- **✨ Ambient Particle Sky**: Dynamic twinkling star field and soft floating ambient glow orbs.
- **💼 Categorized Project Showcase**:
  - Filterable by Full-Stack Web Apps, Mobile Applications, UI/UX Design, and AI Bots & Automation.
  - Asymmetric masonry grid layout with featured cards and hover preview glows.
  - Graceful NDA / client confidentiality fallback states with "Demo on Request" direct contact triggers.
- **📬 Working Contact Form with EmailJS**:
  - Real-time client-side validation.
  - Direct inbox forwarding without needing a custom backend server.
  - Accessible feedback toasts and animated loading states.
- **📱 Fully Responsive Design**: Seamless experience across mobile, tablet, laptop, and ultra-wide displays.
- **♿ Accessible & SEO-Optimized**:
  - Semantic HTML5 landmarks (`<nav>`, `<main>`, `<section>`, `<footer>`).
  - Open Graph tags, Twitter card metadata, and custom SVG branding favicon.
  - Skip-to-content navigation for keyboard accessibility.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 7](https://vitejs.dev/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Email Delivery** | [@emailjs/browser](https://www.emailjs.com/) |
| **Styling** | Vanilla CSS + [Tailwind CSS v4](https://tailwindcss.com/) |
| **Deployment** | [Vercel](https://vercel.com/) / [Netlify](https://www.netlify.com/) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `pnpm` or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/jayytech-portfolio.git
   cd jayytech-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## ⚙️ Customization & Setup Guide

### 1. Update Personal Info & Social Links
Open [`src/components/portfolio.jsx`](src/components/portfolio.jsx) and locate `SITE_CONFIG` near the top of the file:
```javascript
const SITE_CONFIG = {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-profile",
    email: "your.email@domain.com",
    ...
};
```

### 2. Enable EmailJS for Contact Inquiries
To receive direct contact submissions straight into your inbox:
1. Create a free account at [EmailJS](https://www.emailjs.com/).
2. Create an **Email Service** (e.g., Gmail, Outlook).
3. Create an **Email Template** with variables `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`.
4. Copy your **Service ID**, **Template ID**, and **Public Key** into `SITE_CONFIG` in `src/components/portfolio.jsx`:
```javascript
    emailjs: {
        serviceId: "YOUR_SERVICE_ID",
        templateId: "YOUR_TEMPLATE_ID",
        publicKey: "YOUR_PUBLIC_KEY",
    },
```

### 3. Add Your Resume
1. Place your PDF resume into the `public/` folder and name it `resume.pdf`:
   ```text
   public/
   └── resume.pdf
   ```
2. In `src/components/portfolio.jsx`, set:
   ```javascript
   hasResume: true,
   ```
   The "Download Resume" button will automatically appear in the About section.

### 4. Updating Project Showcase Details
To add, edit, or remove projects, update the `projectCategories` array in [`src/components/ProjectShowcase.jsx`](src/components/ProjectShowcase.jsx).

Each project accepts:
- `title`: Project title
- `category`: Category ID (`"fullstack"` | `"mobile"` | `"uiux"` | `"bots"`)
- `description`: Value-focused summary
- `imageURL`: Screenshot or banner
- `techStack`: Array of technology pills
- `liveLink`: URL to live deployed site (or `"#"` to display "Demo on Request")
- `codeLink`: URL to GitHub repository (or `"#"` to display "Private Repo (NDA)")
- `featured`: `true` | `false` (featured projects span wide in the grid)

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)
This repository includes a [`vercel.json`](vercel.json) configured for Single Page Application routing.
1. Push your code to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Leave build settings as default (`npm run build`, output: `dist`).
5. Click **Deploy**.

### Deploy to Netlify
1. Connect your repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add a `_redirects` file in `public/` containing: `/*  /index.html  200`

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Crafted with ⚡ by **Okechukwu Joseph** (Jayy Tech) — Transforming bold ideas into high-impact digital realities.
