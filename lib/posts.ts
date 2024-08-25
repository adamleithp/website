import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content");

export interface PostMeta {
  title: string;
  date: string;
  slug: string;
  content: string;
  tags: string[];
}

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      tags: data.tags,
      content,
    } as PostMeta;
  });
}

export function getPostBySlug(slug: string): PostMeta {
  const posts = getAllPosts();

  return posts.find((post) => post.slug === slug) as PostMeta;
}

export const readCode = (filePath: string) => {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return fileContents;
};
