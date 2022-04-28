import type { Shape } from "./shapes";

export const isPointInShape = (x: number, y: number, s: Shape): boolean => {
  if ("radius" in s) {
    const d = Math.sqrt((s.x - x) ** 2 + (s.y - y) ** 2);

    return d <= s.radius;
  }

  const yDiff = Math.abs(s.height - s.y);
  const xDiff = Math.abs(s.width - s.x);

  const [x1, y1] = [s.x - xDiff, s.y + yDiff] as const;
  const [x2, y2] = [s.x + xDiff, s.y - yDiff] as const;

  return x1 < x && x < x2 && y1 < y && y < y2;
};
