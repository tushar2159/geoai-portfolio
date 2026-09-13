export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const lerp = (from, to, amount) => from + (to - from) * amount;
export const damp = (from, to, speed, delta) => lerp(from, to, 1 - Math.exp(-speed * delta));

export function sectionProgress(element) {
  const rect = element.getBoundingClientRect();
  const travel = Math.max(1, rect.height - innerHeight);
  return clamp(-rect.top / travel);
}
