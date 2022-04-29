import type { Point, Shape } from "../shapes";

export const isPointInShape = ({ x, y }: Point, s: Shape): boolean => {
  const { center } = s;

  if ("radius" in s) {
    const d = Math.sqrt((center.x - x) ** 2 + (center.y - y) ** 2);

    return d <= s.radius;
  }

  const [x1, y1] = [center.x, center.y + s.height] as const;
  const [x2, y2] = [center.x + s.width, center.y] as const;

  return x1 < x && x < x2 && y2 < y && y < y1;
};
