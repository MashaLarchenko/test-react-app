import React, { useState, useEffect } from "react";
// import ToDoList from "./ToDo/ToDoList";
import Modal from "./Modal/Modal";
import Loader from "./Loader";
import Context from "./context";
// import { DragDropContext } from "react-beautiful-dnd";
// import { Droppable } from "react-beautiful-dnd";
import Container from "./ToDo/Container";

const AddToDo = React.lazy(() => import("./ToDo/AddToDo"));

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, completed: false, title: "Buy milk", column: "toDo" },
    { id: 2, completed: false, title: "Buy coffee", column: "toDo" }
  ]);

  const [loading, setLoading] = React.useState(false);

  const [columns, setColumns] = React.useState([
    {
      id: "toDo",
      title: "To Do",
      tasksIds: [1, 2],
      columnOrder: 1
    },
    {
      id: "inProgress",
      title: "In Progress",
      tasksIds: [],
      columnOrder: 2
    },
    {
      id: "doneTodo",
      title: "Done",
      tasksIds: [],
      columnOrder: 3
    }
  ]);

  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  //   .then(response => response.json())
  //   .then(todos =>
  //     setTimeout(() => {
  //       setTodos(todos);
  //       setLoading(false);
  //     }, 2000)
  //   )
  // }, [])

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

  function removeToDo(id, columnId) {
    setTodos(todos.filter(todo => todo.id !== id));

    columns.map(column => {
      const delEl = column.tasksIds.indexOf(id);
      if (column.id === columnId) {
        column.tasksIds.splice(delEl, 1);
      }
      return column;
    });
    setColumns(columns);
  }

  function addTaskToColumn() {
    if (todos.length) {
      const taskColumnName = todos[todos.length - 1].column;
      const newTaskiD = todos[todos.length - 1].id;
      columns.forEach(column => {
        if (
          column.id === taskColumnName &&
          !column.tasksIds.includes(newTaskiD)
        ) {
          column.tasksIds.push(newTaskiD);
        }
      });
    }

    return setColumns(columns);
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: todos.length + 1,
          completed: false,
          column: "toDo"
        }
      ])
    );
    columns.forEach(column => {
      if (column.id === "toDo") {
        column.tasksIds.push(todos.length + 1);
      }
    });
    addTaskToColumn();
  }

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppadbleId === source.droppadbleId &&
      destination.index === source.index
    ) {
      return;
    }
    const sourceColumn = columns.filter(
      column => column.id === source.droppableId
    );
    const newTasksIds = sourceColumn[0].tasksIds;
    newTasksIds.splice(source.index, 1);
    newTasksIds.splice(destination.index, 0, +draggableId);
    sourceColumn[0].tasksIds = newTasksIds;
    columns[0] = sourceColumn[0];

    setColumns(columns);
  }
  return (
    <Context.Provider value={{ removeToDo }}>
      <div className="wrapper">
        <h1>To Do List</h1>
        {loading && <Loader />}
        <Modal></Modal>
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddToDo onCreate={addTodo} />
        </React.Suspense>
        <Container
          columns={columns}
          onToggle={toggleToDo}
          loading={loading}
          todos={todos}
          setTodos={setTodos}
          setColumns={setColumns}
        ></Container>
      </div>
    </Context.Provider>
  );
}

export default App;
