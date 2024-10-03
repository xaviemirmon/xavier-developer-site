import Link from "next/link";
import { formatDate, getBlogPosts, groupPostsByYear } from "@/utils";
import styles from "./posts.module.css"

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  const groupedPosts = groupPostsByYear(allBlogs);

  return (
    <section className={`${styles.section}`}>
      {Object.keys(groupedPosts)
        .sort((a, b) => b - a) // Sort years in descending order
        .map((year) => (
          <div key={year}>
            <p className={`${styles.year}`}>{year}</p>
            <ul className={`${styles.list}`}>
              {groupedPosts[year].map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>
                    {post.metadata.title} -{" "}
                    {formatDate(post.metadata.publishedAt)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </section>
  );
}
