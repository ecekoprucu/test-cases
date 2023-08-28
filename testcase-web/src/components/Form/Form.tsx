import { randomIdGenerate } from "../../utils/randomIdGenerate";
import store from "../../store/TodoStore";
import { useSyncExternalStore } from "react";

import './Form.css';

export const Form = () => {
    const { theme } = useSyncExternalStore(store.subscribe, store.getState);

    return (
        <div className={theme}>
            <h1>Todo Form</h1>
            <form
                style={{
                   textAlign: 'start'
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = new FormData(e.target as HTMLFormElement);
                    const text = form.get('text') as string;
                    store.addTodo({
                        id: randomIdGenerate(),
                        text,
                        isDone: false,
                    });

                    (e.target as HTMLFormElement).reset();
                } }>
                <label htmlFor="text">Todo Text</label>
                <br />
                <input
                    type="text"
                    name="text" />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}