import { useRef } from "react";
import { CONTACT } from "../../data/contact";
import HomeHero from "../../components/sections/HomeHero";
import IntroSection from "../../components/sections/IntroSection";
import HomeServicesGrid from "../../components/sections/HomeServicesGrid";
import WhyChooseSection from "../../components/sections/WhyChooseSection";
import MarqueeStrip from "../../components/sections/MarqueeStrip";
import ServiceAreaSection from "../../components/sections/ServiceAreaSection";
import DecorativeImageStrip from "../../components/sections/DecorativeImageStrip";
import ContactSection from "../../components/sections/ContactSection";

const Home = () => {
  const heroPillRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroButtonsRef = useRef(null);
  const heroCardRef = useRef(null);

  const secondHeadingRef = useRef(null);
  const secondTextRefs = [useRef(null), useRef(null)];
  const featureCardsRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const servicesGridRef = useRef(null);
  const serviceCardsRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const fourthHeadingRef = useRef(null);
  const benefitCardsRefs = [useRef(null), useRef(null), useRef(null)];

  const sixthHeadingRef = useRef(null);

  const eighthLeftRef = useRef(null);
  const eighthFormRef = useRef(null);

  const handleCallNow = () => {
    window.location.href = CONTACT.phoneHref;
  };

  const handleRequestEstimate = () => {
    window.alert(
      "Thank you! Your free estimate request has been received. We'll contact you shortly.",
    );
  };

  return (
    <>
      <HomeHero
        heroPillRef={heroPillRef}
        heroHeadingRef={heroHeadingRef}
        heroButtonsRef={heroButtonsRef}
        heroCardRef={heroCardRef}
        onRequestEstimate={handleRequestEstimate}
      />

      <IntroSection
        secondHeadingRef={secondHeadingRef}
        secondTextRefs={secondTextRefs}
        featureCardsRefs={featureCardsRefs}
      />

      <HomeServicesGrid
        servicesGridRef={servicesGridRef}
        serviceCardsRefs={serviceCardsRefs}
      />

      <WhyChooseSection
        fourthHeadingRef={fourthHeadingRef}
        benefitCardsRefs={benefitCardsRefs}
      />

      <MarqueeStrip />

      <ServiceAreaSection sixthHeadingRef={sixthHeadingRef} />

      <DecorativeImageStrip />

      <ContactSection
        leftRef={eighthLeftRef}
        formRef={eighthFormRef}
        onCallNow={handleCallNow}
        onRequestEstimate={handleRequestEstimate}
      />
    </>
  );
};

export default Home;
