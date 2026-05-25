import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.schuckman.com.ar',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    define: {
      'import.meta.env.SANITY_PROJECT_ID': JSON.stringify(process.env.SANITY_PROJECT_ID || ''),
      'import.meta.env.SANITY_DATASET': JSON.stringify(process.env.SANITY_DATASET || 'production'),
    }
  }
});
