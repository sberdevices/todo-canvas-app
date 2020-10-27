export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type State = {
  todos: Array<Todo>;
};

type Action =
  | { type: "ADD_TODO"; title: string }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "DELETE_TODO"; id: number };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: state.todos.length + 1, title: action.title, completed: false },
        ],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter(({ id }) => id !== action.id),
      };
    default:
      throw new Error();
  }
};
