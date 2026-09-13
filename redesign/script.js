
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const portrait = document.querySelector('.portrait-wrap');
  portrait?.addEventListener('pointermove', e => {
    const r = portrait.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    portrait.style.transform = `perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`;
  });
  portrait?.addEventListener('pointerleave', () => portrait.style.transform = '');
}
