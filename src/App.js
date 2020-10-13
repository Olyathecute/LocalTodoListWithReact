import React, { useEffect } from 'react'
import TodoList from './Todod/TodoList'
import Context from './context'
import Loader from './Loader'
import Modal from './Modal/Modal'
import { save, load } from './storage'

const AddTodo = React.lazy(
  () =>
    new Promise((resolve) => {
      resolve(import('./Todod/AddTodo'))
    })
)

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    setTodos(load())
    setLoading(false)
    // fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    //   .then((response) => response.json())
    //   .then((todos) => {
    //     setTimeout(() => {
    //       setTodos(todos)
    //       setLoading(false)
    //     }, 2000)
    //   })
  }, [])

  function toggleTodo(id) {
    let newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(newTodos)
    save(newTodos)
  }

  function removeTodo(id) {
    let newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
    save(newTodos)
  }

  function addTodo(title) {
    let newTodos = todos.concat([
      {
        title,
        id: Date.now(),
        completed: false
      }
    ])
    setTodos(newTodos)
    save(newTodos)
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React tutorial</h1>
        <Modal />
        <React.Suspense fallback={<Loader />}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}
        {todos.length ? <TodoList todos={todos} onToggle={toggleTodo} /> : loading ? null : <p>No todos</p>}
      </div>
    </Context.Provider>
  )
}

export default App
