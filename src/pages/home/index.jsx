import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT } from "../../data/contact";
import HomeHero from "../../components/sections/HomeHero";
import IntroSection from "../../components/sections/IntroSection";
import HomeServicesGrid from "../../components/sections/HomeServicesGrid";
import WhyChooseSection from "../../components/sections/WhyChooseSection";
import MarqueeStrip from "../../components/sections/MarqueeStrip";
import ServiceAreaSection from "../../components/sections/ServiceAreaSection";
import DecorativeImageStrip from "../../components/sections/DecorativeImageStrip";
import ContactSection from "../../components/sections/ContactSection";
import { DURATION, EASE, STAGGER, TRIGGER } from "../../utils/gsapConfig";

gsap.registerPlugin(ScrollTrigger);

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

  useLayoutEffect(() => {
    const featureCardsElements = featureCardsRefs
      .map((cardRef) => cardRef.current)
      .filter(Boolean);

    if (!featureCardsElements.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(featureCardsElements, {
        opacity: 1,
        x: 0,
      });
      return;
    }

    const featureCardsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: featureCardsElements[0],
        start: TRIGGER.default,
        toggleActions: "restart none restart none",
      },
    });

    featureCardsTimeline.fromTo(
      featureCardsElements,
      {
        opacity: 0,
        x: -400,
      },
      {
        opacity: 1,
        x: 0,
        duration: DURATION.slow * 1.5,
        ease: EASE.fluid,
        stagger: STAGGER.relaxed,
      },
    );

    return () => {
      if (featureCardsTimeline.scrollTrigger) {
        featureCardsTimeline.scrollTrigger.kill();
      }
      featureCardsTimeline.kill();
    };
  }, []);

  useLayoutEffect(() => {
    const benefitCardsElements = benefitCardsRefs
      .map((cardRef) => cardRef.current)
      .filter(Boolean);

    if (!benefitCardsElements.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(benefitCardsElements, {
        opacity: 1,
        x: 0,
      });
      return;
    }

    const benefitCardsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: benefitCardsElements[0],
        start: TRIGGER.default,
        toggleActions: "restart none restart none",
      },
    });

    benefitCardsTimeline.fromTo(
      benefitCardsElements,
      {
        opacity: 0,
        x: -400,
      },
      {
        opacity: 1,
        x: 0,
        duration: DURATION.slow * 1.5,
        ease: EASE.fluid,
        stagger: STAGGER.relaxed,
      },
    );

    return () => {
      if (benefitCardsTimeline.scrollTrigger) {
        benefitCardsTimeline.scrollTrigger.kill();
      }
      benefitCardsTimeline.kill();
    };
  }, []);

  useLayoutEffect(() => {
    if (!servicesGridRef.current) {
      return;
    }

    const serviceCardsElements = serviceCardsRefs
      .map((cardRef) => cardRef.current)
      .filter(Boolean);

    if (!serviceCardsElements.length) {
      return;
    }

    const serviceCardContentElements = serviceCardsElements
      .map((cardElement) =>
        cardElement.querySelector("[data-service-card-content]"),
      )
      .filter(Boolean);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(serviceCardsElements, {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      if (serviceCardContentElements.length) {
        gsap.set(serviceCardContentElements, {
          opacity: 1,
        });
      }
      return;
    }

    const servicesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: servicesGridRef.current,
        start: TRIGGER.default,
        toggleActions: "restart none restart none",
      },
    });

    servicesTimeline.fromTo(
      serviceCardsElements,
      {
        opacity: 1,
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

    if (serviceCardContentElements.length) {
      servicesTimeline.fromTo(
        serviceCardContentElements,
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

    return () => {
      if (servicesTimeline.scrollTrigger) {
        servicesTimeline.scrollTrigger.kill();
      }
      servicesTimeline.kill();
    };
  }, []);

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
