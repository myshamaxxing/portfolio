// const scrollArea = document.getElementById("heroScroll");
// const scene = scrollArea.querySelector(".scene");

// function clamp01(n) {
//   return Math.max(0, Math.min(1, n));
// }

// function lerp(a, b, t) {
//   return a + (b - a) * t;
// }

// function loop() {
//   const rect = scrollArea.getBoundingClientRect();
//   const total = scrollArea.offsetHeight - window.innerHeight;
//   const scrolled = -rect.top;
//   const t = clamp01(scrolled / total); // 0..1

//   // --- ANIMATION (edit these like Figma keyframes) ---
//   // Name: move up + shrink a bit
//   const nameY = lerp(0, -160, t);
//   const nameS = lerp(1, 0.70, t);
//   const nameO = lerp(1, 1, t);

//   // Rabbit + Flowers: subtle parallax drift
//   const rabbitY = lerp(0, 35, t);
//   const rabbitS = lerp(1, 1.03, t);

//   const flowersY = lerp(0, 65, t);
//   const flowersS = lerp(1, 0.95, t);

//   scene.style.setProperty("--nameY", `${nameY}px`);
//   scene.style.setProperty("--nameS", nameS);
//   scene.style.setProperty("--nameO", nameO);

// //   scene.style.setProperty("--rabbitY", `${rabbitY}px`);
// //   scene.style.setProperty("--rabbitS", rabbitS);

// //   scene.style.setProperty("--flowersY", `${flowersY}px`);
// //   scene.style.setProperty("--flowersS", flowersS);

//   requestAnimationFrame(loop);
// }

// requestAnimationFrame(loop);


const scene = document.getElementById("scene");
const nameEl = document.getElementById("nameFixed");
const navEl  = document.getElementById("navFixed");

function clamp01(n){ return Math.max(0, Math.min(1, n)); }
function lerp(a,b,t){ return a + (b-a)*t; }

function loop(){
  // How far through the scene have we scrolled? (0..1)
  const sceneRect = scene.getBoundingClientRect();
  const sceneTop = window.scrollY + sceneRect.top;
  const sceneScrollable = Math.max(1, scene.offsetHeight - window.innerHeight);
  const t = clamp01(window.scrollY / maxScroll);

  // Where should the name END (docked near nav)?
  const navRect = navEl.getBoundingClientRect();

  // Target end position: centered horizontally, just under nav (or beside it)
  const endX = 0; // keep centered horizontally (we'll use translateX -50% already)
  const endY = (navRect.bottom + 10) - (window.innerHeight * 0.5);
  // Explanation: name starts at 50vh; endY moves it up to just under nav.

  // Animate: start (centered) -> end (near nav)
  const y = lerp(0, endY, t);

  // Scale down while moving
  const s = lerp(1, 0.55, t);

  // Apply transform (center + move + scale)
  nameEl.style.transform = `translate(-50%, -50%) translateY(${y}px) scale(${s})`;

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
