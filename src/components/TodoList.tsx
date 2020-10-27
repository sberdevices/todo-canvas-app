import React, { FC, memo } from "react";
import { List, Paper } from "@material-ui/core";

import { Todo as TodoType } from "../App";
import { TodoListItem } from "./TodoListItem";

interface TodoListProps {
  todos: Array<TodoType>;
  onDeleteTodo: (id: number) => void;
}

export const TodoList: FC<TodoListProps> = memo(({ todos, onDeleteTodo }) => (
  <>
    {todos.map((todo) => (
      <Paper key={todo.id} style={{ margin: 16 }}>
        <List style={{ overflow: "scroll" }}>
          <TodoListItem todo={todo} onDelete={onDeleteTodo} />
        </List>
      </Paper>
    ))}
  </>
));
