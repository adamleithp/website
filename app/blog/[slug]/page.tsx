// app/blog/[slug]/page.tsx
import { InputPassword } from "@/components/examples/input-password";
import { mdxComponents } from "@/components/sections/markdown-components";
import { H1, P } from "@/components/ui/typography";
import { PostMeta, getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import { ElementShowcase } from "@/components/sections/element-showcase";
import FileCodeBlock from "@/components/ui/file-code-block";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post: PostMeta = getPostBySlug(params.slug);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <H1>{post.title}</H1>
        <P>{post.date}</P>
      </div>
      {/* Render the MDX content */}
      <div className="space-y-4">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [
                // Adds support for GitHub Flavored Markdown
                remarkGfm,
                // Makes emojis more accessible
                // remarkA11yEmoji,
                // // generates a table of contents based on headings
                // remarkToc,
                require("./remarkCodeImport").default,
              ],
              // These work together to add IDs and linkify headings
              // rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
              rehypePlugins: [rehypePrism],
            },
          }}
          components={{
            ...mdxComponents,
            FileCodeBlock,
            ElementShowcase,
            InputPassword,
          }}
        />
      </div>
    </div>
  );
}

// Optional: You can use generateStaticParams if you want to generate the static pages at build time
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
