import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트 공부하기', completed: false },
    { id: 2, text: 'Vite 프로젝트 만들기', completed: true },
  ])
  const [input, setInput] = useState('')

  const addTodo = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setTodos([...todos, { id: Date.now(), text: trimmed, completed: false }])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTodo()
  }

  const remaining = todos.filter(t => !t.completed).length

  return (
    <div className="app">
      <div className="card">
        <h1>할 일 목록</h1>
        <p className="summary">
          {todos.length === 0
            ? '할 일이 없습니다'
            : `총 ${todos.length}개 중 ${remaining}개 남음`}
        </p>

        <div className="input-row">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="새 할 일을 입력하세요..."
          />
          <button className="btn-add" onClick={addTodo}>추가</button>
        </div>

        <ul className="todo-list">
          {todos.length === 0 && (
            <li className="empty">등록된 할 일이 없습니다.</li>
          )}
          {todos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'done' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
              <button
                className="btn-delete"
                onClick={() => deleteTodo(todo.id)}
                aria-label="삭제"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
