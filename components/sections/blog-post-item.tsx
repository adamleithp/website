import { Button } from "@/components/ui/button";
import { PostMeta } from "@/lib/posts";
import Link from "next/link";
import { BlogPostHeader } from "./blog-post-header";

export function BlogPostItem({ post }: { post: PostMeta }) {
  return (
    <Button
      asChild
      variant={"ghost"}
      size="none"
      className="flex-col items-start space-y-2 w-full whitespace-normal p-4"
    >
      <Link href={`/blog/${post.slug}`}>
        <BlogPostHeader post={post} variant="list" />
      </Link>
    </Button>
  );
}
