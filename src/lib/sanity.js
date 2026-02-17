import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Sanity client configuration
export const client = createClient({
  projectId: 'zcovo2xk',
  dataset: 'production',
  useCdn: false, // set to false for fresh data during development
  apiVersion: '2024-01-01',
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Helper function to format date
export function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// GROQ Queries
export const queries = {
  // Services
  allServices: `*[_type == "service" && !(_id in path("drafts.**")) && (isVisible == true || !defined(isVisible))] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    description,
    image,
    features,
    details,
    process
  }`,

  serviceBySlug: (slug) => `*[_type == "service" && slug.current == "${slug}"][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    description,
    image,
    features,
    details,
    process
  }`,

  // Blog Posts
  allBlogPosts: `*[_type == "blogPost" && !(_id in path("drafts.**")) && (isVisible == true || !defined(isVisible))] | order(publishedDate desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedDate,
    author,
    image
  }`,

  blogPostBySlug: (slug) => `*[_type == "blogPost" && slug.current == "${slug}"][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedDate,
    author,
    image,
    content
  }`,

  // Resources
  allResources: `*[_type == "resource" && !(_id in path("drafts.**")) && (isVisible == true || !defined(isVisible))] {
    _id,
    title,
    "slug": slug.current,
    type,
    description,
    image,
    downloadUrl
  }`,

  resourceBySlug: (slug) => `*[_type == "resource" && slug.current == "${slug}"][0] {
    _id,
    title,
    "slug": slug.current,
    type,
    description,
    image,
    downloadUrl,
    sections
  }`,

  // Team Members
  allTeamMembers: `*[_type == "teamMember" && !(_id in path("drafts.**")) && (isVisible == true || !defined(isVisible))] | order(order asc) {
    _id,
    name,
    role,
    bio,
    image,
    isFeatured,
    social
  }`,

  // Testimonials
  allTestimonials: `*[_type == "testimonial" && !(_id in path("drafts.**")) && (isVisible == true || !defined(isVisible))] | order(order asc) {
    _id,
    name,
    role,
    company,
    logo,
    image,
    text,
    project
  }`,

  // Partner Companies
  allPartnerCompanies: `*[_type == "partnerCompany" && !(_id in path("drafts.**")) && (isVisible == true || !defined(isVisible))] | order(order asc) {
    _id,
    name
  }`,

  // Home Page Singleton
  homePage: `*[_type == "homePage"][0] {
    heroSection,
    aboutSection,
    missionSection,
    valueProposition,
    winningStrategies
  }`,

  // Footer Singleton
  footer: `*[_type == "footer"][0] {
    companyDescription,
    email,
    phone,
    website,
    copyrightText
  }`,
};
