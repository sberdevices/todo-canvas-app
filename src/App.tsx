import React, { FC, memo, useReducer } from "react";
import {
  createAssistant,
  createSmartappDebugger,
} from "@sberdevices/assistant-client";
import { AppBar, Toolbar, Typography, Paper } from "@material-ui/core";

import { reducer, State as StateType } from "./reducer";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";

const initializeAssistant = (getState: any) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDM4MTA1MTEsImV4cCI6MTYwMzg5NjkxMSwidHlwZSI6IkJlYXJlciIsImp0aSI6ImM3ZWJjZWI0LTQ2ZTYtNGJiZS1iZjg4LTY3MDgzYzdmYzBhMyIsInN1YiI6ImYyZDU4Yjg3MDFlMmNkNjJhMjhmY2NhMWM0OTNkMDQ5NjI1ZjM4ODcwOTE2YjZjMDJlOGZmNjdiZmYzYjQ1MjQ1MzliZTkyNzAwNDI2Mjk4IiwiYXVkIjoiVlBTIn0.tr5f4-4ix4nhfkcHehrCnnQx-kiBJM8HMCmZH0KVAQA5__HA1GQRbnhmqZAgL_Hn-l6OUo-TXNNIdCmb6kMuS5_ZXywr9S3S4Qdd4Uci10oH1POrLecqOkmaii1QVAq5GPGjIKOTh0qkddcRT1tqaLnACXp0URDFMfzyPrjkOx6L3tQ1bo6XCS5xVd1LBTPXxnPhpY5b3tnNfdig-XtZk-ObUOnFFEMB33q5OfRZwhXU3NrQL-0ilqDsnqfZc_MHX_G45xmxnc7AB1zESxfUp173yOxdS-anSCV_GRVn9rrHf34ra76ePZu65JC5_-vxlNCvFif4lCuCYAXmDMdpBGLIg60vu9hKuy-BnYu9Yno2KTOYAvur0cHbRXK_77PPcFRlCR3TMykvMBAEvI_PPZ5xlCN8fJIY-vGScPSSJ8TSOjwATNDHj7f1vhagCZ24zk0Ufl9BhLfx1NDKWubKo_6KHebzP8LdQSDQwWNH1ulXVY3UGmLcEW1EUcmOfzghMcQjiIcvVukQuOddC3eKGJ4kS07cvbuleBJCkGEY5s-P6hPJ6a_lLL7_Y2DKHl5zV-MSPEW2FXXhZbZIrwA2PYpMsmqBzo5JYoJVo1CXffu0KK32zaXLlnX8bXi-QOUiCTzekLFQaSlB9Q98tstqMJtZobwuAQZGfTXQWFCo9DM",
      initPhrase: "Запусти Ваня Туду",
      getState,
    });
  }

  return createAssistant({ getState });
};

initializeAssistant(() => {});

const initialState: StateType = { todos: [] };

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
      <AddTodo onAddTodo={(title) => dispatch({ type: "ADD_TODO", title })} />
      <TodoList
        todos={state.todos}
        onToggleTodo={(id) => dispatch({ type: "TOGGLE_TODO", id })}
        onDeleteTodo={(id) => dispatch({ type: "DELETE_TODO", id })}
      />
    </Paper>
  );
});
