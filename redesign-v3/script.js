const root = document.documentElement;
const header = document.querySelector('.site-header');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(pointer: fine)');

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

let scheduled = false;
function updateScroll() {
  const maximum = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
  root.style.setProperty('--scroll', Math.min(scrollY / maximum, 1).toFixed(4));
  header.classList.toggle('scrolled', scrollY > 48);
  const portrait = document.querySelector('[data-parallax]');
  if (portrait && !reducedMotion.matches && innerWidth > 1000) {
    const rectangle = portrait.getBoundingClientRect();
    const offset = Math.max(-18, Math.min(18, (rectangle.top + rectangle.height / 2 - innerHeight / 2) * -.035));
    portrait.style.setProperty('--portrait-y', `${offset.toFixed(1)}px`);
  }
  scheduled = false;
}
addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateScroll);
  }
}, { passive: true });
updateScroll();

if (finePointer.matches && !reducedMotion.matches) {
  addEventListener('pointermove', (event) => {
    root.style.setProperty('--mx', ((event.clientX / innerWidth) - .5).toFixed(3));
    root.style.setProperty('--my', ((event.clientY / innerHeight) - .5).toFixed(3));
  }, { passive: true });
}
