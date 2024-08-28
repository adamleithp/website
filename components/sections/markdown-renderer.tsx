import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./markdown-components";
import FileCodeBlock from "@/components/ui/file-code-block";
import { ElementShowcase } from "./element-showcase";
import { InputPassword } from "../examples/input-password";
import { TextSkeleton } from "../examples/text-skeleton";
import { TextSkeletonExample } from "../examples/text-skeleton-example";
import { PricingForm as PricingFormJustDom } from "../examples/pricing-form/pricing-form-just-dom";
import { PricingForm as PricingFormJustDomWithCard } from "../examples/pricing-form/pricing-form-just-dom-and-card";
import { PricingForm as PricingFormJustDomWithCardWithRHF } from "../examples/pricing-form/pricing-form-just-dom-and-card-rhf";
import { RadioGroupItem } from "../examples/pricing-form/radio-group-item";
import { RadioGroup } from "../examples/pricing-form/radio-group";

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
        TextSkeleton,
        TextSkeletonExample,
        InputPassword,
        PricingFormJustDom,
        PricingFormJustDomWithCard,
        PricingFormJustDomWithCardWithRHF,
        RadioGroup,
        RadioGroupItem,
      }}
    />
  );
}
