import React, { useEffect, useRef, useState } from "react";

type AppProps = {
  context?: CanvasRenderingContext2D;
};

export const App = (props: AppProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(
    props.context || null
  );

  useEffect(() => {
    if (!context && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      setContext(ctx);
    }
  }, []);

  function onCircleClickHandler() {
    if (!context) throw new Error("context not defined!");

    context.beginPath();
    context.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    context.stroke();
  }

  return (
    <>
      <button onClick={onCircleClickHandler}>Add Circle</button>
      <button>Add Rectangle</button>
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
