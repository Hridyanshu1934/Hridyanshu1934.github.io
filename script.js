const panels = document.querySelectorAll(".panel");
const dots = document.querySelectorAll(".dots span");
let current = 0;
let isAnimating = false;

/* Cursor (desktop only) */
const cursor = document.querySelector(".cursor");
if (!("ontouchstart" in window)) {
  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
} else {
  cursor.style.display = "none";
}

/* Slide navigation */
function goTo(index) {
  if (index < 0 || index >= panels.length || isAnimating) return;
  isAnimating = true;

  panels.forEach((p, i) => {
    p.classList.remove("active", "prev");
    if (i === index) p.classList.add("active");
    if (i < index) p.classList.add("prev");
  });

  dots.forEach(d => d.classList.remove("active"));
  dots[index].classList.add("active");

  current = index;
  setTimeout(() => isAnimating = false, 1000);
}

/* DESKTOP: mouse wheel */
window.addEventListener("wheel", e => {
  if ("ontouchstart" in window) return;
  if (e.deltaY > 0) goTo(current + 1);
  else goTo(current - 1);
});

/* DESKTOP: keyboard */
window.addEventListener("keydown", e => {
  if (e.key === "ArrowDown") goTo(current + 1);
  if (e.key === "ArrowUp") goTo(current - 1);
});

/* DOTS */
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => goTo(i));
});

/* 📱 MOBILE: TOUCH SWIPE */
let startY = 0;
let endY = 0;
const swipeThreshold = 50; // minimum swipe distance

window.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

window.addEventListener("touchend", e => {
  endY = e.changedTouches[0].clientY;
  handleSwipe();
});

function handleSwipe() {
  const deltaY = startY - endY;

  if (Math.abs(deltaY) < swipeThreshold) return;

  if (deltaY > 0) {
    // swipe up → next slide
    goTo(current + 1);
  } else {
    // swipe down → previous slide
    goTo(current - 1);
  }
}

