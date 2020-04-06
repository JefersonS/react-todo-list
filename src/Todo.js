import React from 'react'

export default function Todo({todo, toggleTodo}) {
  function handleOnChangeTodo(e) {
    toggleTodo(todo.id);
  }

  return (
    <div>
      <input type="checkbox" onChange={handleOnChangeTodo} checked={todo.finished}/> {todo.name}
    </div>
  )
}
