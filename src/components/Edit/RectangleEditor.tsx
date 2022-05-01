import type { Dispatch } from "react";
import type { RootAction } from "../../func/reducer";
import type { Rectangle } from "../../shapes";

import React from "react";

type RectangleEditorProps = {
  shape: Rectangle;
  dispatch: Dispatch<RootAction>;
};

export const RectangleEditor = ({ shape, dispatch }: RectangleEditorProps) => {
  const { id, width, height } = shape;

  return (
    <>
      <div className="flex flex-row justify-between px-5">
        <p>width:</p>
        <input
          className="w-3/6"
          aria-label={`height-${id}`}
          type="range"
          value={width}
        />
      </div>
      <div className="flex flex-row justify-between px-5">
        <p>height:</p>
        <input
          className="w-3/6"
          aria-label={`height-${id}`}
          type="range"
          value={height}
        />
      </div>
    </>
  );
};
