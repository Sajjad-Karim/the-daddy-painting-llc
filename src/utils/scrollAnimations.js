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
        duration: 1.35,
        ease: "back.out(1.4)",
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
        duration: 1.45,
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
      {
        opacity: 0,
        y: 60,
        scale: 0.6,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.15,
        stagger: 0.28,
        ease: "back.out(1.5)",
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
        duration: 1.35,
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
        duration: 1.15,
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
            duration: 0.95,
            delay: index * 0.15,
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
            duration: 1.0,
            delay: index * 0.15,
            ease: "back.out(1.3)",
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
  }

  // Third section: service cards – use refs; fallback to DOM query if ref not yet attached
  const serviceCards = servicesGridRef?.current
    ? Array.from(
        servicesGridRef.current.querySelectorAll("[data-service-card]"),
      )
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

      const fromX = index % 2 === 0 ? -28 : 28;
      const cardEase =
        index % 3 === 0
          ? "power3.out"
          : index % 3 === 1
            ? "back.out(1.15)"
            : "power2.out";
      const triggerStart = "top 92%"; // when card top hits 92% from top of viewport

      // 1) Clip-path wipe: card reveals from bottom-up
      gsap.fromTo(
        card,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 2.1,
          delay: index * 0.24,
          ease: "power3.inOut",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: triggerStart,
            toggleActions: "play none none reverse",
          },
        },
      );

      // 2) Blur-in + rise + scale + alternating horizontal: advanced entrance
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 95,
          x: fromX,
          scale: 0.86,
          filter: "blur(16px)",
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 3.0,
          delay: index * 0.32,
          ease: cardEase,
          overwrite: "auto",
          immediateRender: false,
          scrollTrigger: {
            trigger: card,
            start: triggerStart,
            toggleActions: "play none none reverse",
          },
        },
      );

      // 3) Staggered content reveal: overlay slides up + fades in
      const content = card.querySelector("[data-service-card-content]");
      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            delay: index * 0.24 + 0.85,
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
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              stagger: 0.17,
              delay: index * 0.24 + 1.0,
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

      // 4) Scroll-linked depth: lift + scale (2D scrub)
      gsap.to(card, {
        y: -14,
        scale: 1.05,
        ease: "none",
        overwrite: "auto",
        scrollTrigger: {
          trigger: card,
          start: "top 84%",
          end: "top 36%",
          scrub: 3.0,
        },
      });
    }
  }

  ScrollTrigger.refresh();

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
        duration: 1.15,
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
            duration: 1.0,
            delay: index * 0.2,
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
        duration: 1.1,
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
        duration: 1.15,
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
        duration: 1.15,
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
        scrub: 1.8,
      },
    });
  }

  // Refresh ScrollTrigger to ensure all triggers are properly calculated
  ScrollTrigger.refresh();
};

/**
 * Detail page scroll animations: hero, cards (clip-path, blur-in, content reveal, scroll depth), contact section.
 * Expects refs: heroPillRef, heroHeadingRef, heroButtonsRef, heroCardRef, detailSecondHeadingRef, detailSecondTextRefs, detailSecondImageRef, detailThirdSectionRef, detailFourthCardsRef, detailStepCardsRef, eighthLeftRef, eighthFormRef.
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

  // Hero section – same as home (strong entrance)
  if (heroPillRef?.current) {
    gsap.fromTo(
      heroPillRef.current,
      { opacity: 0, y: -80, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.35,
        ease: "back.out(1.4)",
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
      { opacity: 0, y: 100, scale: 0.7, x: -20 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        x: 0,
        duration: 1.45,
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
      { opacity: 0, y: 60, scale: 0.6 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.15,
        stagger: 0.28,
        ease: "back.out(1.5)",
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
      { opacity: 0, x: 220, scale: 0.65, rotation: 15 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 1.35,
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

  // Second section: "We treat your home like our own" – heading, paragraphs stagger, image blur-in
  const secondTrigger = detailSecondHeadingRef?.current;
  const secondSectionTriggerStart = "top 82%";
  if (secondTrigger) {
    gsap.fromTo(
      secondTrigger,
      { opacity: 0, x: -70, scale: 0.92 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
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
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        delay: 0.22 + index * 0.18,
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
      {
        opacity: 0,
        x: 90,
        scale: 0.88,
        filter: "blur(14px)",
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.35,
        delay: 0.45,
        ease: "back.out(1.12)",
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
    // 1) Clip-path wipe: card reveals from bottom-up
    gsap.fromTo(
      card,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.25,
        delay: index * 0.18,
        ease: "power3.inOut",
        immediateRender: false,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      },
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
        duration: 1.45,
        delay: index * 0.18,
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

    // 3) Staggered content: inner content slides up + fades in
    const content = card.querySelector(
      "[data-detail-card-content], [data-detail-step-card-content]",
    );
    if (content) {
      gsap.fromTo(
        content,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay: index * 0.18 + 0.55,
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
        scrub: 2.0,
      },
    });
  };

  if (detailThirdSectionRef?.current) {
    const cards =
      detailThirdSectionRef.current.querySelectorAll("[data-detail-card]");
    cards.forEach((card, index) => applyCardAnimation(card, index));
  }

  if (detailFourthCardsRef?.current) {
    const cards =
      detailFourthCardsRef.current.querySelectorAll("[data-detail-card]");
    cards.forEach((card, index) => applyCardAnimation(card, index));
  }

  if (detailStepCardsRef?.current) {
    const cards = detailStepCardsRef.current.querySelectorAll(
      "[data-detail-step-card]",
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
        duration: 1.15,
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
      { opacity: 0, x: 80, scale: 0.95, y: 30 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        y: 0,
        duration: 1.15,
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

  ScrollTrigger.refresh();
};

/**
 * Services page scroll animations: service grid cards (rotation animations) + contact section.
 * Expects refs: servicesCardsRootRef, eighthLeftRef, eighthFormRef
 */
export const initServicesScrollAnimations = (refs) => {
  const { servicesCardsRootRef, eighthLeftRef, eighthFormRef } = refs;

  const root = servicesCardsRootRef?.current;
  if (!root) return;

  const cards = root.querySelectorAll("[data-services-card]");
  if (!cards?.length) return;

  cards.forEach((card, index) => {
    const imageWrap = card.querySelector("[data-services-card-image]");
    const chip = card.querySelector("[data-services-card-chip]");
    const content = card.querySelector("[data-services-card-content]");
    const pills = content?.querySelectorAll("span");

    // Alternating rotation directions for visual variety
    const rotationDirection = index % 2 === 0 ? 1 : -1;
    const initialRotation = rotationDirection * 18;
    const start = "top 90%";

    // Set initial state
    gsap.set(card, {
      opacity: 0,
      rotation: initialRotation,
      scale: 0.85,
      y: 60,
      transformOrigin: "center center",
      force3D: true,
    });

    // Initial entrance: rotate in from tilted position
    gsap.to(card, {
      opacity: 1,
      rotation: 0,
      scale: 1,
      y: 0,
      duration: 1.5,
      ease: "back.out(1.2)",
      delay: index * 0.15,
      immediateRender: false,
      scrollTrigger: {
        trigger: card,
        start,
        toggleActions: "play none none reverse",
      },
    });

    // Image: rotate in with card
    if (imageWrap) {
      gsap.set(imageWrap, {
        rotation: initialRotation * 0.6,
        opacity: 0,
        transformOrigin: "center center",
        force3D: true,
      });
      gsap.to(imageWrap, {
        rotation: 0,
        opacity: 1,
        duration: 1.3,
        ease: "power3.out",
        delay: index * 0.15 + 0.18,
        immediateRender: false,
        scrollTrigger: {
          trigger: card,
          start,
          toggleActions: "play none none reverse",
        },
      });
    }

    // Chip: rotate in with bounce
    if (chip) {
      gsap.set(chip, {
        rotation: rotationDirection * 25,
        opacity: 0,
        scale: 0.8,
        transformOrigin: "center center",
        force3D: true,
      });
      gsap.to(chip, {
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: "elastic.out(1, 0.5)",
        delay: index * 0.15 + 0.35,
        immediateRender: false,
        scrollTrigger: {
          trigger: card,
          start,
          toggleActions: "play none none reverse",
        },
      });
    }

    // Content: subtle rotation entrance
    if (content) {
      gsap.set(content, {
        rotation: rotationDirection * 8,
        opacity: 0,
        y: 20,
        transformOrigin: "center center",
        force3D: true,
      });
      gsap.to(content, {
        rotation: 0,
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: index * 0.15 + 0.4,
        immediateRender: false,
        scrollTrigger: {
          trigger: card,
          start,
          toggleActions: "play none none reverse",
        },
      });
    }

    // Pills: stagger rotate in
    if (pills?.length) {
      gsap.set(pills, {
        rotation: rotationDirection * 12,
        opacity: 0,
        scale: 0.85,
        transformOrigin: "center center",
        force3D: true,
      });
      gsap.to(pills, {
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.3)",
        delay: index * 0.15 + 0.6,
        immediateRender: false,
        scrollTrigger: {
          trigger: card,
          start,
          toggleActions: "play none none reverse",
        },
      });
    }

    // Scroll-linked rotation: rotate as card moves through viewport
    // Rotate from negative to positive as card enters and moves up
    gsap.to(card, {
      rotation: rotationDirection * 4,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 60%",
        scrub: 2.0,
      },
    });

    // Rotate back to center as card reaches middle
    gsap.to(card, {
      rotation: 0,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: card,
        start: "top 60%",
        end: "top 40%",
        scrub: 2.0,
      },
    });

    // Rotate opposite direction as card exits
    gsap.to(card, {
      rotation: rotationDirection * -3,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: card,
        start: "top 40%",
        end: "top 15%",
        scrub: 2.0,
      },
    });

    // Image: counter-rotate for parallax effect
    if (imageWrap) {
      gsap.to(imageWrap, {
        rotation: rotationDirection * -1.5,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 20%",
          scrub: 2.2,
        },
      });
    }

    // Chip: subtle rotation
    if (chip) {
      gsap.to(chip, {
        rotation: rotationDirection * -8,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top 70%",
          end: "top 30%",
          scrub: 2.2,
        },
      });
    }

    // Scroll-linked depth with rotation
    gsap.to(card, {
      y: -10,
      scale: 1.02,
      ease: "none",
      overwrite: "auto",
      scrollTrigger: {
        trigger: card,
        start: "top 75%",
        end: "top 35%",
        scrub: 2.0,
      },
    });
  });

  // Contact section (eighth) – same as home/detail (split animation)
  if (eighthLeftRef?.current) {
    gsap.fromTo(
      eighthLeftRef.current,
      { opacity: 0, x: -80, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.15,
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
      { opacity: 0, x: 80, scale: 0.95, y: 30 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        y: 0,
        duration: 1.15,
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

  ScrollTrigger.refresh();
};

/**
 * About page scroll animations: story section, commitment, values, feature cards, contact.
 * Expects refs: aboutRootRef, aboutStoryRef, aboutStoryTextRefs, aboutStoryImageRef, aboutCommitmentRef, aboutCommitmentTextRefs, aboutValuesRef, aboutFeatureCardsRefs, eighthLeftRef, eighthFormRef.
 */
export const initAboutScrollAnimations = (refs) => {
  const {
    aboutRootRef,
    // refs still passed, but we animate via data attributes now
  } = refs;

  const root = aboutRootRef?.current;
  if (!root) return;

  const animated = Array.from(root.querySelectorAll("[data-about-animate]"));
  if (!animated.length) return;

  animated.forEach((el, index) => {
    const type = el.getAttribute("data-about-animate") || "fade-up";

    const base = {
      opacity: 0,
      y: 18,
      x: 0,
      scale: 0.98,
      rotation: 0,
      filter: "blur(8px)",
      transformOrigin: "center center",
      force3D: true,
    };

    if (type === "fade-left") {
      base.x = -40;
      base.y = 0;
    } else if (type === "fade-right") {
      base.x = 40;
      base.y = 0;
    } else if (type === "fade-down") {
      base.y = -28;
    } else if (type === "zoom") {
      base.y = 0;
      base.scale = 0.85;
      base.filter = "blur(10px)";
    } else if (type === "rotate") {
      base.y = 0;
      base.rotation = index % 2 === 0 ? 16 : -16;
      base.scale = 0.92;
      base.filter = "blur(6px)";
    } else if (type === "card") {
      base.y = 28;
      base.scale = 0.92;
      base.rotation = index % 2 === 0 ? 6 : -6;
      base.filter = "blur(10px)";
    }

    gsap.set(el, base);

    gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      filter: "blur(0px)",
      duration: type === "card" ? 1.2 : 1.1,
      ease: type === "rotate" ? "back.out(1.15)" : "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
  });

  ScrollTrigger.refresh();
};

/**
 * Cleanup function to kill all ScrollTrigger instances
 */
export const cleanupScrollAnimations = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
