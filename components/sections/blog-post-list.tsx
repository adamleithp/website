import { PostMeta } from "@/lib/posts";
import { BlogPostItem } from "./blog-post-item";

export function BlogPostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="space-y-8 -mx-4">
      {posts.map((post) => (
        <li key={post.slug}>
          <BlogPostItem post={post} />
        </li>
      ))}
    </ul>
  );
}
