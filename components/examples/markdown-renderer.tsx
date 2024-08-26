import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import FileCodeBlock from "@/components/ui/file-code-block";

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
          // Highlight code blocks with Prism
          rehypePlugins: [rehypePrism],
        },
      }}
      components={{
        // Import other components to use in your markdown
        // example: custom h1, h2 etc or custom components
        FileCodeBlock,
      }}
    />
  );
}
