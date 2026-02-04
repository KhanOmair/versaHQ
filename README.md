# Versa - SaaS Marketing Website

A modern, high-performance SaaS marketing website built with [Astro](https://astro.build), React, and Tailwind CSS.

## Features
- 🚀 **High Performance**: Built with Astro's islands architecture.
- 🎨 **Modern Design**: Tailwind CSS v4 with a premium dark mode aesthetic.
- ✨ **Animations**: GSAP for scroll reveals and Framer Motion/React for interactions.
- 📱 **Responsive**: Fully optimized for mobile, tablet, and desktop.
- 📝 **Blog**: MDX-based content collections for easy blogging.
- 🎮 **Interactive Delight**: Includes a custom "Latency Runner" mini-game.
- 🔍 **SEO Ready**: Sitemap, Robots.txt, and metadata configured.

## Project Structure
```text
/
├── public/              # Static assets (robots.txt, favicon)
├── src/
│   ├── components/      # Reusable UI components
│   ├── layouts/         # Page layouts
│   ├── pages/           # Route pages (index, services, etc.)
│   ├── content/         # Blog posts (MDX)
│   └── styles/          # Global CSS
├── docs/                # Detailed documentation
└── astro.config.mjs     # Astro configuration
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) to view the site.

### 3. Build for Production
```bash
npm run build
```
The output will be in the `dist/` directory.

## Deployment
The project is configured for GitHub Pages.
See [docs/DEPLOY_GITHUB_PAGES.md](docs/DEPLOY_GITHUB_PAGES.md) for detailed instructions on setting up your custom domain.

## Customization
- **Colors & Fonts**: Edit `src/styles/global.css`.
- **Content**: Edit pages in `src/pages/` and blog posts in `src/content/blog/`.
- **Site URL**: Update `site` in `astro.config.mjs` before generating your final sitemap.
