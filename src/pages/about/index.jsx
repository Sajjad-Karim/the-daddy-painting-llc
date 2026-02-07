import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../../components/Header";
import skyVectorImage from "../../assets/vector.png";
import skyImage from "../../assets/sky.png";
import borderVectorImage from "../../assets/borderVector.png";
import leftSectionImage from "../../assets/leftimage.png";
import tickIcon from "../../assets/tick.png";
import freeEstimatesIcon from "../../assets/icons/freeestimates.png";
import yearsExperienceIcon from "../../assets/icons/yearsexperience.png";
import openIcon from "../../assets/icons/open.png";
import residentialIcon from "../../assets/icons/residential.png";
import ContactSection from "../../components/sections/ContactSection";
import {
  initAboutScrollAnimations,
  cleanupScrollAnimations,
} from "../../utils/scrollAnimations";

const About = () => {
  const aboutRootRef = useRef(null);
  const aboutStoryRef = useRef(null);
  const aboutStoryText0Ref = useRef(null);
  const aboutStoryText1Ref = useRef(null);
  const aboutStoryImageRef = useRef(null);
  const aboutCommitmentRef = useRef(null);
  const aboutCommitmentText0Ref = useRef(null);
  const aboutCommitmentText1Ref = useRef(null);
  const aboutValuesRef = useRef(null);
  const aboutFeatureCardsRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const eighthLeftRef = useRef(null);
  const eighthFormRef = useRef(null);

  useEffect(() => {
    let refreshTimer;
    const timer = setTimeout(() => {
      initAboutScrollAnimations({
        aboutRootRef,
        aboutStoryRef,
        aboutStoryTextRefs: [aboutStoryText0Ref, aboutStoryText1Ref],
        aboutStoryImageRef,
        aboutCommitmentRef,
        aboutCommitmentTextRefs: [
          aboutCommitmentText0Ref,
          aboutCommitmentText1Ref,
        ],
        aboutValuesRef,
        aboutFeatureCardsRefs,
        eighthLeftRef,
        eighthFormRef,
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

  return (
    <div ref={aboutRootRef}>
      {/* Hero section */}
      <main
        className="relative overflow-hidden md:min-h-[550px]"
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
              data-about-animate="zoom"
              className='mt-4 text-center font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[45px] font-["Rubik_One"] leading-tight'
            >
              ABOUT US
            </h1>
            <p
              data-about-animate="fade-up"
              className='mt-4 max-w-2xl text-sm leading-relaxed text-[#2D2928] font-["Inter"] md:text-base'
            >
              Building trust through quality craftsmanship, attention to detail,
              and genuine care for every home and business we serve across
              Easley, Greenville, and surrounding South Carolina communities.
            </p>
          </section>
        </div>
      </main>

      {/* Company Story section */}
      <section className="relative bg-[#E1F8F2] pb-10 pt-10 md:pb-16 md:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-[40px] z-0"
        >
          <img
            src={borderVectorImage}
            alt=""
            className="h-80 w-full object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-4">
          <div className="grid gap-6 text-[#2D2928] md:grid-cols-2 md:items-center md:gap-12">
            {/* Left column: title + paragraphs */}
            <div className="flex flex-col gap-6">
              <h2
                ref={aboutStoryRef}
                data-about-animate="fade-left"
                className='font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[45px] font-["Rubik_One"] uppercase leading-tight'
              >
                OUR STORY
              </h2>

              <p
                ref={aboutStoryText0Ref}
                data-about-animate="fade-up"
                className='text-left font-["Inter"] text-sm leading-relaxed text-[#2D2928] md:text-base'
              >
                The Daddy&apos;s Painting LLC was founded with a simple mission:
                to bring exceptional painting services to families and
                businesses throughout South Carolina. What started as a passion
                for transforming spaces has grown into a trusted local business
                serving Easley, Greenville, Powdersville, and surrounding areas.
              </p>

              <p
                ref={aboutStoryText1Ref}
                data-about-animate="fade-up"
                className='text-left font-["Inter"] text-sm leading-relaxed text-[#2D2928] md:text-base'
              >
                Over the past 6+ years, we&apos;ve built our reputation on
                reliability, craftsmanship, and a genuine commitment to treating
                every project as if it were our own home. We understand that
                inviting painters into your space requires trust—and we work
                hard every day to earn and maintain that trust.
              </p>
            </div>

            {/* Right column: rounded image */}
            <div
              data-about-animate="fade-right"
              className="flex justify-center md:justify-end"
              ref={aboutStoryImageRef}
            >
              <img
                src={leftSectionImage}
                alt="Beautifully painted home exterior"
                data-about-animate="zoom"
                className="w-full max-w-md rounded-[20px] object-cover shadow-lg md:max-w-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Commitment to Quality section */}
      <section className="relative bg-[#E1F8F2] pb-10 pt-6 md:pb-16 md:pt-4">
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="grid gap-6 text-[#2D2928] md:grid-cols-2 md:items-center md:gap-12">
            {/* Left column: image */}
            <div
              data-about-animate="fade-left"
              className="flex justify-center md:justify-start order-2 md:order-1"
            >
              <img
                src={leftSectionImage}
                alt="Professional painting work"
                data-about-animate="zoom"
                className="w-full max-w-md rounded-[20px] object-cover shadow-lg md:max-w-lg"
              />
            </div>

            {/* Right column: content */}
            <div className="flex flex-col gap-6 order-1 md:order-2">
              <h2
                ref={aboutCommitmentRef}
                data-about-animate="fade-right"
                className='font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[45px] font-["Rubik_One"] uppercase leading-tight'
              >
                COMMITMENT TO QUALITY &amp; DETAIL
              </h2>

              <p
                ref={aboutCommitmentText0Ref}
                data-about-animate="fade-up"
                className='text-left font-["Inter"] text-sm leading-relaxed text-[#2D2928] md:text-base'
              >
                We believe that exceptional painting starts long before the
                brush touches the wall. Our commitment to quality means
                meticulous preparation, premium materials, and attention to
                every detail—from protecting your floors and furniture to
                ensuring crisp, clean lines and flawless finishes.
              </p>

              <p
                ref={aboutCommitmentText1Ref}
                data-about-animate="fade-up"
                className='text-left font-["Inter"] text-sm leading-relaxed text-[#2D2928] md:text-base'
              >
                Customer satisfaction isn&apos;t just our goal—it&apos;s our
                standard. We take pride in delivering results that exceed
                expectations, and we stand behind our work with a commitment to
                excellence that has earned us 5.0-star reviews from satisfied
                customers across the Upstate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Expertise section */}
      <section className="relative bg-[#E1F8F2] pb-10 pt-6 md:pb-16 md:pt-4">
        <div className="relative mx-auto max-w-6xl px-4">
          <h2
            data-about-animate="zoom"
            className='mb-6 text-center font-bold text-[#2D2928] sm:text-3xl md:mb-12 md:text-[40px] font-["Rubik_One"] uppercase leading-tight'
          >
            Experience &amp; Expertise
          </h2>

          {/* Feature cards grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {/* Free Estimates */}
            <div
              ref={aboutFeatureCardsRefs[0]}
              data-about-animate="card"
              className="relative flex flex-col items-center justify-between rounded-[24px] border border-white/40 bg-[#FFFFFF1A] px-6 py-6 text-center shadow-sm backdrop-blur-md"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-between px-6 opacity-40"
              >
                <span className="h-12 w-px -translate-y-3 rotate-[-35deg] border border-[#CDEFE4]" />
                <span className="h-12 w-px -translate-y-3 rotate-[35deg] border border-[#CDEFE4]" />
              </div>
              <img
                src={freeEstimatesIcon}
                alt="Free estimates icon"
                data-about-animate="zoom"
                className="mb-4 h-10 w-10 object-contain"
              />
              <p className='font-["Alexandria"] text-xs tracking-wide text-[#2D2928]'>
                FREE <span className="font-bold">ESTIMATES</span>
              </p>
            </div>

            {/* 6+ Years Experience */}
            <div
              ref={aboutFeatureCardsRefs[1]}
              data-about-animate="card"
              className="relative flex flex-col items-center justify-between rounded-[24px] border border-white/40 bg-[#FFFFFF1A] px-6 py-6 text-center shadow-sm backdrop-blur-md"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-between px-6 opacity-40"
              >
                <span className="h-12 w-px -translate-y-3 rotate-[-35deg] border border-[#CDEFE4]" />
                <span className="h-12 w-px -translate-y-3 rotate-[35deg] border border-[#CDEFE4]" />
              </div>
              <img
                src={yearsExperienceIcon}
                alt="Years of experience icon"
                data-about-animate="zoom"
                className="mb-4 h-10 w-10 object-contain"
              />
              <p className='font-["Alexandria"] text-xs tracking-wide text-[#2D2928]'>
                6+ YEARS <span className="font-bold">EXPERIENCE</span>
              </p>
            </div>

            {/* Open 7 Days a Week */}
            <div
              ref={aboutFeatureCardsRefs[2]}
              data-about-animate="card"
              className="relative flex flex-col items-center justify-between rounded-[24px] border border-white/40 bg-[#FFFFFF1A] px-6 py-6 text-center shadow-sm backdrop-blur-md"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-between px-6 opacity-40"
              >
                <span className="h-12 w-px -translate-y-3 rotate-[-35deg] border border-[#CDEFE4]" />
                <span className="h-12 w-px -translate-y-3 rotate-[35deg] border border-[#CDEFE4]" />
              </div>
              <img
                src={openIcon}
                alt="Open 7 days a week icon"
                data-about-animate="zoom"
                className="mb-4 h-10 w-10 object-contain"
              />
              <p className='font-["Alexandria"] text-xs tracking-wide text-[#2D2928]'>
                OPEN <span className="font-bold">7 DAYS A WEEK</span>
              </p>
            </div>

            {/* Residential & Commercial */}
            <div
              ref={aboutFeatureCardsRefs[3]}
              data-about-animate="card"
              className="relative flex flex-col items-center justify-between rounded-[24px] border border-white/40 bg-[#FFFFFF1A] px-6 py-6 text-center shadow-sm backdrop-blur-md"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-between px-6 opacity-40"
              >
                <span className="h-12 w-px -translate-y-3 rotate-[-35deg] border border-[#CDEFE4]" />
                <span className="h-12 w-px -translate-y-3 rotate-[35deg] border border-[#CDEFE4]" />
              </div>
              <img
                src={residentialIcon}
                alt="Residential and commercial icon"
                data-about-animate="zoom"
                className="mb-4 h-10 w-10 object-contain"
              />
              <p className='font-["Alexandria"] text-xs font-bold tracking-wide text-[#2D2928]'>
                RESIDENTIAL &amp; <span className="font-bold">COMMERCIAL</span>
              </p>
            </div>
          </div>

          {/* Expertise description */}
          <div className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
            <div
              data-about-animate="card"
              className="rounded-[26px] border-2 border-[#02B446] px-5 py-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center">
                  <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                </span>
                <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"]'>
                  <span className="font-extrabold">RESIDENTIAL EXPERTISE</span>
                </h3>
              </div>
              <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                From single-room refreshes to whole-house repaints, we bring
                professional techniques and premium materials to every
                residential project. We understand that your home is your
                sanctuary, and we treat it with the respect and care it
                deserves.
              </p>
            </div>

            <div
              data-about-animate="card"
              className="rounded-[26px] border-2 border-[#02B446] px-5 py-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center">
                  <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                </span>
                <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"]'>
                  <span className="font-extrabold">COMMERCIAL PROJECTS</span>
                </h3>
              </div>
              <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                We work with businesses across Easley, Greenville, and
                surrounding areas to maintain professional appearances and
                protect property value. Our commercial painting services are
                designed to minimize disruption while delivering lasting
                results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Core Values section */}
      <section className="relative bg-[#E1F8F2] pb-10 pt-6 md:pb-16 md:pt-4">
        <div className="relative mx-auto max-w-6xl px-4">
          <h2
            ref={aboutValuesRef}
            data-about-animate="zoom"
            className='mb-6 text-center font-bold text-[#2D2928] sm:text-3xl md:mb-12 md:text-[40px] font-["Rubik_One"] uppercase leading-tight'
          >
            Our Mission &amp; Core Values
          </h2>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            <div
              data-about-animate="card"
              className="rounded-[26px] border-2 border-[#02B446] px-5 py-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center">
                  <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                </span>
                <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"]'>
                  <span className="font-extrabold">QUALITY FIRST</span>
                </h3>
              </div>
              <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                We never cut corners. Every project receives the same level of
                attention to detail, from surface preparation to final cleanup.
              </p>
            </div>

            <div
              data-about-animate="card"
              className="rounded-[26px] border-2 border-[#02B446] px-5 py-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center">
                  <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                </span>
                <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"]'>
                  <span className="font-extrabold">CUSTOMER FOCUS</span>
                </h3>
              </div>
              <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                Your satisfaction is our priority. We listen, communicate
                clearly, and work around your schedule to deliver results that
                exceed expectations.
              </p>
            </div>

            <div
              data-about-animate="card"
              className="rounded-[26px] border-2 border-[#02B446] px-5 py-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center">
                  <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                </span>
                <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"]'>
                  <span className="font-extrabold">INTEGRITY</span>
                </h3>
              </div>
              <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                Honest pricing, transparent communication, and reliable service.
                We build lasting relationships through trust and respect.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactSection
        leftRef={eighthLeftRef}
        formRef={eighthFormRef}
        sectionClassName="relative bg-[#E1F8F2] pb-24 pt-10"
        leftColumnAttrs={{ "data-about-animate": "fade-left" }}
        logoAttrs={{ "data-about-animate": "zoom" }}
        headingAttrs={{ "data-about-animate": "fade-up" }}
        subheadingAttrs={{ "data-about-animate": "fade-up" }}
        callButtonAttrs={{ "data-about-animate": "zoom" }}
        formDataAttrs={{ "data-about-animate": "fade-right" }}
        buttonDataAttrs={{ "data-about-animate": "zoom" }}
      />
    </div>
  );
};

export default About;
