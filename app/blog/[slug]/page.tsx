import { notFound } from "next/navigation";
import readingTime from "reading-time";
import { CustomMDX } from "@/components/mdx";
import { formatDate, getBlogPosts } from "@/utils";
import { baseUrl } from "@/app/sitemap";
import styles from "./blog-post.module.css";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  const stats = readingTime(post?.content);

  if (!post) {
    notFound();
  }

  return (
    <div className={`${styles.post} container`}>
      <section>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `${baseUrl}${post.metadata.image}`
                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
              url: `${baseUrl}/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: "My Portfolio",
              },
            }),
          }}
        />
        <h1>{post.metadata.title}</h1>
        <div>
          <p>{formatDate(post.metadata.publishedAt)}</p>
          <p>Time to read: {Math.round(stats.minutes)} mins </p>
        </div>
        <article className={`${styles.prose}`}>
          <CustomMDX source={post.content} />
        </article>
      </section>
    </div>
  );
}
