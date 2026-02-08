import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Breakpoints aligned with Tailwind md (768px)
const MEDIA_MOBILE = "(max-width: 767px)";
const MEDIA_DESKTOP = "(min-width: 768px)";

// Store matchMedia instances for cleanup (revert on unmount)
const matchMediaInstances = new Set();

/**
 * Schedule ScrollTrigger.refresh after layout stabilizes (e.g. on resize/orientation change)
 */
let refreshRafId = null;
const scheduleRefresh = () => {
  if (refreshRafId) cancelAnimationFrame(refreshRafId);
  refreshRafId = requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    refreshRafId = null;
  });
};

/**
 * Setup resize handler for ScrollTrigger.refresh() - call once from pages
 */
export const setupScrollTriggerResize = () => {
  const handleResize = () => scheduleRefresh();
  window.addEventListener("resize", handleResize);
  window.addEventListener("orientationchange", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("orientationchange", handleResize);
  };
};

/**
 * Initialize scroll animations for the home page
 * Uses matchMedia for separate mobile vs desktop logic
 */
export const initScrollAnimations = (refs) => {
  const {
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
  } = refs;

  const mm = gsap.matchMedia();
  matchMediaInstances.add(mm);

  // Desktop: full animations (subtle, reduced scale/transform values)
  mm.add(MEDIA_DESKTOP, () => {
    if (heroPillRef?.current) {
      gsap.fromTo(
        heroPillRef.current,
        { opacity: 0, y: -16, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: heroPillRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    if (heroHeadingRef?.current) {
      gsap.fromTo(
        heroHeadingRef.current,
        { opacity: 0, y: 24, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: heroHeadingRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    if (heroButtonsRef?.current && heroButtonsRef.current.children.length > 0) {
      gsap.fromTo(
        heroButtonsRef.current.children,
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: heroButtonsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    if (heroCardRef?.current) {
      gsap.fromTo(
        heroCardRef.current,
        { opacity: 0, x: 40, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: heroCardRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    if (secondHeadingRef?.current) {
      gsap.fromTo(
        secondHeadingRef.current,
        { opacity: 0, x: -20, scale: 0.99 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: secondHeadingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    secondTextRefs?.forEach((ref, index) => {
      if (ref?.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 16, x: index % 2 === 0 ? -12 : 12 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.75,
            delay: index * 0.08,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    featureCardsRefs?.forEach((ref, index) => {
      if (ref?.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, scale: 0.98, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.08,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    const serviceCards = servicesGridRef?.current
      ? Array.from(servicesGridRef.current.querySelectorAll("[data-service-card]"))
      : [];
    const cardCount = Math.max(
      serviceCards.length,
      serviceCardsRefs?.length ?? 0,
    );
    if (cardCount > 0) {
      for (let index = 0; index < cardCount; index++) {
        const card =
          serviceCardsRefs?.[index]?.current ?? serviceCards?.[index] ?? null;
        if (!card) continue;

        const fromX = index % 2 === 0 ? -12 : 12;
        const triggerStart = "top 92%";

        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.0,
            delay: index * 0.12,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              start: triggerStart,
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 28,
            x: fromX,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 0.9,
            delay: index * 0.15,
            ease: "power3.out",
            overwrite: "auto",
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              start: triggerStart,
              toggleActions: "play none none reverse",
            },
          },
        );

        const content = card.querySelector("[data-service-card-content]");
        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.15 + 0.4,
              ease: "power3.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: card,
                start: triggerStart,
                toggleActions: "play none none reverse",
              },
            },
          );
          const contentChildren = content.children;
          if (contentChildren?.length) {
            gsap.fromTo(
              contentChildren,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.08,
                delay: index * 0.15 + 0.5,
                ease: "power2.out",
                immediateRender: false,
                scrollTrigger: {
                  trigger: card,
                  start: triggerStart,
                  toggleActions: "play none none reverse",
                },
              },
            );
          }
        }

        gsap.to(card, {
          y: -6,
          scale: 1.015,
          ease: "none",
          overwrite: "auto",
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
            end: "top 36%",
            scrub: 2.0,
          },
        });
      }
    }

    if (fourthHeadingRef?.current) {
      gsap.fromTo(
        fourthHeadingRef.current,
        { opacity: 0, x: -24, scale: 0.99 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: fourthHeadingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    benefitCardsRefs?.forEach((ref, index) => {
      if (ref?.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            delay: index * 0.1,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    if (sixthHeadingRef?.current) {
      gsap.fromTo(
        sixthHeadingRef.current,
        { opacity: 0, scale: 0.99, y: 18 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: sixthHeadingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    if (eighthLeftRef?.current) {
      gsap.fromTo(
        eighthLeftRef.current,
        { opacity: 0, x: -24, scale: 0.99 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: eighthLeftRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    if (eighthFormRef?.current) {
      gsap.fromTo(
        eighthFormRef.current,
        { opacity: 0, x: 24, scale: 0.99, y: 16 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: eighthFormRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    const heroHouseRef = document.querySelector("[data-hero-house]");
    if (heroHouseRef) {
      gsap.to(heroHouseRef, {
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroHouseRef,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    return () => {};
  });

  // Mobile: reduced animations – fade-up only, no scale/x/scrub/parallax to avoid layout shift and performance issues
  mm.add(MEDIA_MOBILE, () => {
    const fadeUp = (el, opts = {}) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          ...opts,
        },
      );
    };

    if (heroPillRef?.current) fadeUp(heroPillRef.current);
    if (heroHeadingRef?.current) fadeUp(heroHeadingRef.current);

    if (heroButtonsRef?.current && heroButtonsRef.current.children.length > 0) {
      gsap.fromTo(
        heroButtonsRef.current.children,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: heroButtonsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    if (heroCardRef?.current) fadeUp(heroCardRef.current);
    if (secondHeadingRef?.current) fadeUp(secondHeadingRef.current);

    secondTextRefs?.forEach((ref, index) => {
      if (ref?.current) {
        fadeUp(ref.current, { delay: index * 0.05 });
      }
    });

    featureCardsRefs?.forEach((ref, index) => {
      if (ref?.current) {
        fadeUp(ref.current, { delay: index * 0.05 });
      }
    });

    const serviceCards = servicesGridRef?.current
      ? Array.from(servicesGridRef.current.querySelectorAll("[data-service-card]"))
      : [];
    const cardCount = Math.max(
      serviceCards.length,
      serviceCardsRefs?.length ?? 0,
    );
    for (let index = 0; index < cardCount; index++) {
      const card =
        serviceCardsRefs?.[index]?.current ?? serviceCards?.[index] ?? null;
      if (!card) continue;

      fadeUp(card, { delay: index * 0.08 });
      const content = card.querySelector("[data-service-card-content]");
      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.08 + 0.25,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }

    if (fourthHeadingRef?.current) fadeUp(fourthHeadingRef.current);
    benefitCardsRefs?.forEach((ref, index) => {
      if (ref?.current) fadeUp(ref.current, { delay: index * 0.06 });
    });
    if (sixthHeadingRef?.current) fadeUp(sixthHeadingRef.current);
    if (eighthLeftRef?.current) fadeUp(eighthLeftRef.current);
    if (eighthFormRef?.current) fadeUp(eighthFormRef.current);

    return () => {};
  });

  scheduleRefresh();
};

/**
 * Detail page scroll animations – hero, cards, contact section.
 * Uses matchMedia for mobile vs desktop.
 */
export const initDetailScrollAnimations = (refs) => {
  const {
    heroPillRef,
    heroHeadingRef,
    heroButtonsRef,
    heroCardRef,
    detailSecondHeadingRef,
    detailSecondTextRefs,
    detailSecondImageRef,
    detailThirdSectionRef,
    detailFourthCardsRef,
    detailStepCardsRef,
    eighthLeftRef,
    eighthFormRef,
  } = refs;

  const mm = gsap.matchMedia();
  matchMediaInstances.add(mm);

  mm.add(MEDIA_DESKTOP, () => {
    if (heroPillRef?.current) {
      gsap.fromTo(
        heroPillRef.current,
        { opacity: 0, y: -16, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: heroPillRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
    if (heroHeadingRef?.current) {
      gsap.fromTo(
        heroHeadingRef.current,
        { opacity: 0, y: 24, scale: 0.99 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: heroHeadingRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
    if (heroButtonsRef?.current && heroButtonsRef.current.children.length > 0) {
      gsap.fromTo(
        heroButtonsRef.current.children,
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: heroButtonsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
    if (heroCardRef?.current) {
      gsap.fromTo(
        heroCardRef.current,
        { opacity: 0, x: 40, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: heroCardRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    const secondTrigger = detailSecondHeadingRef?.current;
    const secondSectionTriggerStart = "top 82%";
    if (secondTrigger) {
      gsap.fromTo(
        secondTrigger,
        { opacity: 0, x: -40, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.0,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: secondTrigger,
            start: secondSectionTriggerStart,
            toggleActions: "play none none reverse",
          },
        },
      );
    }
    detailSecondTextRefs?.forEach((textRef, index) => {
      if (!textRef?.current || !secondTrigger) return;
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.18 + index * 0.12,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: secondTrigger,
            start: secondSectionTriggerStart,
            toggleActions: "play none none reverse",
          },
        },
      );
    });
    if (detailSecondImageRef?.current && secondTrigger) {
      gsap.fromTo(
        detailSecondImageRef.current,
        { opacity: 0, x: 40, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.0,
          delay: 0.35,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: secondTrigger,
            start: secondSectionTriggerStart,
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    const applyCardAnimation = (card, index) => {
      gsap.fromTo(
        card,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.0,
          delay: index * 0.12,
          ease: "power3.inOut",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          delay: index * 0.12,
          ease: "power3.out",
          overwrite: "auto",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
      const content = card.querySelector(
        "[data-detail-card-content], [data-detail-step-card-content]",
      );
      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.12 + 0.4,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        ease: "none",
        overwrite: "auto",
        scrollTrigger: {
          trigger: card,
          start: "top 84%",
          end: "top 38%",
          scrub: 2.0,
        },
      });
    };

    if (detailThirdSectionRef?.current) {
      detailThirdSectionRef.current
        .querySelectorAll("[data-detail-card]")
        .forEach((card, index) => applyCardAnimation(card, index));
    }
    if (detailFourthCardsRef?.current) {
      detailFourthCardsRef.current
        .querySelectorAll("[data-detail-card]")
        .forEach((card, index) => applyCardAnimation(card, index));
    }
    if (detailStepCardsRef?.current) {
      detailStepCardsRef.current
        .querySelectorAll("[data-detail-step-card]")
        .forEach((card, index) => applyCardAnimation(card, index));
    }

    if (eighthLeftRef?.current) {
      gsap.fromTo(
        eighthLeftRef.current,
        { opacity: 0, x: -24, scale: 0.99 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: eighthLeftRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
    if (eighthFormRef?.current) {
      gsap.fromTo(
        eighthFormRef.current,
        { opacity: 0, x: 24, scale: 0.99, y: 16 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: eighthFormRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    return () => {};
  });

  mm.add(MEDIA_MOBILE, () => {
    const fadeUp = (el, opts = {}) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          ...opts,
        },
      );
    };

    if (heroPillRef?.current) fadeUp(heroPillRef.current);
    if (heroHeadingRef?.current) fadeUp(heroHeadingRef.current);
    if (heroButtonsRef?.current && heroButtonsRef.current.children.length > 0) {
      gsap.fromTo(
        heroButtonsRef.current.children,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: heroButtonsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
    if (heroCardRef?.current) fadeUp(heroCardRef.current);

    const secondTrigger = detailSecondHeadingRef?.current;
    if (secondTrigger) {
      fadeUp(secondTrigger);
      detailSecondTextRefs?.forEach((textRef, index) => {
        if (textRef?.current) fadeUp(textRef.current, { delay: 0.1 + index * 0.08 });
      });
      if (detailSecondImageRef?.current) {
        fadeUp(detailSecondImageRef.current, { delay: 0.2 });
      }
    }

    const addCardFade = (container) => {
      if (!container?.current) return;
      container.current.querySelectorAll("[data-detail-card], [data-detail-step-card]").forEach((card, index) => {
        fadeUp(card, { delay: index * 0.06 });
      });
    };
    addCardFade(detailThirdSectionRef);
    addCardFade(detailFourthCardsRef);
    addCardFade(detailStepCardsRef);

    if (eighthLeftRef?.current) fadeUp(eighthLeftRef.current);
    if (eighthFormRef?.current) fadeUp(eighthFormRef.current);

    return () => {};
  });

  scheduleRefresh();
};

/**
 * Services page scroll animations
 */
export const initServicesScrollAnimations = (refs) => {
  const { servicesCardsRootRef, eighthLeftRef, eighthFormRef } = refs;
  const root = servicesCardsRootRef?.current;
  if (!root) return;

  const cards = root.querySelectorAll("[data-services-card]");
  if (!cards?.length) return;

  const mm = gsap.matchMedia();
  matchMediaInstances.add(mm);

  mm.add(MEDIA_DESKTOP, () => {
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          delay: index * 0.08,
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
    if (eighthLeftRef?.current) {
      gsap.fromTo(
        eighthLeftRef.current,
        { opacity: 0, x: -24, scale: 0.99 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: eighthLeftRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
    if (eighthFormRef?.current) {
      gsap.fromTo(
        eighthFormRef.current,
        { opacity: 0, x: 24, scale: 0.99, y: 16 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: eighthFormRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
    return () => {};
  });

  mm.add(MEDIA_MOBILE, () => {
    const fadeUp = (el, opts = {}) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          ...opts,
        },
      );
    };
    cards.forEach((card, index) => fadeUp(card, { delay: index * 0.05 }));
    if (eighthLeftRef?.current) fadeUp(eighthLeftRef.current);
    if (eighthFormRef?.current) fadeUp(eighthFormRef.current);
    return () => {};
  });

  scheduleRefresh();
};

/**
 * About page scroll animations (data-about-animate driven)
 */
export const initAboutScrollAnimations = (refs) => {
  const { aboutRootRef } = refs;
  const root = aboutRootRef?.current;
  if (!root) return;

  const animated = Array.from(root.querySelectorAll("[data-about-animate]"));
  if (!animated.length) return;

  const mm = gsap.matchMedia();
  matchMediaInstances.add(mm);

  mm.add(MEDIA_DESKTOP, () => {
    animated.forEach((el, index) => {
      const type = el.getAttribute("data-about-animate") || "fade-up";
      const base = {
        opacity: 0,
        y: 16,
        x: 0,
        scale: 0.99,
        rotation: 0,
        transformOrigin: "center center",
        force3D: true,
      };

      if (type === "fade-left") {
        base.x = -20;
        base.y = 0;
      } else if (type === "fade-right") {
        base.x = 20;
        base.y = 0;
      } else if (type === "fade-down") {
        base.y = -16;
      } else if (type === "zoom") {
        base.y = 0;
        base.scale = 0.97;
      } else if (type === "rotate") {
        base.y = 0;
        base.x = index % 2 === 0 ? -12 : 12;
        base.scale = 0.98;
      } else if (type === "card") {
        base.y = 18;
        base.scale = 0.98;
      }

      gsap.set(el, base);
      gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: type === "card" ? 0.85 : 0.75,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    });
    return () => {};
  });

  mm.add(MEDIA_MOBILE, () => {
    animated.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.03,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
    return () => {};
  });

  scheduleRefresh();
};

/**
 * Cleanup function to kill all ScrollTrigger instances and revert matchMedia contexts
 */
export const cleanupScrollAnimations = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  matchMediaInstances.forEach((mm) => {
    mm.revert();
  });
  matchMediaInstances.clear();
};
