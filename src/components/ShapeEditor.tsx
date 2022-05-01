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
    <div className="border-2 border-gray-600 px-8 py-4">
      <div className="flex flex-row justify-between">
        <button
          className="border-2 border-gray-600 px-12 py-2"
          onClick={onDeleteShape}
        >
          Delete
        </button>
        <p className="ml-4">{"radius" in shape ? "Circle" : "Rectangle"}</p>
      </div>
      <p>inputs here</p>
    </div>
  );
};
