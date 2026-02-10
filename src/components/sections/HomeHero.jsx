import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Header from "../Header";
import skyVectorImage from "../../assets/vector.png";
import skyImage from "../../assets/sky.png";
import heroHouseImage from "../../assets/home.png";
import mobileHomeImage from "../../assets/mobileHome.png";

gsap.registerPlugin(ScrollTrigger);

const HomeHero = ({
  heroPillRef,
  heroHeadingRef,
  heroButtonsRef,
  heroCardRef,
  onRequestEstimate,
}) => {
  const heroHouseRef = useRef(null);

  useEffect(() => {
    if (!heroHouseRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(heroHouseRef.current, { y: 0 });
      return;
    }

    const animation = gsap.to(heroHouseRef.current, {
      y: 90,
      ease: "none",
      scrollTrigger: {
        trigger: heroHouseRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, []);

  return (
    <main
      className="relative min-h-[600px] md:min-h-[800px] overflow-hidden"
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

      <div
        aria-hidden="true"
        data-hero-house
        ref={heroHouseRef}
        className="pointer-events-none absolute inset-x-0 bottom-[0px] z-0 flex justify-center md:-bottom-0"
      >
        <img
          src={mobileHomeImage}
          alt="Painted home exterior"
          className="h-auto w-full object-contain drop-shadow-2xl md:hidden"
        />
        <img
          src={heroHouseImage}
          alt="Painted home exterior"
          className="hidden h-auto w-full object-contain drop-shadow-2xl md:block"
        />
      </div>

      <div className="relative mx-auto flex md:min-h-[1000px] max-w-6xl flex-col items-center px-4 pb-12 pt-4 md:pb-10 md:pt-4 lg:pt-4">
        <Header />

        <section className="mt-10 flex w-full flex-col items-center text-center md:mt-12">
          <div
            ref={heroPillRef}
            className="inline-flex max-w-xs items-center gap-2 rounded-md bg-[#FFFFFF1A] px-6 mb-2 py-2 text-[9px] tracking-wide text-[#1F2933] shadow-sm backdrop-blur md:max-w-none md:text-base"
          >
            <span className='uppercase font-["Alexandria"]'>
              Top-rated painters in{" "}
              <span className="font-bold">Easley &amp; Greenville, </span>SC
            </span>
          </div>

          <h1
            ref={heroHeadingRef}
            className='text-center font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[45px] font-["Rubik_One"] leading-tight'
          >
            PROFESSIONAL RESIDENTIAL &amp; COMMERCIAL PAINTING SERVICES YOU CAN
            TRUST.
          </h1>

          <div
            ref={heroButtonsRef}
            className="mt-6 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <button
              type="button"
              onClick={onRequestEstimate}
              className="flex items-center justify-center gap-3 rounded-full bg-[#2D2928] px-7 py-3 text-sm font-semibold text-white shadow-lg cursor-pointer hover:bg-[#1F1B1A] hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02] sm:w-auto"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#039A02] text-white">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className='text-[#A1F88B] font-["Inter"]'>
                Get a Free Estimate
              </span>
            </button>

            <Link
              to="/gallery"
              className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#111827] shadow-md cursor-pointer hover:bg-[#F9FAFB] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02] sm:w-auto"
              aria-label="View our gallery"
            >
              <span className='font-["Alexandria"]'>View Our Gallery</span>
            </Link>
          </div>
        </section>
      </div>

      <div
        ref={heroCardRef}
        className="pointer-events-auto absolute bottom-2 left-0 right-0 z-20 mx-auto w-[90%] max-w-[360px] rounded-[10px] border border-white bg-[#FFFFFF1A] px-2 py-2 text-center text-xs text-white backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.45)] sm:px-8 sm:py-5 sm:text-sm md:bottom-28 md:left-auto md:right-12 md:mx-0 md:w-auto md:max-w-[250px]"
      >
        <p className='font-["Inter"] text-[10px]  md:text-xs leading-relaxed'>
          Transform your property with{" "}
          <span className='font-["Alexandria"] font-semibold'>
            The Daddy&apos;s Painting LLC.
          </span>{" "}
          With over 6 years of experience, we deliver flawless finishes for
          homes and businesses across{" "}
          <span className='font-["Inter"] font-semibold'>
            Easley, Greenville, Spartanburg, and surrounding areas.
          </span>
        </p>
      </div>
    </main>
  );
};

export default HomeHero;
