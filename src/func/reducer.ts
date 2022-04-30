import type { Shape } from "../shapes";

type AddAction = {
  type: "ADD";
  payload: Shape;
};

export type RootAction = AddAction;

export type RootState = {
  entities: Record<string, Shape>;
  ids: string[];
  selected: string[];
  highlighted: string;
};

export const reducer = (state: RootState, action: RootAction): RootState => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        ids: [...state.ids, action.payload.id],
        entities: {
          ...state.entities,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export const initialState: RootState = {
  entities: {},
  ids: [],
  selected: [],
  highlighted: "",
};

export const getShapes = (state: RootState): Shape[] => {
  const shapes: Shape[] = [];

  for (const id of state.ids) {
    const s = state.entities[id];
    if (s) shapes.push(s);
  }

  return shapes;
};
