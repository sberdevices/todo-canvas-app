import React, { FC, memo } from "react";
import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

import { Todo as TodoType } from "../reducer";

interface TodoProps {
  todo: TodoType;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoListItem: FC<TodoProps> = memo(
  ({ todo, onToggle, onDelete }) => (
    <ListItem>
      <Checkbox
        onClick={() => onToggle(todo.id)}
        checked={todo.completed}
        color="primary"
      />
      <ListItemText
        primary={
          <>
            <strong style={{ marginRight: 4 }}>{todo.id}.</strong>
            {todo.title}
          </>
        }
      />
      <ListItemSecondaryAction>
        <IconButton onClick={() => onDelete(todo.id)} color="secondary">
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
);
