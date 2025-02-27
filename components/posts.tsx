import Link from "next/link";
import { formatDate, getBlogPosts, groupPostsByYear } from "@/utils";
import styles from "./posts.module.css";
import { Key } from "react";
import { Metadata } from "@/utils";

interface BlogPost {
  slug: Key;
  metadata: Metadata
}

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  const groupedPosts = groupPostsByYear(allBlogs);

  return (
    <section className={`${styles.section}`}>
      {Object.keys(groupedPosts)
        .sort((a, b) => Number(b) - Number(a)) // Sort years in descending order
        .map((year) => (
          <div key={year}>
            <p className={`${styles.year}`}>{year}</p>
            <ul className={`${styles.list}`}>
              {groupedPosts[year].map((post: BlogPost) => {
                if(post.metadata.draft !== "true") {
                  return(
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`}>
                        {post.metadata.title} -{" "}
                        {formatDate(post.metadata.publishedAt)}
                      </Link>
                    </li>
                  )
                }
                })}
            </ul>
          </div>
        ))}
    </section>
  );
}