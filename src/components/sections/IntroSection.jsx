import React from "react";
import borderVectorImage from "../../assets/borderVector.png";
import FeatureCard from "../FeatureCard";
import freeEstimatesIcon from "../../assets/icons/freeestimates.png";
import yearsExperienceIcon from "../../assets/icons/yearsexperience.png";
import openIcon from "../../assets/icons/open.png";
import residentialIcon from "../../assets/icons/residential.png";

const FEATURE_CARDS = [
  {
    icon: freeEstimatesIcon,
    iconAlt: "Free estimates icon",
    label: (
      <>
        FREE <span className="font-bold">ESTIMATES</span>
      </>
    ),
  },
  {
    icon: yearsExperienceIcon,
    iconAlt: "Years of experience icon",
    label: (
      <>
        6+ YEARS <span className="font-bold">EXPERIENCE</span>
      </>
    ),
  },
  {
    icon: openIcon,
    iconAlt: "Open 7 days a week icon",
    label: (
      <>
        OPEN <span className="font-bold">7 DAYS A WEEK</span>
      </>
    ),
  },
  {
    icon: residentialIcon,
    iconAlt: "Residential and commercial icon",
    label: (
      <>
        RESIDENTIAL &amp; <span className="font-bold">COMMERCIAL</span>
      </>
    ),
  },
];

const IntroSection = ({
  secondHeadingRef,
  secondTextRefs,
  featureCardsRefs,
}) => (
  <section
    id="about"
    className="relative bg-[#E1F8F2] pb-10 pt-10 md:pb-16 md:pt-16"
  >
    <div
      aria-hidden="true"
      className="pointer-events-none hidden md:block absolute inset-x-0 -top-[40px] z-0"
    >
      <img
        src={borderVectorImage}
        alt="Section top wave border"
        className="h-80 w-full object-cover"
      />
    </div>

    <div className="relative mx-auto max-w-6xl px-4 pt-4">
      <div className="grid items-start gap-6 text-[#2D2928] md:grid-cols-3 md:gap-10">
        <div>
          <h2
            ref={secondHeadingRef}
            className='font-bold text-[#2D2928]  sm:text-3xl md:text-[35px] font-["Rubik_One"] leading-tight'
          >
            BRINGING <span className="text-[#039A02]">COLOR</span> AND QUALITY
            TO SOUTH CAROLINA LIVING.
          </h2>
        </div>

        <p
          ref={secondTextRefs[0]}
          className='font-["Inter"] text-base md:text-lg leading-relaxed'
        >
          At The Daddy&apos;s Painting LLC, we believe a fresh coat of paint
          does more than just cover a wall—it revitalizes your entire space.
          Whether you need a full exterior makeover in Greer or a detailed
          kitchen cabinet refresh in Clemson, our dedicated team treats every
          project with the utmost care.
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

      <div className="mt-8 grid grid-cols-2 gap-4 md:mt-10 md:grid-cols-4 md:gap-6">
        {FEATURE_CARDS.map((card, index) => (
          <FeatureCard
            key={card.iconAlt}
            icon={card.icon}
            iconAlt={card.iconAlt}
            label={card.label}
            refProp={featureCardsRefs[index]}
          />
        ))}
      </div>
    </div>
  </section>
);

export default IntroSection;
