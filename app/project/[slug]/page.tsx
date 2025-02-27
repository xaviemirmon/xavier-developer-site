import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getProjects } from "@/utils";
import { baseUrl } from "@/app/sitemap";
import styles from "./project.module.css";

export async function generateStaticParams() {
  const projects = getProjects();

  return projects.map((project) => ({
    slug: project.metadata.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = getProjects().find(
    (project) => project.metadata.slug === params.slug,
  );
  if (!project) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = project.metadata;
  const ogImage = image
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
      url: `${baseUrl}${project.metadata.slug}`,
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

export default async function Blog(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = getProjects().find(
    (project) => project.metadata.slug === `/project/${params.slug}`,
  );

  if (!project) {
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
              headline: project.metadata.title,
              datePublished: project.metadata.publishedAt,
              dateModified: project.metadata.publishedAt,
              description: project.metadata.summary,
              image: project.metadata.image
                ? `${baseUrl}${project.metadata.image}`
                : `/og?title=${encodeURIComponent(project.metadata.title)}`,
              url: `${baseUrl}/blog/${project.metadata.slug}`,
              author: {
                "@type": "Person",
                name: "My Portfolio",
              },
            }),
          }}
        />
        <h1>{project.metadata.title}</h1>
        <article className={`${styles.prose}`}>
          <CustomMDX source={project.content} />
        </article>
      </section>
    </div>
  );
}
