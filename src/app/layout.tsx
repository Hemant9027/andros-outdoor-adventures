import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar, Footer, ScrollProgress, MobileBookingBar } from "@/components/site/Chrome";
import BookingModal from "@/components/booking/BookingModal";
import TripDrawer from "@/components/trip/TripDrawer";
import { SITE } from "@/lib/data";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://androsoutdooradventures.com"),
  icons: { icon: "/icon.svg" },
  title: {
    default: "Andros Outdoor Adventures | Fishing, Kayaking & Nature — Andros, The Bahamas",
    template: "%s | Andros Outdoor Adventures",
  },
  description:
    "Fish the world's largest shallow flats with Captain Shawn Leadon — guided fly-fishing for bonefish, tarpon and permit, plus kayaking, blue holes, snorkeling and overnight fish camp adventures on Andros Island, The Bahamas.",
  keywords: [
    "Andros fishing", "bonefishing Andros", "Andros fly fishing", "Bahamas fishing charters",
    "blue holes Andros", "Andros kayaking", "fish camp Andros", "Captain Shawn Leadon",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Andros Outdoor Adventures | Andros Island, The Bahamas",
    description:
      "Fish world-class flats. Paddle pristine mangroves. Explore hidden blue holes — guided adventures with Captain Shawn Leadon.",
    images: [{ url: "/images/drone-flats-1.jpg", width: 1600, height: 900, alt: "The flats of Andros Island from above" }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`}>
      <body>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-clay focus:text-ink focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-bold"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <BookingModal />
          <TripDrawer />
          <MobileBookingBar />
        </Providers>
      </body>
    </html>
  );
}
