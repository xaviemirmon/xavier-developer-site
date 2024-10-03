import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPages } from "@/utils";
import { baseUrl } from "@/app/sitemap";
import styles from "./page.module.css";

export async function generateStaticParams() {
  let pages = getPages();

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export function generateMetadata({ params }) {
  let page = getPages().find((page) => page.slug === params.slug);
  if (!page) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = page.metadata;
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
      url: `${baseUrl}${page.slug}`,
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
  let page = getPages().find((page) => page.slug === `${params.slug}`);

  if (!page) {
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
              headline: page.metadata.title,
              datePublished: page.metadata.publishedAt,
              dateModified: page.metadata.publishedAt,
              description: page.metadata.summary,
              image: page.metadata.image
                ? `${baseUrl}${page.metadata.image}`
                : `/og?title=${encodeURIComponent(page.metadata.title)}`,
              url: `${baseUrl}/blog/${page.slug}`,
              author: {
                "@type": "Person",
                name: "My Portfolio",
              },
            }),
          }}
        />
        <h1>{page.metadata.title}</h1>
        <article className={`${styles.prose}`}>
          <CustomMDX source={page.content} />
        </article>
      </section>
    </div>
  );
}
