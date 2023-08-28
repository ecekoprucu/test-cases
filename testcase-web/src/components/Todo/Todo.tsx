import React, { useState, useSyncExternalStore } from 'react';
import store from '../../store/TodoStore';
import { Todo as TodoType } from '../../types/types';

import './Todo.css';

export const Todo = ({id, text, isDone}: TodoType) => {
    const { theme } = useSyncExternalStore(store.subscribe, store.getState);
    const [editMode, setEditMode] = useState(false);

    return (
        <div className={`${theme} single-todo`}>
             { !editMode ? 
              (<>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => store.toggleTodo(id)}
                />
                <p className={isDone ? 'done' : ''}>
                  {text}
                </p>
                <button className='remove' onClick={() => store.removeTodo(id)}>X</button>
                <button className='edit' onClick={() => setEditMode(true)}>Edit</button>
              </>) : 
              (
                <form
                  style={{
                    textAlign: 'start'
                  }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = new FormData(e.target as HTMLFormElement);
                    const changedText = form.get('text') as string;
                    store.updateTodo({
                      id,
                      text: changedText,
                      isDone,
                    });
                    setEditMode(false);
                  } }>
                  <label htmlFor="text">Todo Text</label>
                  <br />
                  <input
                    type="text"
                    name="text"
                    defaultValue={text} />
                    <br />
                  <div className='submit-area'>
                    <button type="submit">Edit Todo</button>
                    <button className='cancel-edit' type="button" onClick={() => setEditMode(false)}>Cancel</button>
                  </div>
                </form>
              )
             }
        </div>
    )
}
