import React from "react";
import ToDoList from "./ToDo/ToDoList";
import AddToDo from "./ToDo/AddToDo";

import Context from "./context";

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, completed: false, title: "Buy bread" },
    { id: 2, completed: true, title: "Buy butter" },
    { id: 3, completed: false, title: "Buy milk" },
    { id: 4, completed: false, title: "Buy water" }
  ]);

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

        {todos.length ?  <ToDoList todos={todos} onToggle={toggleToDo} /> : <p>No active todos</p>}
       <AddToDo onCreate={addTodo}/>
      </div>
    </Context.Provider>
  );
}

export default App;
