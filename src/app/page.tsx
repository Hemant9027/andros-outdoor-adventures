import Hero from "@/components/home/Hero";
import Finder from "@/components/home/Finder";
import { FeaturedCharter, IntentCards, AndrosMap } from "@/components/home/Discovery";
import { CaptainSection, WhyAndros, Conservation } from "@/components/home/Story";
import {
  Marketplace,
  BeforeYouBook,
  FieldJournal,
  Testimonials,
  FinalCta,
} from "@/components/home/Conversion";
import { SITE } from "@/lib/data";

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description:
    "Guided fly-fishing charters, overnight fish camp adventures, kayaking, snorkeling, blue hole exploration and hiking on Andros Island, The Bahamas — led by Captain Shawn Leadon.",
  url: SITE.url,
  telephone: "+1-242-554-1249",
  founder: { "@type": "Person", name: "Captain Shawn Leadon" },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Andros",
    addressCountry: "BS",
  },
  sameAs: [SITE.facebookUrl],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      {/* 1 — Cinematic hero */}
      <Hero />
      {/* 2 — Experience finder */}
      <Finder />
      {/* 3 — Featured fishing adventure */}
      <FeaturedCharter />
      {/* 4 — Choose your adventure (search-intent cards) */}
      <IntentCards />
      {/* 5 — Interactive Andros discovery map */}
      <AndrosMap />
      {/* 6 — Captain Shawn authority story */}
      <CaptainSection />
      {/* 7 — Why Andros */}
      <WhyAndros />
      {/* 8 — Conservation */}
      <Conservation />
      {/* 9 — Experience marketplace */}
      <Marketplace />
      {/* 10 — Before you book + booking policy */}
      <BeforeYouBook />
      {/* 11 — Field journal */}
      <FieldJournal />
      {/* 12 — Testimonials */}
      <Testimonials />
      {/* 13 — Final booking CTA */}
      <FinalCta />
    </>
  );
}
