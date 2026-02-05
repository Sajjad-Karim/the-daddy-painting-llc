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
    thirdSectionRef,
    serviceCardsRefs,
    servicesGridRef,
    fourthSectionRef,
    fourthHeadingRef,
    benefitCardsRefs,
    sixthSectionRef,
    sixthHeadingRef,
    eighthSectionRef,
    eighthLeftRef,
    eighthFormRef,
  } = refs;

  // Hero section animations
  if (heroPillRef?.current) {
    gsap.fromTo(
      heroPillRef.current,
      {
        opacity: 0,
        y: -30,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
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
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
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
        y: 30,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)",
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
        x: 100,
        scale: 0.85,
        rotation: 5,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 0.8,
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

  // Service cards - advanced rotation + zoom + 3D flip animation
  if (serviceCardsRefs?.length) {
    // Set perspective on the grid container for 3D effects
    if (servicesGridRef?.current) {
      gsap.set(servicesGridRef.current, {
        perspective: 1000,
        transformStyle: "preserve-3d",
      });
    }

    serviceCardsRefs.forEach((ref, index) => {
      if (ref?.current) {
        // Different rotation patterns for variety - creates a dynamic 3D flip effect
        const rotationPatterns = [
          { rotationX: -30, rotationY: -25, rotationZ: -8 }, // Card 0 - Interior
          { rotationX: 5, rotationY: 30, rotationZ: 10 }, // Card 1 - Exterior
          { rotationX: 30, rotationY: -20, rotationZ: -12 }, // Card 2 - Cabinet
          { rotationX: -25, rotationY: 25, rotationZ: 15 }, // Card 3 - Deck
          { rotationX: 25, rotationY: -30, rotationZ: -8 }, // Card 4 - Power Wash
          { rotationX: -20, rotationY: 20, rotationZ: 12 }, // Card 5 - Drywall
        ];

        const pattern = rotationPatterns[index] || {
          rotationX: index % 2 === 0 ? -25 : 25,
          rotationY: index % 2 === 0 ? -20 : 20,
          rotationZ: index % 2 === 0 ? -8 : 8,
        };

        // Initial entrance animation with 3D rotation
        gsap.fromTo(
          ref.current,
          {
            opacity: 0,
            scale: 0.6,
            y: 100,
            rotationX: pattern.rotationX,
            rotationY: pattern.rotationY,
            rotationZ: pattern.rotationZ,
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            duration: 1.2,
            delay: index * 0.18,
            ease: "back.out(1.5)",
            immediateRender: false,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Continuous subtle 3D rotation on scroll for depth effect
        gsap.to(ref.current, {
          rotationY: index % 2 === 0 ? 3 : -3,
          rotationX: index % 3 === 0 ? 2 : -2,
          ease: "sine.inOut",
          duration: 3,
          repeat: -1,
          yoyo: true,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.5,
          },
        });

        // Add hover-like effect on scroll - subtle scale and rotation
        gsap.to(ref.current, {
          scale: 1.05,
          rotationY: index % 2 === 0 ? 5 : -5,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 60%",
            end: "top 40%",
            scrub: true,
          },
        });
      }
    });
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
 * Cleanup function to kill all ScrollTrigger instances
 */
export const cleanupScrollAnimations = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
