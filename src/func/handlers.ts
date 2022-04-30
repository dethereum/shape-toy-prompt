import type { Dispatch } from "react";
import type { Shape } from "../shapes";
import type { RootAction } from "./reducer";

import { getMouseDownAction, isPointInShape } from "./utils";

export const makeDownHandler =
  (shapes: Shape[], dispatch: Dispatch<RootAction>) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ offsetX, offsetY, shiftKey }: MouseEvent) => {
    const point = {
      x: offsetX,
      y: offsetY,
    };

    const action = getMouseDownAction(shapes, shiftKey, point);

    dispatch(action);
  };

export const makeMoveHandler =
  (shapes: Shape[], dispatch: Dispatch<RootAction>) => (ev: MouseEvent) => {
    const { offsetX, offsetY } = ev;

    const point = {
      x: offsetX,
      y: offsetY,
    };

    for (const s of shapes) {
      // selected shapes cannot be highlighed
      if (s.isSelected) continue;

      // if point in shape and unselected highlight and exit mouse handler
      if (isPointInShape(point, s)) {
        console.log("ev", ev);
        dispatch({ type: "HIGHLIGHT", payload: s });
        return;
      }
    }

    // remove highlight even if nothing is highlighted. reduces handles this use case
    dispatch({ type: "REMOVE_HIGHLIGHT" });
  };
