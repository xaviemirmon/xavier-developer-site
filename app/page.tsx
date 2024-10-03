import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { getBlogPosts, getProjects } from "@/utils";

export default async function Home() {
  const projects = await getProjects();
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
              Hi 👋 I'm <span className="text-gradient">Xavier</span>
            </h1>
            <h2>Lead Fullstack Product Engineer</h2>
          </div>
        </div>

        <div className={`${styles.projects} container`}>
          <div>
            <h2>Projects</h2> <em>(I contribute to or maintain)</em>
          </div>
          <div className={styles.carousel}>
            <div>
              {projects &&
                projects.map((project) => {
                  return (
                    <div key={project.metadata.title} className={styles["project-card"]}>
                      <div className={styles.image}>
                        <Image
                          src={`/images/projects/${project.metadata.cover}`}
                          alt={project.metadata.title}
                          width={0}
                          height={0}
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                      <div className={styles.text}>
                        <h3>{project.metadata.title}</h3>
                        <Link
                          href={
                            project.metadata.slug ? project.metadata.slug : "#"
                          }
                        >
                          View more
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="container">
          <div className={`${styles.blogTitle}`}>
            <h2>Latest blogs</h2>
            <Link href={"/blog"}>View all</Link>
          </div>

          {posts &&
            posts.map(
              (blog, index: number) =>
                index < 5 && (
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
