import { Metadata, Viewport } from "next";

const env = process.env.NODE_ENV;
let url = "https://www.adamleithp.com";
if (env == "development") {
  url = "http://localhost:1234";
}

export const siteURL = url;
export const siteConfig = {
  name: "Adam Leith",
  url: url,
  ogImage: `${url}/og.jpg`,
  description: "The personal website of Adam Leith",
  // links: {
  //   twitter: "https://twitter.com/adamleithp",
  //   github: "https://github.com/adamleithp",
  // },
};

export const META_DATA_DEFAULTS: Metadata = {
  metadataBase:
    process.env.NODE_ENV === "production"
      ? new URL("https://www.adamleithp.com")
      : new URL("http://localhost:1234"),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // openGraph: {
  //   type: "website",
  //   locale: "en_US",
  //   url: siteConfig.url,
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   siteName: siteConfig.name,
  //   images: [
  //     {
  //       url: siteConfig.ogImage,
  //       width: 1200,
  //       height: 630,
  //       alt: siteConfig.name,
  //     },
  //   ],
  // },

  // twitter: {
  //   card: "summary_large_image",
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   images: [siteConfig.ogImage],
  //   creator: "@",
  // },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  manifest: `${siteConfig.url}/site.webmanifest`,
};

export const VIEWPORT_DEFAULTS: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
