// app/blog/page.tsx
import { BlogPostItem } from "@/components/sections/blog-post-item";
import { H1 } from "@/components/ui/typography";
import { PostMeta, getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts: PostMeta[] = getAllPosts();

  return (
    <div className="space-y-8">
      <H1>Blog</H1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <BlogPostItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
