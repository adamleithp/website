// app/blog/page.tsx
import { BlogPostItem } from "@/components/sections/blog-post-item";
import { BlogPostList } from "@/components/sections/blog-post-list";
import { H1 } from "@/components/ui/typography";
import { PostMeta, getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts: PostMeta[] = getAllPosts();

  return (
    <div className="space-y-8">
      <H1>Blog</H1>
      <BlogPostList posts={posts} />
    </div>
  );
}
