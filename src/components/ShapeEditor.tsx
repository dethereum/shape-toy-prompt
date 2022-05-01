import type { Dispatch } from "react";
import type { RootAction } from "../func/reducer";
import type { Shape } from "../shapes";

import React from "react";

type ShapeEditorProps = {
  shape: Shape;
  dispatch: Dispatch<RootAction>;
};

export const ShapeEditor = ({ shape, dispatch }: ShapeEditorProps) => {
  function onDeleteShape() {
    dispatch({ type: "DELETE", payload: shape });
  }

  return (
    <>
      <div>
        <button onClick={onDeleteShape}>Delete</button>
        <p>{"radius" in shape ? "Circle" : "Rectangle"}</p>
      </div>
      <p>inputs here</p>
    </>
  );
};
