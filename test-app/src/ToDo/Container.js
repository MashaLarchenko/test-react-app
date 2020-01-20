import React, { useState } from "react";
import ToDoList from "./ToDoList";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

export default function Container({ columns, todos, onToggle, loading }) {
  const [newColumns, setColumns] = useState(columns);
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
    const sourceColumn = newColumns.filter(
      column => column.id === source.droppableId
    );

    console.log(source, destination);

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
    });
  }

  function onDragStart() {
    const listItem = document.querySelector(".listItem");
    listItem.style.color = "orange";
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      key={Date.now()}
    >
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
            <React.Fragment>
              {tasks.length ? (
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => {
                    let draggingEvOver = "";
                    if (snapshot.isDraggingOver) {
                      draggingEvOver = "onDragOver";
                    }
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                        className={"listContainer"}
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
                      draggingEvOver.push("onDragOver") ;
                    }
                    return (
                      <div  ref={provided.innerRef}
                      {...provided.droppableProps}
                      isDraggingOver={snapshot.isDraggingOver}
                      className={draggingEvOver.join(" ")}>
                        <h2>{column.title}</h2>
                        <p>No todos</p>
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
