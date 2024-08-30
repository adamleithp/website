import { OpenGraphLayout } from "@/components/sections/opengraph-layout";
import { ImageResponse } from "next/og";

export const sizes = {
  width: 1200,
  height: 630,
};

export const runtime = "edge";

export async function GET(request: Request) {
  const regularFont = fetch(
    new URL("../../../public/Inter_28pt-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const boldFont = fetch(
    new URL("../../../public/Inter_28pt-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  try {
    const { searchParams } = new URL(request.url);

    console.log("searchParams =======", searchParams);

    const hasTitle = searchParams.has("title");
    const hasDescription = searchParams.has("description");
    const hasTags = searchParams.has("tags");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Default title";
    const description = hasDescription
      ? searchParams.get("description")?.slice(0, 200)
      : "Default description";
    const tags = hasTags ? searchParams.getAll("tags") : [];

    console.log("tags =======", tags);

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
            {title}
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "400",
              color: "white",
            }}
          >
            {description}
          </div>

          <div style={{ height: "50px" }}></div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
            }}
          >
            {hasTags &&
              tags[0].split(",").map((tag) => (
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
        ...sizes,
        fonts: [
          {
            name: "Inter",
            data: await regularFont,
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: await boldFont,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
