import type { Shape } from "./shapes";

export const isPointInShape = (x: number, y: number, s: Shape): boolean => {
  if ("radius" in s) {
    const d = Math.sqrt((s.x - x) ** 2 + (s.y - y) ** 2);

    return d <= s.radius;
  }

  // figure out the distance from the center to edge of rectangle
  const yDiff = Math.abs(s.height / 2);
  const xDiff = Math.abs(s.width / 2);

  // bottom left corner
  const [x1, y1] = [s.x - xDiff, s.y - yDiff] as const;
  // top right corner
  const [x2, y2] = [s.x + xDiff, s.y + yDiff] as const;

  // assumes x1 < x2 && y1 < y2
  return x1 < x && x < x2 && y1 < y && y < y2;
};
