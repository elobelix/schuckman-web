import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity client — reads env vars set in Cloudflare Pages dashboard.
// During local dev, set them in a .env file (gitignored).
// Returns null if not configured, so the site can build with fallback data.

const projectId = import.meta.env.SANITY_PROJECT_ID || import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || 'production';

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true, // CDN cache for fast reads on production
    })
  : null;

// Image URL builder
const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;
export const urlFor = (source: any) => builder?.image(source);

export const isSanityConfigured = !!sanityClient;
