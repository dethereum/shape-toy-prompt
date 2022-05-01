import type { Dispatch } from "react";
import type { RootAction } from "../func/reducer";

import { nanoid } from "nanoid";
import React from "react";

type ShapeAdderProps = {
  dispatch: Dispatch<RootAction>;
};

export const ShapeAdder = ({ dispatch }: ShapeAdderProps) => {
  function onAddCircle() {
    dispatch({
      type: "ADD",
      payload: {
        id: nanoid(16),
        radius: 50,
        point: {
          x: 75,
          y: 75,
        },
        color: "black",
        isSelected: false,
        isHighlighted: false,
      },
    });
  }

  function onAddRectangle() {
    dispatch({
      type: "ADD",
      payload: {
        id: nanoid(16),
        height: 100,
        width: 100,
        point: { x: 25, y: 25 },
        color: "black",
        isSelected: false,
        isHighlighted: false,
      },
    });
  }

  return (
    <div>
      <button onClick={onAddCircle}>Add Circle</button>
      <button onClick={onAddRectangle}>Add Rectangle</button>
    </div>
  );
};
