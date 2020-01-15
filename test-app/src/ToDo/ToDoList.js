import React from "react";
import PropTypes from "prop-types";
import ToDoItem from "./ToDoItem";
import { Draggable } from "react-beautiful-dnd";

const styles = {
  ul: {
    listStyle: "none",
    margin: 0,
    padding: 0
  }
};

function ToDoList(props) {
  return (
    <ul style={styles.ul}>
      <h2>{props.title}</h2>
      {props.todos.map((todo, index) => {
        return (
          <Draggable
            draggableId={todo.id.toString()}
            key={todo.id}
            index={index}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <ToDoItem
                  todo={todo}
                  index={index + 1}
                  key={todo.id}
                  onChange={props.onToggle}
                />
              </div>
            )}
          </Draggable>
        );
      })}
    </ul>
  );
}

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired
};

export default ToDoList;
