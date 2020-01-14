import React, { useEffect } from "react";
import ToDoList from "./ToDo/ToDoList";
import Modal from "./Modal/Modal";
import Loader from "./Loader";
import Context from "./context";

const AddToDo = React.lazy(() => 
  import('./ToDo/AddToDo')
)

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(response => response.json())
    .then(todos =>
      setTimeout(() => {
        setTodos(todos);
        setLoading(false);
      }, 2000)
    ) 
  }, [])  

  function toggleToDo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  function removeToDo(id) {
    setTodos(todos.filter(todo => todo.id !== id
    ))
  }


  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }
  return (
    <Context.Provider value={{ removeToDo }}>
      <div className="wrapper">
        <h1>React App</h1>
        {loading && <Loader/>}
        <Modal></Modal>
        {todos.length ?  (<ToDoList todos={todos} onToggle={toggleToDo} />) : (loading ? null : <p>No todos</p>)}
      <React.Suspense fallback={<p>Loading...</p>}>
            <AddToDo onCreate={addTodo}/>
      </React.Suspense>
   
    
      </div>
    </Context.Provider>
  );
}

export default App;
