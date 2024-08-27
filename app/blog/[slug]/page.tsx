// app/blog/[slug]/page.tsx
import { BlogPostDate } from "@/components/sections/blog-post-date";
import { BlogPostHeader } from "@/components/sections/blog-post-header";
import { BlogPostTags } from "@/components/sections/blog-post-tags";
import { MarkdownRenderer } from "@/components/sections/markdown-renderer";
import { H1, P } from "@/components/ui/typography";
import { PostMeta, getAllPosts, getPostBySlug } from "@/lib/posts";

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
