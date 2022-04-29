import { Shape } from "../shapes";

export const drawShape = (
  ctx: CanvasRenderingContext2D,
  { color, center: { x, y }, ...s }: Shape
): void => {
  ctx.fillStyle = color;

  if ("radius" in s) {
    const { radius } = s;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
    return;
  }

  console.log("implement rectangle functionality");
};
