const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const header = document.querySelector(".site-header");
let isCompact = false;
let ticking = false;

const updateHeader = () => {
  if (!header) return;

  const shouldCompact = window.scrollY > 96;
  const shouldExpand = window.scrollY < 4;

  if (!isCompact && shouldCompact) {
    isCompact = true;
    header.classList.add("is-compact");
  } else if (isCompact && shouldExpand) {
    isCompact = false;
    header.classList.remove("is-compact");
  }
};

const requestHeaderUpdate = () => {
  if (ticking) return;

  ticking = true;
  window.requestAnimationFrame(() => {
    updateHeader();
    ticking = false;
  });
};

updateHeader();
window.addEventListener("scroll", requestHeaderUpdate, { passive: true });

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}
