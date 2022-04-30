import type { Shape } from "./shapes";

import React, { useEffect, useState } from "react";

import { drawShape, highlightShape, selectShape } from "./func/draw";
import { isPointInShape } from "./func/utils";
import useCanvas from "./hooks/useCanvas";

/**
 * @param {Object} AppProps  Props for root level component. Used to pass mocked context for jest runtime
 */
type AppProps = {
  context?: CanvasRenderingContext2D;
};

export const App = (props: AppProps) => {
  const [canvasRef, context] = useCanvas(props.context);
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    if (context && canvasRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const mouseDownHandler = ({ offsetX, offsetY, shiftKey }: MouseEvent) => {
        const point = {
          x: offsetX,
          y: offsetY,
        };

        context.clearRect(0, 0, 500, 500);

        for (const s of shapes) {
          drawShape(context, s);

          if (!isPointInShape(point, s)) {
            setShapes([{ ...s, isSelected: !s.isSelected }]);
            continue;
          }

          const f = !s.isSelected ? selectShape : highlightShape;
          f(context, s);

          setShapes([{ ...s, isSelected: !s.isSelected }]);
        }
      };

      const mouseMoveHandler = ({ offsetX, offsetY }: MouseEvent) => {
        const point = {
          x: offsetX,
          y: offsetY,
        };

        context.clearRect(0, 0, 500, 500);

        for (const s of shapes) {
          drawShape(context, s);
          if (s.isSelected) selectShape(context, s);

          if (!isPointInShape(point, s)) continue;

          if (!s.isSelected) highlightShape(context, s);
        }
      };

      canvasRef.current.addEventListener("mousedown", mouseDownHandler);
      canvasRef.current.addEventListener("mousemove", mouseMoveHandler);

      return () => {
        if (canvasRef.current) {
          canvasRef.current.removeEventListener("mousedown", mouseDownHandler);
          canvasRef.current.removeEventListener("mousemove", mouseMoveHandler);
        }
      };
    }
  }, [context, shapes, canvasRef]);

  function onCircleClickHandler() {
    if (!context) throw new Error("context not defined!");

    const circle: Shape = {
      radius: 50,
      point: {
        x: 75,
        y: 75,
      },
      color: "black",
      isSelected: false,
    };

    drawShape(context, circle);
    setShapes([circle]);
  }

  function onRectClickHandler() {
    if (!context) throw new Error("context not defined!");

    const rect: Shape = {
      height: 100,
      width: 100,
      point: { x: 25, y: 25 },
      color: "black",
      isSelected: false,
    };

    drawShape(context, rect);
    setShapes([rect]);
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
