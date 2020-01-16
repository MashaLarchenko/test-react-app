import React, { useState, useEffect } from "react";
import ToDoList from "./ToDo/ToDoList";
import Modal from "./Modal/Modal";
import Loader from "./Loader";
import Context from "./context";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

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

  function removeToDo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function addTaskToColumn() {
    console.log(todos);
    const taskColumnName = todos[todos.length - 1].column;
    const newTaskiD = todos[todos.length - 1].id;

    columns.forEach(column => {
      if (column.id === taskColumnName && newTaskiD !== column.tasksIds[column.tasksIds.length - 1]) {
        column.tasksIds.push(newTaskiD);
      }
    });
    console.log(newTaskiD, columns);
    return setColumns(columns);
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
          column: "toDo"
        }
      ])
    );

    addTaskToColumn();
  }

  // componentDidUpdate() {
  //   document.title = addTaskToColumn();
  // }

  function onDragEnd(result) {
    console.log(result);
  }

  return (
    <Context.Provider value={{ removeToDo }}>
      <div className="wrapper">
        <h1>Your Awesome To Do List</h1>
        {loading && <Loader />}
        <Modal></Modal>
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddToDo onCreate={addTodo} changeColunm={addTaskToColumn} />
        </React.Suspense>
        <div className="columnContainer">
          {columns.map(column => {
            const tasks = [];
            const classes = ["columnItem"];
            classes.push(column.id);
            column.tasksIds.map(task =>
              todos.forEach(taskListEl => {
                // console.log(taskListEl.id, task);
                return taskListEl.id === task ? tasks.push(taskListEl) : null;
              })
            );
            return (
              <DragDropContext onDragEnd={onDragEnd} key={column.id}>
                <React.Fragment>
                  {tasks.length ? (
                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <ToDoList
                            todos={tasks}
                            onToggle={toggleToDo}
                            title={column.title}
                            tasks={column.tasks}
                            className={classes.join(" ")}
                          />
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ) : loading ? null : (
                    <div>
                      <h2>{column.title}</h2>
                      <p>No todos</p>
                    </div>
                  )}
                </React.Fragment>
              </DragDropContext>
            );
          })}
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
