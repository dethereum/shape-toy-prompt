/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { App } from "../App";

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

  it("render a 'Add Rectangle' button", () => {
    expect.assertions(1);

    render(<App />);

    const btn = screen.getByRole("button", { name: /add rectangle/i });

    expect(btn).toBeInTheDocument();
  });

  it("draw a circle on click of 'Add Circle' button", async () => {
    expect.assertions(1);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // eslint-disable-next-line jest/no-conditional-in-test
    if (!ctx) throw new Error("context was not mocked");

    const user = userEvent.setup();

    render(<App context={ctx} />);

    await user.click(screen.getByRole("button", { name: /add circle/i }));

    //@ts-expect-error these methods on the mock dont exist on the real rendering context
    const events: unknown[] = ctx.__getEvents();

    expect(events).toHaveLength(4);
  });

  it("draw a rectangle on click of 'Add Rectangle' button", async () => {
    expect.assertions(1);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // eslint-disable-next-line jest/no-conditional-in-test
    if (!ctx) throw new Error("context was not mocked");

    const user = userEvent.setup();

    render(<App context={ctx} />);

    await user.click(screen.getByRole("button", { name: /add rectangle/i }));

    //@ts-expect-error these methods on the mock dont exist on the real rendering context
    const events: unknown[] = ctx.__getEvents();

    expect(events).toHaveLength(1);
  });
});
