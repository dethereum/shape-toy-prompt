import type { Shape } from "../shapes";

import React from "react";

type ShapeEditorProps = {
  shape: Shape;
  onDeleteShape: (s: Shape) => void;
};

export const ShapeEditor = ({ shape, onDeleteShape }: ShapeEditorProps) => {
  return (
    <>
      <div>
        <button
          onClick={() => {
            onDeleteShape(shape);
          }}
        >
          Delete
        </button>
        <p>{"radius" in shape ? "Circle" : "Rectangle"}</p>
      </div>
      <p>inputs here</p>
    </>
  );
};
