// app/blog/page.tsx
import { BlogPostItem } from "@/components/sections/blog-post-item";
import { BlogPostList } from "@/components/sections/blog-post-list";
import { Button } from "@/components/ui/button";
import { H1, H3, P } from "@/components/ui/typography";
import { PostMeta, getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function BlogPage() {
  const posts: PostMeta[] = getAllPosts();

  return (
    <div className="space-y-8">
      <H1>Apps</H1>
      <ul className="space-y-8 -mx-4">
        <li>
          <Button
            asChild
            variant={"ghost"}
            size="none"
            className="flex-col items-start space-y-2 w-full whitespace-normal p-4"
          >
            <Link href={`/apps/dynamic-form-builder`}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <H3 className="block">Dynamic form builder</H3>
                  <P className="text-gray-300">
                    Generate highly functional forms
                  </P>
                </div>
              </div>
            </Link>
          </Button>
        </li>
      </ul>
    </div>
  );
}
