import { clamp, damp } from '../lib/motion.js';

export class EarthStage {
  constructor(canvas, reducedMotion) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d', { alpha: false });
    this.reducedMotion = reducedMotion;
    this.pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    this.scene = 'hero';
    this.progress = 0;
    this.width = 0;
    this.height = 0;
    this.dpr = 1;
  }

  resize() {
    this.width = innerWidth;
    this.height = innerHeight;
    this.dpr = Math.min(devicePixelRatio || 1, innerWidth < 700 ? 1.35 : 1.75);
    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  setPointer(x, y) { this.pointer.tx = x; this.pointer.ty = y; }
  setScene(name, progress) { this.scene = name; this.progress = progress; }

  draw(now, delta) {
    const ctx = this.context;
    this.pointer.x = damp(this.pointer.x, this.reducedMotion ? 0 : this.pointer.tx, 3, delta);
    this.pointer.y = damp(this.pointer.y, this.reducedMotion ? 0 : this.pointer.ty, 3, delta);
    ctx.fillStyle = '#020607';
    ctx.fillRect(0, 0, this.width, this.height);
    this.drawStars(ctx, now);
    this.drawEarth(ctx, now);
    this.drawGrid(ctx, now);
  }

  drawStars(ctx, now) {
    const count = this.width < 700 ? 45 : 95;
    ctx.fillStyle = 'rgba(176, 255, 229, .38)';
    for (let i = 0; i < count; i += 1) {
      const x = (i * 193.7 + 33) % this.width;
      const y = (i * 83.3 + 71) % this.height;
      const pulse = this.reducedMotion ? .6 : .35 + Math.sin(now * .0005 + i) * .25;
      ctx.globalAlpha = pulse;
      ctx.fillRect(x, y, i % 7 === 0 ? 1.5 : 1, i % 7 === 0 ? 1.5 : 1);
    }
    ctx.globalAlpha = 1;
  }

  drawEarth(ctx, now) {
    const mobile = this.width < 700;
    const sceneShift = { hero: 0, data: -.08, journey: .2, agent: -.16, projects: .13, architecture: 0, principles: -.1, toolkit: .18, finale: 0 }[this.scene] || 0;
    const radius = mobile ? Math.min(this.width * .7, this.height * .32) : Math.min(this.width * .31, this.height * .47);
    const cx = mobile ? this.width * .72 : this.width * (.74 + sceneShift) + this.pointer.x * 18;
    const cy = mobile ? this.height * .35 : this.height * .52 + this.pointer.y * 12;
    const atmosphere = ctx.createRadialGradient(cx, cy, radius * .75, cx, cy, radius * 1.2);
    atmosphere.addColorStop(0, 'rgba(14,52,44,.75)'); atmosphere.addColorStop(.78, 'rgba(3,15,14,.94)'); atmosphere.addColorStop(.89, 'rgba(91,245,255,.13)'); atmosphere.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = atmosphere; ctx.beginPath(); ctx.arc(cx, cy, radius * 1.2, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.clip();
    const spin = this.reducedMotion ? .4 : now * .000025;
    ctx.strokeStyle = 'rgba(115,255,155,.15)'; ctx.lineWidth = 1;
    for (let i = -8; i <= 8; i += 1) { const yy = cy + i * radius / 9; const rr = Math.sqrt(Math.max(0, radius * radius - (yy - cy) ** 2)); ctx.beginPath(); ctx.ellipse(cx, yy, rr, rr * .12, 0, 0, Math.PI * 2); ctx.stroke(); }
    for (let i = 0; i < 18; i += 1) { ctx.beginPath(); ctx.ellipse(cx, cy, radius * Math.abs(Math.cos(i * Math.PI / 18 + spin)), radius, 0, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = 'rgba(77,149,109,.22)';
    for (let i = 0; i < 28; i += 1) { const angle = i * 2.399 + spin * 4; const rr = radius * (.25 + ((i * 17) % 68) / 100); const x = cx + Math.cos(angle) * rr; const y = cy + Math.sin(angle * .73) * rr * .74; ctx.beginPath(); ctx.arc(x, y, 4 + (i % 5) * 3, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
    ctx.strokeStyle = 'rgba(91,245,255,.24)'; ctx.beginPath(); ctx.ellipse(cx, cy, radius * 1.45, radius * .4, -.28, 0, Math.PI * 2); ctx.stroke();
    const orbit = this.reducedMotion ? .8 : now * .00022; const sx = cx + Math.cos(orbit) * radius * 1.42; const sy = cy + Math.sin(orbit) * radius * .4;
    ctx.fillStyle = '#73ff9b'; ctx.shadowColor = '#73ff9b'; ctx.shadowBlur = 18; ctx.beginPath(); ctx.arc(sx, sy, 3, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
  }

  drawGrid(ctx, now) {
    const opacity = this.scene === 'hero' ? .05 : .09 + clamp(this.progress) * .04;
    ctx.strokeStyle = `rgba(91,245,255,${opacity})`; ctx.lineWidth = 1;
    const step = this.width < 700 ? 48 : 64; const drift = this.reducedMotion ? 0 : (now * .005) % step;
    for (let x = -step + drift; x < this.width + step; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, this.height); ctx.stroke(); }
    for (let y = -step + drift; y < this.height + step; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(this.width, y); ctx.stroke(); }
  }
}
