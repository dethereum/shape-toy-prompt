import { isPointInShape } from "./utils";
describe("isPointInShape", () => {
  const circle = {
    x: 8,
    y: 2,
    radius: 2,
  };

  const rectangle = {
    height: 2,
    width: 3,
    x: 5.5,
    y: 1,
  };

  it("returns false when point is outside of circle", () => {
    const x = 4;
    const y = 2;

    const result = isPointInShape(x, y, circle);

    expect(result).toBe(false);
  });

  it("returns true when point is inside of circle", () => {
    const x = 9;
    const y = 3.5;

    const result = isPointInShape(x, y, circle);

    expect(result).toBe(true);
  });

  it("returns false when point is outside of rectangle", () => {
    const x = 2;
    const y = 2;

    const result = isPointInShape(x, y, rectangle);

    expect(result).toBe(false);
  });

  it("returns true when point is inside of rectangle", () => {
    const x = 5;
    const y = 1.5;

    const result = isPointInShape(x, y, rectangle);

    expect(result).toBe(true);
  });
});
