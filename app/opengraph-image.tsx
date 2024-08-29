import { OpenGraphLayout } from "@/components/sections/opengraph-layout";
import { OpenGraphSize, boldFont, regularFont } from "@/lib/opengraph";
import { ImageResponse } from "next/og";

export const config = {
  runtime: "nodejs",
};

export default async function OpenGraphImage() {
  const [regularFontData, boldFontData] = await Promise.all([
    regularFont,
    boldFont,
  ]);

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
          Adam Leith P
        </div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: "400",
            color: "white",
          }}
        >
          Blogging about web development, design, and more.
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
