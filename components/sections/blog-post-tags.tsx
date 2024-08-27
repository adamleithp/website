import { Badge } from "@/components/ui/badge";

export function BlogPostTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tags?.map((tag) => (
        <Badge key={tag} variant={"outline"}>
          {tag}
        </Badge>
      ))}
    </div>
  );
}
