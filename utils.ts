import fs from "fs";
import path from "path";

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  slug?: string;
  cover?: string;
  draft?: string
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
  let files: string[] = [];

  // Recursively traverse through directories
  function traverseDirectory(currentDir: string) {
    let dirEntries = fs.readdirSync(currentDir, { withFileTypes: true });

    dirEntries.forEach((entry) => {
      let entryPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        // Recursively search in subdirectories
        traverseDirectory(entryPath);
      } else if (entry.isFile() && path.extname(entry.name) === ".mdx") {
        files.push(entryPath);
      }
    });
  }

  traverseDirectory(dir);
  return files;
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(file);
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "content", "posts")).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );
}

export function getProjects() {
  // Modified to search recursively in /app/projects and subdirectories
  return getMDXData(path.join(process.cwd(), "content", "projects"));
}

export function getPages() {
  // Modified to search recursively in /app/projects and subdirectories
  return getMDXData(path.join(process.cwd(), "content", "pages"));
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}

export const groupPostsByYear = (posts: any[]) => {
  return posts.reduce((acc, post) => {
    const year: number = new Date(post.metadata.publishedAt).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});
};
