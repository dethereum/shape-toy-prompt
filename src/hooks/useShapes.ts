import type { RefObject } from "react";
import type { Shape } from "../shapes";

import { nanoid } from "nanoid";
import { useEffect, useReducer, useState } from "react";

import { getShapes, initialState, reducer } from "../func/reducer";
import { getMouseDownAction, isPointInShape } from "../func/utils";

const useShapes = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [isMouseDown, setMouseDown] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [state, dispatch] = useReducer(reducer, initialState);

  const shapes = getShapes(state);

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
