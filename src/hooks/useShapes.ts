import type { RefObject } from "react";

import { useEffect, useReducer, useState } from "react";

import {
  getSelectedShapes,
  getShapes,
  initialState,
  reducer,
} from "../func/reducer";
import { getMouseDownAction, isPointInShape } from "../func/utils";

const useShapes = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [isMouseDown, setMouseDown] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [state, dispatch] = useReducer(reducer, initialState);

  const shapes = getShapes(state);
  const selected = getSelectedShapes(state);

  useEffect(() => {
    const ref = canvasRef.current;

    if (ref) {
      const mouseDownHandler = ({
        clientX,
        clientY,
        shiftKey,
        offsetX,
        offsetY,
      }: MouseEvent) => {
        setMouseDown(true);
        setOffset({ x: clientX, y: clientY });

        dispatch(
          getMouseDownAction(shapes, shiftKey, { x: offsetX, y: offsetY })
        );
      };

      const mouseMoveHandler = ({
        clientX,
        clientY,
        offsetX,
        offsetY,
      }: MouseEvent) => {
        const point = {
          x: offsetX,
          y: offsetY,
        };

        for (const s of shapes) {
          // selected shapes cannot be highlighed
          if (s.isSelected) {
            if (isMouseDown) {
              const dx = clientX - offset.x; // true movement along the x plane
              const dy = clientY - offset.y; // true movement along the y plane

              const movePoint = {
                x: dx + s.point.x,
                y: dy + s.point.y,
              };

              // after creating the move point update the offset with new mouse position
              setOffset({ x: clientX, y: clientY });

              dispatch({
                type: "MOVE",
                payload: { shape: s, point: movePoint },
              });
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
        setOffset({ x: 0, y: 0 });
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
  }, [canvasRef, shapes, isMouseDown, offset.x, offset.y]);

  return [shapes, selected, dispatch] as const;
};

export default useShapes;
