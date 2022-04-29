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

  const rect = {
    center: {
      x: 5,
      y: 10,
    },
    width: 4,
    height: 8,
    color: "black",
  };

  it("calls fillStyle method first when drawing a shape", () => {
    expect.assertions(1);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // eslint-disable-next-line jest/no-conditional-in-test
    if (!ctx) throw new Error("context was not mocked");

    drawShape(ctx, circle);

    // @ts-expect-error these methods on the mock dont exist on the real rendering context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: any[] = ctx.__getEvents();

    expect(events[0]["type"]).toStrictEqual("fillStyle");
  });

  it("calls beginPath method second when drawing a circle", () => {
    expect.assertions(1);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // eslint-disable-next-line jest/no-conditional-in-test
    if (!ctx) throw new Error("context was not mocked");

    drawShape(ctx, circle);

    // @ts-expect-error these methods on the mock dont exist on the real rendering context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: any[] = ctx.__getEvents();

    expect(events[1]["type"]).toStrictEqual("beginPath");
  });

  it("calls arc method third when drawing a circle", () => {
    expect.assertions(1);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // eslint-disable-next-line jest/no-conditional-in-test
    if (!ctx) throw new Error("context was not mocked");

    drawShape(ctx, circle);

    // @ts-expect-error these methods on the mock dont exist on the real rendering context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: any[] = ctx.__getEvents();

    expect(events[2]["type"]).toStrictEqual("arc");
  });

  it("calls arc method with expected props when drawing a circle", () => {
    expect.assertions(1);

    const expected = {
      x: circle.center.x,
      y: circle.center.y,
      radius: circle.radius,
      startAngle: 0,
      endAngle: 6.283185307179586,
      anticlockwise: true,
    };

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // eslint-disable-next-line jest/no-conditional-in-test
    if (!ctx) throw new Error("context was not mocked");

    drawShape(ctx, circle);

    // @ts-expect-error these methods on the mock dont exist on the real rendering context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: any[] = ctx.__getEvents();

    expect(events[2]["props"]).toStrictEqual(expected);
  });

  it("calls fill method last when drawing a circle", () => {
    expect.assertions(1);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // eslint-disable-next-line jest/no-conditional-in-test
    if (!ctx) throw new Error("context was not mocked");

    drawShape(ctx, circle);

    // @ts-expect-error these methods on the mock dont exist on the real rendering context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: any[] = ctx.__getEvents();

    expect(events[events.length - 1]["type"]).toStrictEqual("fill");
  });

  it("calls fillRect method second when drawing a rect", () => {
    expect.assertions(1);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // eslint-disable-next-line jest/no-conditional-in-test
    if (!ctx) throw new Error("context was not mocked");

    drawShape(ctx, rect);

    // @ts-expect-error these methods on the mock dont exist on the real rendering context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: any[] = ctx.__getEvents();

    expect(events[1]["type"]).toStrictEqual("fillRect");
  });

  it("calls fillRect method with expected props when drawing a rect", () => {
    expect.assertions(1);

    const expected = {
      height: rect.height,
      width: rect.width,
      ...rect.center,
    };

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // eslint-disable-next-line jest/no-conditional-in-test
    if (!ctx) throw new Error("context was not mocked");

    drawShape(ctx, rect);

    // @ts-expect-error these methods on the mock dont exist on the real rendering context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: any[] = ctx.__getEvents();

    expect(events[1]["props"]).toStrictEqual(expected);
  });

  it("calls ctx twice when drawing a rectangle", () => {
    expect.assertions(1);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // eslint-disable-next-line jest/no-conditional-in-test
    if (!ctx) throw new Error("context was not mocked");

    drawShape(ctx, rect);

    // @ts-expect-error these methods on the mock dont exist on the real rendering context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: any[] = ctx.__getEvents();

    expect(events).toHaveLength(2);
  });

  it("calls ctx four times when drawing a circle", () => {
    expect.assertions(1);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // eslint-disable-next-line jest/no-conditional-in-test
    if (!ctx) throw new Error("context was not mocked");

    drawShape(ctx, circle);

    // @ts-expect-error these methods on the mock dont exist on the real rendering context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events: any[] = ctx.__getEvents();

    expect(events).toHaveLength(4);
  });
});
