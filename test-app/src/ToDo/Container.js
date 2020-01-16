import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

function onDragEnd(result) {
  console.log(result);
}

export default function Container({ columns, todos, onToggle, loading }) {
  return (
    <div className="columnContainer">
      {columns.map(column => {
        const tasks = [];
        const classes = ["columnItem"];
        classes.push(column.id);
        column.tasksIds.map(task =>
          todos.forEach(taskListEl => {
            return taskListEl.id === task ? tasks.push(taskListEl) : null;
          })
        );
        return (
          <DragDropContext onDragEnd={onDragEnd} key={column.id}>
            <React.Fragment>
              {tasks.length ? (
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <ToDoList
                        todos={tasks}
                        onToggle={onToggle}
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
  );
}
