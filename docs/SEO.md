# SEO Strategy & Configuration

Versa is built with SEO best practices out of the box.

## 1. Metadata
Every page uses the `Layout.astro` component which accepts a `title` and `description`.
- **Title**: Formatted as "Page Name - Versa" or custom.
- **Description**: Unique meta description for each page.
- **Open Graph**: Basic OG tags are included for social sharing.

## 2. Sitemap
A sitemap is automatically generated at build time using `@astrojs/sitemap`.
- Location: `/sitemap-index.xml`
- Configuration: See `astro.config.mjs`.

## 3. Robots.txt
Located in `public/robots.txt`. It points to the sitemap and allows all crawlers by default.

## 4. Semantic HTML
- Proper usage of `<header>`, `<main>`, `<footer>`, `<article>`, and `<nav>`.
- `<h1>` tags are used strictly once per page for the main heading.
- Accessible ARIA labels on interactive elements.

## 5. Performance (Core Web Vitals)
- **Lazy Loading**: Images are optimized via Astro. Lottie animations use `client:only` to avoid blocking the main thread, though they load JS.
- **Zero JS Default**: Most content pages are static HTML with 0kb of client-side JS unless a React component is used.
