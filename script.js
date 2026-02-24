const panels = document.querySelectorAll(".panel");
const dots = document.querySelectorAll(".dots span");
let current = 0;
let isAnimating = false;

/* Cursor */
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* Navigation */
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

/* Scroll */
window.addEventListener("wheel", e => {
  if (e.deltaY > 0) goTo(current + 1);
  else goTo(current - 1);
});

/* Keyboard */
window.addEventListener("keydown", e => {
  if (e.key === "ArrowDown") goTo(current + 1);
  if (e.key === "ArrowUp") goTo(current - 1);
});

/* Dot click */
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => goTo(i));
});