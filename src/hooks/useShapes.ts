import type { RefObject } from "react";
import type { Shape } from "../shapes";

import { nanoid } from "nanoid";
import { useEffect, useReducer } from "react";

import { makeDownHandler, makeMoveHandler } from "../func/handlers";
import { getShapes, initialState, reducer } from "../func/reducer";

const useShapes = (
  canvasRef: RefObject<HTMLCanvasElement>,
  ctx: CanvasRenderingContext2D | null
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const shapes = getShapes(state);

  useEffect(() => {
    const ref = canvasRef.current;

    if (ctx && ref) {
      const mouseDownHandler = makeDownHandler(ctx, shapes, dispatch);

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

    dispatch({ type: "ADD", payload: circle });
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

    dispatch({ type: "ADD", payload: rect });
  }

  return [shapes, { onAddCircle, onAddRectangle }] as const;
};

export default useShapes;
