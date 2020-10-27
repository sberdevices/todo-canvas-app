import React, { FC, memo, useState } from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

interface AddTodoProps {
  onAddTodo: (text: string) => void;
}

export const AddTodo: FC<AddTodoProps> = memo(({ onAddTodo }) => {
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {
    if (text.length) {
      onAddTodo(text);
      setText("");
    }
  };

  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <TextField
              placeholder="Add Todo"
              value={text}
              onChange={({ target: { value } }) => setText(value)}
              fullWidth
            />
          </form>
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            onClick={handleSubmit}
            fullWidth
            color="primary"
            variant="outlined"
            disabled={!text.length}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
});
