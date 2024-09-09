import { H1, H2, H3, P } from "@/components/ui/typography";
import { PostMeta } from "@/lib/posts";
import { BlogPostDate } from "./blog-post-date";
import { BlogPostTags } from "./blog-post-tags";
import dynamic from "next/dynamic";
import { TextSkeleton } from "../examples/text-skeleton";

const BlogPostPageView = dynamic(
  () => import("./blog-post-page-view").then((mod) => mod.BlogPostPageView),
  {
    ssr: false,
    loading: () => <TextSkeleton>1K page views</TextSkeleton>,
  }
);

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
        <div className="flex gap-4 items-center">
          <span className="text-sm text-gray-400 w-auto">
            <BlogPostDate date={post.date} />{" "}
          </span>
          <span className="text-sm text-gray-400 w-auto">
            <BlogPostPageView slug={post.slug} />{" "}
          </span>
        </div>
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
