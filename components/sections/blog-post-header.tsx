import { H1, H3, P } from "@/components/ui/typography";
import { PostMeta } from "@/lib/posts";
import { BlogPostDate } from "./blog-post-date";
import { BlogPostTags } from "./blog-post-tags";

export function BlogPostHeader({
  post,
  variant = "page",
}: {
  post: PostMeta;
  variant?: "page" | "list";
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {variant === "page" ? (
          <H1>{post.title}</H1>
        ) : (
          <H3 className="block">{post.title}</H3>
        )}
        <P className="text-sm text-gray-300">
          <BlogPostDate date={post.date} />
        </P>
      </div>
      <BlogPostTags tags={post.tags} />
    </div>
  );
}
