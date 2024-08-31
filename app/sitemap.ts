import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/seo";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const STATIC_URLS = ["/", "/blog"];
  const blogPosts = getAllPosts();

  const postRoutes = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
  }));

  // Generate other urls
  const otherRoutes = STATIC_URLS.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...otherRoutes, ...postRoutes];
}
