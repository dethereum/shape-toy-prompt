import type { Shape } from "../shapes";

type AddAction = {
  type: "ADD";
  payload: Shape;
};
type SelectAction = {
  type: "SELECT";
  payload: Shape;
};

type MultiSelectAction = {
  type: "MULTI_SELECT";
  payload: Shape;
};

type DeselectAction = {
  type: "DESELECT";
  payload: Shape;
};

type DeselectAllAction = {
  type: "DESELECT_ALL";
};

type HighlightAction = {
  type: "HIGHLIGHT";
  payload: Shape;
};

type RemoveHighlightAction = {
  type: "REMOVE_HIGHLIGHT";
};

export type RootAction =
  | AddAction
  | SelectAction
  | MultiSelectAction
  | DeselectAction
  | DeselectAllAction
  | HighlightAction
  | RemoveHighlightAction;

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
    case "SELECT":
      // eslint-disable-next-line no-case-declarations
      const entities = state.selected.reduce<Record<string, Shape>>(
        (shapes, id) => {
          const s = shapes[id];
          if (!s) return shapes;

          return {
            ...shapes,
            [id]: { ...s, isSelected: false },
          };
        },
        {
          ...state.entities,
          [action.payload.id]: { ...action.payload, isSelected: true },
        }
      );

      return {
        ...state,
        selected: [action.payload.id],
        entities,
      };
    case "MULTI_SELECT":
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: {
            ...action.payload,
            isSelected: true,
          },
        },
        selected: [...state.selected, action.payload.id],
      };
    case "DESELECT":
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: {
            ...action.payload,
            isSelected: false,
          },
        },
      };
    case "DESELECT_ALL":
      return {
        ...state,
        selected: [],
        entities: state.selected.reduce<Record<string, Shape>>((shapes, id) => {
          const s = shapes[id];
          if (!s) return shapes;

          return {
            ...shapes,
            [id]: { ...s, isSelected: false },
          };
        }, state.entities),
      };
    case "HIGHLIGHT":
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: {
            ...action.payload,
            isHighlighted: true,
          },
        },
        highlighted: action.payload.id,
      };
    case "REMOVE_HIGHLIGHT":
      // eslint-disable-next-line no-case-declarations
      const hs = state.entities[state.highlighted];
      if (!hs) return state;
      return {
        ...state,
        entities: {
          ...state.entities,
          [state.highlighted]: {
            ...hs,
            isHighlighted: false,
          },
        },
        highlighted: "",
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
