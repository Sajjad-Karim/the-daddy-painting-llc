import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  initScrollAnimations,
  cleanupScrollAnimations,
  setupScrollTriggerResize,
} from "../../utils/scrollAnimations";
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
    window.location.href = "tel:+18644512806";
  };

  const handleRequestEstimate = () => {
    window.alert(
      "Thank you! Your free estimate request has been received. We'll contact you shortly.",
    );
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

    const teardownResize = setupScrollTriggerResize();

    return () => {
      clearTimeout(timer);
      clearTimeout(refreshTimer);
      teardownResize();
      cleanupScrollAnimations();
    };
  }, []);

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
