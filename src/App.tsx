import React, {
  FC,
  memo,
  useReducer,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  createSmartappDebugger,
  createAssistant,
  AssistantAppState,
} from "@sberdevices/assistant-client";
import "./App.css";

import { reducer, State as StateType } from "./store";

const initializeAssistant = (getState: any) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDQzODU3NjAsImV4cCI6MTYwNDQ3MjE2MCwidHlwZSI6IkJlYXJlciIsImp0aSI6Ijk0NzllZjQ1LTE2NmUtNDIwZC1iOWQ1LWNmZTQzMWE1YmZlMSIsInN1YiI6ImYyZDU4Yjg3MDFlMmNkNjJhMjhmY2NhMWM0OTNkMDQ5NjI1ZjM4ODcwOTE2YjZjMDJlOGZmNjdiZmYzYjQ1MjQ1MzliZTkyNzAwNDI2Mjk4IiwiYXVkIjoiVlBTIn0.FLqfkZtwhT9lzMsQhwVAC2kSuL6WxeXBzXyQKH4c9J-oQRXdkmx3Lk2UUecOba6Ky_cJYOSALR-elUuwO4_YezK20goV7v3Xg-z4E6KXzer7PmsQvpKJaj1p9u4vE05fg6CpbK6GX8OZ7gxJElm0WpP9XmG_nr3RWAIczaacpP_S8EuaZkYyCFl2jPBLkIWQE26Y-DTPCN07LuPreVpuRTytvqDse2CSycYNEk2RWKTXMw5lL1YRIQVydwwqpnIohxdiLQh2jLKvYGGt-wfA4JJ5srCPW-x2B-K8ReHIySC9DZPkyeM-a5Gs-owgL0V1Crsu4LnsTgwq9pCN_z99_-hCdHCd-6up0D-bQJyHlom27Nf52oczvCaNIMh5FlkwD8Nk10Hy2MeLxowqWjDomfPobllB3KF3OsSKkCC6AqG02pPzMg4uSmKotv00kH-d-tw0Zr7TRfH36IMrEOmukpYvmY3eBhnMP0kjpT3eincKSJ2un95wLkXKwOy1CG8wFcDSK-I_1-KGPlqENM55TRpVYzOMBHrJxPkNzswMQR9kF88FAU72TROKNru6VsF3n0c_f6-oIYiG0kpff7ZxXZhey8EFceQQ4ZYULpdQq6VKQ9A3h8lfGWUFH0Z934u3CDxAvS9167kZw7eHQ45KlnIACl6EXyTGVXaOG9me92Q",
      initPhrase: "Запусти Салют Демо Апп",
      getState,
    });
  }

  return createAssistant({ getState });
};

export const App: FC = memo(() => {
  const [state, dispatch] = useReducer(reducer, { notes: [] });

  const [note, setNote] = useState<string>("");

  const assistantRef = useRef<ReturnType<typeof createAssistant>>();

  const getAssistantAppState = (): AssistantAppState => ({
    item_selector: {
      items: state.notes.map(({ id, title }, index) => ({
        id,
        title,
        number: index + 1,
      })),
    },
  });

  useEffect(() => {
    assistantRef.current = initializeAssistant(getAssistantAppState);

    assistantRef.current.on("data", ({ action }: any) => {
      if (action) {
        dispatch(action);
      }
    });
  }, []);

  return (
    <main className="container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch({ type: "add_note", note });
          setNote("");
        }}
      >
        <input
          className="add-note"
          type="text"
          placeholder="Add Note"
          value={note}
          onChange={({ target: { value } }) => setNote(value)}
          required
          autoFocus
        />
      </form>
      <ul className="notes">
        {state.notes.map((note, index) => (
          <li className="note" key={note.id}>
            <span>
              <span style={{ fontWeight: "bold" }}>{index + 1}. </span>
              <span
                style={{
                  textDecorationLine: note.completed ? "line-through" : "none",
                }}
              >
                {note.title}
              </span>
            </span>
            <input
              className="done-note"
              type="checkbox"
              checked={note.completed}
              onChange={() => dispatch({ type: "done_note", id: note.id })}
            />
          </li>
        ))}
      </ul>
    </main>
  );
});
