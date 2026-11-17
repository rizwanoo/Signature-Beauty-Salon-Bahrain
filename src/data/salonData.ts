import heroSalonImg from "../assets/images/hero_salon_sanctuary_1794922774978.jpg";
import treatmentRoomImg from "../assets/images/treatment_room_ambience_1794922774477.jpg";
import skincareRitualImg from "../assets/images/skincare_facial_ritual_1794922775496.jpg";
import bridalMakeupImg from "../assets/images/bridal_makeup_atelier_1794922775900.jpg";
import threadingCareImg from "../assets/images/threading_brow_care_1794922775851.jpg";
import salonLoungeImg from "../assets/images/salon_detail_lounge_1794922776683.jpg";

export const SALON_IMAGES = {
  heroSalon: heroSalonImg,
  treatmentRoom: treatmentRoomImg,
  skincareRitual: skincareRitualImg,
  bridalMakeup: bridalMakeupImg,
  threadingCare: threadingCareImg,
  salonLounge: salonLoungeImg,
  logoGold: "/assets/images/signature-beauty-salon/brand-identity/signature-beauty-logo.png",
  logoIvory: "/assets/images/signature-beauty-salon/brand-identity/signature-beauty-logo-ivory.png",
  logoBurgundy: "/assets/images/signature-beauty-salon/brand-identity/signature-beauty-logo-burgundy.png",
  logoOriginalProfile: "/assets/images/signature-beauty-salon/brand-identity/logo-profile.jpg",
} as const;

export const SALON_INFO = {
  name: "Signature Beauty Salon",
  handle: "@signaturebeauty_bh",
  instagramUrl: "https://www.instagram.com/signaturebeauty_bh/",
  bioMessage:
    "Our salon provides a relaxing, positive & motivational atmosphere. Comfortable experience ♡",
  phones: [
    { display: "77168169", formatted: "+973 7716 8169", href: "tel:+97377168169" },
    { display: "39893885", formatted: "+973 3989 3885", href: "tel:+97339893885" },
  ],
  hours: {
    daily: "9:00 AM – 8:00 PM",
    daysSummary: "Monday – Sunday",
    schedule: [
      { day: "Monday", hours: "9:00 AM – 8:00 PM" },
      { day: "Tuesday", hours: "9:00 AM – 8:00 PM" },
      { day: "Wednesday", hours: "9:00 AM – 8:00 PM" },
      { day: "Thursday", hours: "9:00 AM – 8:00 PM" },
      { day: "Friday", hours: "9:00 AM – 8:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 8:00 PM" },
      { day: "Sunday", hours: "9:00 AM – 8:00 PM" },
    ],
  },
  location: {
    instagramArea: "Riffa, Bahrain",
    verifiedArea: "Road No. 1411, Isa Town",
    roadReference: "Block 913 · Riffa / Isa Town Border, Bahrain",
    plusCode: "4HM2+JWH",
    coordinates: "26.133933, 50.5528367",
    googleMapsUrl: "https://goo.gl/maps/UX8zdwRsQmn",
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=26.133933,50.5528367&hl=en&z=17&output=embed",
    verificationNote:
      "The official Google Maps pin (goo.gl/maps/UX8zdwRsQmn) resolves to Road No. 1411, Isa Town (26.133933, 50.5528367), which sits on Bahrain Block 913 bordering Riffa as referenced in @signaturebeauty_bh.",
  },
} as const;

export interface ServiceTreatment {
  id: string;
  name: string;
  summary: string;
}

export interface ServiceCategory {
  id: string;
  number: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  treatments: ServiceTreatment[];
}

export const VERIFIED_SERVICES: ServiceCategory[] = [
  {
    id: "facials",
    number: "01",
    slug: "facials-skincare",
    title: "Facials & Skincare",
    subtitle: "Restorative skin care in a calm private setting",
    description:
      "Dedicated facial care designed around skin clarity, comfort, and unhurried relaxation. Call the salon directly to discuss skin type suitability and current availability.",
    image: skincareRitualImg,
    imageAlt: "Skincare serums, rose quartz stone, and steamed cotton towels on travertine",
    treatments: [
      {
        id: "facial",
        name: "Facial",
        summary: "Classic relaxing facial care tailored to refresh and comfort the skin.",
      },
      {
        id: "facial-extractions",
        name: "Facial Extractions",
        summary: "Focused pore-clearing extraction care performed with gentle attention.",
      },
      {
        id: "mens-facial",
        name: "Men's Facial",
        summary: "Targeted cleansing and soothing facial treatment listed for men.",
      },
    ],
  },
  {
    id: "hair-removal",
    number: "02",
    slug: "hair-removal-threading",
    title: "Hair Removal & Threading",
    subtitle: "Clean brow shaping and delicate facial threading",
    description:
      "Traditional threading techniques focused on clean brow architecture and smooth facial finishing within a comfortable, hygienic salon experience.",
    image: threadingCareImg,
    imageAlt: "Natural cotton threading spool, precision grooming tools, and soothing rosewater mist",
    treatments: [
      {
        id: "eyebrow-threading",
        name: "Eyebrow Threading",
        summary: "Careful brow shaping using fine cotton thread to frame natural facial balance.",
      },
      {
        id: "threading",
        name: "Threading",
        summary: "Precision facial threading for smooth, clean skin finishing.",
      },
    ],
  },
  {
    id: "makeup",
    number: "03",
    slug: "bridal-makeup",
    title: "Makeup Artistry",
    subtitle: "Bridal & special occasion beauty preparation",
    description:
      "Thoughtful makeup artistry for milestone celebrations and bridal preparations, shaped around your comfort and personal style. Advance telephone consultation is recommended.",
    image: bridalMakeupImg,
    imageAlt: "Bridal makeup brushes, champagne compact, and soft blush palette on rose marble",
    treatments: [
      {
        id: "bridal-makeup",
        name: "Bridal Makeup",
        summary: "Dedicated bridal makeup preparation arranged through direct consultation with the salon.",
      },
    ],
  },
];

export interface GalleryFrame {
  id: string;
  title: string;
  category: "Atmosphere" | "Treatment Suite" | "Beauty Craft" | "Brand Identity";
  caption: string;
  image: string;
  aspect: "wide" | "tall" | "standard";
}

export const GALLERY_FRAMES: GalleryFrame[] = [
  {
    id: "sanctuary-reception",
    title: "Reception & Sunlit Waiting Space",
    category: "Atmosphere",
    caption: "Editorial mood study reflecting the bright, welcoming aesthetic of Signature Beauty Salon.",
    image: heroSalonImg,
    aspect: "wide",
  },
  {
    id: "bridal-vanity",
    title: "Bridal Preparation Palette",
    category: "Beauty Craft",
    caption: "Soft blush tones, warm champagne finishes, and artisan brushes curated for bridal sessions.",
    image: bridalMakeupImg,
    aspect: "tall",
  },
  {
    id: "private-suite",
    title: "Quiet Facial Suite",
    category: "Treatment Suite",
    caption: "Warm ivory linen and calm lighting crafted for restorative skincare sessions.",
    image: treatmentRoomImg,
    aspect: "wide",
  },
  {
    id: "lounge-corner",
    title: "Comfortable Lounge Pause",
    category: "Atmosphere",
    caption: "Designed around a relaxing, positive, and motivational guest experience.",
    image: salonLoungeImg,
    aspect: "tall",
  },
  {
    id: "botanical-skincare",
    title: "Skincare Ritual Elements",
    category: "Beauty Craft",
    caption: "Clean travertine surfaces, warm steamed towels, and botanical facial care.",
    image: skincareRitualImg,
    aspect: "standard",
  },
  {
    id: "threading-craft",
    title: "Precision Brow & Threading Care",
    category: "Beauty Craft",
    caption: "Fine cotton thread and soothing rosewater preparation for gentle finishing.",
    image: threadingCareImg,
    aspect: "standard",
  },
];
