import { useState } from 'react'

export default function App() {

  const [todos, setTodos] = useState([
    { id: 1, text: 'Aprender las bases de React', completed: false },
    { id: 2, text: 'Subir este proyecto a GitHub', completed: false }
  ])

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario frenado.", inputValue);
    const nuevoTodo = { id: Date.now(), text: inputValue, completed: false };
    setTodos([...todos, nuevoTodo]);
    setInputValue("");
  }

  const deleteTodo = (id) => {
    const nuevasTareas = todos.filter(todo => todo.id !== id);
    setTodos(nuevasTareas);
  }

  const toggleTodo = (id) => {
    const nuevasTareas = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo; 
    });
    setTodos(nuevasTareas);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Mi Lista de Tareas</h1>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Escribe una nueva tarea..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Añadir</button>
      </form>
      
      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id}
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}
          >
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />

            {todo.text}
            
            <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}