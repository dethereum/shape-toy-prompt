import type { Point, Shape } from "./shapes";

export const isPointInShape = ({ x, y }: Point, s: Shape): boolean => {
  const { center } = s;

  if ("radius" in s) {
    const d = Math.sqrt((center.x - x) ** 2 + (center.y - y) ** 2);

    return d <= s.radius;
  }

  // figure out the distance from the center to edge of rectangle
  const yDiff = Math.abs(s.height / 2);
  const xDiff = Math.abs(s.width / 2);

  // bottom left corner
  const [x1, y1] = [center.x - xDiff, center.y - yDiff] as const;
  // top right corner
  const [x2, y2] = [center.x + xDiff, center.y + yDiff] as const;

  return x1 < x && x < x2 && y1 < y && y < y2;
};
