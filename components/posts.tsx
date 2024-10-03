import Link from "next/link";
import { formatDate, getBlogPosts, groupPostsByYear } from "@/utils";
import styles from "./posts.module.css";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  const groupedPosts = groupPostsByYear(allBlogs);

  return (
    <section className={`${styles.section}`}>
      {Object.keys(groupedPosts)
        .sort((a, b) => Number(b) - Number(a)) // Sort years in descending order
        .map((year) => (
          <div key={year}>
            <p className={`${styles.year}`}>{year}</p>
            <ul className={`${styles.list}`}>
              {groupedPosts[year].map(
                (post: {
                  slug: Key | null | undefined;
                  metadata: {
                    title:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<AwaitedReactNode>
                      | null
                      | undefined;
                    publishedAt: string;
                  };
                }) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>
                      {post.metadata.title} -{" "}
                      {formatDate(post.metadata.publishedAt)}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
    </section>
  );
}
