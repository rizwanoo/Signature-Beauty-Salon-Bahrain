import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { EditorialCTA } from "../components/EditorialCTA";
import {
  GALLERY_FRAMES,
  GalleryFrame,
  SALON_IMAGES,
  SALON_INFO,
} from "../data/salonData";

gsap.registerPlugin(ScrollTrigger);

export const AboutPage: React.FC = () => {
  const [galleryFilter, setGalleryFilter] = useState<string>("All");
  const [lightboxFrame, setLightboxFrame] = useState<GalleryFrame | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxFrame(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-hero-item",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
        }
      );

      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              once: true,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [galleryFilter]);

  const categories = ["All", "Atmosphere", "Treatment Suite", "Beauty Craft"];
  const visibleFrames =
    galleryFilter === "All"
      ? GALLERY_FRAMES
      : GALLERY_FRAMES.filter((f) => f.category === galleryFilter);

  return (
    <div ref={rootRef} className="w-full overflow-x-hidden">
      {/* 1. Editorial Header extending behind transparent navbar */}
      <section className="relative min-h-[70vh] w-full flex items-end overflow-hidden bg-[#382834]">
        <img
          src={SALON_IMAGES.salonLounge}
          alt="Warm sunlit lounge corner representing Signature Beauty Salon's welcoming atmosphere"
          className="absolute inset-0 w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#382834]/90 via-[#382834]/45 to-[#382834]/30"
        />
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 pt-36 pb-16 md:pb-20">
          <p className="about-hero-item text-xs font-semibold uppercase tracking-[0.2em] text-[#EBCBCB] mb-4">
            About Signature Beauty Salon · Bahrain
          </p>
          <h1 className="about-hero-item font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#FFF9F3] leading-[1.05] max-w-4xl mb-6">
            A Relaxing, Positive &amp; Motivational Atmosphere
          </h1>
          <p className="about-hero-item text-base md:text-lg text-[#FFF9F3]/85 max-w-2xl leading-relaxed">
            Built around comfort, unhurried hospitality, and authentic beauty care in Bahrain.
          </p>
        </div>
      </section>

      {/* 2. Authentic Brand Story & Logo Heritage — Warm Ivory */}
      <section className="bg-[#FFF9F3] py-24 md:py-32 px-6 md:px-10 lg:px-14">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-center about-reveal">
          <div className="lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#74384F] mb-4">
              Brand Philosophy
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#382834] leading-[1.1] mb-8">
              &ldquo;{SALON_INFO.bioMessage}&rdquo;
            </h2>
            <p className="text-base text-[#373235]/85 leading-relaxed mb-6">
              Signature Beauty Salon welcomes clients across Riffa and Isa Town with a
              philosophy centered on emotional ease as much as aesthetic care. Every visit is
              meant to feel restorative, calm, and uplifting.
            </p>
            <p className="text-base text-[#373235]/85 leading-relaxed mb-10">
              Rather than rushing through appointments, the salon team welcomes direct phone
              conversations and personal Instagram enquiries so every facial, threading session,
              or bridal makeup booking is arranged thoughtfully.
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              <EditorialCTA label="Explore Verified Services" to="/services" tone="burgundy" />
              <EditorialCTA
                label={`Follow ${SALON_INFO.handle}`}
                href={SALON_INFO.instagramUrl}
                external
                tone="dark"
              />
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-12 border-t lg:border-t-0 lg:border-l border-[#74384F]/15 pt-10 lg:pt-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#74384F] mb-6">
              Official Brand Identity
            </p>
            <div className="py-10 border-b border-[#74384F]/12 flex flex-col items-start gap-6">
              <img
                src={SALON_IMAGES.logoGold}
                alt="Official Signature Beauty Salon champagne gold wordmark"
                className="h-24 md:h-28 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <p className="text-sm text-[#373235]/75 max-w-md leading-relaxed">
                The original brush-script Signature Beauty wordmark from {SALON_INFO.handle},
                paired with warm champagne gold, soft rose, and deep burgundy accents.
              </p>
            </div>
            <div className="pt-8 grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#74384F] mb-1">
                  Location
                </p>
                <p className="text-sm text-[#382834] font-medium">
                  {SALON_INFO.location.verifiedArea}
                </p>
                <p className="text-xs text-[#373235]/70 mt-0.5">
                  {SALON_INFO.location.roadReference}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#74384F] mb-1">
                  Daily Hours
                </p>
                <p className="text-sm text-[#382834] font-medium tabular-nums">
                  {SALON_INFO.hours.daily}
                </p>
                <p className="text-xs text-[#373235]/70 mt-0.5">
                  {SALON_INFO.hours.daysSummary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPEN ASYMMETRIC GALLERY — Soft Cream (Zero Cards, Zero Boxes) */}
      <section
        id="gallery"
        className="bg-[#F5EEE8] py-24 md:py-32 px-6 md:px-10 lg:px-14 scroll-mt-20"
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#74384F]/15 about-reveal">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#74384F] mb-3">
                Visual Gallery
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-[#382834] leading-[1.08]">
                Atmosphere &amp; Beauty Craft
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              {categories.map((cat) => {
                const active = galleryFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setGalleryFilter(cat)}
                    className={`bg-transparent border-none outline-none cursor-pointer py-2 text-xs font-bold uppercase tracking-[0.16em] whitespace-nowrap transition-colors ${
                      active ? "text-[#74384F]" : "text-[#382834]/65 hover:text-[#382834]"
                    }`}
                    style={{
                      borderBottom: active ? "1px solid #C7A36A" : "1px solid transparent",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="py-6 border-b border-[#74384F]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#373235]/75">
            <p className="max-w-2xl">
              Atmosphere and craft visual studies curated around Signature Beauty Salon&apos;s
              warm aesthetic. To browse live daily posts, client transformations, and reels,
              visit our official Instagram profile directly.
            </p>
            <a
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#74384F] hover:text-[#382834] whitespace-nowrap shrink-0 underline"
            >
              Open {SALON_INFO.handle} Posts &amp; Reels ↗
            </a>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 items-start">
            {visibleFrames.map((frame, index) => {
              const spanClass =
                frame.aspect === "wide"
                  ? "md:col-span-7"
                  : frame.aspect === "tall"
                  ? "md:col-span-5"
                  : "md:col-span-6";
              const offsetClass = index % 3 === 1 ? "md:mt-12" : "";

              return (
                <figure key={frame.id} className={`${spanClass} ${offsetClass} about-reveal group`}>
                  <button
                    type="button"
                    onClick={() => setLightboxFrame(frame)}
                    className="w-full text-left bg-transparent border-none outline-none p-0 cursor-pointer block"
                    aria-label={`View full image: ${frame.title}`}
                  >
                    <div className="editorial-image-frame w-full">
                      <img
                        src={frame.image}
                        alt={frame.title}
                        loading="lazy"
                        className={`w-full object-cover ${
                          frame.aspect === "tall"
                            ? "aspect-[3/4]"
                            : frame.aspect === "wide"
                            ? "aspect-[16/10]"
                            : "aspect-[4/3]"
                        }`}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </button>
                  <figcaption className="mt-4 flex flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-2xl font-semibold text-[#382834]">
                        {frame.title}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#74384F] shrink-0">
                        {frame.category}
                      </span>
                    </div>
                    <p className="text-sm text-[#373235]/75 leading-relaxed">{frame.caption}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Rich Burgundy Closing Invitation */}
      <section className="bg-[#74384F] text-[#FFF9F3] py-20 md:py-24 px-6 md:px-10 lg:px-14">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#EBCBCB] mb-3">
              Experience Signature Beauty
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#FFF9F3]">
              Ready for a Calm, Comfortable Visit?
            </h2>
          </div>
          <EditorialCTA label="Arrange Your Appointment" to="/contact" tone="gold" />
        </div>
      </section>

      {/* Fullscreen Lightbox for Gallery Inspection */}
      {lightboxFrame && (
        <div
          className="fixed inset-0 z-50 bg-[#382834]/95 backdrop-blur-sm flex items-center justify-center p-6 md:p-12"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxFrame.title}
          onClick={() => setLightboxFrame(null)}
        >
          <div
            className="relative max-w-5xl w-full flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-[#FFF9F3]">
              <span className="text-xs uppercase tracking-[0.18em] text-[#EBCBCB]">
                {lightboxFrame.category}
              </span>
              <button
                type="button"
                onClick={() => setLightboxFrame(null)}
                aria-label="Close image viewer"
                className="p-2 bg-transparent border-none text-[#FFF9F3] hover:text-[#C7A36A] cursor-pointer flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]"
              >
                <span>Close</span>
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={lightboxFrame.image}
              alt={lightboxFrame.title}
              className="w-full max-h-[75vh] object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="text-[#FFF9F3]">
              <h3 className="font-display text-2xl md:text-3xl font-semibold">
                {lightboxFrame.title}
              </h3>
              <p className="text-sm text-[#FFF9F3]/80 mt-1">{lightboxFrame.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
