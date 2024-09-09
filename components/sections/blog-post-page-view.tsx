import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = Redis.fromEnv();

export async function BlogPostPageView({ slug }: { slug: string }) {
  const views =
    (await redis.get<number>(["pageviews", "posts", slug].join(":"))) ?? 0;

  return (
    <div className="flex gap-2 items-center">
      <Eye size={12} strokeWidth={1} />
      <span className="text-xs">
        {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}{" "}
      </span>
    </div>
  );
}
