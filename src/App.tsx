import React from "react";

import { Canvas } from "./components/Canvas";
import { ShapeAdder } from "./components/ShapeAdder";
import { ShapeEditorList } from "./components/ShapeEditorList";
import useCanvas from "./hooks/useCanvas";
import useShapes from "./hooks/useShapes";

/**
 * @param {Object} AppProps  Props for root level component. Used to pass mocked context for jest runtime
 */
type AppProps = {
  context?: CanvasRenderingContext2D;
};

export const App = (props: AppProps) => {
  const [canvas, ctx] = useCanvas(props.context);
  const [shapes, selected, dispatch] = useShapes(canvas);

  return (
    <>
      <ShapeAdder dispatch={dispatch}></ShapeAdder>
      <Canvas shapes={shapes} ctx={ctx} canvas={canvas}></Canvas>
      <ShapeEditorList shapes={selected} dispatch={dispatch} />
    </>
  );
};
