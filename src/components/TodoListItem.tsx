import React, { FC, memo } from "react";
import {
  ListItem,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

import { Todo as TodoType } from "../App";

interface TodoProps {
  todo: TodoType;
  onDelete: (id: number) => void;
}

export const TodoListItem: FC<TodoProps> = memo(({ todo, onDelete }) => (
  <ListItem>
    <ListItemText primary={todo.text} />
    <ListItemSecondaryAction>
      <IconButton onClick={() => onDelete(todo.id)} aria-label="Delete Todo">
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
));
