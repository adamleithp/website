// app/blog/page.tsx
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bold, H1, H2, H3, H4, P } from "@/components/ui/typography";
import { PostMeta, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export default function BlogPage() {
  const posts: PostMeta[] = getAllPosts();

  return (
    <div className="space-y-8">
      <H2 className="">Blog</H2>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className=" space-y-2 group">
              <H3 className="group-hover:underline">{post.title}</H3>
              <p>{post.date}</p>
              <div className="flex gap-2 flex-wrap">
                {post.tags?.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              {/* <div className="line-clamp-3">
                  <MDXRemote source={post.content} />
                </div> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
