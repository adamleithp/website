import { H1, H2, H3, P } from "@/components/ui/typography";
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
      <div className="space-y-2">
        <P className="text-sm text-gray-400">
          <BlogPostDate date={post.date} />
        </P>
        {variant === "page" ? (
          <H1>{post.title}</H1>
        ) : (
          <H3 className="block">{post.title}</H3>
        )}
        {variant === "page" ? (
          <H2 className="text-gray-300 font-normal">{post.description}</H2>
        ) : (
          <P className="text-gray-300">{post.description}</P>
        )}
      </div>
      <BlogPostTags tags={post.tags} />
    </div>
  );
}
