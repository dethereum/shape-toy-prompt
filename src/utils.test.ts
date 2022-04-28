import { isPointInShape } from "./utils";
describe("isPointInShape", () => {
  const circle = {
    x: 8,
    y: 2,
    radius: 2,
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
});
