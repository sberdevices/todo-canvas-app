import React, { FC, memo } from "react";
import { List, Paper } from "@material-ui/core";

import { Todo as TodoType } from "../reducer";
import { TodoListItem } from "./TodoListItem";

interface TodoListProps {
  todos: Array<TodoType>;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

export const TodoList: FC<TodoListProps> = memo(
  ({ todos, onToggleTodo, onDeleteTodo }) => (
    <>
      {todos.map((todo) => (
        <Paper key={todo.id} style={{ margin: 16 }}>
          <List style={{ overflow: "scroll" }}>
            <TodoListItem
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
            />
          </List>
        </Paper>
      ))}
    </>
  )
);
