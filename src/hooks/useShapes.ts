import type { RefObject } from "react";
import type { Shape } from "../shapes";

import { nanoid } from "nanoid";
import { useEffect, useReducer, useState } from "react";

import { getShapes, initialState, reducer } from "../func/reducer";
import {
  getMouseDownAction,
  isPointInShape,
  logMouseEvent,
} from "../func/utils";

const useShapes = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [isMouseDown, setMouseDown] = useState(false);
  const [mouseMoveLogCount, setMouseMoveLogCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  const shapes = getShapes(state);

  useEffect(() => {
    const ref = canvasRef.current;

    if (ref) {
      const rect = ref?.getBoundingClientRect();

      const mouseDownHandler = (ev: MouseEvent) => {
        console.log("drawing side effect -> rect\n", rect);

        setMouseDown(true);
        setMouseMoveLogCount(0);

        // always log mouse down
        const point = logMouseEvent(
          "mouseDown",
          mouseMoveLogCount,
          setMouseMoveLogCount,
          ev
        );

        const action = getMouseDownAction(shapes, ev.shiftKey, point);

        dispatch(action);
      };

      const mouseMoveHandler = (ev: MouseEvent) => {
        // log mouseMove only when mouse down
        const point = logMouseEvent(
          "mouseMove",
          mouseMoveLogCount,
          setMouseMoveLogCount,
          ev,
          false
        );

        for (const s of shapes) {
          // selected shapes cannot be highlighed
          if (s.isSelected) {
            if (isMouseDown) {
              logMouseEvent(
                "mouseMove",
                mouseMoveLogCount,
                setMouseMoveLogCount,
                ev,
                true,
                s
              );
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
  }, [canvasRef, shapes, isMouseDown, mouseMoveLogCount]);

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
