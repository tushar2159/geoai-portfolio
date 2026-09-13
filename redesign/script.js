const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const coarse = window.matchMedia('(pointer: coarse)');
const root = document.documentElement;
const nav = document.querySelector('.nav');
const rail = document.querySelector('.project-rail');
const railCount = document.querySelector('#railCount');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.18 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const panels = [...document.querySelectorAll('.project-panel')];
const panelObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  const index = panels.indexOf(visible.target);
  railCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`;
}, { root: rail, threshold: [0.45, 0.7] });
panels.forEach(panel => panelObserver.observe(panel));

let ticking = false;
function updateScrollState() {
  const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
  root.style.setProperty('--scene-progress', Math.min(scrollY / max, 1).toFixed(4));
  nav.classList.toggle('scrolled', scrollY > 60);
  document.querySelectorAll('[data-parallax]').forEach(element => {
    const rect = element.getBoundingClientRect();
    const offset = (rect.top + rect.height / 2 - innerHeight / 2) * Number(element.dataset.parallax);
    element.style.setProperty('--parallax', `${offset.toFixed(1)}px`);
  });
  ticking = false;
}
function onScroll() {
  if (!ticking && !reduced.matches) {
    ticking = true;
    requestAnimationFrame(updateScrollState);
  } else if (reduced.matches) nav.classList.toggle('scrolled', scrollY > 60);
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

function updateRail() {
  const max = Math.max(rail.scrollWidth - rail.clientWidth, 1);
  root.style.setProperty('--rail-progress', Math.min(rail.scrollLeft / max, 1).toFixed(4));
}
rail.addEventListener('scroll', updateRail, { passive: true });

if (!reduced.matches && !coarse.matches) {
  addEventListener('pointermove', event => {
    root.style.setProperty('--mx', ((event.clientX / innerWidth) - 0.5).toFixed(3));
    root.style.setProperty('--my', ((event.clientY / innerHeight) - 0.5).toFixed(3));
  }, { passive: true });
  rail.addEventListener('wheel', event => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || !event.shiftKey) return;
    event.preventDefault();
    rail.scrollBy({ left: event.deltaY, behavior: 'smooth' });
  }, { passive: false });
}
