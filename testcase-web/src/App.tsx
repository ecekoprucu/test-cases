import React, { useEffect, useSyncExternalStore } from 'react'
import './App.css'
import store from './store/TodoStore';
import { Todo } from './components/Todo/Todo';
import { Form } from './components/Form/Form';
import { handleListenTheme, handleSwitch } from './utils/handleTheme';

function App() {
  const { todos, theme } = useSyncExternalStore(store.subscribe, store.getState);
 
  useEffect(() => {
    handleListenTheme();
  }, [])

  return (
    <div className={`${theme} main-root`}>
      <div className={`${theme} theme-switcher`}>
        <button className={`${theme} switch`} onClick={() => handleSwitch( theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'Switch Light' : 'Switch Dark'}</button>
      </div>
      <div className={`${theme} main-wrapper`}>
        {!!todos.length && <h1 className={theme}>Todo List</h1>}
        <ul style={{
          maxHeight: '50vh',
          overflowY: 'scroll',
        }}>
          {todos.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </ul>
        <Form />
      </div>
    </div>
  )
}

export default App
