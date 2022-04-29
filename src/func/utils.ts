import type { Point, Shape } from "../shapes";

export const isPointInShape = ({ x, y }: Point, s: Shape): boolean => {
  const { point } = s;

  if ("radius" in s) {
    const d = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);

    return d <= s.radius;
  }

  const [x1, y1] = [point.x, point.y + s.height] as const;
  const [x2, y2] = [point.x + s.width, point.y] as const;

  return x1 < x && x < x2 && y2 < y && y < y1;
};
