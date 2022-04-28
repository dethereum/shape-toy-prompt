import type { Shape } from "./shapes";

export const isPointInShape = (x: number, y: number, s: Shape): boolean => {
  if ("radius" in s) {
    const d = Math.sqrt((s.x - x) ** 2 + (s.y - y) ** 2);

    return d <= s.radius;
  }

  console.log("implement reactangle logic");
  return true;
};
