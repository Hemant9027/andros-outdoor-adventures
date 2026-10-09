import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JournalArticle from "@/components/JournalArticle";
import { JOURNAL, getExperience, SITE } from "@/lib/data";

export function generateStaticParams() {
  return JOURNAL.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = JOURNAL.find((j) => j.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      title: `${article.title} | The Andros Field Journal`,
      description: article.excerpt,
      images: [{ url: article.image, alt: article.alt }],
      type: "article",
    },
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = JOURNAL.find((j) => j.slug === slug);
  if (!article) notFound();
  const related = getExperience(article.related);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    articleBody: article.body.join("\n\n"),
    about: related
      ? { "@type": "TouristTrip", name: related.name, url: `/experiences/${related.slug}` }
      : undefined,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Field Journal", item: "/journal" },
      { "@type": "ListItem", position: 3, name: article.title, item: `/journal/${article.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <JournalArticle slug={slug} />
    </>
  );
}
