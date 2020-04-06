import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'

const LOCAL_STORAGE_KEY = 'REACT_TODO_LIST'

function App() {
  const [todos, setTodos] = useState([
    { id: 0, name: 'Todo 1', finished: false },
    { id: 1, name: 'Todo 2', finished: false }
  ]);
  const todoNameRef = useRef();

  // set todos if local storage contains any values
  useEffect(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(savedTodos) setTodos(JSON.parse(savedTodos));
  }, [])

  // save todos to local storage based on changes on todos var
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.finished = !todo.finished;
    setTodos(newTodos);
  }

  function handleNewTodo() {
    const name = todoNameRef.current.value;
    if(!name) return;
    console.log(setTodos)
    setTodos(currentTodos => {
      return [...currentTodos, { id: todos.length, name: name, finished: false }]
    });

    todoNameRef.current.value = '';
  }

  function handleClearAll() {
    setTodos([]);
  }

  function handleClearDone() {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => !todo.finished)
    });
  }

  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text"></input> <br />
      <button onClick={handleNewTodo}>New Todo</button>
      <button onClick={handleClearAll}>Clear All</button>
      <button onClick={handleClearDone}>Clear Done</button>
      <div>{todos.filter(todo => !todo.finished).length} unfinished task(s)</div>
    </div>
  );
}

export default App;
