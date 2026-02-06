import gsap from "gsap";
import { createIcons, Menu, Search } from "lucide";

createIcons({
  icons: {
    Menu,
    Search,
  },
});

const mm = gsap.matchMedia();
const textWrapper = document.querySelector(".title");
if (textWrapper) {
  const text = textWrapper.textContent.trim();
  textWrapper.innerHTML = "";

  text.split(" ").forEach((word) => {
    const wordSpan = document.createElement("span");
    wordSpan.style.display = "inline-block";

    wordSpan.innerHTML = word
      .split("")
      .map((char) => {
        return `<span class='letter' style='display:inline-block'>${char}</span>`;
      })
      .join("");

    textWrapper.appendChild(wordSpan);
  });
}

mm.add({
  isDesktop: "(min-width: 581px)",
  isMobile: "(max-width: 580px)",
}, (context) => {
  const { isMobile } = context.conditions;

  const tl = gsap.timeline({
    defaults: { ease: "expo.inOut" },
  });

  tl.from("img", {
    duration: 3,
    scale: 2,
  })

    .add("boxReveal", "=-2.6")
    .to(".hero-main-image__box", {
      duration: 2.4,
      y: "-100%",
    }, "boxReveal")

    .add("wrapperResize")
    .to(".hero-main-image__wrapper", {
      duration: 2.4,
      width: isMobile ? "80vw" : 400,
      height: isMobile ? "70vh" : 500,
    }, "wrapperResize")

    .add("shutterOpen", "wrapperResize+=0.2")
    .set(".left, .right", { autoAlpha: 1 }, "shutterOpen")
    .to(".left", {
      duration: 2,
      x: -250,
      y: 20,
      rotation: -10,
    }, "shutterOpen")
    .to(".right", {
      duration: 2,
      x: 250,
      y: 20,
      rotation: 10,
    }, "shutterOpen")

    .add("contentReveal", "shutterOpen+=0.2")
    .fromTo(".hamburger-toggle, .hero-navigation > div, .site-header__brand", {
      y: 30,
      autoAlpha: 0,
    }, {
      duration: 2,
      y: 0,
      autoAlpha: 1,
      stagger: 0.1,
    }, "contentReveal")

    .add("textReveal", "contentReveal+=0.8")
    .set(".title", { visibility: "visible" }, "textReveal")
    .from(".title .letter", {
      duration: 2,
      y: 100,
      opacity: 0,
      ease: "expo.out",
      stagger: 0.04,
    }, "textReveal");
});
