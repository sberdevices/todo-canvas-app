import React, { FC, memo, useReducer } from "react";
import { AppBar, Toolbar, Typography, Paper } from "@material-ui/core";

import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";

export type Todo = {
  id: number;
  text: string;
};

type State = {
  todos: Array<Todo>;
};

type Action =
  | { type: "ADD_TODO"; text: string }
  | { type: "DELETE_TODO"; id: number };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: state.todos.length + 1, text: action.text },
        ],
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

const initialState: State = {
  todos: [],
};

export const App: FC = memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Paper
      elevation={0}
      style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
    >
      <AppBar color="primary" position="static" style={{ height: 64 }}>
        <Toolbar style={{ height: 64 }}>
          <Typography color="inherit">Todo App</Typography>
        </Toolbar>
      </AppBar>
      <AddTodo onAddTodo={(text) => dispatch({ type: "ADD_TODO", text })} />
      <TodoList
        todos={state.todos}
        onDeleteTodo={(id) => dispatch({ type: "DELETE_TODO", id })}
      />
    </Paper>
  );
});
