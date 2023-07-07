const lerp = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;
const inverseLerp = (start: number, end: number, value: number) =>
  (value - start) / (end - start);

export { inverseLerp, lerp };
