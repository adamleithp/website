import { OpenGraphLayout } from "@/components/sections/opengraph-layout";
import { OpenGraphSize, boldFont, regularFont } from "@/lib/opengraph";
import { getPostBySlug } from "@/lib/posts";
import { ImageResponse } from "next/og";

export default async function OpenGraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const [regularFontData, boldFontData] = await Promise.all([
    regularFont,
    boldFont,
  ]);

  const { slug } = params;

  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <OpenGraphLayout>
        <div
          style={{
            fontSize: "48px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "white",
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: "400",
            color: "white",
          }}
        >
          {post.description}
        </div>

        <div style={{ height: "50px" }}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "15px",
          }}
        >
          {post.tags.map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "white",
                marginTop: "20px",
                borderRadius: "50px",
                border: "1px solid white",
                padding: "4px 10px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </OpenGraphLayout>
    ),
    {
      ...OpenGraphSize,
      fonts: [
        {
          name: "Inter",
          data: regularFontData,
          weight: 400,
        },
        {
          name: "Inter",
          data: boldFontData,
          weight: 700,
        },
      ],
    }
  );
}
