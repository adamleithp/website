import {
  Blockquote,
  Bold,
  Code,
  H1,
  H2,
  H3,
  H4,
  Link,
  List,
  OrderedList,
  P,
  Pre,
} from "@/components/ui/typography";
import { MDXComponents } from "mdx/types";
import { Separator } from "@/components/ui/separator";

export const MarkdownComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: List,
  ol: OrderedList,
  blockquote: Blockquote,
  code: Code,
  pre: Pre,
  strong: Bold,
  a: Link,
  hr: Separator,
};

export const mdxComponents: MDXComponents = MarkdownComponents;
