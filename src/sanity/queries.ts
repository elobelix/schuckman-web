import { sanityClient, isSanityConfigured } from './client';
import fallbackData from '../data/fallback.json';

// Each query returns Sanity data when configured, fallback JSON otherwise.
// This means the site builds even before Sanity is set up.

export async function getSiteSettings() {
  if (!isSanityConfigured) return fallbackData.settings;
  const query = `*[_type == "settings"][0]{
    hero, team, services[], contact, instagramUrl,
    "officeImage": officeImage.asset->url,
    "teamImage": teamImage.asset->url
  }`;
  const data = await sanityClient!.fetch(query);
  return data || fallbackData.settings;
}

export async function getAllProjects() {
  if (!isSanityConfigured) return fallbackData.projects;
  const query = `*[_type == "proyecto"] | order(orderRank asc){
    _id, name, "slug": slug.current, status, currentStage,
    address, neighborhood, year, orderRank,
    "coverImage": coverImage.asset->url
  }`;
  const data = await sanityClient!.fetch(query);
  return data || fallbackData.projects;
}

export async function getProjectBySlug(slug: string) {
  if (!isSanityConfigured) {
    return fallbackData.projects.find((p: any) => p.slug === slug);
  }
  const query = `*[_type == "proyecto" && slug.current == $slug][0]{
    _id, name, "slug": slug.current, status, currentStage,
    address, neighborhood, year,
    superficie, pisos, unidades, cocheras, bauleras,
    tipologias, amenities, customAmenities, instagramUrl,
    stages,
    "coverImage": coverImage.asset->url,
    "gallery": gallery[].asset->url
  }`;
  const data = await sanityClient!.fetch(query, { slug });
  return data;
}

export async function getAllRemodelaciones() {
  if (!isSanityConfigured) return fallbackData.remodelaciones || [];
  const query = `*[_type == "remodelacion"] | order(orderRank asc){
    _id, name, "slug": slug.current, tipo,
    neighborhood, year, orderRank,
    "coverImage": coverImage.asset->url
  }`;
  const data = await sanityClient!.fetch(query);
  return data || fallbackData.remodelaciones || [];
}

export async function getRemodelacionBySlug(slug: string) {
  if (!isSanityConfigured) {
    return (fallbackData.remodelaciones || []).find((r: any) => r.slug === slug);
  }
  const query = `*[_type == "remodelacion" && slug.current == $slug][0]{
    _id, name, "slug": slug.current, tipo,
    neighborhood, year,
    superficie, descripcion,
    "coverImage": coverImage.asset->url,
    "gallery": gallery[].asset->url
  }`;
  const data = await sanityClient!.fetch(query, { slug });
  return data;
}
