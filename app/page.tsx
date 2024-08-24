import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bold, H1, H2, H3, P } from "@/components/ui/typography";
import { PostMeta, getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function BlogPage() {
  const posts: PostMeta[] = getAllPosts();

  return (
    <>
      <section className="container py-32 space-y-8">
        <H1 className="text-gray-200 font-bold !text-3xl">
          Hi I&apos;m Adam 👋
        </H1>
        <P className="text-gray-200">
          I&apos;m a{" "}
          <span className="font-bold text-white">frontend developer</span>,{" "}
          <span className="font-bold">ui &amp; ux designer</span>. I currently
          work at <span className="font-bold">Mystic.ai</span>. This site will
          act as a sort of portfolio, but mostly a scratch-pad for UX and UI
          ideas, and what I think are best practices. Technologies usually are{" "}
          <Bold>React</Bold>, <Bold>TypeScript</Bold>, and{" "}
          <Bold>TailwindCSS</Bold>.
        </P>
      </section>

      <Separator className="-mx-4" />

      <section className="container text-white py-32 space-y-8">
        <H2 className="">Blog posts</H2>
        <ul className="space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className=" space-y-3 group">
                <H3 className="group-hover:underline">{post.title}</H3>
                <div className="flex gap-2 flex-wrap">
                  {post.tags?.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
