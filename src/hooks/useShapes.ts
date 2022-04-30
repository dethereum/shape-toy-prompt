import type { Shape } from "../shapes";

import { nanoid } from "nanoid";
import { useEffect, useReducer } from "react";

import { makeDownHandler, makeMoveHandler } from "../func/handlers";
import { getShapes, initialState, reducer } from "../func/reducer";

const useShapes = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const shapes = getShapes(state);

  useEffect(() => {
    const mouseDownHandler = makeDownHandler(shapes, dispatch);

    const mouseMoveHandler = makeMoveHandler(shapes, dispatch);

    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [shapes]);

  function onAddCircle() {
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
