import { InitialState, Todo } from "../types/types";

const listeners: { (state: InitialState): void; }[] = [];

const createStore = (initialState: InitialState) => {
    let state = initialState;

    return { 
        getState: () => state,

        addTodo: (todo: Todo) => {
            state = {
                ...state,
                todos: [...state.todos, todo],
            }

            listeners.forEach((listener) => listener(state));
        },
        removeTodo: (id: string) => {
            state = {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== id),
            }

            listeners.forEach((listener) => listener(state));
        },

        updateTodo: (todo: Todo) => {
            state = {
                ...state,
                todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
            }

            listeners.forEach((listener) => listener(state));
        },

        toggleTodo: (id: string) => {
            state = {
                ...state,
                todos: state.todos.map((todo) => {
                   return todo.id === id ? {
                        ...todo,
                        isDone: !todo.isDone,
                    } : todo;
                }),
            }

            listeners.forEach((listener) => listener(state));

        },

        changeTheme: (theme: string) => {
            state = {
                ...state,
                theme,
            }

            listeners.forEach((listener) => listener(state));
        },
        

        subscribe: (listener: (state: InitialState) => void) => {
            listeners.push(listener);
            
            return () => listeners.splice(listeners.indexOf(listener), 1);
        }
    }
}

const store = createStore({
    todos: [],
    theme: 'dark',
});

export default store;