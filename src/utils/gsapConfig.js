/**
 * Premium GSAP animation config – Apple/Stripe/Linear style
 * Shared constants for consistency, performance, and accessibility
 */

// Easing – natural, fluid motion (power2.out ≈ 0.33,0,0.2,1; power3.out ≈ 0.25,0,0.2,1)
export const EASE = {
  /** Subtle, quick – micro-interactions, buttons */
  subtle: "power2.out",
  /** Standard – most scroll reveals, cards */
  smooth: "power3.out",
  /** Slightly bouncy – hero, emphasis */
  gentle: "power2.out",
  /** Custom cubic-bezier for ultra-smooth feel */
  fluid: "cubic-bezier(0.25, 0.1, 0.25, 1)",
};

// Durations (seconds) – avoid over-animation
export const DURATION = {
  /** Micro – buttons, hover states */
  micro: 0.2,
  /** Quick – inline elements */
  quick: 0.35,
  /** Standard – cards, sections */
  standard: 0.6,
  /** Slow – hero, large blocks */
  slow: 0.9,
};

// Stagger delays
export const STAGGER = {
  /** Tight – list items */
  tight: 0.04,
  /** Normal – cards, text lines */
  normal: 0.08,
  /** Relaxed – sections */
  relaxed: 0.12,
};

// ScrollTrigger start points – when element enters viewport
export const TRIGGER = {
  /** Early – starts animating just before fully in view */
  early: "top 92%",
  /** Default – balanced */
  default: "top 85%",
  /** Late – element mostly visible */
  late: "top 75%",
};

// Transform values – subtle to prevent layout shift
export const TRANSFORM = {
  /** Fade-up – minimal y */
  fadeUpY: 12,
  /** Fade-up – desktop */
  fadeUpYDesktop: 20,
  /** Horizontal – subtle */
  fadeX: 16,
};
