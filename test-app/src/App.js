import React from 'react';
import ToDoList from './ToDo/ToDoList';


function App() {
const todos = [
  {id:1, completed: false, title: 'Buy bread'},
  {id:2, completed: false, title: 'Buy butter'},
  {id:3, completed: false, title: 'Buy milk'},
  {id:4, completed: false, title: 'Buy water'},
]

  return (
<div className="wrapper">
  <h1>React App</h1>
  <ToDoList todos={todos} />
</div>
  ) 
}

export default App;
