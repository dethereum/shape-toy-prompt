import type { RefObject } from "react";
import type { Shape } from "../shapes";

import { nanoid } from "nanoid";
import { useEffect, useReducer, useState } from "react";

import { getShapes, initialState, reducer } from "../func/reducer";
import { getMouseDownAction, isPointInShape } from "../func/utils";

const useShapes = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [isMouseDown, setMouseDown] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const shapes = getShapes(state);

  useEffect(() => {
    const ref = canvasRef.current;

    if (ref) {
      const mouseDownHandler = ({ offsetX, offsetY, shiftKey }: MouseEvent) => {
        setMouseDown(true);

        const point = {
          x: offsetX,
          y: offsetY,
        };

        const action = getMouseDownAction(shapes, shiftKey, point);

        dispatch(action);
      };

      const mouseMoveHandler = ({ offsetX, offsetY }: MouseEvent) => {
        const point = {
          x: offsetX,
          y: offsetY,
        };

        for (const s of shapes) {
          // selected shapes cannot be highlighed
          if (s.isSelected) {
            if (isMouseDown) {
              dispatch({ type: "MOVE", payload: { shape: s, point: point } });
            }

            continue;
          }

          // if point in shape and unselected highlight and exit mouse handler
          if (isPointInShape(point, s)) {
            dispatch({ type: "HIGHLIGHT", payload: s });
            return;
          }
        }

        // remove highlight even if nothing is highlighted. reduces handles this use case
        dispatch({ type: "REMOVE_HIGHLIGHT" });
      };

      const mouseUpHandler = () => {
        setMouseDown(false);
      };

      ref.addEventListener("mousedown", mouseDownHandler);
      ref.addEventListener("mousemove", mouseMoveHandler);
      ref.addEventListener("mouseup", mouseUpHandler);

      return () => {
        if (ref) {
          ref.removeEventListener("mousedown", mouseDownHandler);
          ref.removeEventListener("mousemove", mouseMoveHandler);
          ref.removeEventListener("mouseup", mouseUpHandler);
        }
      };
    }
  }, [canvasRef, shapes, isMouseDown]);

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

  function onDeleteShape(s: Shape) {
    dispatch({ type: "DELETE", payload: s });
  }

  return [shapes, { onAddCircle, onAddRectangle, onDeleteShape }] as const;
};

export default useShapes;
