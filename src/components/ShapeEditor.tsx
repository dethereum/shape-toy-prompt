import type { Dispatch } from "react";
import type { RootAction } from "../func/reducer";
import type { Shape } from "../shapes";

import { TrashIcon } from "@heroicons/react/outline";
import React from "react";

type ShapeEditorProps = {
  shape: Shape;
  dispatch: Dispatch<RootAction>;
};

export const ShapeEditor = ({ shape, dispatch }: ShapeEditorProps) => {
  function onDeleteShape() {
    dispatch({ type: "DELETE", payload: shape });
  }

  const isCircle = "radius" in shape;

  return (
    <div className="border-2 border-gray-600 px-6 py-4">
      <div className="flex flex-row justify-between">
        <button
          className="border-2 border-gray-600 px-12 py-2"
          onClick={onDeleteShape}
        >
          <div className="flex flex-row">
            <TrashIcon className="w-6 mr-1" /> <p>Delete</p>
          </div>
        </button>
        <p className="my-auto w-24 ml-8">{isCircle ? "Circle" : "Rectangle"}</p>
      </div>
      <p>inputs here</p>
    </div>
  );
};
