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

  return (
    <DragDropContext onDragEnd={onDragEnd} key={Date.now()}>
      <div className="columnContainer">
        {newColumns.map(column => {
          console.log(newColumns);
          const tasks = [];
          const classes = ["columnItem"];
          classes.push(column.id);
          console.log(column.tasksIds);

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
                        className={'listContainer'}
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
                <div className={'listContainer'}>
                  <h2>{column.title}</h2>
                  <p>No todos</p>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </DragDropContext>
  );
}
