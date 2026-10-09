import type { Metadata } from "next";
import Link from "next/link";
import { TopicClusters, QuestionHub, DayBuilder } from "@/components/PlanHub";
import { Reveal } from "@/components/motion";
import { PLAN_FAQS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Plan Your Andros Adventure | Guides, Answers & Itineraries",
  description:
    "Plan an Andros Island adventure: when to fish the Big 3, how the 50% deposit works, what to bring, and ready-made days combining fishing, kayaking, blue holes and snorkeling.",
  alternates: { canonical: "/plan" },
  openGraph: {
    title: "Plan Your Andros Adventure | Andros Outdoor Adventures",
    description:
      "Answers, guides and itineraries for fishing, kayaking, blue holes and snorkeling on Andros Island, The Bahamas.",
    images: [{ url: "/images/andros-wa09.jpg", alt: "An inland blue hole on Andros Island" }],
  },
};

export default function PlanPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PLAN_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <header className="relative bg-ink grain overflow-hidden">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8 pt-36 pb-16 lg:pt-44 lg:pb-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[0.7rem] text-bone/45 mb-6">
              <li><Link href="/" className="hover:text-bone link-sweep">Home</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-bone/80">Plan your adventure</li>
            </ol>
          </nav>
          <Reveal>
            <p className="eyebrow text-lagoon">The Andros planning hub</p>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] tracking-tight max-w-4xl">
              Plan your <em className="not-italic text-clay">Andros</em> adventure
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-6 max-w-2xl text-bone/65 leading-relaxed text-lg">
              Real answers, real policies, real itineraries — everything a traveler (or a search
              engine) needs to understand what AOA offers, and how a day on Andros fits together.
            </p>
          </Reveal>
        </div>
      </header>

      <TopicClusters />
      <QuestionHub />
      <DayBuilder />
    </>
  );
}
