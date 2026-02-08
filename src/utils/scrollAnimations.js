import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DURATION, STAGGER, TRIGGER, TRANSFORM } from "./gsapConfig";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Breakpoints aligned with Tailwind md (768px)
const MEDIA_MOBILE = "(max-width: 767px)";
const MEDIA_DESKTOP = "(min-width: 768px)";
const MEDIA_REDUCE_MOTION = "(prefers-reduced-motion: reduce)";

// Store matchMedia instances for cleanup (revert on unmount)
const matchMediaInstances = new Set();

/** Base ScrollTrigger config – transform/opacity only to prevent layout shift */
const stBase = (trigger, start = TRIGGER.default) => ({
  trigger,
  start,
  toggleActions: "play none none reverse",
});

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

  mm.add(
    {
      desktop: MEDIA_DESKTOP,
      mobile: MEDIA_MOBILE,
      reduceMotion: MEDIA_REDUCE_MOTION,
    },
    (context) => {
      const { desktop, mobile, reduceMotion } = context.conditions;
      const d = (v) => (reduceMotion ? 0 : v);
      const runScrub = !reduceMotion && desktop;

      const fadeUp = (el, opts = {}) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: TRANSFORM.fadeUpY },
          {
            opacity: 1,
            y: 0,
            duration: d(mobile ? DURATION.quick : DURATION.standard),
            ease: EASE.smooth,
            immediateRender: false,
            scrollTrigger: stBase(el, TRIGGER.early),
            ...opts,
          },
        );
      };

      if (reduceMotion) {
        // Instant reveal – no animation
        [heroPillRef, heroHeadingRef, heroCardRef, secondHeadingRef, fourthHeadingRef, sixthHeadingRef, eighthLeftRef, eighthFormRef]
          .filter((r) => r?.current)
          .forEach((r) => gsap.set(r.current, { opacity: 1, y: 0, x: 0, scale: 1 }));
        heroButtonsRef?.current?.children && gsap.set(heroButtonsRef.current.children, { opacity: 1, y: 0, scale: 1 });
        secondTextRefs?.forEach((r) => r?.current && gsap.set(r.current, { opacity: 1, y: 0, x: 0 }));
        featureCardsRefs?.forEach((r) => r?.current && gsap.set(r.current, { opacity: 1, y: 0, scale: 1 }));
        benefitCardsRefs?.forEach((r) => r?.current && gsap.set(r.current, { opacity: 1, y: 0, scale: 1 }));
        return () => {};
      }

      if (desktop) {
        // Desktop: full premium animations
        if (heroPillRef?.current) {
          gsap.fromTo(
            heroPillRef.current,
            { opacity: 0, y: -TRANSFORM.fadeUpY, scale: 0.99 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: DURATION.slow,
              ease: EASE.smooth,
              immediateRender: false,
              scrollTrigger: stBase(heroPillRef.current, "top 80%"),
            },
          );
        }
        if (heroHeadingRef?.current) {
          gsap.fromTo(
            heroHeadingRef.current,
            { opacity: 0, y: TRANSFORM.fadeUpYDesktop, scale: 0.99 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              x: 0,
              duration: DURATION.slow,
              ease: EASE.smooth,
              immediateRender: false,
              scrollTrigger: stBase(heroHeadingRef.current, "top 75%"),
            },
          );
        }
        if (heroButtonsRef?.current && heroButtonsRef.current.children.length > 0) {
          gsap.fromTo(
            heroButtonsRef.current.children,
            { opacity: 0, y: TRANSFORM.fadeUpYDesktop, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: DURATION.standard,
              stagger: STAGGER.normal,
              ease: EASE.smooth,
              immediateRender: false,
              scrollTrigger: stBase(heroButtonsRef.current, "top 80%"),
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
              duration: DURATION.slow,
              ease: EASE.smooth,
              immediateRender: false,
              scrollTrigger: stBase(heroCardRef.current, "top 70%"),
            },
          );
        }
        if (secondHeadingRef?.current) {
          gsap.fromTo(
            secondHeadingRef.current,
            { opacity: 0, x: -TRANSFORM.fadeX, scale: 0.99 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: DURATION.slow,
              ease: EASE.smooth,
              immediateRender: false,
              scrollTrigger: stBase(secondHeadingRef.current, "top 80%"),
            },
          );
        }
        secondTextRefs?.forEach((ref, index) => {
          if (ref?.current) {
            gsap.fromTo(
              ref.current,
              { opacity: 0, y: TRANSFORM.fadeUpY, x: index % 2 === 0 ? -12 : 12 },
              {
                opacity: 1,
                y: 0,
                x: 0,
                duration: DURATION.standard,
                delay: index * STAGGER.tight,
                ease: EASE.subtle,
                immediateRender: false,
                scrollTrigger: stBase(ref.current),
              },
            );
          }
        });
        featureCardsRefs?.forEach((ref, index) => {
          if (ref?.current) {
            gsap.fromTo(
              ref.current,
              { opacity: 0, scale: 0.98, y: TRANSFORM.fadeUpYDesktop },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: DURATION.standard,
                delay: index * STAGGER.tight,
                ease: EASE.smooth,
                immediateRender: false,
                scrollTrigger: stBase(ref.current),
              },
            );
          }
        });
        const serviceCards = servicesGridRef?.current
          ? Array.from(servicesGridRef.current.querySelectorAll("[data-service-card]"))
          : [];
        const cardCount = Math.max(serviceCards.length, serviceCardsRefs?.length ?? 0);
        for (let index = 0; index < cardCount; index++) {
          const card = serviceCardsRefs?.[index]?.current ?? serviceCards?.[index] ?? null;
          if (!card) continue;
          const fromX = index % 2 === 0 ? -12 : 12;
          const triggerStart = TRIGGER.early;
          gsap.fromTo(
            card,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: DURATION.slow,
              delay: index * STAGGER.relaxed,
              ease: EASE.smooth,
              immediateRender: false,
              scrollTrigger: stBase(card, triggerStart),
            },
          );
          gsap.fromTo(
            card,
            { opacity: 0, y: 28, x: fromX, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              duration: DURATION.slow,
              delay: index * STAGGER.relaxed,
              ease: EASE.smooth,
              overwrite: "auto",
              immediateRender: false,
              scrollTrigger: stBase(card, triggerStart),
            },
          );
          const content = card.querySelector("[data-service-card-content]");
          if (content) {
            gsap.fromTo(
              content,
              { opacity: 0, y: TRANSFORM.fadeUpYDesktop },
              {
                opacity: 1,
                y: 0,
                duration: DURATION.standard,
                delay: index * STAGGER.relaxed + 0.4,
                ease: EASE.smooth,
                immediateRender: false,
                scrollTrigger: stBase(card, triggerStart),
              },
            );
            const contentChildren = content.children;
            if (contentChildren?.length) {
              gsap.fromTo(
                contentChildren,
                { opacity: 0, y: TRANSFORM.fadeUpY },
                {
                  opacity: 1,
                  y: 0,
                  duration: DURATION.standard,
                  stagger: STAGGER.tight,
                  delay: index * STAGGER.relaxed + 0.5,
                  ease: EASE.subtle,
                  immediateRender: false,
                  scrollTrigger: stBase(card, triggerStart),
                },
              );
            }
          }
          if (runScrub) {
            gsap.to(card, {
              y: -6,
              scale: 1.015,
              ease: "none",
              overwrite: "auto",
              scrollTrigger: {
                trigger: card,
                start: "top 84%",
                end: "top 36%",
                scrub: 2,
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
              duration: DURATION.slow,
              ease: EASE.smooth,
              immediateRender: false,
              scrollTrigger: stBase(fourthHeadingRef.current, "top 80%"),
            },
          );
        }
        benefitCardsRefs?.forEach((ref, index) => {
          if (ref?.current) {
            gsap.fromTo(
              ref.current,
              { opacity: 0, y: TRANSFORM.fadeUpYDesktop, scale: 0.98 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: DURATION.standard,
                delay: index * STAGGER.normal,
                ease: EASE.smooth,
                immediateRender: false,
                scrollTrigger: stBase(ref.current),
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
              duration: DURATION.slow,
              ease: EASE.smooth,
              immediateRender: false,
              scrollTrigger: stBase(sixthHeadingRef.current, "top 80%"),
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
              duration: DURATION.slow,
              ease: EASE.smooth,
              immediateRender: false,
              scrollTrigger: stBase(eighthLeftRef.current, "top 80%"),
            },
          );
        }
        if (eighthFormRef?.current) {
          gsap.fromTo(
            eighthFormRef.current,
            { opacity: 0, x: 24, scale: 0.99, y: TRANSFORM.fadeUpY },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              y: 0,
              duration: DURATION.slow,
              ease: EASE.smooth,
              immediateRender: false,
              scrollTrigger: stBase(eighthFormRef.current, "top 80%"),
            },
          );
        }
        const heroHouseRef = document.querySelector("[data-hero-house]");
        if (heroHouseRef && runScrub) {
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
      } else {
        // Mobile: lighter fade-up only
        if (heroPillRef?.current) fadeUp(heroPillRef.current);
        if (heroHeadingRef?.current) fadeUp(heroHeadingRef.current);
        if (heroButtonsRef?.current && heroButtonsRef.current.children.length > 0) {
          gsap.fromTo(
            heroButtonsRef.current.children,
            { opacity: 0, y: TRANSFORM.fadeUpY },
            {
              opacity: 1,
              y: 0,
              duration: DURATION.quick,
              stagger: STAGGER.tight,
              ease: EASE.subtle,
              immediateRender: false,
              scrollTrigger: stBase(heroButtonsRef.current, "top 85%"),
            },
          );
        }
        if (heroCardRef?.current) fadeUp(heroCardRef.current);
        if (secondHeadingRef?.current) fadeUp(secondHeadingRef.current);
        secondTextRefs?.forEach((ref, index) => {
          if (ref?.current) fadeUp(ref.current, { delay: index * 0.05 });
        });
        featureCardsRefs?.forEach((ref, index) => {
          if (ref?.current) fadeUp(ref.current, { delay: index * 0.05 });
        });
        const serviceCardsMobile = servicesGridRef?.current
          ? Array.from(servicesGridRef.current.querySelectorAll("[data-service-card]"))
          : [];
        const cardCountMobile = Math.max(serviceCardsMobile.length, serviceCardsRefs?.length ?? 0);
        for (let index = 0; index < cardCountMobile; index++) {
          const card =
            serviceCardsRefs?.[index]?.current ?? serviceCardsMobile?.[index] ?? null;
          if (!card) continue;
          fadeUp(card, { delay: index * 0.08 });
          const content = card.querySelector("[data-service-card-content]");
          if (content) {
            gsap.fromTo(
              content,
              { opacity: 0, y: TRANSFORM.fadeUpY },
              {
                opacity: 1,
                y: 0,
                duration: DURATION.quick,
                delay: index * 0.08 + 0.25,
                ease: EASE.subtle,
                immediateRender: false,
                scrollTrigger: stBase(card, TRIGGER.early),
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
      }
      return () => {};
    },
  );

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

  mm.add(
    {
      desktop: MEDIA_DESKTOP,
      mobile: MEDIA_MOBILE,
      reduceMotion: MEDIA_REDUCE_MOTION,
    },
    (context) => {
      const { desktop, mobile, reduceMotion } = context.conditions;
      const runScrub = !reduceMotion && desktop;

      if (reduceMotion) {
        [heroPillRef, heroHeadingRef, heroCardRef, detailSecondHeadingRef, detailSecondImageRef, eighthLeftRef, eighthFormRef]
          .filter((r) => r?.current)
          .forEach((r) => gsap.set(r.current, { opacity: 1, y: 0, x: 0, scale: 1 }));
        heroButtonsRef?.current?.children && gsap.set(heroButtonsRef.current.children, { opacity: 1, y: 0, scale: 1 });
        detailSecondTextRefs?.forEach((r) => r?.current && gsap.set(r.current, { opacity: 1, y: 0 }));
        [detailThirdSectionRef, detailFourthCardsRef, detailStepCardsRef].forEach((container) => {
          container?.current?.querySelectorAll("[data-detail-card], [data-detail-step-card]").forEach((el) => gsap.set(el, { opacity: 1, y: 0, scale: 1, clipPath: "inset(0 0 0 0)" }));
        });
        return () => {};
      }

      if (desktop) {
        if (heroPillRef?.current) {
          gsap.fromTo(
            heroPillRef.current,
            { opacity: 0, y: -TRANSFORM.fadeUpY, scale: 0.99 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: DURATION.slow,
              ease: EASE.smooth,
              immediateRender: false,
              scrollTrigger: stBase(heroPillRef.current, "top 80%"),
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
      if (runScrub) {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          ease: "none",
          overwrite: "auto",
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
            end: "top 38%",
            scrub: 2,
          },
        });
      }
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
        { opacity: 0, x: 24, scale: 0.99, y: TRANSFORM.fadeUpY },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          y: 0,
          duration: DURATION.slow,
          ease: EASE.smooth,
          immediateRender: false,
          scrollTrigger: stBase(eighthFormRef.current, "top 80%"),
        },
      );
    }
      } else {
        const fadeUp = (el, opts = {}) => {
          if (!el) return;
          gsap.fromTo(
            el,
            { opacity: 0, y: TRANSFORM.fadeUpY },
            {
              opacity: 1,
              y: 0,
              duration: DURATION.quick,
              ease: EASE.subtle,
              immediateRender: false,
              scrollTrigger: stBase(el, TRIGGER.early),
              ...opts,
            },
          );
        };
        if (heroPillRef?.current) fadeUp(heroPillRef.current);
        if (heroHeadingRef?.current) fadeUp(heroHeadingRef.current);
        if (heroButtonsRef?.current && heroButtonsRef.current.children.length > 0) {
          gsap.fromTo(
            heroButtonsRef.current.children,
            { opacity: 0, y: TRANSFORM.fadeUpY },
            {
              opacity: 1,
              y: 0,
              duration: DURATION.quick,
              stagger: STAGGER.tight,
              ease: EASE.subtle,
              immediateRender: false,
              scrollTrigger: stBase(heroButtonsRef.current, "top 85%"),
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
          if (detailSecondImageRef?.current) fadeUp(detailSecondImageRef.current, { delay: 0.2 });
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
      }
      return () => {};
    },
  );

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

  mm.add(
    {
      desktop: MEDIA_DESKTOP,
      mobile: MEDIA_MOBILE,
      reduceMotion: MEDIA_REDUCE_MOTION,
    },
    (context) => {
      const { desktop, mobile, reduceMotion } = context.conditions;
      const fadeUp = (el, opts = {}) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: TRANSFORM.fadeUpY },
          {
            opacity: 1,
            y: 0,
            duration: reduceMotion ? 0 : (mobile ? DURATION.quick : DURATION.standard),
            ease: EASE.smooth,
            immediateRender: false,
            scrollTrigger: stBase(el, mobile ? TRIGGER.early : "top 90%"),
            ...opts,
          },
        );
      };
      if (reduceMotion) {
        cards.forEach((c) => gsap.set(c, { opacity: 1, y: 0 }));
        eighthLeftRef?.current && gsap.set(eighthLeftRef.current, { opacity: 1, x: 0, scale: 1 });
        eighthFormRef?.current && gsap.set(eighthFormRef.current, { opacity: 1, x: 0, scale: 1, y: 0 });
        return () => {};
      }
      if (desktop) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: TRANSFORM.fadeUpYDesktop },
            {
              opacity: 1,
              y: 0,
              duration: DURATION.standard,
              ease: EASE.smooth,
              delay: index * STAGGER.tight,
              immediateRender: false,
              scrollTrigger: stBase(card, "top 90%"),
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
              duration: DURATION.slow,
              ease: EASE.smooth,
              immediateRender: false,
              scrollTrigger: stBase(eighthLeftRef.current, "top 80%"),
            },
          );
        }
        if (eighthFormRef?.current) {
          gsap.fromTo(
            eighthFormRef.current,
            { opacity: 0, x: 24, scale: 0.99, y: TRANSFORM.fadeUpY },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              y: 0,
              duration: DURATION.standard,
              ease: EASE.smooth,
              immediateRender: false,
              scrollTrigger: stBase(eighthFormRef.current, "top 80%"),
            },
          );
        }
      } else {
        cards.forEach((card, index) => fadeUp(card, { delay: index * 0.05 }));
        if (eighthLeftRef?.current) fadeUp(eighthLeftRef.current);
        if (eighthFormRef?.current) fadeUp(eighthFormRef.current);
      }
      return () => {};
    },
  );

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

  mm.add(
    {
      desktop: MEDIA_DESKTOP,
      mobile: MEDIA_MOBILE,
      reduceMotion: MEDIA_REDUCE_MOTION,
    },
    (context) => {
      const { desktop, mobile, reduceMotion } = context.conditions;
      if (reduceMotion) {
        animated.forEach((el) => gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1, rotation: 0 }));
        return () => {};
      }
      if (desktop) {
        animated.forEach((el, index) => {
          const type = el.getAttribute("data-about-animate") || "fade-up";
          const base = {
            opacity: 0,
            y: TRANSFORM.fadeUpY,
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
            duration: type === "card" ? DURATION.slow : DURATION.standard,
            ease: EASE.smooth,
            immediateRender: false,
            scrollTrigger: stBase(el),
          });
        });
      } else {
        animated.forEach((el, index) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: TRANSFORM.fadeUpY },
            {
              opacity: 1,
              y: 0,
              duration: DURATION.quick,
              delay: index * 0.03,
              ease: EASE.subtle,
              immediateRender: false,
              scrollTrigger: stBase(el),
            },
          );
        });
      }
      return () => {};
    },
  );

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
