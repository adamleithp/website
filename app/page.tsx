import { BlogPostList } from "@/components/sections/blog-post-list";
import { Separator } from "@/components/ui/separator";
import { Bold, H1, H2, P } from "@/components/ui/typography";
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
        <H1 className="text-gray-200">Adam Leith</H1>
        <P className="text-gray-200">
          I currently work as a UX Platform Engineer at{" "}
          <Link
            href="https://www.posthog.com"
            target="_blank"
            className="text-[rgba(247,165,1,1)] underline hover:text-[#947b49]"
          >
            Posthog
          </Link>
          . I specialize in building fast & accessible web applications using
          modern technologies with a high attention to detail in terms of design
          and UX. I write about <Bold>frontend development</Bold>,{" "}
          <Bold>design</Bold> and <Bold>user experience</Bold>
        </P>
        <P className="text-gray-200">
          More stuff from me on{" "}
          <Link
            href="https://dribbble.com/adamleithp/shots"
            target="_blank"
            className="underline text-[rgb(234,76,137)] hover:text-[rgb(181,65,104)]"
          >
            Dribbble
          </Link>
          ,{" "}
          <Link
            href="https://www.linkedin.com/in/adamleithp"
            className="underline text-[#2766BC] hover:text-[#1c4a8a]"
          >
            LinkedIn
          </Link>
          , and{" "}
          <Link
            href="https://github.com/adamleithp"
            className="underline text-[#f2f2f2] hover:text-[#adadad]"
          >
            GitHub
          </Link>
          .
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
