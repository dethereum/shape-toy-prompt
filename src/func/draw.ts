import { Shape } from "../shapes";

const SELECT_COLOR = "rgba(255, 251, 0, 0.7)";
const HIGHLIGHT_COLOR = "rgba(0, 76, 255, 0.3)";

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

const makeShapeSelector =
  (clr: string) =>
  (ctx: CanvasRenderingContext2D, { center: { x, y }, ...s }: Shape): void => {
    ctx.strokeStyle = clr;
    ctx.lineWidth = 10;

    if ("radius" in s) {
      ctx.beginPath();
      ctx.arc(x, y, s.radius + 5, 0, Math.PI * 2, true);
      ctx.stroke();
      return;
    }

    ctx.strokeRect(x, y, s.width, s.height);
  };

export const highlightShape = makeShapeSelector(HIGHLIGHT_COLOR);
export const selectShape = makeShapeSelector(SELECT_COLOR);
