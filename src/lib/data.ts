/* ------------------------------------------------------------------
   Andros Outdoor Adventures — content model
   Every fact below is sourced from androsoutdooradventures.com.
   Prices, policies, payment methods, inclusions, species, seasons,
   testimonials and partner names are reproduced from the live site.
------------------------------------------------------------------- */

export const SITE = {
  name: "Andros Outdoor Adventures",
  shortName: "AOA",
  owner: "Captain Shawn Leadon",
  island: "Andros Island, The Bahamas",
  phone: "+1 (242) 554-1249",
  phoneHref: "tel:+12425541249",
  phoneAlt: "+1 (352) 397-4242",
  phoneAltHref: "tel:+13523974242",
  facebook: "Andros Outdoor Adventures",
  facebookUrl: "https://www.facebook.com/p/Andros-Outdoor-Adventures-100057054506871/",
  url: "https://androsoutdooradventures.com",
  tagline: "Fish world-class flats. Paddle pristine mangroves. Explore hidden blue holes.",
};
export type ExperienceCategory =
  | "Fishing"
  | "Fish Camp"
  | "Nature"
  | "Snorkeling"
  | "Exploration";

export type Experience = {
  slug: string;
  name: string;
  shortName: string;
  category: ExperienceCategory;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  duration: string;
  durationGroup: "Half Day" | "Full Day" | "Multi-Day";
  price: { amount: number | null; unit: string; note?: string };
  capacity: string;
  capacityMax?: number;
  level: "Beginner" | "Intermediate" | "Experienced" | "All levels";
  styles: string[];
  season: string;
  species?: string[];
  highlights: string[];
  includes: string[];
  notIncludes: string[];
  keyDetails: { label: string; value: string }[];
  whatToBring: string[];
  faqs: { q: string; a: string }[];
  regions: string[];
  guideLed: boolean;
  badge?: string;
  seoBlurb: string;
};

export const BOOKING_POLICY = {
  deposit: "A 50% deposit of the total trip cost is required to confirm your reservation.",
  depositMin: "For fishing charters a $300 minimum deposit applies.",
  balance: "The remaining balance is due 60 days prior to trip departure.",
  methods: ["Visa", "Mastercard", "Wire Transfer"],
  cancellation: [
    { window: "60+ days notice", detail: "No charge. Funds are applied to a future trip within 12 months." },
    { window: "30–59 days notice", detail: "No charge. Funds are applied to a future trip within 12 months." },
    { window: "Less than 30 days", detail: "$500 cancellation fee. Remaining funds applied to a future trip within 12 months." },
  ],
  weather:
    "Weather cancellations are at the guide's discretion. Trips are rescheduled when possible, and start times may shift to make the most of conditions.",
  insurance:
    "Trip cancellation insurance is strongly recommended. Weather, specific fishing conditions and mechanical failures cannot be guaranteed — no refunds or price adjustments for weather.",
};

export const EXPERIENCES: Experience[] = [
  {
    slug: "full-day-fly-fishing-charter",
    name: "Full Day Fly-Fishing Charter",
    shortName: "Fly-Fishing Charter",
    category: "Fishing",
    tagline: "Eight hours stalking the legendary Big 3 across the world's largest shallow flats.",
    description:
      "Maximize your time on the water with a full day of world-class fly-fishing on Andros Island. Spend the entire day with Captain Shawn Leadon exploring the vast flats and targeting bonefish, tarpon and permit. With more time on the water you'll fish multiple locations, adapt to changing conditions, and significantly increase your chances of landing the fish of a lifetime.",
    image: "/images/charter-main.jpeg",
    imageAlt: "Tarpon held boat-side on the Andros flats by Captain Shawn Leadon",
    gallery: [
      { src: "/images/charter-main.jpeg", alt: "Tarpon brought boat-side during a full day charter" },
      { src: "/images/charter-2.jpeg", alt: "Fly-fishing action on the flats of Andros Island" },
      { src: "/images/charter-3.jpeg", alt: "Angler casting across shallow Andros flats" },
      { src: "/images/charter-7.jpeg", alt: "Captain Shawn steering a flats boat across Andros waters" },
      { src: "/images/charter-4.jpeg", alt: "Guided flats fishing with Captain Shawn Leadon" },
      { src: "/images/drone-flats-1.jpg", alt: "Aerial view of turquoise flats and mangrove creeks" },
      { src: "/images/charter-9.jpeg", alt: "Flats boat exploring the interior bights of Andros" },
    ],
    duration: "Full Day (~8 hours)",
    durationGroup: "Full Day",
    price: { amount: 950, unit: "per charter", note: "Rates from $950" },
    capacity: "Maximum 2 anglers per boat",
    capacityMax: 2,
    level: "All levels",
    styles: ["Fishing", "Adventure"],
    season: "Year-round availability",
    species: ["Bonefish", "Tarpon", "Permit"],
    highlights: [
      "Target the Big 3 — bonefish, tarpon and permit",
      "Fish the interior North, Middle and South Bights",
      "100% catch & release",
      "First-timers welcome — full instruction included",
      "West Side National Park tours also available",
    ],
    includes: [
      "Professional guide — Captain Shawn Leadon (30+ year family legacy)",
      "Fully equipped modern flats boat",
      "All fly-fishing equipment and tackle",
      "Expert instruction throughout the day",
      "Access to premier locations in the North, Middle and South Bights",
      "Boat transportation to fishing areas (15–45 minutes depending on location)",
      "Extended time to fish multiple prime spots",
    ],
    notIncludes: [
      "Airfare and taxi / transportation to the meeting point",
      "Hotel accommodations",
      "Food and drinks — bring your own lunch, snacks and beverages (arrangements can often be made with your hotel)",
      "Gratuities (recommended)",
    ],
    keyDetails: [
      { label: "Duration", value: "Full Day (~8 hours)" },
      { label: "Capacity", value: "2 anglers maximum (per boat)" },
      { label: "Target species", value: "Bonefish (primary), tarpon, permit" },
      { label: "Locations", value: "Interior North, Middle & South Bights" },
      { label: "Fishing style", value: "100% catch & release" },
      { label: "Experience level", value: "All levels welcome — beginner to expert" },
      { label: "Season", value: "Year-round availability" },
    ],
    whatToBring: [
      "Polarized sunglasses",
      "Sunscreen and a hat",
      "Camera",
      "Your own food and drinks",
    ],
    faqs: [
      {
        q: "Where do we fish?",
        a: "Fishing locations change because bonefish, tarpon and permit move with the tides. Our main areas are within the interior North, Middle and South Bights of Andros — boat rides range from 15 to 45 minutes depending on where we're heading.",
      },
      {
        q: "I've never fly-fished before. Can I come?",
        a: "Absolutely. No experience is necessary — Captain Shawn teaches first-time anglers everything they need, and works with serious anglers on advanced techniques.",
      },
      {
        q: "How long is a full-day charter?",
        a: "A full day on the water is approximately 8 hours, giving time to fish multiple locations as conditions change.",
      },
    ],
    regions: ["North Andros", "Middle Andros", "South Andros"],
    guideLed: true,
    badge: "Most popular",
    seoBlurb:
      "A full-day guided fly-fishing charter on Andros Island targeting bonefish, tarpon and permit with Captain Shawn Leadon — 8 hours, 2 anglers maximum, all gear included.",
  },
  {
    slug: "overnight-fish-camp-adventure",
    name: "Overnight Fish Camp Adventure",
    shortName: "Fish Camp (2 Days / 1 Night)",
    category: "Fish Camp",
    tagline: "Two full days of fly-fishing plus a rustic night of camping on Andros' remote west coast.",
    description:
      "Escape to the remote west coast of Andros for the ultimate backcountry adventure. Combine two full days of world-class fly-fishing for the Big 3 with a rustic overnight camping experience under the stars — pristine, rarely fished waters, a remote beach camp, fresh dinner as the sun sets over the Caribbean, and stargazing far from civilization.",
    image: "/images/fish-camp.png",
    imageAlt: "Fish camp cabin on the mangrove shoreline of west Andros",
    gallery: [
      { src: "/images/fish-camp.png", alt: "Overnight fish camp on the remote west coast of Andros" },
      { src: "/images/charter-8.jpeg", alt: "Remote west coast fishing waters" },
      { src: "/images/scene-30.jpg", alt: "Sunrise over the Andros backcountry" },
      { src: "/images/drone-flats-1.jpg", alt: "Untouched flats of the west side" },
      { src: "/images/charter-5.jpeg", alt: "Backcountry flats fishing" },
      { src: "/images/charter-8.jpeg", alt: "Release on a remote west side flat" },
    ],
    duration: "2 Days / 1 Night",
    durationGroup: "Multi-Day",
    price: { amount: 1500, unit: "per person / night", note: "From $1,500 per person, per night" },
    capacity: "Small private groups — confirmed with AOA",
    capacityMax: 6,
    level: "Intermediate",
    styles: ["Fishing", "Adventure", "Wildlife"],
    season: "November – April only",
    species: ["Bonefish", "Tarpon", "Permit"],
    highlights: [
      "2 full days of guided fly-fishing on rarely pressured flats",
      "1 night rustic beach camping under the stars",
      "All meals prepared at camp",
      "Sunset viewing and stargazing on the west coast",
      "True wilderness immersion — no need to return each night",
    ],
    includes: [
      "Professional guide — Captain Shawn Leadon",
      "2 full days of guided fly-fishing",
      "1 night rustic camping on the west coast",
      "All meals (breakfast, lunch x2, dinner)",
      "Camping equipment — tents and basic sleeping gear",
      "All fishing tackle",
      "Boat transport to and from west coast fishing areas",
    ],
    notIncludes: [
      "Airfare and taxi to the departure point",
      "Hotel accommodations before or after the trip",
      "Personal gear — sleeping bag (highly recommended) and toiletries",
      "Alcoholic beverages (BYOB)",
      "Gratuities",
    ],
    keyDetails: [
      { label: "Duration", value: "2 days, 1 night" },
      { label: "Season", value: "November – April only" },
      { label: "Camping style", value: "Rustic beach camping (basic amenities)" },
      { label: "Fitness level", value: "Moderate fitness required" },
      { label: "Experience", value: "Intermediate to advanced recommended (remote nature)" },
      { label: "Target species", value: "Bonefish, tarpon, permit" },
    ],
    whatToBring: [
      "Personal sleeping bag (recommended for comfort)",
      "Headlamp / flashlight",
      "Personal toiletries and medications",
      "High-SPF sunscreen and insect repellent",
      "Rain gear and appropriate fishing clothing",
      "Camera / GoPro",
    ],
    faqs: [
      {
        q: "Why is the fish camp only available November to April?",
        a: "These trips run in the cooler months to ensure comfort and avoid the peak heat and insects of the Bahamian summer.",
      },
      {
        q: "What does a typical trip look like?",
        a: "Day 1: early boat departure to the west coast, a full day of fly-fishing, then camp setup, a fresh dinner, sunset and stargazing. Day 2: hot breakfast, another full day fishing different remote spots, returning to the main island by evening.",
      },
    ],
    regions: ["West Side"],
    guideLed: true,
    badge: "Unique",
    seoBlurb:
      "A 2-day, 1-night overnight fish camp adventure on the remote west coast of Andros — guided fly-fishing, rustic camping, all meals included, November to April.",
  },
  {
    slug: "west-side-national-park-tour",
    name: "West Side National Park Tour",
    shortName: "West Side Tour",
    category: "Fishing",
    tagline: "A full-day expedition into the protected wilds of West Side National Park.",
    description:
      "A full-day West Side National Park Tour into one of The Bahamas' most important protected areas. Remote flats, rich wildlife habitat and the wild western shoreline of Andros — with the same expert guiding and full equipment as the signature charter.",
    image: "/images/scene-30.jpg",
    imageAlt: "A flats boat on calm Andros waters",
    gallery: [
      { src: "/images/scene-30.jpg", alt: "A fishing boat on calm Andros waters" },
      { src: "/images/charter-3.jpeg", alt: "Clear shallow water inside West Side National Park" },
      { src: "/images/charter-5.jpeg", alt: "Releasing a fish on the west side flats" },
      { src: "/images/drone-flats-1.jpg", alt: "Aerial of the west side flats and creeks" },
    ],
    duration: "Full Day",
    durationGroup: "Full Day",
    price: { amount: 950, unit: "per tour", note: "$950 based on 2-person occupancy" },
    capacity: "2-person occupancy",
    capacityMax: 2,
    level: "All levels",
    styles: ["Fishing", "Nature", "Wildlife", "Adventure"],
    season: "Year-round availability",
    species: ["Bonefish", "Tarpon", "Permit"],
    highlights: [
      "Explore the protected West Side National Park",
      "Remote, lightly pressured flats",
      "Full-day guided expedition",
      "Contributes to a landscape AOA helps protect",
    ],
    includes: [
      "Professional guide — Captain Shawn Leadon",
      "Fully equipped flats boat",
      "All fishing equipment and tackle",
      "Boat transport to the west side",
    ],
    notIncludes: [
      "Airfare and taxi to the meeting point",
      "Hotel accommodations",
      "Food and drinks",
      "Gratuities",
    ],
    keyDetails: [
      { label: "Duration", value: "Full Day" },
      { label: "Occupancy", value: "2-person occupancy" },
      { label: "Region", value: "West Side National Park" },
      { label: "Fishing style", value: "100% catch & release" },
    ],
    whatToBring: [
      "Polarized sunglasses",
      "Sunscreen and a hat",
      "Camera",
      "Your own food and drinks",
    ],
    faqs: [
      {
        q: "What is West Side National Park?",
        a: "A vast protected area on Andros' wild west coast. AOA's conservation work includes contributing to the expansion of protected areas including the Westside National Park.",
      },
    ],
    regions: ["West Side"],
    guideLed: true,
    seoBlurb:
      "A full-day guided tour of Andros' West Side National Park — remote flats, wildlife and world-class catch-and-release fishing, $950 for two anglers.",
  },
  {
    slug: "mangrove-kayaking",
    name: "Mangrove Kayaking",
    shortName: "Kayaking",
    category: "Nature",
    tagline: "Paddle mangrove tunnels, tidal creeks and inland blue holes — year-round.",
    description:
      "In addition to having the longest coastline in the country, Andros has many inland blue holes, lagoons and mangrove creeks — which means safe, comfortable kayaking conditions year-round despite the weather. Routes along the shorelines and wetland creeks of the Caribbean's largest mangrove system are teeming with biodiversity.",
    image: "/images/andros-06.jpg",
    imageAlt: "Kayaking through a mangrove creek on Andros Island",
    gallery: [
      { src: "/images/andros-06.jpg", alt: "Kayak gliding through a mangrove tunnel" },
      { src: "/images/drone-flats-1.jpg", alt: "Mangrove creeks winding through the flats from above" },
      { src: "/images/andros-wa09.jpg", alt: "An inland blue hole beside the kayak routes" },
    ],
    duration: "Flexible — guided or self-guided",
    durationGroup: "Half Day",
    price: { amount: null, unit: "", note: "Custom pricing — contact AOA to arrange your tour" },
    capacity: "Guided tours and self-guided options",
    level: "All levels",
    styles: ["Nature", "Wildlife", "Adventure"],
    season: "Year-round — safe conditions despite weather",
    highlights: [
      "Mangrove tunnels and coastal lagoons",
      "Inland blue holes surrounded by lush vegetation",
      "Tidal creeks teeming with marine life",
      "The Caribbean's largest mangrove system",
      "Incredible wildlife photography opportunities",
    ],
    includes: [
      "Kayaks, paddles, life jackets and backrests",
      "Guided tour led by experienced guides, or self-guided for experienced kayakers",
    ],
    notIncludes: [
      "Transportation to the launch point",
      "Food and drinks",
      "Gratuities",
    ],
    keyDetails: [
      { label: "Conditions", value: "Safe, comfortable year-round" },
      { label: "Ecosystem", value: "Caribbean's largest mangrove system" },
      { label: "Options", value: "Guided or self-guided" },
      { label: "Bring", value: "Your camera — wildlife is everywhere" },
    ],
    whatToBring: [
      "Camera",
      "Sunscreen and a hat",
      "Water and snacks",
      "Quick-dry clothing",
    ],
    faqs: [
      {
        q: "Is kayaking available year-round?",
        a: "Yes — inland blue holes, lagoons and mangrove creeks mean safe, comfortable kayaking conditions year-round despite the weather.",
      },
      {
        q: "Do I need experience?",
        a: "No. Guided tours are led by experienced guides, while self-guided paddles are available for experienced kayakers.",
      },
    ],
    regions: ["North Andros", "Middle Andros"],
    guideLed: true,
    badge: "Eco-friendly",
    seoBlurb:
      "Guided and self-guided kayaking through Andros' mangrove creeks, lagoons and inland blue holes — all equipment provided, year-round.",
  },
  {
    slug: "blue-hole-exploration",
    name: "Blue Hole Exploration",
    shortName: "Blue Holes",
    category: "Exploration",
    tagline: "Swim the mystical inland blue holes — the highest concentration on Earth.",
    description:
      "Andros Island is world-famous for having the highest concentration of blue holes in the world — underwater caves and sinkholes that connect to the ocean. Guided tours visit spectacular inland blue holes that are safe for swimming and perfect for cooling off after a morning of fishing, surrounded by pine forests full of rare Bahamian birds.",
    image: "/images/andros-wa09.jpg",
    imageAlt: "An inland blue hole surrounded by Andros pine forest",
    gallery: [
      { src: "/images/andros-wa09.jpg", alt: "Inland blue hole from above, ringed by mangroves" },
      { src: "/images/andros-06.jpg", alt: "Paddling toward a blue hole creek" },
      { src: "/images/drone-flats-1.jpg", alt: "The karst landscape that hides Andros' blue holes" },
    ],
    duration: "Half day or add-on",
    durationGroup: "Half Day",
    price: { amount: null, unit: "", note: "Custom pricing — add to your itinerary" },
    capacity: "Small guided groups",
    level: "Beginner",
    styles: ["Nature", "Adventure", "Wildlife"],
    season: "Year-round",
    highlights: [
      "Crystal-clear water with remarkable visibility",
      "Cool, fresh, invigorating swims",
      "Limestone formations millions of years old",
      "Bird watching in surrounding pine forests",
      "Captain Bill's Blue Hole — famous for its high jumping platform",
      "Cousteau's Blue Hole — explored by Jacques Cousteau himself",
    ],
    includes: [
      "Guided tour with experienced local guides who know the safe spots",
    ],
    notIncludes: [
      "Transportation to the meeting point",
      "Food and drinks",
      "Gratuities",
    ],
    keyDetails: [
      { label: "Concentration", value: "Highest concentration of blue holes in the world" },
      { label: "Folklore", value: "Local legend of the Lusca — a mythical sea monster" },
      { label: "Pairs perfectly", value: "Cool off after a morning of fishing" },
    ],
    whatToBring: [
      "Swimwear and a towel",
      "Water shoes",
      "Camera",
      "Sunscreen and insect repellent",
    ],
    faqs: [
      {
        q: "What is a blue hole?",
        a: "Blue holes are underwater caves and sinkholes that connect to the ocean, creating a mystical environment for swimming and exploration. Andros has the highest concentration of them in the world.",
      },
      {
        q: "Is it safe to swim in a blue hole?",
        a: "Yes — guided tours visit blue holes that are safe for swimming, and the guides know the safe spots. Local folklore says the deep holes are home to the 'Lusca', a mythical sea monster — it's just a story.",
      },
    ],
    regions: ["North Andros", "Middle Andros", "South Andros"],
    guideLed: true,
    seoBlurb:
      "Guided blue hole exploration on Andros Island — swim crystal-clear inland blue holes in the world's highest concentration, including Captain Bill's and Cousteau's.",
  },
  {
    slug: "snorkeling-excursions",
    name: "Snorkeling Excursions",
    shortName: "Snorkeling",
    category: "Snorkeling",
    tagline: "Sea turtles, rays and coral gardens on the world's third-largest barrier reef.",
    description:
      "Aquamarine waters, the Andros barrier reef and hundreds of patch reefs make for an unforgettable snorkel experience. Swim along reef fish, majestic coral formations, sea turtles, stingrays and nurse sharks — with experienced guides who ensure a safe and memorable experience for all skill levels.",
    image: "/images/blog-snorkel.jpeg",
    imageAlt: "Scuba diver above coral and reef fish on the Andros barrier reef",
    gallery: [
      { src: "/images/blog-snorkel.jpeg", alt: "Scuba diver above coral and reef fish on the Andros barrier reef" },
      { src: "/images/blog-clownfish.jpeg", alt: "Diver among coral and schools of reef fish" },
      { src: "/images/andros-03.jpg", alt: "Marine life in Andros' clear waters" },
    ],
    duration: "Flexible",
    durationGroup: "Half Day",
    price: { amount: null, unit: "", note: "Custom pricing — contact AOA to arrange your tour" },
    capacity: "Individuals, families and small groups",
    level: "Beginner",
    styles: ["Nature", "Wildlife"],
    season: "Year-round",
    highlights: [
      "The third-largest barrier reef in the world",
      "Green and hawksbill sea turtles",
      "Stingrays and nurse sharks",
      "Colorful tropical fish and coral formations",
      "Starfish, sand dollars and sea biscuits",
      "Shallow, safe areas for families",
    ],
    includes: [
      "Experienced guides who ensure a safe experience for all skill levels",
    ],
    notIncludes: [
      "Transportation to the meeting point",
      "Food and drinks",
      "Gratuities",
    ],
    keyDetails: [
      { label: "Reef", value: "3rd largest barrier reef in the world" },
      { label: "Beginners", value: "Guides teach you everything" },
      { label: "Advanced", value: "Explore deeper reefs" },
      { label: "Families", value: "Shallow, safe areas" },
    ],
    whatToBring: [
      "Swimwear and a towel",
      "Reef-safe sunscreen",
      "Underwater camera",
      "Rash guard",
    ],
    faqs: [
      {
        q: "I'm a beginner. Can I snorkel the reef?",
        a: "Yes — the guides teach beginners everything, take advanced snorkelers to deeper reefs, and know shallow, safe areas for families. A safe adventure for all snorkelers.",
      },
    ],
    regions: ["Middle Andros", "South Andros"],
    guideLed: true,
    seoBlurb:
      "Snorkeling excursions on the Andros barrier reef — the world's third-largest — with sea turtles, rays, nurse sharks and expert local guides.",
  },
  {
    slug: "hiking-biking-tours",
    name: "Hiking & Biking Tours",
    shortName: "Hiking & Biking",
    category: "Exploration",
    tagline: "Ruins, caves, pine forests and the most blue holes in The Bahamas — on foot or by bike.",
    description:
      "Andros is the largest island in The Bahamas and provides the best hiking adventures in the country — historical ruins, cave systems, the highest number of blue holes in the country, and native pine forests full of rare wildlife including the endemic Andros Rock Iguana.",
    image: "/images/hiking-trail.jpg",
    imageAlt: "Birdwatching sign along the South Andros Blue Hole Nature Trail",
    gallery: [
      { src: "/images/hiking-trail.jpg", alt: "Trail sign identifying birds on the South Andros Blue Hole Nature Trail" },
      { src: "/images/andros-wa09.jpg", alt: "One of Andros' many inland blue holes" },
      { src: "/images/drone-flats-2.jpg", alt: "The wild interior landscape of Andros" },
    ],
    duration: "Flexible",
    durationGroup: "Half Day",
    price: { amount: null, unit: "", note: "Custom pricing — contact AOA to arrange your tour" },
    capacity: "Small guided groups",
    level: "All levels",
    styles: ["Nature", "Wildlife", "Adventure"],
    season: "Best November – April (hot and humid May – October; early mornings recommended)",
    highlights: [
      "Historical ruins and archaeological sites",
      "Natural caves and cavern systems",
      "The highest number of blue holes in the country",
      "Native pine forests and diverse ecosystems",
      "Andros Rock Iguana (endemic and endangered), rare Bahama Orioles and Piping Plovers",
      "The elusive Chickcharney legend",
    ],
    includes: [
      "Experienced local guide",
    ],
    notIncludes: [
      "Transportation to the trailhead",
      "Food and drinks",
      "Gratuities",
    ],
    keyDetails: [
      { label: "Island", value: "Largest island in The Bahamas" },
      { label: "Best season", value: "November – April (cooler, less humid)" },
      { label: "Summer", value: "May – October is hot and humid — early morning recommended" },
    ],
    whatToBring: [
      "Sturdy walking shoes",
      "Water and snacks",
      "Sunscreen and insect repellent",
      "Camera and binoculars",
    ],
    faqs: [
      {
        q: "When is the best time to hike on Andros?",
        a: "November to April brings cooler temperatures and less humidity. From May to October it's hot and humid, so early morning is recommended.",
      },
    ],
    regions: ["North Andros", "South Andros"],
    guideLed: true,
    seoBlurb:
      "Hiking and biking tours on Andros Island — historical ruins, caves, blue holes, pine forests and rare wildlife with expert local guides.",
  },
];

export const getExperience = (slug: string) =>
  EXPERIENCES.find((e) => e.slug === slug);

/* ------------------------- Filter taxonomy ------------------------- */

export const FINDER_FILTERS = {
  activity: [
    "Fly Fishing",
    "Fish Camp",
    "Kayaking & Nature",
    "Snorkeling",
    "Blue Hole / Exploration",
  ],
  level: ["Beginner", "Intermediate", "Experienced"],
  duration: ["Half Day", "Full Day", "Multi-Day"],
  style: ["Fishing", "Nature", "Wildlife", "Adventure"],
} as const;

export const ACTIVITY_MAP: Record<string, string[]> = {
  "Fly Fishing": ["full-day-fly-fishing-charter", "overnight-fish-camp-adventure", "west-side-national-park-tour"],
  "Fish Camp": ["overnight-fish-camp-adventure"],
  "Kayaking & Nature": ["mangrove-kayaking", "hiking-biking-tours"],
  Snorkeling: ["snorkeling-excursions"],
  "Blue Hole / Exploration": ["blue-hole-exploration", "mangrove-kayaking", "hiking-biking-tours"],
};

/* ------------------------- Regions / map ------------------------- */

export const REGIONS = [
  {
    id: "north",
    name: "North Andros",
    blurb:
      "Home to the legendary North Bight — one of AOA's main fishing areas — plus blue holes, creeks and Captain Bill's famous jumping platform.",
    experiences: ["full-day-fly-fishing-charter", "mangrove-kayaking", "blue-hole-exploration", "hiking-biking-tours"],
    facts: ["North Bight flats fishing", "Blue holes & pine forest", "Mangrove creeks"],
  },
  {
    id: "middle",
    name: "Middle Andros",
    blurb:
      "The Middle Bight interior holds vast shallow flats — bonefish country at its purest, and one of AOA's main fishing areas.",
    experiences: ["full-day-fly-fishing-charter", "mangrove-kayaking", "blue-hole-exploration", "snorkeling-excursions"],
    facts: ["Middle Bight flats", "Cargill Creek home base", "Largest shallow flats on Earth"],
  },
  {
    id: "south",
    name: "South Andros",
    blurb:
      "Remote South Bight waters and quiet cays — long boat rides rewarded with unpressured fish and empty horizons.",
    experiences: ["full-day-fly-fishing-charter", "blue-hole-exploration", "snorkeling-excursions", "hiking-biking-tours"],
    facts: ["South Bight flats", "Untouched beaches", "Third-largest barrier reef"],
  },
  {
    id: "west",
    name: "West Side National Park",
    blurb:
      "A vast protected wilderness of rarely fished flats. AOA's conservation work includes contributing to the expansion of protected areas including the Westside National Park.",
    experiences: ["overnight-fish-camp-adventure", "west-side-national-park-tour"],
    facts: ["Protected marine area", "Fish camp territory", "Remote wilderness flats"],
  },
] as const;

/* ------------------------- Conservation ------------------------- */

export const CONSERVATION_PILLARS = [
  {
    index: "01",
    title: "Sustainable Tourism",
    detail:
      "Low-impact activities that conserve natural resources while providing memorable experiences for guests.",
  },
  {
    index: "02",
    title: "Research Partnerships",
    detail:
      "Collaborating with leading organizations on vital conservation research and habitat protection efforts.",
  },
  {
    index: "03",
    title: "Community Education",
    detail:
      "Fostering environmental awareness and responsible outdoor recreation in local communities.",
  },
  {
    index: "04",
    title: "Habitat Protection",
    detail:
      "Contributing to the expansion of protected areas including the Westside National Park.",
  },
];

export const CONSERVATION_PARTNERS = [
  {
    name: "Bahamas Sportfishing Conservation Association",
    role: "Advocating for sustainable fisheries and habitat conservation",
    logo: "/images/partner-bsca.jpeg",
  },
  {
    name: "Bahamas Fly Fishing Industry Association",
    role: "Promoting sustainable fly fishing tourism & guide standards",
    logo: "/images/partner-bffia.jpeg",
  },
  {
    name: "Bahamas National Trust",
    role: "Managing national parks and protected marine areas",
    logo: "/images/partner-bnt.jpeg",
  },
];

/* ------------------------- Why Andros ------------------------- */

export const WHY_ANDROS = [
  {
    title: "World-Class Shallow Flats",
    kicker: "The largest on Earth",
    detail:
      "Andros' vast shallow flats are the largest in the world — a flats-fishing experience that can simply only be found here.",
    image: "/images/drone-flats-1.jpg",
    alt: "Aerial view of endless turquoise flats",
  },
  {
    title: "Third-Largest Barrier Reef",
    kicker: "A living wall of coral",
    detail:
      "The Andros barrier reef and hundreds of patch reefs shelter sea turtles, rays, nurse sharks and clouds of reef fish.",
    image: "/images/blog-clownfish.jpeg",
    alt: "Scuba diver and reef fish above coral on the Andros barrier reef",
  },
  {
    title: "Remarkable Blue Holes",
    kicker: "Highest concentration in the world",
    detail:
      "Underwater caves and sinkholes connected to the ocean — swimming, jumping and exploration in mystical clear water.",
    image: "/images/andros-wa09.jpg",
    alt: "An inland blue hole surrounded by forest",
  },
  {
    title: "Extensive Mangrove Systems",
    kicker: "The Caribbean's largest",
    detail:
      "Mangrove creeks and lagoons teem with biodiversity — the nursery of the flats, and calm kayaking water year-round.",
    image: "/images/andros-06.jpg",
    alt: "Kayaking a mangrove creek",
  },
];

/* ------------------------- Testimonials (verbatim) ------------------------- */

export const TESTIMONIALS = [
  {
    quote:
      "Captain Shawn's knowledge of the flats is unmatched. We caught more bonefish in two days than I've caught in my entire life. The experience was absolutely unforgettable and his commitment to conservation really shows.",
    name: "John Mitchell",
    location: "Florida, USA",
    experience: "Fishing",
  },
  {
    quote:
      "Beyond the incredible fishing, the commitment to conservation and sustainable tourism is impressive. It's clear that AOA truly cares about preserving Andros for future generations. A world-class operation!",
    name: "Sarah Thompson",
    location: "Ontario, Canada",
    experience: "Fishing",
  },
  {
    quote:
      "The kayaking through mangroves was magical. We saw so much wildlife and the guides were incredibly knowledgeable about the ecosystem. A must-do experience for nature lovers visiting The Bahamas!",
    name: "David Roberts",
    location: "London, UK",
    experience: "Kayaking",
  },
  {
    quote:
      "First-time angler here and Captain Shawn made it easy and fun! His patience and expertise helped me land my first bonefish. Can't wait to come back to Andros and fish with AOA again!",
    name: "Maria Garcia",
    location: "Miami, Florida",
    experience: "Fishing",
  },
];

/* ------------------------- Field Journal ------------------------- */

export const JOURNAL = [
  {
    slug: "big-three-andros-flats",
    title: "The Big 3: Bonefish, Tarpon & Permit on the Andros Flats",
    category: "Fishing",
    excerpt:
      "The ghost of the flats, the silver king and the holy grail — why Andros is the premier destination to stalk big bonefish, and what makes each of the Big 3 a different kind of fight.",
    image: "/images/charter-2.jpeg",
    alt: "Fly-fishing for bonefish on the Andros flats",
    related: "full-day-fly-fishing-charter",
    body: [
      "Andros is the premier destination spot to stalk the 'big bonefish'. The island's vast shallow flats are the largest in the world, and they hold all three of the flats angler's dream species — bonefish, tarpon and permit.",
      "Bonefish — the 'ghost of the flats' — are catch-and-release only: elusive silver rockets that test your skill. Tarpon, the silver kings, are massive acrobatic fighters that provide heart-pounding action. And permit are the ultimate challenge — the holy grail of flats fishing, notoriously difficult to hook.",
      "The Big 3 don't stay in one place, so AOA's fishing locations change with the tides. Main fishing areas are found within the interior North, Middle and South Bights of Andros, with boat rides ranging from 15 to 45 minutes depending on where you're heading.",
      "First-time anglers are welcome — no experience is necessary, and Captain Shawn will teach you everything. Serious anglers get a guide who understands advanced techniques. Every charter is limited to a maximum of 2 anglers per boat for personalized attention, and fishing is 100% catch and release.",
    ],
  },
  {
    slug: "inside-west-coast-fish-camp",
    title: "Inside an Overnight Fish Camp on Andros' Wild West Coast",
    category: "Adventure",
    excerpt:
      "Two full days of fly-fishing on rarely pressured flats, one night of rustic beach camping under the stars — how AOA's seasonal fish camp works, day by day.",
    image: "/images/fish-camp.png",
    alt: "Fish camp on the west coast of Andros",
    related: "overnight-fish-camp-adventure",
    body: [
      "Escape to the remote west coast of Andros for the ultimate backcountry adventure: two full days of world-class fly-fishing for the Big 3 combined with a rustic overnight camping experience under the stars. The trip runs November through April only, when cooler months keep the Bahamian heat and insects at bay.",
      "Day one begins with an early boat departure to the remote west coast, then a full day of fly-fishing on pristine, unpressured flats. By afternoon you arrive at the remote beach site and set up camp; the evening brings a fresh dinner prepared at camp, sunset viewing over the Caribbean and stargazing.",
      "Day two starts with a hot breakfast at camp, then another full day fishing different remote locations on the way back, returning to the main island by evening.",
      "All meals and camping equipment — tents and basic sleeping gear — are included, along with all fishing tackle and boat transport. Bring your own sleeping bag (highly recommended), headlamp, toiletries, high-SPF sunscreen, insect repellent and rain gear. Moderate fitness is required, and the remote nature of the trip makes it best suited to intermediate and advanced anglers.",
    ],
  },
  {
    slug: "blue-holes-mangroves-barrier-reef",
    title: "Blue Holes, Mangroves & the Third-Largest Barrier Reef",
    category: "Nature",
    excerpt:
      "Andros isn't only for anglers. The highest concentration of blue holes on Earth, the Caribbean's largest mangrove system and a barrier reef full of turtles and rays.",
    image: "/images/andros-wa09.jpg",
    alt: "An inland blue hole on Andros Island",
    related: "blue-hole-exploration",
    body: [
      "Andros Island is world-famous for having the highest concentration of blue holes in the world — underwater caves and sinkholes that connect to the ocean, creating a mystical environment for swimming and exploration. Guided tours visit spectacular inland blue holes that are safe for swimming and perfect for cooling off after a morning of fishing.",
      "Captain Bill's Blue Hole is famous for its high jumping platform; Cousteau's Blue Hole was explored by Jacques Cousteau himself. Local folklore says the deep holes are home to the 'Lusca', a mythical sea monster — the guides know the safe spots.",
      "The island also has the longest coastline in the country and countless inland lagoons and mangrove creeks, which means safe, comfortable kayaking conditions year-round despite the weather. Routes wind through the Caribbean's largest mangrove system, teeming with biodiversity.",
      "Offshore, the Andros barrier reef — the third-largest in the world — and hundreds of patch reefs make for an unforgettable snorkel experience: reef fish, majestic coral formations, sea turtles, stingrays and nurse sharks, with shallow, safe areas for families.",
    ],
  },
];

/* ------------------------- AEO question hub ------------------------- */

export const PLAN_FAQS = [
  {
    q: "When is the best time to go bonefishing in Andros?",
    a: "AOA's full-day fly-fishing charters run year-round. The overnight fish camp is seasonal — November to April only — because the cooler months avoid the peak heat and insects of the Bahamian summer. Hiking is also best November to April; from May to October early mornings are recommended.",
    link: "/experiences/full-day-fly-fishing-charter",
    linkLabel: "Explore the charter",
  },
  {
    q: "What fish can I target in Andros?",
    a: "Guided fly-fishing with AOA targets the 'Big 3' — bonefish (the primary target, catch-and-release only), tarpon and permit. Fishing takes place across the interior North, Middle and South Bights of Andros.",
    link: "/journal/big-three-andros-flats",
    linkLabel: "Read about the Big 3",
  },
  {
    q: "How long is a full-day fishing charter?",
    a: "A full day on the water is approximately 8 hours. With more time you can fish multiple locations and adapt to changing conditions — boat rides to the fishing areas range from 15 to 45 minutes depending on where you're heading.",
    link: "/experiences/full-day-fly-fishing-charter",
    linkLabel: "See charter details",
  },
  {
    q: "Is Andros suitable for beginner anglers?",
    a: "Yes. No experience is necessary — trips are customized for every skill level, first-time anglers are taught everything they need, and charters are limited to a maximum of 2 anglers per boat for personalized attention.",
    link: "/bonefishing-andros",
    linkLabel: "Plan a first trip",
  },
  {
    q: "What is included in a fishing charter?",
    a: "A professional guide (Captain Shawn Leadon), a fully equipped modern flats boat, all fly-fishing equipment and tackle, expert instruction, and access to premier fishing locations. Not included: airfare, taxi, hotel, food and drinks, and gratuities.",
    link: "/experiences/full-day-fly-fishing-charter",
    linkLabel: "Full inclusion list",
  },
  {
    q: "How does the 50% deposit work?",
    a: "A 50% deposit of the total trip cost is required to confirm your reservation — for example, $475 on a $950 charter. The remaining balance is due 60 days prior to trip departure. Payment methods: Visa, Mastercard and wire transfer.",
    link: "/#policy",
    linkLabel: "Read the booking policy",
  },
  {
    q: "How far in advance should I book?",
    a: "The balance is due 60 days before departure, so booking more than 60 days out is the natural rhythm. For the overnight fish camp, advance booking is highly recommended due to limited seasonal windows (November to April).",
    link: "/experiences/overnight-fish-camp-adventure",
    linkLabel: "See the fish camp",
  },
  {
    q: "What should I bring for a bonefishing trip?",
    a: "Polarized sunglasses, sunscreen, a hat, a camera, and your own food and drinks (arrangements can often be made with your hotel). All fishing equipment and tackle are provided.",
    link: "/experiences/full-day-fly-fishing-charter",
    linkLabel: "Charter packing list",
  },
  {
    q: "What happens if the weather is bad?",
    a: "Weather cancellations are at the guide's discretion and trips are rescheduled when possible — start times may shift to make the most of conditions. Weather, fishing conditions and mechanical issues can't be guaranteed, so trip cancellation insurance is strongly recommended.",
    link: "/#policy",
    linkLabel: "Weather policy",
  },
  {
    q: "What is there to do on Andros besides fishing?",
    a: "Kayaking through mangrove creeks and blue holes (year-round), snorkeling the world's third-largest barrier reef with sea turtles and rays, hiking to caves, ruins and blue holes, and guided blue hole swims — all bookable through AOA.",
    link: "/andros-kayaking",
    linkLabel: "See nature adventures",
  },
];

/* ------------------------- SEO landing pages ------------------------- */

export type SeoPage = {
  slug: string;
  h1: string;
  title: string;
  description: string;
  eyebrow: string;
  hero: string;
  heroAlt: string;
  intro: string[];
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
  experiences: string[];
  relatedPages: string[];
};

export const SEO_PAGES: SeoPage[] = [
  {
    slug: "bonefishing-andros",
    h1: "Bonefishing in Andros, The Bahamas",
    title: "Bonefishing in Andros | Guided Flats Charters — Andros Outdoor Adventures",
    description:
      "Stalk the 'ghost of the flats' on the world's largest shallow flats. Guided catch-and-release bonefishing with Captain Shawn Leadon — 30+ year family legacy.",
    eyebrow: "The Ghost of the Flats",
    hero: "/images/charter-2.jpeg",
    heroAlt: "Bonefishing the shallow flats of Andros Island",
    intro: [
      "Andros is the premier destination spot to stalk the big bonefish. The island's vast shallow flats are the largest in the world, and the 'ghost of the flats' — catch-and-release only — tests your skill like nothing else on water.",
      "Every charter is guided by Captain Shawn Leadon, whose father Captain Rupert Leadon was one of the pioneers of Bahamian bonefishing. Bonefish don't stay in one place, so fishing locations change with the tides across the interior North, Middle and South Bights.",
    ],
    sections: [
      {
        heading: "Where the bonefish are",
        body: "Main fishing areas are within the interior North, Middle and South Bights of Andros. Depending on where the fish are, the boat ride ranges from 15 to 45 minutes.",
      },
      {
        heading: "For first-timers and veterans",
        body: "No experience is necessary — first-time anglers are taught everything, and serious anglers get a guide who understands advanced techniques. A maximum of 2 anglers per boat keeps it personal.",
      },
      {
        heading: "Catch & release, always",
        body: "Bonefish are 100% catch and release. It's part of a wider conservation commitment that runs through everything AOA does on Andros.",
      },
    ],
    faqs: [
      {
        q: "When is the best time for bonefishing in Andros?",
        a: "AOA's fly-fishing charters run year-round, with locations chosen daily based on tides and conditions across the North, Middle and South Bights.",
      },
      {
        q: "Do I need experience to catch a bonefish?",
        a: "No. Charters are customized for all skill levels — Captain Shawn teaches first-time anglers everything they need, with a maximum of 2 anglers per boat.",
      },
    ],
    experiences: ["full-day-fly-fishing-charter", "west-side-national-park-tour", "overnight-fish-camp-adventure"],
    relatedPages: ["andros-fly-fishing", "andros-fishing-charters", "andros-fish-camp"],
  },
  {
    slug: "andros-fly-fishing",
    h1: "Fly-Fishing on Andros Island",
    title: "Andros Fly-Fishing | Bonefish, Tarpon & Permit — Andros Outdoor Adventures",
    description:
      "Fly-fishing charters on Andros Island targeting the Big 3 — bonefish, tarpon and permit. All gear, tackle and expert instruction included.",
    eyebrow: "The Big 3",
    hero: "/images/charter-main.jpeg",
    heroAlt: "Tarpon landed on a fly-fishing charter in Andros",
    intro: [
      "Fly-fishing the vast flats of Andros is one of the most memorable and exciting things to do while visiting The Bahamas — especially with an experienced captain who guides novice and serious anglers alike.",
      "AOA's full-day charter spends roughly 8 hours on the water targeting bonefish, tarpon and permit, with all fly-fishing equipment, tackle and instruction included.",
    ],
    sections: [
      {
        heading: "The full-day charter",
        body: "8 hours, a maximum of 2 anglers, all equipment provided, year-round availability, 100% catch and release. From $950 per charter with a 50% deposit to confirm.",
      },
      {
        heading: "Instruction included",
        body: "Expert guidance and teaching run throughout the day — from your first cast to your 1000th fish.",
      },
      {
        heading: "Multi-day options",
        body: "The overnight fish camp combines two full days of fly-fishing with rustic west coast camping, November to April.",
      },
    ],
    faqs: [
      {
        q: "What gear do I need for fly-fishing in Andros?",
        a: "None — all fly-fishing equipment and tackle are provided, along with expert instruction. Bring polarized sunglasses, sunscreen, a hat and your own food and drinks.",
      },
    ],
    experiences: ["full-day-fly-fishing-charter", "overnight-fish-camp-adventure"],
    relatedPages: ["bonefishing-andros", "andros-fishing-charters", "andros-fish-camp"],
  },
  {
    slug: "andros-fishing-charters",
    h1: "Andros Fishing Charters",
    title: "Andros Fishing Charters | Full-Day & Multi-Day — Andros Outdoor Adventures",
    description:
      "Compare Andros fishing charters: full-day flats charters from $950, West Side National Park tours, and overnight fish camp expeditions with Captain Shawn Leadon.",
    eyebrow: "Choose Your Charter",
    hero: "/images/captain-shawn.jpg",
    heroAlt: "Captain Shawn Leadon running the flats boat across Andros",
    intro: [
      "Every AOA charter is guided by Captain Shawn Leadon on a fully equipped modern flats boat, fishing the interior bights of Andros with a maximum of 2 anglers per boat.",
      "Charters run year-round, are 100% catch and release, and are confirmed with a 50% deposit — the balance is due 60 days before you fish.",
    ],
    sections: [
      {
        heading: "Full Day Fly-Fishing Charter — from $950",
        body: "8 hours targeting bonefish, tarpon and permit across the North, Middle and South Bights. All gear and instruction included.",
      },
      {
        heading: "West Side National Park Tour — $950",
        body: "A full-day expedition into the protected wilds of West Side National Park, based on 2-person occupancy.",
      },
      {
        heading: "Overnight Fish Camp — from $1,500 per person, per night",
        body: "Two full days of fishing plus a night of rustic camping on the remote west coast. November to April only.",
      },
    ],
    faqs: [
      {
        q: "How much is a fishing charter in Andros?",
        a: "The full-day fly-fishing charter is from $950 per charter, and the West Side National Park tour is $950 based on 2-person occupancy. The overnight fish camp starts at $1,500 per person, per night. A 50% deposit confirms your reservation.",
      },
    ],
    experiences: ["full-day-fly-fishing-charter", "west-side-national-park-tour", "overnight-fish-camp-adventure"],
    relatedPages: ["bonefishing-andros", "andros-fly-fishing", "andros-fish-camp"],
  },
  {
    slug: "andros-fish-camp",
    h1: "Andros Fish Camp Adventures",
    title: "Andros Fish Camp | Overnight West Coast Expeditions — Andros Outdoor Adventures",
    description:
      "Two days of fly-fishing plus rustic beach camping on Andros' remote west coast. Meals and camping gear included. November–April only.",
    eyebrow: "The Backcountry",
    hero: "/images/fish-camp.png",
    heroAlt: "Rustic fish camp on the west coast of Andros",
    intro: [
      "The ultimate wilderness fishing experience: two full days of exceptional fly-fishing for the Big 3, one night of rustic camping under the stars, and rarely fished waters far from civilization.",
      "Fish camp adventures run November to April only — the cooler months ensure comfort away from the Bahamian summer heat and insects. Advance booking is highly recommended due to limited seasonal windows.",
    ],
    sections: [
      {
        heading: "What's included",
        body: "Two full days of guided flats fishing, one night rustic camping on the west coast, all meals, camping equipment, tackle and boat transport.",
      },
      {
        heading: "Who it's for",
        body: "Adventurous anglers with moderate fitness. The remote nature of the trip makes it best suited to intermediate and advanced anglers.",
      },
      {
        heading: "The rhythm of camp",
        body: "Fish hard all day, then a fresh dinner at camp as the sun sets over the Caribbean, followed by stargazing. Sunrise coffee, and straight back onto the flats.",
      },
    ],
    faqs: [
      {
        q: "When does the Andros fish camp run?",
        a: "November to April only. The cooler months avoid the peak heat and insects encountered in The Bahamas during summer.",
      },
      {
        q: "What does the fish camp cost?",
        a: "Pricing starts at $1,500 per person, per night, with a 50% deposit to confirm and the balance due 60 days before departure.",
      },
    ],
    experiences: ["overnight-fish-camp-adventure", "west-side-national-park-tour"],
    relatedPages: ["andros-fishing-charters", "bonefishing-andros", "andros-fly-fishing"],
  },
  {
    slug: "andros-kayaking",
    h1: "Kayaking on Andros Island",
    title: "Andros Kayaking | Mangrove Creeks & Blue Holes — Andros Outdoor Adventures",
    description:
      "Paddle the Caribbean's largest mangrove system, inland blue holes and tidal creeks. Guided and self-guided kayak tours with all equipment provided.",
    eyebrow: "Paddle Paradise",
    hero: "/images/andros-06.jpg",
    heroAlt: "Kayaking through the mangrove creeks of Andros",
    intro: [
      "Andros has the longest coastline in The Bahamas and countless inland blue holes, lagoons and mangrove creeks — which means safe, comfortable kayaking conditions year-round despite the weather.",
      "Routes along the shorelines and wetland creeks wind through the Caribbean's largest mangrove system and are teeming with biodiversity. Bring your camera.",
    ],
    sections: [
      {
        heading: "All equipment provided",
        body: "Kayaks, paddles, life jackets and backrests are all included. Choose a guided tour led by experienced guides, or self-guided for experienced kayakers.",
      },
      {
        heading: "What you'll explore",
        body: "Mangrove tunnels, coastal lagoons, inland blue holes ringed by lush vegetation, and tidal creeks full of marine life.",
      },
    ],
    faqs: [
      {
        q: "Can beginners kayak on Andros?",
        a: "Yes — guided tours are led by experienced guides, and the sheltered creeks offer safe, comfortable conditions year-round.",
      },
    ],
    experiences: ["mangrove-kayaking", "blue-hole-exploration", "snorkeling-excursions"],
    relatedPages: ["andros-blue-holes", "andros-snorkeling", "andros-hiking"],
  },
  {
    slug: "andros-blue-holes",
    h1: "The Blue Holes of Andros",
    title: "Andros Blue Holes | Guided Blue Hole Exploration — Andros Outdoor Adventures",
    description:
      "Andros holds the highest concentration of blue holes in the world. Swim and explore inland blue holes with guides who know the safe spots.",
    eyebrow: "Geological Wonders",
    hero: "/images/andros-wa09.jpg",
    heroAlt: "An inland blue hole surrounded by pine forest on Andros",
    intro: [
      "Blue holes are underwater caves and sinkholes that connect to the ocean — and Andros has the highest concentration of them in the world. Guided tours visit spectacular inland blue holes that are safe for swimming.",
      "They're the perfect way to cool off after a morning of fishing, surrounded by pine forests home to rare Bahamian birds.",
    ],
    sections: [
      {
        heading: "Famous blue holes",
        body: "Captain Bill's Blue Hole is famous for its high jumping platform. Cousteau's Blue Hole was explored by Jacques Cousteau himself.",
      },
      {
        heading: "The legend of the Lusca",
        body: "Local folklore says the deep holes are home to the 'Lusca', a mythical sea monster. Don't worry — the guides know the safe spots.",
      },
      {
        heading: "Why take the plunge",
        body: "Crystal-clear water, refreshing swims, limestone formations millions of years old, and bird watching in the surrounding pine forest.",
      },
    ],
    faqs: [
      {
        q: "Can you swim in Andros' blue holes?",
        a: "Yes — guided tours visit inland blue holes that are safe for swimming. The water is cool, fresh and clear, with remarkable visibility.",
      },
    ],
    experiences: ["blue-hole-exploration", "mangrove-kayaking", "hiking-biking-tours"],
    relatedPages: ["andros-kayaking", "andros-hiking", "andros-snorkeling"],
  },
  {
    slug: "andros-snorkeling",
    h1: "Snorkeling the Andros Barrier Reef",
    title: "Andros Snorkeling | Third-Largest Barrier Reef — Andros Outdoor Adventures",
    description:
      "Snorkel the world's third-largest barrier reef with sea turtles, rays and nurse sharks. Safe, guided excursions for all skill levels.",
    eyebrow: "The Living Reef",
    hero: "/images/blog-snorkel.jpeg",
    heroAlt: "Scuba diver above coral and reef fish on the Andros barrier reef",
    intro: [
      "Aquamarine waters, the Andros barrier reef and hundreds of patch reefs make for an unforgettable snorkel experience — the third-largest barrier reef in the world.",
      "Experienced guides ensure a safe and memorable experience for all skill levels, from first-time snorkelers to advanced swimmers exploring deeper reefs, with shallow, safe areas for families.",
    ],
    sections: [
      {
        heading: "What you'll encounter",
        body: "Colorful tropical fish and coral formations, green and hawksbill sea turtles, stingrays and nurse sharks, plus starfish, sand dollars and sea biscuits.",
      },
      {
        heading: "For every skill level",
        body: "Beginners are taught everything; advanced snorkelers explore deeper reefs; families get shallow, safe areas.",
      },
    ],
    faqs: [
      {
        q: "Is snorkeling in Andros safe for families?",
        a: "Yes — experienced guides choose shallow, safe areas for families and teach beginners everything they need.",
      },
    ],
    experiences: ["snorkeling-excursions", "mangrove-kayaking", "blue-hole-exploration"],
    relatedPages: ["andros-kayaking", "andros-blue-holes", "andros-hiking"],
  },
  {
    slug: "andros-hiking",
    h1: "Hiking & Biking on Andros Island",
    title: "Andros Hiking & Biking | Ruins, Caves & Blue Holes — Andros Outdoor Adventures",
    description:
      "Hike the best trails in The Bahamas — historical ruins, caves, blue holes and rare wildlife on the country's largest island.",
    eyebrow: "Into the Interior",
    hero: "/images/hiking-trail.jpg",
    heroAlt: "Birdwatching sign along the South Andros Blue Hole Nature Trail",
    intro: [
      "Andros is the largest island in The Bahamas and provides the best hiking adventures in the country — historical ruins, cave systems and the highest number of blue holes in the country.",
      "Native pine forests hold diverse ecosystems and rare wildlife: the endemic and endangered Andros Rock Iguana, rare Bahama Orioles, Piping Plovers — and the legend of the elusive Chickcharney.",
    ],
    sections: [
      {
        heading: "What you'll discover",
        body: "Historical ruins and archaeological sites, natural caves and cavern systems, inland blue holes, and native pine forests.",
      },
      {
        heading: "When to hike",
        body: "November to April brings cooler temperatures and less humidity. May to October is hot and humid — early morning is recommended.",
      },
    ],
    faqs: [
      {
        q: "What wildlife can I see hiking on Andros?",
        a: "The endemic Andros Rock Iguana, rare Bahama Orioles and Piping Plovers — and, legend says, the elusive Chickcharney.",
      },
    ],
    experiences: ["hiking-biking-tours", "blue-hole-exploration", "mangrove-kayaking"],
    relatedPages: ["andros-blue-holes", "andros-kayaking", "andros-snorkeling"],
  },
];

export const getSeoPage = (slug: string) => SEO_PAGES.find((p) => p.slug === slug);

/* ------------------------- Currency ------------------------- */

export const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
