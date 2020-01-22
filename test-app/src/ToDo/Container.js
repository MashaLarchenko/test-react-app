import React, { useState } from "react";
import ToDoList from "./ToDoList";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

export default function Container({ columns, todos, onToggle, loading }) {
  const [newColumns, setColumns] = useState(columns);
  const [newTodos, setTodos] = useState(todos);

  function onDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = newColumns.filter(
      column => column.id === source.droppableId
    );

    const startColumn = sourceColumn;
    const endColumn = newColumns.filter(
      column => column.id === destination.droppableId
    );

    if (startColumn[0].id === endColumn[0].id) {
      const newTasksIds = sourceColumn[0].tasksIds;
      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, +draggableId);
      sourceColumn[0].tasksIds = newTasksIds;
      let newColData = [];
      newColumns.forEach(column => {
        if (column.id === sourceColumn[0].id) {
          newColData.push(sourceColumn[0]);
        } else {
          newColData.push(column);
        }
        setColumns(newColData);
        return;
      });
    } else {
      const newStartTasksIds = startColumn[0].tasksIds;
      newStartTasksIds.splice(source.index, 1);
      startColumn[0].tasksIds = newStartTasksIds;
      let newStartColData = [];
      newColumns.forEach(column => {
        if (column.id === startColumn[0].id) {
          newStartColData.push(startColumn[0]);
        } else {
          newStartColData.push(column);
        }
        setColumns(newStartColData);
      });

      const newEndTasksIds = endColumn[0].tasksIds;
      newEndTasksIds.splice(destination.index, 0, +draggableId);
      endColumn[0].tasksIds = newEndTasksIds;
      let newEndColData = [];
      newColumns.forEach(column => {
        if (column.id === endColumn[0].id) {
          newEndColData.push(endColumn[0]);
        } else {
          newEndColData.push(column);
        }
        setColumns(newEndColData);
        setTodos(
          newTodos.map(todo => {
            if (todo.id === +draggableId) {
              todo.column = destination.droppableId;
            }
            return todo;
          })
        );
      });
    }
    const listItem = document.querySelector(".listItem");
    listItem.style.color = "black";
  }

  function onDragStart(ev) {
    const listItem = document.querySelector(".listItem");
    listItem.style.color = "orange";
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="columnContainer">
        {newColumns.map(column => {
          const tasks = [];
          const classes = ["columnItem"];
          classes.push(column.id);
          column.tasksIds.map(idTask =>
            todos.forEach(todo => {
              return todo.id === idTask ? tasks.push(todo) : null;
            })
          );
          return (
            <React.Fragment key={column.id}>
              {tasks.length ? (
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => {
                    let draggingEvOver = ["listContainer"];
                    if (snapshot.isDraggingOver) {
                      draggingEvOver.push("onDragOver");
                    }
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                        className={draggingEvOver.join(' ')}
                      >
                        <ToDoList
                          todos={tasks}
                          onToggle={onToggle}
                          title={column.title}
                          tasks={column.tasks}
                          className={classes.join(" ")}
                          draggingEvOver={draggingEvOver}
                        />
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              ) : loading ? null : (
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => {
                    let draggingEvOver = ["listContainer"];

                    if (snapshot.isDraggingOver) {
                      draggingEvOver.push("onDragOver");
                    }
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                        className={draggingEvOver.join(" ")}
                      >
                        <h2>{column.title}</h2>
                        <p>No todos</p>
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </DragDropContext>
  );
}
