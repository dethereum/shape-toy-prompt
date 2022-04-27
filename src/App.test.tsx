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
        role="img"
      />
    `);
  });

  it("render a 'Add Circle' button", () => {
    expect.assertions(1);

    render(<App />);

    const btn = screen.getByText("Add Circle");

    expect(btn).toBeInTheDocument();
  });
});
