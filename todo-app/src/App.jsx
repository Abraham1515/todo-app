import { useState, useEffect } from 'react'

export default function App() {

  const [todos, setTodos] = useState(() => {
    const tareasGuardadas = localStorage.getItem('mis_tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  const [inputValue, setInputValue] = useState("");
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    localStorage.setItem('mis_tareas', JSON.stringify(todos));
  }, [todos]);

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

  const tareasFilstradas = todos.filter(todo => {
    if (filtro === "activas") return !todo.completed; 
    if (filtro === "completadas") return todo.completed;
    return true;
  })



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

      <div style={{ marginTop: '15px', marginBottom: '15px' }}>
        <button onClick={() => setFiltro("todos")}>Todas</button>
        <button onClick={() => setFiltro("activas")}>Activas</button>
        <button onClick={() => setFiltro("completadas")}>Completadas</button>
      </div>
      
      <ul>
        {tareasFilstradas.map(todo => (
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