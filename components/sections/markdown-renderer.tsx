import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./markdown-components";
import FileCodeBlock from "../ui/file-code-block";
import { ElementShowcase } from "./element-showcase";
import { InputPassword } from "../examples/input-password";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <MDXRemote
      source={content}
      options={{
        mdxOptions: {
          remarkPlugins: [
            // Adds support for GitHub Flavored Markdown
            remarkGfm,
            // Import custom plugin
            require("@/plugins/remarkCodeImport").default,
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
  );
}
