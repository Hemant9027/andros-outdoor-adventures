import type { Metadata } from "next";
import JournalIndex from "@/components/JournalIndex";

export const metadata: Metadata = {
  title: "The Andros Field Journal | Fishing & Nature Stories",
  description:
    "Field notes from Andros Island — the Big 3 on the flats, inside an overnight fish camp, and the blue holes, mangroves and barrier reef of The Bahamas' largest island.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "The Andros Field Journal",
    description: "Long-form knowledge from the water — fishing, nature and adventure on Andros Island.",
    images: [{ url: "/images/charter-2.jpeg", alt: "Fly-fishing the Andros flats" }],
  },
};

export default function JournalPage() {
  return <JournalIndex />;
}
