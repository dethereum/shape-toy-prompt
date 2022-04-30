import React, { useEffect } from "react";

import { drawShape, highlightShape, selectShape } from "./func/draw";
import useCanvas from "./hooks/useCanvas";
import useShapes from "./hooks/useShapes";

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

/**
 * @param {Object} AppProps  Props for root level component. Used to pass mocked context for jest runtime
 */
type AppProps = {
  context?: CanvasRenderingContext2D;
};

export const App = (props: AppProps) => {
  const [canvas, ctx] = useCanvas(props.context);
  const [shapes, { onAddCircle, onAddRectangle }] = useShapes();

  useEffect(() => {
    if (ctx && shapes.length > 0) {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      for (const s of shapes) {
        drawShape(ctx, s);

        // if shape selected skip to next shape
        if (s.isSelected) {
          selectShape(ctx, s);
          continue;
        }

        if (s.isHighlighted) highlightShape(ctx, s);
      }
    }
  }, [shapes, ctx]);

  return (
    <>
      <button onClick={onAddCircle}>Add Circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
      <canvas
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        role="img"
        aria-label="Draw shapes here"
        ref={canvas}
      ></canvas>
    </>
  );
};
