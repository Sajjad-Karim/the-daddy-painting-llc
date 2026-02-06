import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Phone,
  MapPin,
  Star,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import Header from "../../components/Header";
import { SERVICES } from "../../data/services";
import skyVectorImage from "../../assets/vector.png";
import skyImage from "../../assets/sky.png";
import heroHouseImage from "../../assets/home.png";
import borderVectorImage from "../../assets/borderVector.png";
import thirdSectionBg from "../../assets/thirdSectionBg.png";
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
import aiIcon from "../../assets/start.png";
import {
  initScrollAnimations,
  cleanupScrollAnimations,
} from "../../utils/scrollAnimations";

const SERVICE_IMAGES = {
  interior: interiorServiceImage,
  exterior: exteriorServiceImage,
  cabinet: cabinetServiceImage,
  deck: deckServiceImage,
  powerWash: powerWashServiceImage,
  drywall: drywallServiceImage,
};

const Home = () => {
  // Hero section refs
  const heroPillRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const heroCardRef = useRef(null);

  // Second section refs
  const secondHeadingRef = useRef(null);
  const secondTextRefs = [useRef(null), useRef(null)];
  const featureCardsRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Third section: service cards refs (for scroll animations only)
  const servicesGridRef = useRef(null);
  const serviceCardsRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Fourth section refs
  const fourthHeadingRef = useRef(null);
  const benefitCardsRefs = [useRef(null), useRef(null), useRef(null)];

  // Sixth section refs
  const sixthHeadingRef = useRef(null);

  // Eighth section refs
  const eighthLeftRef = useRef(null);
  const eighthFormRef = useRef(null);

  const handleCallNow = () => {
    window.location.href = "tel:+18644512806";
  };

  const handleRequestEstimateClick = () => {
    window.alert(
      "Thank you! Your free estimate request has been received. We'll contact you shortly.",
    );
  };

  const handleOpenChat = () => {
    if (window.__openChatWidget) {
      window.__openChatWidget();
    }
  };

  useEffect(() => {
    let refreshTimer;
    const timer = setTimeout(() => {
      const refs = {
        heroPillRef,
        heroHeadingRef,
        heroButtonsRef,
        heroCardRef,
        secondHeadingRef,
        secondTextRefs,
        featureCardsRefs,
        servicesGridRef,
        serviceCardsRefs,
        fourthHeadingRef,
        benefitCardsRefs,
        sixthHeadingRef,
        eighthLeftRef,
        eighthFormRef,
      };

      initScrollAnimations(refs);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(refreshTimer);
      cleanupScrollAnimations();
    };
  }, []);

  return (
    <>
      <main
        className="relative min-h-[600px] md:min-h-[800px] overflow-hidden"
        style={{
          backgroundImage: `url(${skyImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Sky texture and lines over the background image */}
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

        {/* House image anchored to bottom, full width */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 md:-bottom-0 bottom-[44px] z-0 flex justify-center"
        >
          <img
            data-hero-house
            src={heroHouseImage}
            alt="Painted home exterior"
            className="h-auto w-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Hero content including header */}
        <div className="relative mx-auto flex md:min-h-[1000px] max-w-6xl flex-col items-center px-4 pb-12 pt-4 md:pb-10 md:pt-4 lg:pt-4">
          <Header />

          {/* Hero body */}
          <section className="mt-8 flex w-full flex-col items-center text-center md:mt-10">
            {/* Top-rated pill */}
            <div
              ref={heroPillRef}
              className="inline-flex max-w-xs items-center gap-2 rounded-md bg-[#FFFFFF1A] px-6 mb-2 py-2 text-[9px] tracking-wide text-[#1F2933] shadow-sm backdrop-blur md:max-w-none md:text-base"
            >
              <span className='uppercase font-["Alexandria"]'>
                Top-rated painters in{" "}
                <span className="font-bold">Easley &amp; Greenville, </span>SC
              </span>
            </div>

            {/* Main heading */}
            <h1
              ref={heroHeadingRef}
              className='text-center font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[45px] font-["Rubik_One"] leading-tight'
            >
              PROFESSIONAL RESIDENTIAL &amp; COMMERCIAL PAINTING SERVICES YOU
              CAN TRUST.
            </h1>

            {/* CTA buttons */}
            <div
              ref={heroButtonsRef}
              className="mt-6 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              {/* Primary CTA: matches header pill style */}
              <button
                type="button"
                onClick={handleRequestEstimateClick}
                className="flex items-center justify-center gap-3 rounded-full bg-[#2D2928] px-7 py-3 text-sm font-semibold text-white shadow-lg cursor-pointer hover:bg-[#1F1B1A] hover:shadow-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02] sm:w-auto"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#039A02] text-white">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className='text-[#A1F88B] font-["Inter"]'>
                  Get a Free Estimate
                </span>
              </button>

              {/* Secondary CTA */}
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

        {/* Right-bottom transform card */}
        <div
          ref={heroCardRef}
          className="pointer-events-auto absolute bottom-6 left-1/2 z-20 w-[90%] max-w-[360px] -translate-x-1/2 rounded-[26px] border border-white bg-[#FFFFFF1A] px-6 py-4 text-center text-xs text-white backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.45)] sm:px-8 sm:py-5 sm:text-sm md:bottom-28 md:left-auto md:right-12 md:w-auto md:max-w-[250px] md:-translate-x-0"
        >
          <p className='font-["Inter"] text-sm leading-relaxed'>
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

      {/* Second section: intro copy + feature cards */}
      <section id="about" className="relative bg-[#E1F8F2] pb-16 pt-16">
        {/* Top wave border */}
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
          <div className="grid gap-10 text-[#2D2928] md:grid-cols-3">
            <div>
              <h2
                ref={secondHeadingRef}
                className='font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[45px] font-["Rubik_One"] leading-tight'
              >
                BRINGING <span className="text-[#039A02]">COLOR</span> AND
                QUALITY TO SOUTH CAROLINA LIVING.
              </h2>
            </div>

            <p
              ref={secondTextRefs[0]}
              className='font-["Inter"] text-base md:text-lg leading-relaxed'
            >
              At The Daddy&apos;s Painting LLC, we believe a fresh coat of paint
              does more than just cover a wall—it revitalizes your entire space.
              Whether you need a full exterior makeover in Greer or a detailed
              kitchen cabinet refresh in Clemson, our dedicated team treats
              every project with the utmost care.
            </p>

            <p
              ref={secondTextRefs[1]}
              className='font-["Inter"] text-base md:text-lg leading-relaxed'
            >
              We are open Monday through Sunday, 8:00 AM to 7:00 PM, ensuring we
              work around your schedule to deliver reliable, on-time, and clean
              results.
            </p>
          </div>

          {/* Feature cards */}
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {/* Free Estimates */}
            <div
              ref={featureCardsRefs[0]}
              className="relative flex flex-col items-center justify-between rounded-[24px] border border-white/40 bg-[#FFFFFF1A] px-6 py-6 text-center shadow-sm backdrop-blur-md"
            >
              {/* Envelope diagonals */}
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
                className="mb-4 h-10 w-10 object-contain"
              />
              <p className='font-["Alexandria"] text-xs  tracking-wide text-[#2D2928]'>
                FREE <span className="font-bold">ESTIMATES</span>
              </p>
            </div>

            {/* 6+ Years Experience */}
            <div
              ref={featureCardsRefs[1]}
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
                className="mb-4 h-10 w-10 object-contain"
              />
              <p className='font-["Alexandria"] text-xs font tracking-wide text-[#2D2928]'>
                6+ YEARS <span className="font-bold">EXPERIENCE</span>
              </p>
            </div>

            {/* Open 7 Days a Week */}
            <div
              ref={featureCardsRefs[2]}
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
                className="mb-4 h-10 w-10 object-contain"
              />
              <p className='font-["Alexandria"] text-xs  tracking-wide text-[#2D2928]'>
                OPEN <span className="font-bold">7 DAYS A WEEK</span>
              </p>
            </div>

            {/* Residential & Commercial */}
            <div
              ref={featureCardsRefs[3]}
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
                className="mb-4 h-10 w-10 object-contain"
              />
              <p className='font-["Alexandria"] text-xs font-bold tracking-wide text-[#2D2928]'>
                RESIDENTIAL &amp; <span className="font-bold">COMMERCIAL</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Third section: services grid */}
      <section className="relative bg-[#E1F8F2] pb-0 md:pb-24 pt-10">
        {/* Dark background strip spanning full width without cropping important details */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-20 h-[700px]"
          style={{
            backgroundImage: `url(${thirdSectionBg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundPosition: "cover",
          }}
        />

        <div className="relative ">
          {/* 3x2 card grid overlapping the strip */}
          <div
            ref={servicesGridRef}
            className="relative grid grid-cols-2 gap-4 md:gap-10 md:grid-cols-3 -mt-10 mx-auto max-w-6xl px-4"
          >
            {SERVICES.map((card, index) => {
              const image =
                SERVICE_IMAGES[card.imageKey] || interiorServiceImage;
              return (
                <div
                  key={card.slug}
                  ref={serviceCardsRefs[index]}
                  data-service-card
                  className="relative h-[280px] overflow-hidden rounded-[25px] text-left text-white shadow-xl md:h-[400px]"
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    data-service-card-content
                    className="absolute inset-x-3 bottom-3 rounded-[10px] bg-gradient-to-t from-black/85 via-black/75 to-black/60 px-3 py-4 md:px-6 md:py-6"
                  >
                    <h3 className='mb-2 max-w-xs text-base md:font-extrabold leading-tight tracking-[0.03em] text-[#E9FFF7] md:mb-3 md:text-4xl font-["inter"]'>
                      {card.title}
                    </h3>
                    <p className='text-xs md:leading-relaxed text-[#F9FAFB] md:text-sm font-["Inter"]'>
                      {card.body}
                    </p>
                    <Link
                      to={`/services/${card.slug}`}
                      className='mt-2 inline-flex text-[10px] font-semibold text-white md:mt-4 md:text-[12px] cursor-pointer hover:text-[#A1F88B] transition-colors font-["Inter"] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A1F88B] focus-visible:ring-offset-2'
                      aria-label={`Learn more about ${card.title}`}
                    >
                      Learn More &gt;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fourth section: Why neighbors choose */}
      <section
        id="why-choose-us"
        className="relative bg-[#E1F8F2] pt-10pt-16 pb-16 "
      >
        <div className="flex flex-col justify-between md:flex-row mx-auto max-w-6xl  ">
          {/* Left image with rounded right corners */}
          <div className="hidden h-full w-full overflow-hidden rounded-r-[60px] md:block md:h-[420px] md:w-[34%] absolute -left-[0px] ">
            <img
              src={leftSectionImage}
              alt="Beautifully painted coastal home"
              className="h-full w-full object-cover object-[90%]"
            />
          </div>
          <div className="w-[30%]"></div>

          {/* Right content */}
          <div className="w-full px-20 py-8 md:w-[66%] md:px-12">
            <h2
              ref={fourthHeadingRef}
              className='mb-8 font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[45px] font-["Rubik_One"] leading-tight'
            >
              WHY NEIGHBORS CHOOSE THE DADDY&apos;S PAINTING LLC
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Card 1 */}
              <div
                ref={benefitCardsRefs[0]}
                className="rounded-[26px]  border-2 h-fit border-[#02B446]  px-5 py-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center">
                    <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                  </span>
                  <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928]  font-["Inter"]'>
                    6+{" "}
                    <span className="font-extrabold">YEARS OF EXCELLENCE</span>
                  </h3>
                </div>
                <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                  We bring years of hands-on expertise to every job, ensuring
                  professional techniques and long-lasting results.
                </p>
              </div>

              {/* Card 2 */}
              <div
                ref={benefitCardsRefs[1]}
                className="rounded-[26px] border border-2 h-fit border-[#02B446] px-5 py-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center">
                    <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
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

              {/* Card 3 */}
              <div
                ref={benefitCardsRefs[2]}
                className="rounded-[26px] border border-2 h-fit border-[#02B446]  px-5 py-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center">
                    <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
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
      </section>

      {/* Fifth section: marquee strip */}
      <section className="relative overflow-hidden border-y border-white bg-[#02A11F] py-3">
        <div className="absolute inset-0 pointer-events-none" />
        <div className="mx-auto max-w-full">
          <div className="marquee-horizontal">
            {Array.from({ length: 8 }).map((_, index) => (
              <span
                // eslint-disable-next-line react/no-array-index-key
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

      {/* Sixth section: service area */}
      <section
        id="gallery"
        className="relative  overflow-hidden"
        style={{
          backgroundImage: `url(${skyImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Sky texture and lines over the background image */}
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

        {/* House image anchored to bottom, full width */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-0 z-0 flex justify-center"
        ></div>

        {/* Hero content including header */}
        <div className="relative mx-auto flex  max-w-6xl flex-col items-center px-4 pb-10 pt-6 md:pt-4 lg:pt-4">
          {/* Hero body */}
          <section className="mt-10 flex w-full flex-col items-center text-center">
            {/* Main heading */}
            <h1
              ref={sixthHeadingRef}
              className='mt-6 text-center font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[45px] font-["Rubik_One"] leading-tight'
            >
              Proudly Serving Easley, SC & Surrounding Areas.
            </h1>
            <p className='text-sm text-[#2D2928] font-["Inter"] max-w-xl '>
              We are ready to work on your residential or commercial project.
              Our service area covers a wide radius including Easley,
              Greenville, Spartanburg, Slater-Marietta, Greer, Laurens,
              Powdersville, and Clemson.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-[#039A02] px-8 py-3 text-sm font-semibold text-[#111827] shadow-md cursor-pointer hover:bg-[#02A11F] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
              >
                <span className='font-["Alexandria"] text-white'>
                  View Our Gallery
                </span>
              </button>
            </div>
          </section>
        </div>
      </section>

      {/* Seventh section: full-width decorative image strip */}
      <section className="relative  overflow-hidden bg-[#E1F8F2]">
        <img
          src={fifthSectionBg}
          alt="Decorative paint texture"
          className="block w-full object-cover"
        />
      </section>

      {/* Eighth section: contact + estimate form */}
      <section className="relative bg-[#E1F8F2] pb-50 pt-10">
        <div className="mx-auto flex max-w-6xl flex-col md:gap-30  gap-10 px-4 lg:flex-row lg:items-start">
          {/* Left column: logo, heading, contact details, reviews, call-to-action */}
          <div ref={eighthLeftRef} className="w-full lg:w-1/2">
            <div className="flex flex-col items-center space-y-6 text-center md:items-start md:text-left">
              {/* Logo */}
              <div className="flex justify-center md:justify-start">
                <img
                  src={contactLogoImage}
                  alt="The Daddy's Painting LLC logo"
                  className="w-50 h-36"
                />
              </div>

              {/* Main heading + subheading */}
              <div className="space-y-3">
                <h2 className='mx-auto font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-left md:text-[45px] font-["Rubik_One"] leading-tight'>
                  PROFESSIONAL RESIDENTIAL &amp; COMMERCIAL PAINTING SERVICES
                  YOU CAN TRUST.
                </h2>
                <p className='text-sm text-[#2D2928] font-["Alexandria"]'>
                  Top-rated painters in{" "}
                  <span className="font-bold">Easley &amp; Greenville, SC</span>
                </p>
              </div>

              {/* Contact rows */}
              <div className="flex flex-col items-center space-y-1 md:items-start">
                <div className="flex items-center gap-3">
                  <span className="mt-1 flex h-8 w-8 items-center justify-center text-[#039A02]">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>

                  <p className="">(864) 451-2806</p>
                </div>

                <div className="flex items-center gap-1">
                  <span className="mt-1 flex h-8 w-8 items-center justify-center text-[#039A02]">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>

                  <p className="">Easley, SC &amp; Surrounding Areas</p>
                </div>
              </div>

              {/* Google reviews */}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <img
                  src={googleImage}
                  alt="Google logo"
                  className="h-5 w-auto md:h-6"
                />
                <p className='text-xs text-[#2D2928] font-bold font-["Inter"]'>
                  5.0 Verified Customer Reviews <span>|</span>
                </p>
                <div className="flex items-center gap-1 text-[#02A11F]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Star
                      key={index}
                      className="h-3.5 w-3.5 fill-[#02A11F] text-[#02A11F]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              {/* Call now + social icons */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                <button
                  type="button"
                onClick={handleCallNow}
                  className="flex items-center gap-3 rounded-[10px] bg-[#039A02] px-6 py-3 text-sm font-semibold text-white shadow-md cursor-pointer hover:bg-[#02A11F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className='font-["Alexandria"]'>
                    Call Now: <span className="font-bold">(864) 451-2806</span>
                  </span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full border-[#2D2928] border-1 text-[#2D2928] cursor-pointer hover:bg-[#039A02]/10 hover:border-[#039A02] hover:text-[#039A02] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
                    aria-label="Visit our Facebook page"
                  >
                    <Facebook className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full border-[#2D2928] border-1 text-[#2D2928] cursor-pointer hover:bg-[#039A02]/10 hover:border-[#039A02] hover:text-[#039A02] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
                    aria-label="Visit our Instagram profile"
                  >
                    <Instagram className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: estimate form card */}
          <div className="w-full lg:w-1/2">
            <div
              ref={eighthFormRef}
              className="relative mx-auto max-w-md rounded-[40px] bg-[#2D2928] px-7 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.45)] md:max-w-none md:px-10 md:py-10 md:mt-20 "
            >
              <h3 className='mb-6 text-lg font-semibold leading-snug text-white md:text-xl font-["Inter"]'>
                Contact The Daddy's Painting LLC today for a free, no-obligation
                estimate.
              </h3>

              <form className="space-y-5">
                {["Full Name", "Phone Number", "Email", "Message"].map(
                  (label, index) => (
                    <div key={label} className="space-y-1">
                      <label
                        htmlFor={label.toLowerCase().replace(/\s+/g, "-")}
                        className='block text-xs font-medium text-white/80 font-["Inter"]'
                      >
                        {label}
                      </label>
                      {label === "Message" ? (
                        <textarea
                          id={label.toLowerCase().replace(/\s+/g, "-")}
                          rows={3}
                          className="w-full border-b border-white/40 bg-transparent pb-1 text-sm text-white placeholder:text-white/40 focus-visible:outline-none"
                        />
                      ) : (
                        <input
                          id={label.toLowerCase().replace(/\s+/g, "-")}
                          type="text"
                          className="w-full border-b border-white/40 bg-transparent pb-1 text-sm text-white placeholder:text-white/40 focus-visible:outline-none"
                        />
                      )}
                    </div>
                  ),
                )}
              </form>

              <button
                type="button"
                onClick={handleRequestEstimateClick}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#02A11F] px-6 py-3 text-sm font-semibold shadow-md cursor-pointer hover:bg-[#039A02] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 text-white focus-visible:ring-[#02A11F] "
              >
                <span className='font-["Alexandria"]  text-white'>
                  Request Free Estimate
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Talk to our AI bubble + icon (original home UI, now opens chat) */}
        <div className="pointer-events-auto absolute bottom-10 right-5">
          <button
            type="button"
            onClick={handleOpenChat}
            className="relative cursor-pointer"
            aria-label="Talk to our AI assistant"
          >
            <div className="relative">
              {/* Speech bubble */}
              <div className="inline-flex items-center rounded-md w-fit bg-white px-3.5 py-1.5 text-[11px] font-extrabold text-base text-[#02A11F] shadow-md relative -left-20 -top-1">
                Talk to our AI
              </div>

              {/* Green circular AI icon */}
              <img
                src={aiIcon}
                alt="AI assistant"
                className="h-20 w-20 object-contain"
              />
            </div>
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
