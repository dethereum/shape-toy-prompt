import type { Shape } from "../../shapes";
import { isPointInShape } from "../utils";
describe("isPointInShape", () => {
  const circle: Shape = {
    radius: 2,
    point: {
      x: 8,
      y: 2,
    },
    color: "black",
    isSelected: false,
  };

  const rectangle: Shape = {
    height: 2,
    width: 3,
    point: {
      x: 5.5,
      y: 1,
    },
    color: "black",
    isSelected: false,
  };

  it("returns false when point is outside of circle", () => {
    const p = { x: 4, y: 2 };

    const result = isPointInShape(p, circle);

    expect(result).toBe(false);
  });

  it("returns true when point is inside of circle", () => {
    const p = { x: 9, y: 3.5 };

    const result = isPointInShape(p, circle);

    expect(result).toBe(true);
  });

  it("returns false when point is outside of rectangle", () => {
    const p = { x: 2, y: 2 };

    const result = isPointInShape(p, rectangle);

    expect(result).toBe(false);
  });

  it("returns true when point is inside of rectangle", () => {
    const p = { x: 6, y: 2 };

    const result = isPointInShape(p, rectangle);

    expect(result).toBe(true);
  });
});
