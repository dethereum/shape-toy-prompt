import { Shape } from "../shapes";

const HIGHLIGHT_COLOR = "rgba(255, 251, 0, 0.7)";

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

  ctx.fillRect(x, y, s.width, s.height);
};

export const selectShape = (
  ctx: CanvasRenderingContext2D,
  { center: { x, y }, ...s }: Shape
): void => {
  ctx.strokeStyle = HIGHLIGHT_COLOR;
  ctx.lineWidth = 10;

  if ("radius" in s) {
    ctx.beginPath();
    ctx.arc(x, y, s.radius + 5, 0, Math.PI * 2, true);
    ctx.stroke();
    return;
  }

  ctx.strokeRect(x, y, s.width, s.height);
};
