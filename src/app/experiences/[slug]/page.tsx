import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExperienceDetail from "@/components/ExperienceDetail";
import { EXPERIENCES, getExperience, fmtUSD, SITE } from "@/lib/data";

export function generateStaticParams() {
  return EXPERIENCES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) return {};
  return {
    title: exp.name,
    description: exp.seoBlurb,
    alternates: { canonical: `/experiences/${exp.slug}` },
    openGraph: {
      title: `${exp.name} | ${SITE.name}`,
      description: exp.seoBlurb,
      images: [{ url: exp.image, alt: exp.imageAlt }],
      type: "article",
    },
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) notFound();

  const tripLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: exp.name,
    description: exp.seoBlurb,
    image: exp.image,
    touristType: exp.level,
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
      telephone: "+1-242-554-1249",
    },
    itinerary: {
      "@type": "ItemList",
      itemListElement: exp.highlights.map((h, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: h,
      })),
    },
  };

  if (exp.price.amount) {
    tripLd.offers = {
      "@type": "Offer",
      price: exp.price.amount,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      description: exp.price.note ?? `From ${fmtUSD(exp.price.amount)}`,
    };
  }

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: exp.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Experiences", item: "/#experiences" },
      { "@type": "ListItem", position: 3, name: exp.name, item: `/experiences/${exp.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ExperienceDetail exp={exp} />
    </>
  );
}
