# SoftSell — Landing Page

> Turn Unused Software Licenses Into Instant Cash

A production-quality SaaS landing page built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI library |
| Vite | 5 | Build tool |
| Tailwind CSS | 3 | Styling |
| Framer Motion | 11 | Animations |
| Lucide React | 0.400 | Icons |

## 📁 Folder Structure

```
softsell/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky responsive navbar
│   │   ├── Hero.jsx            # Hero section with dashboard mockup
│   │   ├── HowItWorks.jsx      # 3-step process cards
│   │   ├── WhyChooseUs.jsx     # 4 feature cards with glow effects
│   │   ├── Testimonials.jsx    # Customer review cards
│   │   ├── ContactForm.jsx     # Validated contact form
│   │   ├── ChatWidget.jsx      # AI chat bot widget
│   │   └── Footer.jsx          # Full footer
│   ├── hooks/
│   │   └── useInView.js        # Intersection observer hook
│   ├── App.jsx                 # Root app + loading screen
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles + Tailwind
├── index.html                  # SEO meta tags + fonts
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── package.json
```

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm

### Install & Run

```bash
# Clone the repo
git clone https://github.com/yourusername/softsell.git
cd softsell

# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

### Build for Production

```bash
npm run build

# Preview production build locally
npm run preview
```

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Option 2: GitHub Integration
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Framework: **Vite** (auto-detected)
5. Click **Deploy**

No environment variables required for the base project.

## ✨ Features

### Sections
- **Navbar** — Sticky, transparent, responsive with mobile hamburger
- **Hero** — Bold headline, dual CTA, animated dashboard mockup with floating cards
- **How It Works** — 3-step animated cards with hover effects
- **Why Choose Us** — 4 feature cards with glowing hover effects + live stats
- **Testimonials** — 4 realistic customer reviews with amount recovered
- **Contact Form** — Full frontend validation, success state, accessible
- **AI Chat Widget** — Rule-based chatbot with typing animation, quick prompts
- **Footer** — Full links, social icons, newsletter, branding

### Design
- Dark theme (`#0B0F19` background)
- Glassmorphism UI elements
- Gradient accents (`#6366F1` → `#8B5CF6`)
- Syne (display) + DM Sans (body) typography
- Smooth Framer Motion animations
- Intersection Observer scroll animations
- Responsive across all breakpoints

### Accessibility
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>`)
- ARIA labels on all interactive elements
- Keyboard navigable
- `role="alert"` on form errors
- `aria-live` on chat typing indicator
- `aria-expanded` on mobile menu toggle
- `aria-required` and `aria-invalid` on form inputs
- Skip navigation support via smooth scroll

## 🎨 Design Tokens

```css
/* Colors */
--bg-primary:      #0B0F19
--brand-primary:   #6366F1
--brand-secondary: #8B5CF6
--text-primary:    #F8FAFC
--text-secondary:  #94A3B8

/* Fonts */
display: 'Syne'
body:    'DM Sans'
mono:    'JetBrains Mono'
```

## 📦 Customization

### Changing content
Edit data directly in the component files:
- Testimonials → `src/components/Testimonials.jsx`
- Features → `src/components/WhyChooseUs.jsx`
- Steps → `src/components/HowItWorks.jsx`
- Chat responses → `src/components/ChatWidget.jsx` → `FAQ_RESPONSES`

### Changing colors
Edit `tailwind.config.js` → `theme.extend.colors`

## 📄 License

MIT © SoftSell Inc.
