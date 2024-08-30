import { BlogPostItem } from "@/components/sections/blog-post-item";
import { BlogPostList } from "@/components/sections/blog-post-list";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bold, H1, H2, H3, P } from "@/components/ui/typography";
import { PostMeta, getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/seo";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  const posts: PostMeta[] = getAllPosts();

  return (
    <>
      <section className="container py-32 space-y-8">
        <Image
          src="/adam-glasses.jpg"
          alt="Adam Leith"
          width={200}
          height={200}
          className="rounded-full"
        />
        <H1 className="text-gray-200">Hi I&apos;m Adam 👋</H1>
        <P className="text-gray-200">
          I&apos;m a{" "}
          <span className="font-bold text-white">frontend developer</span>,{" "}
          <span className="font-bold">ui &amp; ux designer</span>. I currently
          work at <span className="font-bold">Mystic.ai</span>. I use web
          frameworks like <Bold>React.js</Bold> and <Bold>Vue.js</Bold>, to
          allow me to express user interfaces quickly so I can focus on the user
          experience.
        </P>
        <P className="text-gray-200">
          I&apos;m also a big advocate for <Bold>TypeScript</Bold>, and{" "}
          <Bold>TailwindCSS</Bold>.
        </P>
      </section>

      <Separator />

      <section className="container text-white py-32 space-y-8">
        <H2 className="font-extrabold sr-only">Blog posts</H2>
        <BlogPostList posts={posts} />
      </section>
    </>
  );
}

export async function generateMetadata({}: any): Promise<Metadata | undefined> {
  return {
    title: "Adam Leith P",
    description: `Blogging about web development, design, and more.`,
    openGraph: {
      title: "Adam Leith P",
      description: `Blogging about web development, design, and more.`,
      type: "website",
      url: `${siteConfig.url}`,
      images: [
        {
          url: `${siteConfig.url}/api/og?title=Adam Leith P&description=Blogging about web development, design, and more.&tags=web,development,design`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Adam Leith P",
      description: `Blogging about web development, design, and more.`,
      images: [
        `${siteConfig.url}/api/og?title=Adam Leith P&description=Blogging about web development, design, and more.&tags=web,development,design`,
      ],
    },
  };
}
