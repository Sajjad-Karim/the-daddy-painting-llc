import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize scroll animations for the home page
 * @param {Object} refs - Object containing refs for different sections
 */
export const initScrollAnimations = (refs) => {
  const {
    heroContentRef,
    heroPillRef,
    heroHeadingRef,
    heroButtonsRef,
    heroCardRef,
    secondSectionRef,
    secondHeadingRef,
    secondTextRefs,
    featureCardsRefs,
    servicesGridRef,
    serviceCardsRefs,
    fourthSectionRef,
    fourthHeadingRef,
    benefitCardsRefs,
    sixthSectionRef,
    sixthHeadingRef,
    eighthSectionRef,
    eighthLeftRef,
    eighthFormRef,
  } = refs;

  // Hero section animations – stronger, more visible entrance
  if (heroPillRef?.current) {
    gsap.fromTo(
      heroPillRef.current,
      {
        opacity: 0,
        y: -80,
        scale: 0.5,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: "back.out(1.4)",
        immediateRender: false,
        scrollTrigger: {
          trigger: heroPillRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  if (heroHeadingRef?.current) {
    gsap.fromTo(
      heroHeadingRef.current,
      {
        opacity: 0,
        y: 100,
        scale: 0.7,
        x: -20,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: heroHeadingRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  if (heroButtonsRef?.current && heroButtonsRef.current.children.length > 0) {
    gsap.fromTo(
      heroButtonsRef.current.children,
      {
        opacity: 0,
        y: 60,
        scale: 0.6,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.2,
        ease: "back.out(1.5)",
        immediateRender: false,
        scrollTrigger: {
          trigger: heroButtonsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  if (heroCardRef?.current) {
    gsap.fromTo(
      heroCardRef.current,
      {
        opacity: 0,
        x: 220,
        scale: 0.65,
        rotation: 15,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 1.1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: heroCardRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Second section animations
  if (secondHeadingRef?.current) {
    gsap.fromTo(
      secondHeadingRef.current,
      {
        opacity: 0,
        x: -80,
        scale: 0.9,
      },
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
      }
    );
  }

  if (secondTextRefs?.length) {
    secondTextRefs.forEach((ref, index) => {
      if (ref?.current) {
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            y: 40,
            x: index % 2 === 0 ? -30 : 30,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }

  // Feature cards - zoom in effect
  if (featureCardsRefs?.length) {
    featureCardsRefs.forEach((ref, index) => {
      if (ref?.current) {
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            scale: 0.6,
            y: 50,
            rotation: index % 2 === 0 ? -10 : 10,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: "back.out(1.3)",
            immediateRender: false,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }

  // Third section: service cards – modern advanced (clip-path, blur-in, content reveal, scroll depth, 2D so link stays clickable)
  const servicesGrid = servicesGridRef?.current;
  if (servicesGrid) {
    const cards = servicesGrid.querySelectorAll("[data-service-card]");
    cards.forEach((card, index) => {
      // 1) Clip-path wipe: card reveals from bottom-up
      gsap.fromTo(
        card,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          delay: index * 0.12,
          ease: "power3.inOut",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2) Blur-in + rise + scale: modern entrance
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 90,
          scale: 0.88,
          filter: "blur(14px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          delay: index * 0.12,
          ease: "power3.out",
          overwrite: "auto",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 3) Staggered content reveal: overlay slides up + fades in after card
      const content = card.querySelector("[data-service-card-content]");
      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: index * 0.12 + 0.4,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 4) Scroll-linked depth: lift + scale (2D scrub)
      gsap.to(card, {
        y: -12,
        scale: 1.04,
        ease: "none",
        overwrite: "auto",
        scrollTrigger: {
          trigger: card,
          start: "top 84%",
          end: "top 38%",
          scrub: 1.2,
        },
      });
    });
    ScrollTrigger.refresh();
  }

  // Fourth section - slide from left
  if (fourthHeadingRef?.current) {
    gsap.fromTo(
      fourthHeadingRef.current,
      {
        opacity: 0,
        x: -100,
        scale: 0.95,
      },
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
      }
    );
  }

  // Benefit cards - flip animation
  if (benefitCardsRefs?.length) {
    benefitCardsRefs.forEach((ref, index) => {
      if (ref?.current) {
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.85,
            rotationX: 45,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            transformOrigin: "center bottom",
            duration: 0.7,
            delay: index * 0.15,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }

  // Sixth section - zoom in
  if (sixthHeadingRef?.current) {
    gsap.fromTo(
      sixthHeadingRef.current,
      {
        opacity: 0,
        scale: 0.8,
        y: 40,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: sixthHeadingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Eighth section - split animation
  if (eighthLeftRef?.current) {
    gsap.fromTo(
      eighthLeftRef.current,
      {
        opacity: 0,
        x: -80,
        scale: 0.95,
      },
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
      }
    );
  }

  if (eighthFormRef?.current) {
    gsap.fromTo(
      eighthFormRef.current,
      {
        opacity: 0,
        x: 80,
        scale: 0.95,
        y: 30,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: eighthFormRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  // Parallax effect for hero house image
  const heroHouseRef = document.querySelector("[data-hero-house]");
  if (heroHouseRef) {
    gsap.to(heroHouseRef, {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: heroHouseRef,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }

  // Refresh ScrollTrigger to ensure all triggers are properly calculated
  ScrollTrigger.refresh();
};

/**
 * Detail page scroll animations: hero, cards (clip-path, blur-in, content reveal, scroll depth), contact section.
 * Expects refs: heroPillRef, heroHeadingRef, heroButtonsRef, heroCardRef, detailThirdSectionRef, detailFourthCardsRef, detailStepCardsRef, eighthLeftRef, eighthFormRef.
 */
export const initDetailScrollAnimations = (refs) => {
  const {
    heroPillRef,
    heroHeadingRef,
    heroButtonsRef,
    heroCardRef,
    detailThirdSectionRef,
    detailFourthCardsRef,
    detailStepCardsRef,
    eighthLeftRef,
    eighthFormRef,
  } = refs;

  // Hero section – same as home (strong entrance)
  if (heroPillRef?.current) {
    gsap.fromTo(
      heroPillRef.current,
      { opacity: 0, y: -80, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: "back.out(1.4)",
        immediateRender: false,
        scrollTrigger: {
          trigger: heroPillRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }
  if (heroHeadingRef?.current) {
    gsap.fromTo(
      heroHeadingRef.current,
      { opacity: 0, y: 100, scale: 0.7, x: -20 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: heroHeadingRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }
  if (heroButtonsRef?.current && heroButtonsRef.current.children.length > 0) {
    gsap.fromTo(
      heroButtonsRef.current.children,
      { opacity: 0, y: 60, scale: 0.6 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.2,
        ease: "back.out(1.5)",
        immediateRender: false,
        scrollTrigger: {
          trigger: heroButtonsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }
  if (heroCardRef?.current) {
    gsap.fromTo(
      heroCardRef.current,
      { opacity: 0, x: 220, scale: 0.65, rotation: 15 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 1.1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: heroCardRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  const applyCardAnimation = (card, index) => {
    // 1) Clip-path wipe: card reveals from bottom-up
    gsap.fromTo(
      card,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9,
        delay: index * 0.12,
        ease: "power3.inOut",
        immediateRender: false,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // 2) Blur-in + rise + scale: advanced entrance
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 90,
        scale: 0.88,
        filter: "blur(14px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.1,
        delay: index * 0.12,
        ease: "power3.out",
        overwrite: "auto",
        immediateRender: false,
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // 3) Staggered content: inner content slides up + fades in
    const content = card.querySelector("[data-detail-card-content], [data-detail-step-card-content]");
    if (content) {
      gsap.fromTo(
        content,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.12 + 0.35,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // 4) Scroll-linked depth: lift + scale (scrub)
    gsap.to(card, {
      y: -12,
      scale: 1.04,
      ease: "none",
      overwrite: "auto",
      scrollTrigger: {
        trigger: card,
        start: "top 84%",
        end: "top 38%",
        scrub: 1.2,
      },
    });
  };

  if (detailThirdSectionRef?.current) {
    const cards = detailThirdSectionRef.current.querySelectorAll(
      "[data-detail-card]"
    );
    cards.forEach((card, index) => applyCardAnimation(card, index));
  }

  if (detailFourthCardsRef?.current) {
    const cards =
      detailFourthCardsRef.current.querySelectorAll("[data-detail-card]");
    cards.forEach((card, index) => applyCardAnimation(card, index));
  }

  if (detailStepCardsRef?.current) {
    const cards = detailStepCardsRef.current.querySelectorAll(
      "[data-detail-step-card]"
    );
    cards.forEach((card, index) => applyCardAnimation(card, index));
  }

  // Eighth section (contact) – same as home (split animation)
  if (eighthLeftRef?.current) {
    gsap.fromTo(
      eighthLeftRef.current,
      { opacity: 0, x: -80, scale: 0.95 },
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
      }
    );
  }
  if (eighthFormRef?.current) {
    gsap.fromTo(
      eighthFormRef.current,
      { opacity: 0, x: 80, scale: 0.95, y: 30 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: eighthFormRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }

  ScrollTrigger.refresh();
};

/**
 * Cleanup function to kill all ScrollTrigger instances
 */
export const cleanupScrollAnimations = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
