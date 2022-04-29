/**
 * @jest-environment jsdom
 */
import { drawShape } from "../draw";

describe("drawShape", () => {
  const circle = {
    radius: 5,
    center: {
      x: 2,
      y: 3,
    },
    color: "black",
  };

  it("calls context when drawing a shape", () => {
    expect.assertions(1);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // eslint-disable-next-line jest/no-conditional-in-test
    if (!ctx) throw new Error("context was not mocked");

    drawShape(ctx, circle);

    //@ts-expect-error these methods on the mock dont exist on the real rendering context
    const events: unknown[] = ctx.__getEvents();

    expect(events.length).toBeGreaterThan(0);
  });
});
