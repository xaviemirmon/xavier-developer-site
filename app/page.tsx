import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { getBlogPosts } from "@/utils";
import Button from "@/components/Button/Button";

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={`${styles.hero} container`}>
          <Image
            src={"/images/hero-image.svg"}
            alt="Hero image"
            sizes="50vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={530}
            height={530}
          />
          <div>
            <h1>
              Hi 👋 I&apos;m <span className="text-gradient">Xavier</span>
            </h1>
            <h2>
              Founding Engineer @{" "}
              <a
                href="https://puckeditor.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Puck
              </a>
            </h2>
          </div>
        </div>

        <div className={`${styles.blog} container`}>
          <div className={`${styles.blogTitle}`}>
            <h2>Latest blogs</h2>
            <Button href="/blog">View all</Button>
          </div>

          {posts &&
            posts.map(
              (blog, index: number) =>
                index < 10 && (
                  <p key={blog.slug} className={styles.postTitle}>
                    <Link href={`/blog/${blog.slug}`}>
                      {blog.metadata.title}
                    </Link>
                  </p>
                ),
            )}
        </div>
      </main>
    </div>
  );
}
