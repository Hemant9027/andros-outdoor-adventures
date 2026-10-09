import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[100svh] bg-ink grain flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <Compass size={40} className="mx-auto text-clay mb-6" />
        <p className="eyebrow justify-center text-lagoon">Off the chart</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl tracking-tight">
          This water isn't on the map
        </h1>
        <p className="mt-4 text-bone/55 leading-relaxed">
          The page you're looking for doesn't exist — but the flats, the blue holes and
          the fish camp are all right where they should be.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 bg-clay text-ink font-bold px-7 py-3.5 rounded-full hover:bg-gold transition text-sm">
            Back to the island
          </Link>
          <Link href="/plan" className="inline-flex items-center gap-2 border border-bone/25 px-7 py-3.5 rounded-full hover:border-bone/60 transition text-sm">
            Plan your adventure
          </Link>
        </div>
      </div>
    </div>
  );
}
