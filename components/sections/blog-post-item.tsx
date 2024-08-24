import { PostMeta } from "@/lib/posts";
import { Button } from "../ui/button";
import Link from "next/link";
import { H3 } from "../ui/typography";
import { Badge } from "../ui/badge";

export function BlogPostItem({ post }: { post: PostMeta }) {
  return (
    <Button
      asChild
      variant={"ghost"}
      size="none"
      className="flex-col items-start space-y-2 group w-full whitespace-normal"
    >
      <Link href={`/blog/${post.slug}`}>
        <H3 className="group-hover:underline block">{post.title}</H3>
        <p>{post.date}</p>
        <div className="flex gap-2 flex-wrap">
          {post.tags?.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </Link>
    </Button>
  );
}
