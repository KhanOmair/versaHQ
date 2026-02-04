// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // REPLACE WITH YOUR ACTUAL DOMAIN
  site: 'https://www.versahq.online', 
  // base: '/versaHQ',
  
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), partytown(), sitemap()]
});