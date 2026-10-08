import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";

const SITE = "https://searchyouajob.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    { url: `${SITE}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...TOOLS.map((t) => ({
      url: `${SITE}/tools/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
