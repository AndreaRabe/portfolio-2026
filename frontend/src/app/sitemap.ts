import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://andrea.dev";

// Static project slugs — extend when adding real projects
const PROJECT_SLUGS = [
  "lakehouse-migration",
  "realtime-pipeline",
  "ecommerce-analytics",
  "ops-dashboard",
  "feature-store",
  "data-quality-platform",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = PROJECT_SLUGS.map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projects,
  ];
}
