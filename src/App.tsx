import React, { useEffect } from "react";

import { ShapeAdder } from "./components/ShapeAdder";
import { ShapeEditor } from "./components/ShapeEditor";
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
  const [shapes, dispatch] = useShapes(canvas);

  useEffect(() => {
    if (ctx) {
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
      <ShapeAdder dispatch={dispatch}></ShapeAdder>
      <canvas
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        role="img"
        aria-label="Draw shapes here"
        ref={canvas}
      ></canvas>
      <div>
        {shapes
          .filter((s) => s.isSelected)
          .map((s) => {
            return <ShapeEditor shape={s} key={s.id} dispatch={dispatch} />;
          })}
      </div>
    </>
  );
};
