import { BlogPostList } from "@/components/sections/blog-post-list";
import { Separator } from "@/components/ui/separator";
import { Bold, H1, H2, P } from "@/components/ui/typography";
import { PostMeta, getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/seo";
import { Metadata } from "next";
import Image from "next/image";

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
        <H1 className="text-gray-200">Adam Leith</H1>
        <P className="text-gray-200">
          I&apos;m a <Bold>frontend developer</Bold> and{" "}
          <Bold>UI/UX designer</Bold>, working at{" "}
          <Link
            href="https://www.mystic.ai"
            target="_blank"
            className="font-bold text-white underline"
          >
            Mystic.ai
          </Link>
          . I specialize in building fast, accessible web applications using
          modern technologies. By focusing on efficient, expressive user
          interfaces, I ensure that the user experience always comes first.
          I&apos;m an advocate for <Bold>TypeScript</Bold>, and{" "}
          <Bold>TailwindCSS</Bold>.
        </P>
        <P className="text-gray-200">
          Here&apos;s my blog where I write about web development, design, and
          more.
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
    title: "Adam Leith P | Blog",
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
