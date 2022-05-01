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
  const {
    id,
    point: { x, y },
  } = shape;

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
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex flex-row justify-between px-5">
          <p>center x:</p>
          <input
            className="w-1/6"
            aria-label={`center-x-${id}`}
            type="number"
            readOnly
            value={x}
          />
        </div>
        <div className="flex flex-row justify-between px-5">
          <p>center y:</p>
          <input
            className="w-1/6"
            aria-label={`center-y-${id}`}
            type="number"
            readOnly
            value={y}
          />
        </div>
      </div>
    </div>
  );
};
