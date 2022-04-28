type BaseShape = {
  x: number;
  y: number;
  color?: string;
};

type Circle = {
  radius: number;
} & BaseShape;

type Rectangle = {
  width: number;
  height: number;
} & BaseShape;

export type Shape = Rectangle | Circle;
