import { useEffect, useRef } from "react";
import { CONTACT } from "../../data/contact";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Phone,
  MapPin,
  Star,
  Facebook,
  Instagram,
} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../../components/Header";
import skyVectorImage from "../../assets/vector.png";
import skyImage from "../../assets/sky.png";
import borderVectorImage from "../../assets/borderVector.png";
import leftSectionImage from "../../assets/leftimage.png";
import tickIcon from "../../assets/tick.png";
import contactLogoImage from "../../assets/logo.png";
import googleImage from "../../assets/google.png";
import {
  initAboutScrollAnimations,
  cleanupScrollAnimations,
  setupScrollTriggerResize,
} from "../../utils/scrollAnimations";

const WhyChooseUs = () => {
  const rootRef = useRef(null);

  const handleCallNow = () => {
    window.location.href = CONTACT.phoneHref;
  };

  const handleRequestEstimateClick = () => {
    window.alert(
      "Thank you! Your free estimate request has been received. We'll contact you shortly.",
    );
  };

  useEffect(() => {
    let refreshTimer;
    const timer = setTimeout(() => {
      initAboutScrollAnimations({
        aboutRootRef: rootRef,
      });
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    }, 400);

    const teardownResize = setupScrollTriggerResize();

    return () => {
      clearTimeout(timer);
      clearTimeout(refreshTimer);
      teardownResize();
      cleanupScrollAnimations();
    };
  }, []);

  return (
    <div ref={rootRef}>
      {/* Hero section */}
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
                Why choose The Daddy&apos;s Painting LLC
              </span>
            </div>
            <h1
              data-about-animate="zoom"
              className='mt-4 text-center font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[45px] font-["Rubik_One"] leading-tight'
            >
              WHY CHOOSE US
            </h1>
            <p
              data-about-animate="fade-up"
              className='mt-4 max-w-2xl text-sm leading-relaxed text-[#2D2928] font-["Inter"] md:text-base'
            >
              From honest estimates to clean, on-time work, we stand apart
              through experience, craftsmanship, and a customer-first mindset
              for every residential and commercial project.
            </p>
          </section>
        </div>
      </main>

      {/* Differentiators section */}
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
          <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-12">
            {/* Left: text */}
            <div className="flex flex-col gap-6">
              <h2
                data-about-animate="fade-left"
                className='font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[45px] font-["Rubik_One"] uppercase leading-tight'
              >
                WHAT MAKES US DIFFERENT
              </h2>

              <p
                data-about-animate="fade-up"
                className='text-left font-["Inter"] text-sm leading-relaxed text-[#2D2928] md:text-base'
              >
                We know you have options when it comes to painting contractors.
                That&apos;s why we focus on the things that matter most: clear
                communication, honest pricing, clean job sites, and results that
                last.
              </p>

              <p
                data-about-animate="fade-up"
                className='text-left font-["Inter"] text-sm leading-relaxed text-[#2D2928] md:text-base'
              >
                With over 6 years of hands-on experience across Easley,
                Greenville, Powdersville, and nearby cities, we combine local
                knowledge with professional standards to deliver a stress-free
                painting experience from first estimate to final walkthrough.
              </p>
            </div>

            {/* Right: image */}
            <div
              data-about-animate="fade-right"
              className="flex justify-center md:justify-end"
            >
              <img
                src={leftSectionImage}
                alt="Team painting a home interior"
                data-about-animate="zoom"
                className="w-full max-w-md rounded-[20px] object-cover shadow-lg md:max-w-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why choose cards grid (6 key reasons) */}
      <section className="relative bg-[#E1F8F2] pb-10 pt-6 md:pb-16 md:pt-4">
        <div className="relative mx-auto max-w-6xl px-4">
          <h2
            data-about-animate="zoom"
            className='mb-6 text-center font-bold text-[#2D2928] sm:text-3xl md:mb-12 md:text-[40px] font-["Rubik_One"] uppercase leading-tight'
          >
            Reasons Homeowners &amp; Businesses Choose Us
          </h2>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {/* 6+ Years of Professional Experience */}
            <div
              data-about-animate="card"
              className="rounded-[26px] border-2 border-[#02B446] px-5 py-6 shadow-sm bg-white/70 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center">
                  <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                </span>
                <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"]'>
                  6+ YEARS{" "}
                  <span className="font-extrabold">
                    OF PROFESSIONAL EXPERIENCE
                  </span>
                </h3>
              </div>
              <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                We&apos;ve spent years refining our process so every
                project—from a single room to a full exterior repaint—gets the
                same level of care, consistency, and craftsmanship.
              </p>
            </div>

            {/* Free & Honest Estimates */}
            <div
              data-about-animate="card"
              className="rounded-[26px] border-2 border-[#02B446] px-5 py-6 shadow-sm bg-white/70 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center">
                  <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                </span>
                <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"] font-extrabold'>
                  FREE &amp; HONEST ESTIMATES
                </h3>
              </div>
              <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                No surprises and no hidden fees. We provide clear, written
                estimates upfront so you know exactly what you&apos;re getting
                and what it will cost.
              </p>
            </div>

            {/* Residential & Commercial Specialists */}
            <div
              data-about-animate="card"
              className="rounded-[26px] border-2 border-[#02B446] px-5 py-6 shadow-sm bg-white/70 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center">
                  <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                </span>
                <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"] font-extrabold'>
                  RESIDENTIAL &amp; COMMERCIAL SPECIALISTS
                </h3>
              </div>
              <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                From family homes to local businesses, we understand the unique
                needs of each space and tailor our approach to match your goals
                and schedule.
              </p>
            </div>

            {/* High-Quality Materials & Finishes */}
            <div
              data-about-animate="card"
              className="rounded-[26px] border-2 border-[#02B446] px-5 py-6 shadow-sm bg-white/70 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center">
                  <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                </span>
                <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"] font-extrabold'>
                  HIGH-QUALITY MATERIALS &amp; FINISHES
                </h3>
              </div>
              <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                We use trusted paint brands and proven prep techniques to create
                smooth, durable finishes that look great long after the project
                is done.
              </p>
            </div>

            {/* Reliable, On-Time & Clean Work */}
            <div
              data-about-animate="card"
              className="rounded-[26px] border-2 border-[#02B446] px-5 py-6 shadow-sm bg-white/70 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center">
                  <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                </span>
                <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"] font-extrabold'>
                  RELIABLE, ON-TIME &amp; CLEAN
                </h3>
              </div>
              <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                We show up when we say we will, protect your home or business,
                and leave every job site cleaner than we found it.
              </p>
            </div>

            {/* Serving Multiple Cities in South Carolina */}
            <div
              data-about-animate="card"
              className="rounded-[26px] border-2 border-[#02B446] px-5 py-6 shadow-sm bg-white/70 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center">
                  <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                </span>
                <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"] font-extrabold'>
                  SERVING MULTIPLE SC CITIES
                </h3>
              </div>
              <p className='text-xs leading-relaxed text-[#2D2928] font-["Inter"]'>
                Proudly serving Easley, Greenville, Powdersville, Laurens, and
                nearby communities with local service and neighborly care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY NEIGHBORS CHOOSE section – reused from home, with CTA */}
      <section className="relative bg-[#E1F8F2] pb-0 pt-0 md:pb-16 md:pt-16">
        <div className="flex flex-col justify-between md:flex-row mx-auto max-w-6xl">
          {/* Left image with rounded right corners */}
          <div className="hidden h-full w-full overflow-hidden rounded-r-[60px] md:block md:h-[420px] md:w-[34%] absolute -left-[0px]">
            <img
              src={leftSectionImage}
              alt="Beautifully painted coastal home"
              className="h-full w-full object-cover object-[90%]"
            />
          </div>
          <div className="w-[30%]" />

          {/* Right content */}
          <div className="w-full px-4 py-6 md:w-[70%] md:px-12 md:py-8">
            <h2
              data-about-animate="zoom"
              className='mb-6 font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mb-8 md:mt-6 md:text-[45px] font-["Rubik_One"] leading-tight'
            >
              WHY NEIGHBORS CHOOSE THE DADDY&apos;S PAINTING LLC
            </h2>

            <div className="grid gap-4 md:grid-cols-3 md:gap-6">
              {/* Card 1 */}
              <div
                data-about-animate="card"
                className="rounded-[26px] border-2 h-fit border-[#02B446] px-5 py-6 shadow-sm bg-white/80 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center">
                    <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                  </span>
                  <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"]'>
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
                data-about-animate="card"
                className="rounded-[26px] border-2 h-fit border-[#02B446] px-5 py-6 shadow-sm bg-white/80 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center">
                    <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                  </span>
                  <h3 className='text-base uppercase tracking-[0.08em] text-[#2D2928] font-["Inter"] font-extrabold'>
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
                data-about-animate="card"
                className="rounded-[26px] border-2 h-fit border-[#02B446] px-5 py-6 shadow-sm bg-white/80 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center">
                    <img src={tickIcon} alt="Check mark" className="h-5 w-5" />
                  </span>
                  <h3 className='text-base uppercase text-[#2D2928] font-["Inter"] font-extrabold'>
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

            {/* CTA row under the why-neighbors cards */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                data-about-animate="zoom"
                onClick={handleRequestEstimateClick}
                className="inline-flex items-center gap-3 rounded-full bg-[#039A02] px-7 py-3 text-sm font-semibold text-white shadow-md cursor-pointer hover:bg-[#02A11F] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className='font-["Inter"] font-bold'>
                  Request a Free Estimate
                </span>
              </button>

              <button
                type="button"
                data-about-animate="fade-up"
                onClick={handleCallNow}
                className="flex items-center gap-3 rounded-[10px] bg-white px-6 py-3 text-xs font-semibold text-[#039A02] shadow-md cursor-pointer hover:bg-[#E9FFF7] hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#039A02]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#039A02] text-white">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className='font-["Alexandria"]'>
                  Or Call Now: <span className="font-bold">{CONTACT.phoneDisplay}</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Optional: small AI assistant bubble to match brand */}
      <section className="relative bg-[#E1F8F2] pb-10 pt-6 md:pb-16 md:pt-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <div
            data-about-animate="fade-left"
            className="max-w-lg text-sm leading-relaxed text-[#2D2928] font-['Inter']"
          >
            <p>
              Have questions about colors, finishes, or the process? Our team is
              here to help you make confident decisions—and keep your project
              running smoothly from start to finish.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
