import type { RefObject } from "react";
import type { Shape } from "../shapes";

import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

import { makeDownHandler, makeMoveHandler } from "../func/handlers";

const useShapes = (
  canvasRef: RefObject<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D | null
) => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const ref = canvasRef.current;

    if (ctx && ref) {
      const mouseDownHandler = makeDownHandler(ctx, shapes, setShapes);

      const mouseMoveHandler = makeMoveHandler(ctx, shapes);

      ref.addEventListener("mousedown", mouseDownHandler);
      ref.addEventListener("mousemove", mouseMoveHandler);

      return () => {
        if (ref) {
          ref.removeEventListener("mousedown", mouseDownHandler);
          ref.removeEventListener("mousemove", mouseMoveHandler);
        }
      };
    }
  }, [canvasRef, ctx, shapes]);

  function onAddCircle() {
    if (!ctx) throw new Error("context not defined!");

    const circle: Shape = {
      id: nanoid(16),
      radius: 50,
      point: {
        x: 75,
        y: 75,
      },
      color: "black",
      isSelected: false,
      isHighlighted: false,
    };

    setShapes([circle]);
  }

  function onAddRectangle() {
    if (!ctx) throw new Error("context not defined!");

    const rect: Shape = {
      id: nanoid(16),
      height: 100,
      width: 100,
      point: { x: 25, y: 25 },
      color: "black",
      isSelected: false,
      isHighlighted: false,
    };

    setShapes([rect]);
  }

  return [shapes, { onAddCircle, onAddRectangle }] as const;
};

export default useShapes;
