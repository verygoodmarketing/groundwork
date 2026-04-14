import type { MetadataRoute } from "next";
import { allPosts } from "@/lib/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";
  const now = new Date();

  const industryPages = [
    "plumbers",
    "landscapers",
    "cleaners",
    "hvac",
    "electricians",
    "contractors",
  ];

  const comparisonPages = ["wix", "squarespace", "godaddy"];

  const blogPosts = allPosts.map((post) => ({
    url: `${appUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: appUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${appUrl}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${appUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...industryPages.map((slug) => ({
      url: `${appUrl}/for/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...comparisonPages.map((slug) => ({
      url: `${appUrl}/vs/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...blogPosts,
  ];
}
