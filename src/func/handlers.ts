import type { Dispatch } from "react";
import type { Shape } from "../shapes";
import type { RootAction } from "./reducer";

import { highlightShape, selectShape } from "./draw";
import { isPointInShape } from "./utils";

export const makeDownHandler =
  (
    ctx: CanvasRenderingContext2D,
    shapes: Shape[],
    dispatch: Dispatch<RootAction>
  ) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ offsetX, offsetY, shiftKey }: MouseEvent) => {
    const point = {
      x: offsetX,
      y: offsetY,
    };

    for (const s of shapes) {
      if (!isPointInShape(point, s)) {
        // @ts-expect-error ignore for the commit
        dispatch([{ ...s, isSelected: !s.isSelected }]);
        continue;
      }

      const f = !s.isSelected ? selectShape : highlightShape;
      f(ctx, s);

      // @ts-expect-error ignore for the commit
      dispatch([{ ...s, isSelected: !s.isSelected }]);
    }
  };

export const makeMoveHandler =
  (ctx: CanvasRenderingContext2D, shapes: Shape[]) =>
  ({ offsetX, offsetY }: MouseEvent) => {
    const point = {
      x: offsetX,
      y: offsetY,
    };

    for (const s of shapes) {
      if (s.isSelected) selectShape(ctx, s);

      if (!isPointInShape(point, s)) continue;

      if (!s.isSelected) highlightShape(ctx, s);
    }
  };
