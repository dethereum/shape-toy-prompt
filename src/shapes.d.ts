/**
 * @description represents a pair of coordinates to draw the shape.
 * for circle it is in the center and for a rectangle it is the top left corner of the rectangle.
 */
export type Point = {
  x: number;
  y: number;
};

type BaseShape = {
  point: Point;
  color: string;
};

type Circle = {
  radius: number;
} & BaseShape;

type Rectangle = {
  width: number;
  height: number;
} & BaseShape;

export type Shape = Rectangle | Circle;
