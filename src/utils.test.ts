import { isPointInShape } from "./utils";
describe("isPointInShape", () => {
  it("returns false when point is outside of circle", () => {
    const x = 4;
    const y = 2;

    const circle = {
      x: 8,
      y: 2,
      radius: 2,
    };

    const result = isPointInShape(x, y, circle);

    expect(result).toBe(false);
  });
});
