import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content");

export interface PostMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  content: string;
  tags: string[];
  published?: boolean;
}

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  // only published
  const publishedFiles = fileNames.filter((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return data.published === true;
  }, []);

  return publishedFiles
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags,
        content,
      } as PostMeta;
    })
    .sort((a, b) => parseInt(b.date) - parseInt(a.date));
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
