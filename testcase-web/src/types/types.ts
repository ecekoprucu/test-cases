export type Todo = {
    id: string;
    text: string;
    isDone: boolean;
};
  
export type InitialState = {
    todos: Todo[];
    theme: string;
};

export const initialState: InitialState = { todos: [], theme: '' };