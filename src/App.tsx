import React, { useEffect, useRef, useState } from "react";

import type { Shape } from "./shapes";

import { isPointInShape } from "./utils";

type AppProps = {
  context?: CanvasRenderingContext2D;
};

export const App = (props: AppProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(
    props.context || null
  );

  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    if (!context && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      setContext(ctx);
    }
  }, []);

  useEffect(() => {
    if (context && canvasRef.current) {
      const mouseDownHandler = (ev: MouseEvent) => {
        const point = {
          x: ev.offsetX,
          y: ev.offsetY,
        };

        for (const s of shapes) {
          if (!isPointInShape(point, s)) continue;

          if ("radius" in s) {
            const {
              center: { x, y },
              radius,
              color,
            } = s;

            context.clearRect(0, 0, 500, 500);

            context.fillStyle = color || "black";
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2, true);
            context.fill();
            context.strokeStyle = "rgba(255, 251, 0, 0.7)";
            context.lineWidth = 10;
            context.beginPath();
            context.arc(x, y, radius + 5, 0, Math.PI * 2, true);
            context.stroke();
          }
        }
      };

      canvasRef.current.addEventListener("mousedown", mouseDownHandler);

      return () => {
        canvasRef.current &&
          canvasRef.current.removeEventListener("mousedown", mouseDownHandler);
      };
    }
  }, [context, shapes]);

  function onCircleClickHandler() {
    if (!context) throw new Error("context not defined!");

    const circle = {
      radius: 50,
      center: {
        x: 75,
        y: 75,
      },
      color: "black",
    };

    context.fillStyle = circle.color;
    context.beginPath();
    context.arc(
      circle.center.x,
      circle.center.y,
      circle.radius,
      0,
      Math.PI * 2,
      true
    );

    setShapes([circle]);
    context.fill();
  }

  function onRectClickHandler() {
    if (!context) throw new Error("context not defined!");

    context.fillRect(25, 25, 100, 100);
  }

  return (
    <>
      <button onClick={onCircleClickHandler}>Add Circle</button>
      <button onClick={onRectClickHandler}>Add Rectangle</button>
      <canvas
        width={500}
        height={500}
        role="img"
        aria-label="Draw shapes here"
        ref={canvasRef}
      ></canvas>
    </>
  );
};
