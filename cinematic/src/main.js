import { EarthStage } from './gl/stage.js';
import { sectionProgress } from './lib/motion.js';

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const canvas = document.querySelector('#earth-stage');
const scenes = [...document.querySelectorAll('[data-scene]')];
const stage = new EarthStage(canvas, reduced.matches);
let activeScene = scenes[0];
let running = true;
let last = performance.now();

stage.resize();
addEventListener('resize', stage.resize.bind(stage), { passive: true });
addEventListener('pointermove', (event) => stage.setPointer(event.clientX / innerWidth * 2 - 1, event.clientY / innerHeight * 2 - 1), { passive: true });

const sceneObserver = new IntersectionObserver((entries) => {
  entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio).forEach((entry) => {
    activeScene = entry.target;
    entry.target.classList.add('is-visible');
  });
}, { threshold: [0.08, .25, .5, .75] });
scenes.forEach((scene) => sceneObserver.observe(scene));

function frame(now) {
  if (!running) return;
  const delta = Math.min(.05, (now - last) / 1000);
  last = now;
  stage.setScene(activeScene.dataset.scene, sectionProgress(activeScene));
  stage.draw(now, delta);
  updateScrollScenes();
  requestAnimationFrame(frame);
}

function updateScrollScenes() {
  if (activeScene?.dataset.scene === 'principles') {
    const statements = [...activeScene.querySelectorAll('.principle-statements p')];
    const index = Math.min(statements.length - 1, Math.floor(sectionProgress(activeScene) * statements.length));
    statements.forEach((element, item) => element.classList.toggle('is-active', item === index));
  }
}

document.addEventListener('visibilitychange', () => {
  running = !document.hidden;
  if (running) { last = performance.now(); requestAnimationFrame(frame); }
});
reduced.addEventListener?.('change', (event) => { stage.reducedMotion = event.matches; });
requestAnimationFrame(frame);

const years = [
  { kicker: '2022 · Foundation', title: 'Earth Observation', copy: 'M.Sc. Earth Observation (Geo-informatics), IIRS–ISRO and ITC, University of Twente.', tags: ['Remote sensing', 'GIS', 'Spatial analysis'] },
  { kicker: '2023–24 · Applied intelligence', title: 'GeoAI', copy: 'Production work across computer vision, deep learning, satellite imagery and spatial data engineering.', tags: ['Computer vision', 'Deep learning', 'Satellite imagery'] },
  { kicker: '2025 · Engineered delivery', title: 'Production AI', copy: 'Cloud systems, AI APIs, segmentation, accelerated inference and reproducible geospatial engineering.', tags: ['FastAPI', 'AWS', 'MLOps', 'GPU inference'] },
  { kicker: '2026 · Autonomous analysis', title: 'Agentic Earth Intelligence', copy: 'Traceable agent workflows combine natural language, STAC, LLMs and interactive Earth systems.', tags: ['Agents', 'STAC', 'LLMs', 'GeoAI'] }
];
const yearButtons = [...document.querySelectorAll('[data-year]')];
function selectYear(index, focus = false) {
  const year = years[index];
  yearButtons.forEach((button, item) => button.setAttribute('aria-selected', String(item === index)));
  document.querySelector('#year-kicker').textContent = year.kicker;
  document.querySelector('#year-title').textContent = year.title;
  document.querySelector('#year-copy').textContent = year.copy;
  document.querySelector('#year-tags').replaceChildren(...year.tags.map((tag) => Object.assign(document.createElement('span'), { textContent: tag })));
  if (focus) yearButtons[index].focus();
}
yearButtons.forEach((button, index) => {
  button.addEventListener('click', () => selectYear(index));
  button.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? years.length - 1 : (index + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1) + years.length) % years.length;
    selectYear(next, true);
  });
});

const projects = [...document.querySelectorAll('.project')];
const projectObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle('is-active', entry.isIntersecting)), { root: document.querySelector('.orbit-list'), threshold: .75 });
projects.forEach((project) => projectObserver.observe(project));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => anchor.addEventListener('click', () => {
  const target = document.querySelector(anchor.getAttribute('href'));
  if (target) target.focus?.({ preventScroll: true });
}));
