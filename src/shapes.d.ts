export type Point = {
  x: number;
  y: number;
};

type BaseShape = {
  center: Point;
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
