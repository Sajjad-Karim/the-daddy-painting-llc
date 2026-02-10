import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import Header from "../../components/Header";
import skyVectorImage from "../../assets/vector.png";
import skyImage from "../../assets/sky.png";
import borderVectorImage from "../../assets/borderVector.png";
import interiorImage from "../../assets/services/interior.png";
import exteriorImage from "../../assets/services/exterior.png";
import cabinetImage from "../../assets/services/cabnet.png";
import deckImage from "../../assets/services/deck.png";
import detailHeroImage from "../../assets/detail-page/hero.png";
import detailSecondImage from "../../assets/detail-page/secondSection.png";
import detailThirdImage from "../../assets/detail-page/thirdSection.png";
import detailFourthImage from "../../assets/detail-page/fourth.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE, STAGGER, TRIGGER } from "../../utils/gsapConfig";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  "All",
  "Interior Painting",
  "Exterior Painting",
  "Cabinets",
  "Decks & Fences",
  "Commercial Projects",
];

const RAW_ITEMS = [
  {
    id: "int-1",
    category: "Interior Painting",
    src: detailSecondImage,
    alt: "Freshly painted interior corner with baseboard and wood floor",
    label: "Living Room Accent Wall",
  },
  {
    id: "int-2",
    category: "Interior Painting",
    src: interiorImage,
    alt: "Interior walls and ceilings with smooth finish",
    label: "Open Concept Interior",
  },
  {
    id: "int-3",
    category: "Interior Painting",
    src: detailHeroImage,
    alt: "Interior hero shot",
    label: "Cozy Family Space",
  },
  {
    id: "ext-1",
    category: "Exterior Painting",
    src: exteriorImage,
    alt: "Residential exterior after repaint",
    label: "Curb Appeal Refresh",
  },
  {
    id: "ext-2",
    category: "Exterior Painting",
    src: detailThirdImage,
    alt: "Exterior siding and trim",
    label: "Trim & Siding Upgrade",
  },
  {
    id: "cab-1",
    category: "Cabinets",
    src: cabinetImage,
    alt: "Updated kitchen cabinets",
    label: "Kitchen Cabinet Refinishing",
  },
  {
    id: "cab-2",
    category: "Cabinets",
    src: detailFourthImage,
    alt: "Cabinet and shelving detail",
    label: "Built-in Storage Finish",
  },
  {
    id: "deck-1",
    category: "Decks & Fences",
    src: deckImage,
    alt: "Stained deck boards",
    label: "Deck Staining",
  },
  {
    id: "comm-1",
    category: "Commercial Projects",
    src: detailThirdImage,
    alt: "Commercial interior painting",
    label: "Office Interior",
  },
];

const Gallery = () => {
  const rootRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const items = useMemo(() => RAW_ITEMS, []);

  const visibleItems = useMemo(
    () =>
      activeCategory === "All"
        ? items
        : items.filter((item) => item.category === activeCategory),
    [activeCategory, items],
  );

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === 0 ? visibleItems.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === visibleItems.length - 1 ? 0 : prev + 1,
    );
  };

  const activeImage =
    lightboxIndex !== null ? visibleItems[lightboxIndex] : null;

  useLayoutEffect(() => {
    if (!heroHeadingRef.current) {
      return;
    }

    const headingElement = heroHeadingRef.current;
    const headingWordElements = Array.from(
      headingElement.querySelectorAll("[data-hero-heading-word]"),
    );

    if (!headingWordElements.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(headingWordElements, {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const fallFromY = -56;

    gsap.set(headingWordElements, {
      opacity: 0,
      y: fallFromY,
    });

    const headingTimeline = gsap.timeline();

    headingTimeline.fromTo(
      headingWordElements,
      {
        opacity: 0,
        y: fallFromY,
      },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.standard,
        ease: "power3.out",
        stagger: 0.12,
      },
    );

    return () => {
      headingTimeline.kill();
    };
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const galleryCardElements = Array.from(
      rootRef.current.querySelectorAll("[data-gallery-card]"),
    );

    if (!galleryCardElements.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(galleryCardElements, {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    const galleryTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: galleryCardElements[0],
        start: TRIGGER.default,
        toggleActions: "restart none restart none",
      },
    });

    galleryTimeline.fromTo(
      galleryCardElements,
      {
        opacity: 0,
        y: -90,
        scale: 0.99,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: (index, _target, targets) => {
          const maxDuration = DURATION.slow;
          const minDuration = DURATION.quick;

          if (targets.length <= 1) {
            return maxDuration;
          }

          const progress = index / (targets.length - 1);

          return maxDuration - (maxDuration - minDuration) * progress;
        },
        ease: EASE.fluid,
        stagger: STAGGER.normal,
      },
    );

    return () => {
      if (galleryTimeline.scrollTrigger) {
        galleryTimeline.scrollTrigger.kill();
      }
      galleryTimeline.kill();
    };
  }, []);

  return (
    <div ref={rootRef}>
      {/* Hero */}
      <main
        className="relative min-h-[300px] overflow-hidden md:min-h-[550px]"
        style={{
          backgroundImage: `url(${skyImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <img
            src={skyVectorImage}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-12 pt-4 md:min-h-[500px] md:pb-10 md:pt-4">
          <Header />

          <section className="mt-10 flex w-full flex-col items-center text-center md:mt-12">
            <div
              data-about-animate="fade-down"
              className="inline-flex max-w-xs items-center gap-2 rounded-md bg-[#FFFFFF1A] px-6 py-2 text-[10px] tracking-wide text-[#1F2933] shadow-sm backdrop-blur md:max-w-none md:text-base"
            >
              <span className='uppercase font-["Alexandria"]'>
                The Daddy&apos;s Painting LLC
              </span>
            </div>
            <h1
              ref={heroHeadingRef}
              data-about-animate="zoom"
              className='mt-4 text-center font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[35px] font-["Rubik_One"] leading-tight'
            >
              {"PROJECT GALLERY".split(" ").map((word, index, array) => (
                <span
                  key={`${word}-${index}`}
                  data-hero-heading-word
                  className="inline-block will-change-transform"
                >
                  {word}
                  {index !== array.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </h1>
            <p
              data-about-animate="fade-up"
              className='mt-4 max-w-2xl text-sm leading-relaxed text-[#2D2928] font-["Inter"] md:text-base'
            >
              Explore a selection of our recent interior, exterior, cabinet,
              deck, fence, and commercial projects—designed to give you
              confidence in the quality and consistency of our work.
            </p>
          </section>
        </div>
      </main>

      {/* Category filters */}
      <section className="relative bg-[#E1F8F2] pb-10 pt-10 md:pb-16 md:pt-16">
        {/* Top wave border (same as other pages) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-[40px] z-0"
        >
          <img
            src={borderVectorImage}
            alt="Section top wave border"
            className="h-80 w-full object-cover"
          />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-4">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                data-about-animate="fade-up"
                onClick={() => setActiveCategory(category)}
                className={`inline-flex items-center gap-2 rounded-sm border px-4 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer ${
                  isActive
                    ? "border-[#039A02] bg-[#039A02] text-white shadow-md focus-visible:ring-[#039A02]"
                    : "border-[#D1D5DB] bg-white/80 text-[#111827] hover:bg-white focus-visible:ring-[#039A02]"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#039A02]" />
                <span className='font-["Inter"]'>{category}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="relative bg-[#E1F8F2] pb-10 pt-6 md:pb-16 md:pt-4">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {visibleItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                data-about-animate="card"
                data-gallery-card
                onClick={() => handleOpenLightbox(index)}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-[#111827] text-left shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] group-active:scale-[1.03] group-focus-within:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

                <div className="absolute inset-x-4 bottom-4 flex flex-col gap-1">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A1F88B]" />
                    <span className='font-["Inter"]'>{item.category}</span>
                  </div>
                  <p className='text-sm font-semibold text-white drop-shadow-sm font-["Inter"]'>
                    {item.label}
                  </p>
                </div>

                <div className="absolute right-3 top-3 rounded-full bg-black/50 p-1.5 text-white opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100 group-focus-within:opacity-100">
                  <ImageIcon className="h-4 w-4" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeImage && (
        <div className="fixed inset-0 z-[9999] flex h-screen flex-col overflow-y-auto overflow-x-hidden bg-black/90 md:overflow-hidden">
          {/* Fixed header: close button always visible on mobile when image is tall */}
          <div className="sticky top-0 left-0 right-0 z-10 flex shrink-0 justify-end p-4 md:absolute md:right-4 md:top-4 md:p-0">
            <button
              type="button"
              onClick={handleCloseLightbox}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
              aria-label="Close gallery preview"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex flex-1 min-h-0 items-center justify-center px-4 pb-6 md:px-4 md:py-4">
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-4"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-4"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            <div
              data-about-animate="zoom"
              className="flex h-full w-full max-w-5xl flex-col"
            >
              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black">
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="max-h-[75vh] w-full max-w-full object-contain md:max-h-[calc(100vh-7rem)] md:max-w-[calc(100vw-4rem)]"
                />
              </div>
              <div className="flex shrink-0 flex-col gap-2 bg-gradient-to-r from-[#111827] via-[#020617] to-[#111827] px-6 py-4 text-white border-t border-white/10">
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A1F88B]" />
                  <span className='font-["Inter"]'>{activeImage.category}</span>
                </div>
                <p className='text-sm font-semibold font-["Inter"]'>
                  {activeImage.label}
                </p>
                <p className='text-xs text-white/70 font-["Inter"]'>
                  {activeImage.alt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
