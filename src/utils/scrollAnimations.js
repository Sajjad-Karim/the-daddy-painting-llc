/**
 * Animation utilities placeholder.
 *
 * All GSAP-based scroll animations have been removed for now.
 * We keep these exports so pages can import them later when
 * new animations are reintroduced.
 */

// No-op: previously scheduled ScrollTrigger.refresh on resize
export const setupScrollTriggerResize = () => {
  return () => {};
};

// No-op: previously home page scroll animations
export const initScrollAnimations = () => {};

// No-op: previously service-detail scroll animations
export const initDetailScrollAnimations = () => {};

// No-op: previously services page scroll animations
export const initServicesScrollAnimations = () => {};

// No-op: previously about/why/gallery scroll animations
export const initAboutScrollAnimations = () => {};

// No-op: previously cleaned up ScrollTrigger + matchMedia contexts
export const cleanupScrollAnimations = () => {};
