import * as TWEEN from "tween";
import { gsap, Power1, Circ, Sine } from "gsap";

export const tweenCameraZoom = (zoomEnd, camera) => {
  const zoom = {
    value: camera.zoom,
  };

  // camera zoom
  new TWEEN.Tween(zoom)
    .to({ value: zoomEnd }, 1200)
    .easing(TWEEN.Easing.Quartic.Out)
    .onUpdate(() => {
      camera.zoom = zoom.value;
    })
    .start();
};

export const tweenCameraPosition = (x, y, z, ms, camera) => {
  // camera position
  new TWEEN.Tween(camera.position)
    .delay(0)
    .to(
      {
        x: x,
        y: y,
        z: z,
      },
      ms
    )
    .easing(TWEEN.Easing.Quartic.Out)
    .start();
};

export const animateText = (dom) => {
  let tl = gsap.timeline();
  tl.to("#humainsScore", { opacity: 0, x: 0, duration: 0.1 })
    .to("#contenuScore", { opacity: 0, x: 0, duration: 0.1 })
    .fromTo(
      dom,
      { amount: "0" },
      {
        amount: dom.amount,
        onUpdate: () => {
          humainsScore.innerHTML = dom.amount + dom.type;
          contenuScore.innerHTML = dom.text;
        },
        duration: dom.animation.ms,
        ease: dom.animation.ease,
      }
    )
    .to(
      "#humainsScore",
      { opacity: 1, x: -10, duration: 3, ease: Power1.easeInOut },
      0.1
    )
    .to(
      "#contenuScore",
      { opacity: 1, x: -35, duration: 3, ease: Circ.easeInOut },
      0.4
    );
};

export const animateLoader = (progress) => {
  let itemsLoading = { amount: progress };
  let tl = gsap.timeline();
  tl.to(itemsLoading, {
    amount: "100",
    onUpdate: () => {
      let loadingNumber = document.getElementById("loaderNumber");
      loadingNumber.innerHTML = itemsLoading.amount + " %";
    },
    duration: 1.5,
    ease: Circ.easeIn,
  });
};

export const fadeOutLoader = () => {
  let tl = gsap.timeline();
  tl.to("#loader", {
    delay: 0.4,
    opacity: 0,
    display: "none",
    duration: 0.5,
    ease: Sine.easeInOut,
  });
};
