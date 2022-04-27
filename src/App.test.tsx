/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";

import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("app", () => {
  it("should render a canvas", () => {
    expect.assertions(1);

    render(<App />);

    const canvas = screen.getByRole("img", {
      name: /draw shapes here/i,
    });

    expect(canvas).toMatchInlineSnapshot(`
      <canvas
        aria-label="Draw shapes here"
        height="500"
        role="img"
        width="500"
      />
    `);
  });

  it("render a 'Add Circle' button", () => {
    expect.assertions(1);

    render(<App />);

    const btn = screen.getByRole("button", { name: /add circle/i });

    expect(btn).toBeInTheDocument();
  });
});
