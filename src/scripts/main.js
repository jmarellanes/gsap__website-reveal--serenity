import gsap from "gsap";
import { createIcons, Menu, Search } from "lucide";

createIcons({
  icons: {
    Menu,
    Search,
  },
});

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

const tl = gsap.timeline({
  defaults: { ease: "expo.inOut" },
});

gsap.set(".title, .primary-nav > button", { visibility: "visible" });

tl.from("img", {
  duration: 3,
  scale: 2,
})

  .add("boxReveal", "=-2.6")
  .to(".hero-main-image__box", {
    duration: 2.4,
    y: "-100%",
  }, "boxReveal")

  .add("innerImageFade")
  .from("hero-main-image img", {
    duration: 0.4,
    opacity: 0,
  }, "innerImageFade")

  .add("wrapperResize")
  .to(".hero-main-image__wrapper", {
    duration: 2.4,
    width: 400,
    height: 500,
  }, "wrapperResize")

  .add("shutterOpen", "wrapperResize+=0.2")
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
  .from(".hamburger-toggle, .hero-navigation > div, .site-header__brand", {
    duration: 2,
    opacity: 0,
    y: 30,
    stagger: 0.1,
  }, "contentReveal")

  .add("textReveal", "contentReveal+=0.8")
  .from(".title .letter", {
    duration: 2,
    y: 100,
    opacity: 0,
    ease: "expo.out",
    stagger: 0.04,
  }, "textReveal");
