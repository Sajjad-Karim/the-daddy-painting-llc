import React from "react";
import leftSectionImage from "../../assets/leftimage.png";
import BenefitCard from "../BenefitCard";

const BENEFIT_CARDS = [
  {
    title: (
      <>
        6+ <span className="font-extrabold">YEARS OF EXCELLENCE</span>
      </>
    ),
    description:
      "We bring years of hands-on expertise to every job, ensuring professional techniques and long-lasting results.",
  },
  {
    title: <span className="font-extrabold">TRANSPARENT PRICING</span>,
    description:
      "No hidden fees. We provide clear, free estimates so you know exactly what to expect.",
  },
  {
    title: <span className="font-extrabold">SERVING YOUR COMMUNITY</span>,
    description:
      "From Powdersville to Laurens, we're the local painting company committed to beautifying our South Carolina neighborhoods.",
  },
];

const WhyChooseSection = ({ fourthHeadingRef, benefitCardsRefs }) => (
  <section
    id="why-choose-us"
    className="relative bg-[#E1F8F2] pb-10 pt-10 md:pb-16 md:pt-16"
  >
    <div className="mx-auto flex max-w-6xl flex-col justify-between md:flex-row">
      <div className="hidden h-full w-full overflow-hidden rounded-r-[60px] md:block md:h-[420px] md:w-[34%] absolute -left-[0px]">
        <img
          src={leftSectionImage}
          alt="Beautifully painted coastal home"
          className="h-full w-full object-cover object-[90%]"
        />
      </div>
      <div className="w-[20%]" />

      <div className="w-full px-4 py-6 md:w-[70%] md:px-12 md:py-8">
        <h2
          ref={fourthHeadingRef}
          className='mb-8 font-bold text-[#2D2928] sm:max-w-3xl sm:text-3xl md:mt-6 md:text-[35px] font-["Rubik_One"] leading-tight'
        >
          WHY NEIGHBORS CHOOSE THE DADDY&apos;S PAINTING LLC
        </h2>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {BENEFIT_CARDS.map((card, index) => (
            <BenefitCard
              key={index}
              title={card.title}
              description={card.description}
              refProp={benefitCardsRefs[index]}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
