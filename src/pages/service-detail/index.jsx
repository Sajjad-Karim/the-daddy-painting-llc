import { useLayoutEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowUpRight,
  Phone,
  MapPin,
  Star,
  Facebook,
  Instagram,
} from "lucide-react";
import Header from "../../components/Header";
import { getServiceBySlug } from "../../data/services";
import detailHeroImage from "../../assets/detail-page/hero.png";
import secondSectionImage from "../../assets/detail-page/secondSection.png";
import detailThirdSectionBg from "../../assets/detail-page/thirdSection.png";
import fourthSectionImage from "../../assets/detail-page/fourth.png";
import skyVectorImage from "../../assets/vector.png";
import skyImage from "../../assets/sky.png";
import borderVectorImage from "../../assets/borderVector.png";
import leftSectionImage from "../../assets/leftimage.png";
import tickIcon from "../../assets/tick.png";
import interiorServiceImage from "../../assets/services/interior.png";
import exteriorServiceImage from "../../assets/services/exterior.png";
import cabinetServiceImage from "../../assets/services/cabnet.png";
import deckServiceImage from "../../assets/services/deck.png";
import powerWashServiceImage from "../../assets/services/5cc36eecc8cdae32a2898857854381d890492e4e.png";
import drywallServiceImage from "../../assets/services/drywall.png";
import freeEstimatesIcon from "../../assets/icons/freeestimates.png";
import yearsExperienceIcon from "../../assets/icons/yearsexperience.png";
import openIcon from "../../assets/icons/open.png";
import residentialIcon from "../../assets/icons/residential.png";
import fifthSectionBg from "../../assets/fifthSection.png";
import contactLogoImage from "../../assets/logo.png";
import googleImage from "../../assets/google.png";
import { CONTACT, SOCIAL } from "../../data/contact";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DURATION, EASE, STAGGER, TRIGGER } from "../../utils/gsapConfig";

const SERVICE_IMAGES = {
  interior: interiorServiceImage,
  exterior: exteriorServiceImage,
  cabinet: cabinetServiceImage,
  deck: deckServiceImage,
  powerWash: powerWashServiceImage,
  drywall: drywallServiceImage,
};

const DEFAULT_HERO_PILL = "#1 Interior Painting Specialists in South Carolina";
const DEFAULT_HERO_TITLE =
  "Expert Interior Painting Services in Easley & Greenville, SC";

gsap.registerPlugin(ScrollTrigger);

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  const handleCallNow = () => {
    window.location.href = CONTACT.phoneHref;
  };

  const handleRequestEstimate = () => {
    window.alert(
      "Thank you! Your free estimate request has been received. We'll contact you shortly.",
    );
  };
  const heroPill = service?.heroPill ?? DEFAULT_HERO_PILL;
  const heroTitle = service?.heroTitle ?? DEFAULT_HERO_TITLE;

  const heroPillRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const heroCardRef = useRef(null);
  const detailSecondHeadingRef = useRef(null);
  const detailSecondText0Ref = useRef(null);
  const detailSecondText1Ref = useRef(null);
  const detailSecondImageRef = useRef(null);
  const detailSecondTextRefs = [detailSecondText0Ref, detailSecondText1Ref];
  const detailThirdSectionRef = useRef(null);
  const detailFourthCardsRef = useRef(null);
  const detailStepCardsRef = useRef(null);
  const eighthLeftRef = useRef(null);
  const eighthFormRef = useRef(null);

  useLayoutEffect(() => {
    const detailCards = Array.from(
      document.querySelectorAll("[data-detail-card]"),
    );
    const detailCardContents = detailCards
      .map((card) =>
        card.querySelector("[data-detail-card-content]"),
      )
      .filter(Boolean);

    const detailStepCards = Array.from(
      document.querySelectorAll("[data-detail-step-card]"),
    );
    const detailStepCardContents = detailStepCards
      .map((card) =>
        card.querySelector("[data-detail-step-card-content]"),
      )
      .filter(Boolean);

    if (!detailCards.length && !detailStepCards.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      if (detailCards.length) {
        gsap.set(detailCards, {
          opacity: 1,
          y: 0,
          scale: 1,
        });
      }
      if (detailStepCards.length) {
        gsap.set(detailStepCards, {
          opacity: 1,
          y: 0,
          scale: 1,
        });
      }
      if (detailCardContents.length) {
        gsap.set(detailCardContents, {
          opacity: 1,
        });
      }
      if (detailStepCardContents.length) {
        gsap.set(detailStepCardContents, {
          opacity: 1,
        });
      }
      return;
    }

    const timelines = [];

    if (detailCards.length) {
      const detailCardsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: detailCards[0],
          start: TRIGGER.default,
          toggleActions: "restart none restart none",
        },
      });

      detailCardsTimeline.fromTo(
        detailCards,
        {
          opacity: 0,
          y: -150,
          scale: 0.98,
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
          ease: EASE.smooth,
          stagger: STAGGER.normal,
        },
      );

      if (detailCardContents.length) {
        detailCardsTimeline.fromTo(
          detailCardContents,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: DURATION.standard,
            ease: EASE.smooth,
            stagger: STAGGER.normal,
          },
          "<+=0.05",
        );
      }

      timelines.push(detailCardsTimeline);
    }

    if (detailStepCards.length) {
      const detailStepTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: detailStepCards[0],
          start: TRIGGER.default,
          toggleActions: "restart none restart none",
        },
      });

      detailStepTimeline.fromTo(
        detailStepCards,
        {
          opacity: 0,
          y: -150,
          scale: 0.98,
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
          ease: EASE.smooth,
          stagger: STAGGER.normal,
        },
      );

      if (detailStepCardContents.length) {
        detailStepTimeline.fromTo(
          detailStepCardContents,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: DURATION.standard,
            ease: EASE.smooth,
            stagger: STAGGER.normal,
          },
          "<+=0.05",
        );
      }

      timelines.push(detailStepTimeline);
    }

    return () => {
      timelines.forEach((timeline) => {
        if (timeline.scrollTrigger) {
          timeline.scrollTrigger.kill();
        }
        timeline.kill();
      });
    };
  }, []);

  return (
    <>
      <main
        className="relative min-h-[650px] md:min-h-[800px] overflow-hidden"
        style={{
          backgroundImage: `url(${detailHeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-12 pt-4 md:min-h-[1000px] md:pb-10 md:pt-4 lg:pt-4">
          <Header />

          <section className="mt-10 flex w-full flex-col items-center text-center md:mt-12">
            <div
              ref={heroPillRef}
              className="inline-flex max-w-xs items-center gap-2 rounded-sm bg-[#FFFFFF1A] px-6 mb-2 py-2 text-[10px] tracking-wide text-[#1F2933] shadow-sm backdrop-blur md:max-w-none md:text-base"
            >
              <span className='uppercase font-["Alexandria"]'>{heroPill}</span>
            </div>

            <h1
              ref={heroHeadingRef}
              className='text-center font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[35px] font-["Rubik_One"]'
            >
              {heroTitle}
            </h1>

            <div
              ref={heroButtonsRef}
              className="mt-6 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <button
                type="button"
                onClick={handleRequestEstimate}
                className="flex items-center justify-center gap-3 rounded-full bg-[#2D2928] px-7 py-3 text-sm font-semibold text-white shadow-lg cursor-pointer hover:bg-[#1F1B1A] hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02] sm:w-auto"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#039A02] text-white">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className='text-[#A1F88B] font-["Inter"]'>
                  Request Your Free Estimate
                </span>
              </button>

              <a
                href={CONTACT.phoneHref}
                className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#111827] shadow-md cursor-pointer hover:bg-[#F9FAFB] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02] sm:w-auto"
                aria-label="Call now"
              >
                <span className="font-['Alexandria'] font-light">Call Now</span>
                <span className='font-["Alexandria"] font-bold'>
                  {CONTACT.phoneDisplay}
                </span>
              </a>
            </div>
          </section>
        </div>

        <div
          ref={heroCardRef}
          className="pointer-events-auto absolute bottom-6 left-1/2 z-20 w-[90%] max-w-[360px] -translate-x-1/2 rounded-[26px] border border-white bg-[#FFFFFF1A] px-6 py-4 text-center text-xs text-white backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.45)] sm:px-8 sm:py-5 sm:text-sm md:bottom-28 md:left-auto md:right-12 md:w-auto md:max-w-[250px] md:-translate-x-0"
        >
          <p className='font-["Inter"] text-[#2D2928] text-xs leading-relaxed md:text-base'>
            Transform the look and feel of your home with flawless interior
            painting. Whether it’s a single room refresh or a complete home
            makeover, The Daddy's Painting LLC delivers smooth finishes, sharp
            lines, and a clean workspace guaranteed.
          </p>
        </div>
      </main>

      {/* Second section: We treat your home like our own */}
      <section className="relative bg-[#E1F8F2] pb-10 pt-10 md:pb-16 md:pt-16">
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

        <div className="relative mx-auto max-w-6xl px-4 pt-4">
          <div className="grid gap-6 text-[#2D2928] md:grid-cols-2 md:items-center md:gap-12">
            {/* Left column: title + paragraphs */}
            <div className="flex flex-col gap-6">
              <h2
                ref={detailSecondHeadingRef}
                className='font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[35px] font-["Rubik_One"] uppercase leading-tight'
              >
                WE TREAT YOUR
                <br />
                HOME LIKE OUR
                <br />
                OWN
              </h2>

              <p
                ref={detailSecondTextRefs[0]}
                className='text-left font-["Inter"] text-sm leading-relaxed text-[#2D2928] md:text-base'
              >
                We understand that inviting painters into your home requires
                trust. That is why our team prioritizes cleanliness and respect
                above all else. From protecting your floors to moving furniture
                with care, we treat every detail as if it were our own home.
              </p>

              <p
                ref={detailSecondTextRefs[1]}
                className='text-left font-["Inter"] text-sm leading-relaxed text-[#2D2928] md:text-base'
              >
                With over 6 years of experience serving families in Easley,
                Powdersville, and Greenville, we have mastered the art of
                preparation and application. We don&apos;t just paint walls; we
                create environments where you love to live.
              </p>
            </div>

            {/* Right column: rounded image */}
            <div
              className="flex justify-center md:justify-end"
              ref={detailSecondImageRef}
            >
              <img
                src={secondSectionImage}
                alt="Interior corner with painted wall, baseboard, and wood floor"
                className="w-full max-w-md rounded-[80px] object-cover shadow-lg md:max-w-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Third section: interior solutions - 2x2 cards + comprehensive card */}
      <div className="bg-[#E1F8F2]">
        <section
          className="relative min-h-[550px] flex flex-col items-center justify-center overflow-hidden rounded-tr-[80px] rounded-bl-[80px]  py-16 md:py-24 md:rounded-tr-[120px] md:rounded-bl-[120px]"
          style={{
            backgroundImage: `url(${detailThirdSectionBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            ref={detailThirdSectionRef}
            className="relative z-10 mx-auto max-w-6xl px-4"
          >
            <div className="grid gap-8 md:grid-cols-5 md:gap-10 md:items-stretch">
              {/* Left: 2x2 grid of dark service cards */}
              <div className="grid grid-cols-2 gap-4 md:col-span-3 md:gap-6">
                {[
                  {
                    title: "WALLS & CEILINGS",
                    tagline: "Smooth, uniform coverage using premium paints.",
                  },
                  {
                    title: "KITCHEN & BATHROOM",
                    tagline: "Smooth, uniform coverage using premium paints.",
                  },
                  {
                    title: "TRIM, DOORS & MOLDING",
                    tagline: "Smooth, uniform coverage using premium paints.",
                  },
                  {
                    title: "STAIRCASES & RAILINGS",
                    tagline: "Smooth, uniform coverage using premium paints.",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    data-detail-card
                    className="rounded-[24px] border border-white/20 bg-[#00000069] px-5 py-6 shadow-lg backdrop-blur-sm"
                  >
                    <div data-detail-card-content>
                      <h3 className='mb-2 text-sm font-extrabold uppercase   text-[#E9FFF7] md:text-base font-["inter"]'>
                        {card.title}
                      </h3>
                      <p className='text-xs leading-relaxed text-[#F9FAFB]/90 md:text-base font-["Inter"]'>
                        {card.tagline}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: large light comprehensive card */}
              <div className="md:col-span-2" data-detail-card>
                <div
                  data-detail-card-content
                  className="rounded-[28px] border border-white/40 bg-[#FFFFFF1A] px-6 py-8 shadow-xl backdrop-blur-md md:px-8 md:py-10"
                >
                  <h2 className='mb-4 font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[35px] font-["Rubik_One"] uppercase leading-tight'>
                    COMPREHENS
                    <br />
                    IVE INTERIOR
                    <br />
                    SOLUTIONS
                  </h2>
                  <p className='text-sm leading-relaxed text-[#2D2928] md:text-base font-["Inter"]'>
                    No detail is too small. Our interior services cover every
                    surface of your room to ensure a cohesive and professional
                    look.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Fourth section: Why neighbors choose */}
      <section className="relative bg-[#E1F8F2] pb-10 pt-10 md:pb-16 md:pt-16">
        <div className="mx-auto flex max-w-6xl flex-col justify-between md:flex-row">
          <div className="absolute -left-[0px] hidden h-full w-full overflow-hidden rounded-r-[60px] md:block md:h-[420px] md:w-[34%]">
            <img
              src={leftSectionImage}
              alt="Beautifully painted coastal home"
              className="h-full w-full object-cover object-[90%]"
            />
          </div>
          <div className="w-[30%]" />

          <div className="w-full px-4 py-6 md:w-[66%] md:px-12 md:py-8">
            <h2 className='mb-6 font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mb-8 md:mt-6 md:text-[35px] font-["Rubik_One"] leading-tight'>
              WHY NEIGHBORS CHOOSE THE DADDY&apos;S PAINTING LLC
            </h2>

            <div
              ref={detailFourthCardsRef}
              className="grid gap-4 md:grid-cols-3 md:gap-6"
            >
              {/* Card 1 */}
              <div
                data-detail-card
                className="rounded-[26px]  border-2 h-fit border-[#02B446]  px-5 py-6 shadow-sm"
              >
                <div data-detail-card-content>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center">
                      <img
                        src={tickIcon}
                        alt="Check mark"
                        className="h-5 w-5"
                      />
                    </span>
                    <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928]  font-["Inter"]'>
                      6+{" "}
                      <span className="font-extrabold">
                        YEARS OF EXCELLENCE
                      </span>
                    </h3>
                  </div>
                  <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                    We bring years of hands-on expertise to every job, ensuring
                    professional techniques and long-lasting results.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div
                data-detail-card
                className="rounded-[26px] border-2 h-fit border-[#02B446]  px-5 py-6 shadow-sm"
              >
                <div data-detail-card-content>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center">
                      <img
                        src={tickIcon}
                        alt="Check mark"
                        className="h-5 w-5"
                      />
                    </span>
                    <h3 className='text-base  uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"] font-extrabold'>
                      TRANSPARENT PRICING
                    </h3>
                  </div>
                  <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                    No hidden fees. We provide clear, free estimates so you know
                    exactly what to expect.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div
                data-detail-card
                className="rounded-[26px] border-2 h-fit border-[#02B446]  px-5 py-6 shadow-sm"
              >
                <div data-detail-card-content>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center">
                      <img
                        src={tickIcon}
                        alt="Check mark"
                        className="h-5 w-5"
                      />
                    </span>
                    <h3 className='text-base   uppercase  text-[#2D2928] font-["Inter"] font-extrabold'>
                      SERVING YOUR COMMUNITY
                    </h3>
                  </div>
                  <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                    From Powdersville to Laurens, we&apos;re the local painting
                    company committed to beautifying our South Carolina
                    neighborhoods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New section: 4-step interior painting process */}
      <section className="relative bg-[#E1F8F2] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12">
            {/* Left: image with rounded top-right and bottom-left */}
            <div className="flex justify-center md:justify-start">
              <img
                src={fourthSectionImage}
                alt="Interior room prepared for painting with protected floors and furniture"
                className="w-full max-w-lg rounded-4xl object-cover shadow-xl "
              />
            </div>

            {/* Right: title, intro, and 4 step boxes */}
            <div className="flex flex-col gap-6">
              <h2 className='font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[35px] font-["Rubik_One"] uppercase leading-tight'>
                OUR 4-STEP
                <br />
                INTERIOR
                <br />
                PAINTING PROCESS
              </h2>

              <p className='text-sm leading-relaxed text-[#2D2928] md:text-base font-["Inter"]'>
                A great paint job starts long before the brush touches the wall.
                Here is how we ensure quality results every time:
              </p>

              <div
                ref={detailStepCardsRef}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <div
                  data-detail-step-card
                  className="rounded-[20px] bg-[#039A02] px-5 py-5 shadow-md"
                >
                  <div data-detail-step-card-content>
                    <h3 className='mb-2 text-sm font-extrabold uppercase leading-tight text-white md:text-base font-["Rubik_One"]'>
                      PROTECTION FIRST
                    </h3>
                    <p className='text-xs leading-relaxed text-white/95 md:text-sm font-["Inter"]'>
                      We cover all furniture, mask floors, and tape off fixtures
                      to ensure not a single drop of paint lands where it
                      shouldn&apos;t.
                    </p>
                  </div>
                </div>

                <div
                  data-detail-step-card
                  className="rounded-[20px] bg-[#039A02] px-5 py-5 shadow-md"
                >
                  <div data-detail-step-card-content>
                    <h3 className='mb-2 text-sm font-extrabold uppercase leading-tight text-white md:text-base font-["Rubik_One"]'>
                      DETAILED PREP
                    </h3>
                    <p className='text-xs leading-relaxed text-white/95 md:text-sm font-["Inter"]'>
                      We fill nail holes, repair drywall cracks, sand rough
                      areas, and caulk gaps. A smooth surface is the secret to a
                      perfect finish.
                    </p>
                  </div>
                </div>

                <div
                  data-detail-step-card
                  className="rounded-[20px] bg-[#039A02] px-5 py-5 shadow-md"
                >
                  <div data-detail-step-card-content>
                    <h3 className='mb-2 text-sm font-extrabold uppercase leading-tight text-white md:text-base font-["Rubik_One"]'>
                      EXPERT APPLICATION
                    </h3>
                    <p className='text-xs leading-relaxed text-white/95 md:text-sm font-["Inter"]'>
                      Using professional rollers and sprayers, we apply
                      high-quality paint for consistent color and texture,
                      usually in two coats for durability.
                    </p>
                  </div>
                </div>

                <div
                  data-detail-step-card
                  className="rounded-[20px] bg-[#039A02] px-5 py-5 shadow-md"
                >
                  <div data-detail-step-card-content>
                    <h3 className='mb-2 text-sm font-extrabold uppercase leading-tight text-white md:text-base font-["Rubik_One"]'>
                      CLEAN UP &amp; WALKTHROUGH
                    </h3>
                    <p className='text-xs leading-relaxed text-white/95 md:text-sm font-["Inter"]'>
                      We clean up our workspace daily. Once finished, we walk
                      through the job with you to ensure your 100% satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fifth section: marquee strip */}
      <section className="relative overflow-hidden border-y border-white bg-[#02A11F] py-3">
        <div className="absolute inset-0 pointer-events-none" />
        <div className="mx-auto max-w-full">
          <div className="marquee-horizontal">
            {Array.from({ length: 8 }).map((_, index) => (
              <span
                key={index}
                className='mx-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-white font-["Alexandria"]'
              >
                Top-rated painters in{" "}
                <span className="font-extrabold text-white">
                  Easley &amp; Greenville, SC
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Sixth section */}
      <section
        className="relative overflow-hidden"
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
            alt="Paint stroke sky pattern"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-10 pt-6 md:pt-4 lg:pt-4">
          <section className="mt-10 flex w-full flex-col items-center text-center">
            <h1 className='mt-6 text-center font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[35px] font-["Rubik_One"] leading-tight'>
              Proudly Serving Easley, SC & Surrounding Areas.
            </h1>
            <p className='max-w-xl text-sm text-[#2D2928] md:text-base font-["Inter"]'>
              We are ready to work on your residential or commercial project.
              Our service area covers a wide radius including Easley,
              Greenville, Spartanburg, Slater-Marietta, Greer, Laurens,
              Powdersville, and Clemson.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/gallery"
                className="flex items-center gap-2 rounded-full bg-[#039A02] px-8 py-3 text-sm font-semibold text-white shadow-md cursor-pointer hover:bg-[#02A11F] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
              >
                <span className='font-["Alexandria"] text-white'>
                  View Our Gallery
                </span>
              </Link>
            </div>
          </section>
        </div>
      </section>

      {/* Seventh section: decorative image strip */}
      <section className="relative overflow-hidden bg-[#E1F8F2]">
        <img
          src={fifthSectionBg}
          alt="Decorative paint texture"
          className="block w-full object-cover"
        />
      </section>

      {/* Eighth section: contact + estimate form */}
      <section className="relative bg-[#E1F8F2] pb-10 pt-10 md:pb-24 md:pt-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:gap-24 lg:flex-row lg:items-start">
          <div ref={eighthLeftRef} className="w-full lg:w-1/2">
            <div className="flex flex-col items-center space-y-6 text-center md:items-start md:text-left">
              <div className="flex justify-center md:justify-start">
                <img
                  src={contactLogoImage}
                  alt="The Daddy's Painting LLC logo"
                  className="h-36 w-50"
                />
              </div>

              <div className="space-y-3">
                <h2 className='mx-auto font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-left md:text-[35px] font-["Rubik_One"] leading-tight'>
                  PROFESSIONAL RESIDENTIAL &amp; COMMERCIAL PAINTING SERVICES
                  YOU CAN TRUST.
                </h2>
                <p className='text-sm text-[#2D2928] md:text-base font-["Inter"]'>
                  Top-rated painters in{" "}
                  <span className="font-bold">Easley &amp; Greenville, SC</span>
                </p>
              </div>

              <div className="flex flex-col items-center space-y-1 md:items-start">
                <div className="flex items-center gap-1">
                  <span className="mt-1 flex h-8 w-8 items-center justify-center text-[#039A02]">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="">{CONTACT.phoneDisplay}</p>
                </div>

                <div className="flex items-center gap-1">
                  <span className="mt-1 flex h-8 w-8 items-center justify-center text-[#039A02]">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="">Easley, SC &amp; Surrounding Areas</p>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <img
                  src={googleImage}
                  alt="Google logo"
                  className="h-5 w-auto md:h-6"
                />
                <p className='text-xs font-bold text-[#2D2928] md:text-base font-["Inter"]'>
                  5.0 Verified Customer Reviews <span>|</span>
                </p>
                <div className="flex items-center gap-1 text-[#02A11F]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-3.5 w-3.5 fill-[#02A11F] text-[#02A11F]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                <button
                  type="button"
                  onClick={handleCallNow}
                  className="flex cursor-pointer items-center gap-3 rounded-[10px] bg-[#039A02] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#02A11F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className='font-["Alexandria"]'>
                    Call Now: <span className="font-bold">{CONTACT.phoneDisplay}</span>
                  </span>
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={SOCIAL.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-1 border-[#2D2928] text-[#2D2928] hover:border-[#039A02] hover:bg-[#039A02]/10 hover:text-[#039A02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02] transition-all"
                    aria-label="Visit our Facebook page"
                  >
                    <Facebook className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-1 border-[#2D2928] text-[#2D2928] hover:border-[#039A02] hover:bg-[#039A02]/10 hover:text-[#039A02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02] transition-all"
                    aria-label="Visit our Instagram profile"
                  >
                    <Instagram className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div
              ref={eighthFormRef}
              className="relative md:mt-24 mx-auto max-w-md rounded-[40px] bg-[#2D2928] px-7 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.45)] md:max-w-none md:px-10 md:py-10"
            >
              <h3 className='mb-6 text-base font-semibold leading-snug text-white sm:text-lg md:text-[50px] font-["inter"]'>
                Contact The Daddy&apos;s Painting LLC today for a free,
                no-obligation estimate.
              </h3>

              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRequestEstimate();
                }}
              >
                {["Full Name", "Phone Number", "Email", "Message"].map(
                  (label) => (
                    <div key={label} className="space-y-1">
                      <label
                        htmlFor={label.toLowerCase().replace(/\s+/g, "-")}
                        className='block text-xs font-medium text-white/80 md:text-base font-["Inter"]'
                      >
                        {label}
                      </label>
                      {label === "Message" ? (
                        <textarea
                          id={label.toLowerCase().replace(/\s+/g, "-")}
                          rows={3}
                          className="w-full border-b border-white/40 bg-transparent pb-1 text-sm text-white placeholder:text-white/40 md:text-base focus-visible:outline-none"
                        />
                      ) : (
                        <input
                          id={label.toLowerCase().replace(/\s+/g, "-")}
                          type="text"
                          className="w-full border-b border-white/40 bg-transparent pb-1 text-sm text-white placeholder:text-white/40 md:text-base focus-visible:outline-none"
                        />
                      )}
                    </div>
                  ),
                )}
              </form>

              <button
                type="submit"
                className="mt-6 flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#02A11F] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#039A02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#02A11F] transition-all"
              >
                <span className='font-["Alexandria"] text-white'>
                  Request Free Estimate
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
