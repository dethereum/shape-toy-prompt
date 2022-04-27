import React from "react";

export const App = () => {
  return (
    <>
      <button>Add Circle</button>
      <button>Add Rectangle</button>
      <canvas
        width={500}
        height={500}
        role="img"
        aria-label="Draw shapes here"
      ></canvas>
    </>
  );
};
