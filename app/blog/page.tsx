import { BlogPosts } from "@/components/posts";
import styles from './blog-list.module.css'

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className={`${styles.page} container`}>
      <h1>Blog</h1>
      <BlogPosts />
    </section>
  );
}
