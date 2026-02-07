import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { initAboutScrollAnimations, cleanupScrollAnimations } from "../../utils/scrollAnimations";

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

  useEffect(() => {
    let refreshTimer;
    const timer = setTimeout(() => {
      initAboutScrollAnimations({
        aboutRootRef: rootRef,
      });
      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }, 400);

    return () => {
      clearTimeout(timer);
      clearTimeout(refreshTimer);
      cleanupScrollAnimations();
    };
  }, []);

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
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <img src={skyVectorImage} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-12 pt-4 md:min-h-[500px] md:pb-10 md:pt-4">
          <Header />

          <section className="mt-10 flex w-full flex-col items-center text-center md:mt-12">
            <div
              data-about-animate="fade-down"
              className='inline-flex max-w-xs items-center gap-2 rounded-md bg-[#FFFFFF1A] px-6 py-2 text-[10px] tracking-wide text-[#1F2933] shadow-sm backdrop-blur md:max-w-none md:text-base'
            >
              <span className='uppercase font-["Alexandria"]'>
                The Daddy&apos;s Painting LLC
              </span>
            </div>
            <h1
              data-about-animate="zoom"
              className='mt-4 text-center font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[45px] font-["Rubik_One"] leading-tight'
            >
              PROJECT GALLERY
            </h1>
            <p
              data-about-animate="fade-up"
              className='mt-4 max-w-2xl text-sm leading-relaxed text-[#2D2928] font-["Inter"] md:text-base'
            >
              Explore a selection of our recent interior, exterior, cabinet, deck, fence, and commercial projects—designed to give you
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
                onClick={() => handleOpenLightbox(index)}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-[26px] bg-[#111827] text-left shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ willChange: "transform" }}
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

                <div className="absolute right-3 top-3 rounded-full bg-black/50 p-1.5 text-white opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
                  <ImageIcon className="h-4 w-4" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4 py-6">
          <button
            type="button"
            onClick={handleCloseLightbox}
            className="absolute right-4 top-4 rounded-sm inline-flex h-9 w-9 items-center justify-center bg-white/10 text-white hover:bg-white/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close gallery preview"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/10 text-white hover:bg-white/20 cursor-pointer focus-visible:outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 rounded-sm items-center justify-center bg-white/10 text-white hover:bg-white/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <div
            data-about-animate="zoom"
            className="flex w-full max-w-5xl flex-col"
          >
            <div className="relative w-full bg-black max-h-[80vh] flex items-center justify-center">
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="max-h-[80vh] w-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-2 bg-gradient-to-r from-[#111827] via-[#020617] to-[#111827] px-6 py-4 text-white border-t border-white/10">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A1F88B]" />
                <span className='font-["Inter"]'>{activeImage.category}</span>
              </div>
              <p className='text-sm font-semibold font-["Inter"]'>{activeImage.label}</p>
              <p className='text-xs text-white/70 font-["Inter"]'>
                {activeImage.alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

