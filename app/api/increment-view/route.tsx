import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// POST method handler
export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response("use POST", { status: 405 });
  }

  if (request.headers.get("Content-Type") !== "application/json") {
    return new Response("must be json", { status: 400 });
  }

  const body = await request.json();
  let slug: string | undefined = undefined;

  if ("slug" in body) {
    slug = body.slug;
  }

  if (!slug) {
    return new Response("Slug not found", { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("remote-address");

  if (ip) {
    // Hash the IP in order to not store it directly in your db.
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip)
    );
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Deduplicate the ip for each slug
    const isNew = await redis.set(["deduplicate", hash, slug].join(":"), true, {
      nx: true,
      ex: 24 * 60 * 60, // 24 hours expiration
    });

    if (!isNew) {
      return new Response(null, { status: 202 });
    }
  }

  await redis.incr(["pageviews", "posts", slug].join(":"));
  return new Response(null, { status: 202 });
}
