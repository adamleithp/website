// app/blog/[slug]/page.tsx
import { BlogPostHeader } from "@/components/sections/blog-post-header";
import { MarkdownRenderer } from "@/components/sections/markdown-renderer";
import { PostMeta, getAllPosts, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/seo";
import { Metadata } from "next";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post: PostMeta = getPostBySlug(params.slug);

  return (
    <div className="space-y-16">
      <BlogPostHeader post={post} variant="page" />
      <div className="space-y-4">
        {/* Render the MDX content */}
        <MarkdownRenderer content={post.content} />
      </div>
    </div>
  );
}

// Optional: You can use generateStaticParams if you want to generate the static pages at build time
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: any): Promise<Metadata | undefined> {
  const post = getPostBySlug(params.slug);
  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: `${post.description}`,
      type: "article",
      url: `${siteConfig.url}/blog/${params.slug}`,
      images: [
        {
          url: `${siteConfig.url}/api/og?title=${post.title}&description=${
            post.description
          }&tags=${post.tags.join(",")}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${siteConfig.name}`,
      description: `${post.description}`,
      images: [
        `${siteConfig.url}/api/og?title=${post.title}&description=${
          post.description
        }&tags=${post.tags.join(",")}`,
      ],
    },
  };
}
