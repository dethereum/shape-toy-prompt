import { isPointInShape } from "../utils";
describe("isPointInShape", () => {
  const circle = {
    radius: 2,
    center: {
      x: 8,
      y: 2,
    },
  };

  const rectangle = {
    height: 2,
    width: 3,
    center: {
      x: 5.5,
      y: 1,
    },
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
    const p = { x: 5, y: 1.5 };

    const result = isPointInShape(p, rectangle);

    expect(result).toBe(true);
  });
});
