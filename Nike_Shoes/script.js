var tl = gsap.timeline();

gsap.set(".a", {
  opacity: 0,
  y: 10,
});

gsap.set("#right img", {
  opacity: 0,
  y: 10,
  scale: 1.6,
});

tl.from("#left", {
  width: 0,
  duration: 1,
  ease: Expo.easeInOut,
})

  .from("#right", {
    width: 0,
    duration: 1,
    ease: Expo.easeInOut,
  })

  .to(".a", {
    delay: -2,
    stagger: 0.2,
    opacity: 1,
    y: 0,
    ease: Expo.easeInOut,
    duration: 1.5,
  })

  .to("#right img", {
    delay: -1,
    opacity: 1,
    y: 0,
    scale: 1,
    ease: Expo.easeInOut,
    duration: 1,
  });
