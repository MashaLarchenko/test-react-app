import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Context from "../context";
import styled from "styled-components";




const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: ".5rem",
  },
  input: {
    marginRight: "1rem"
  }
};

// const ToDoItemContainer = styled.div`
//   background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
// `;

// const color ={
//   false: ' background: "white"',
//   true:  ' background: "lightgreen"'
// }

// let isDragginsEv = false;


function ToDoItem({ todo, index, onChange, draggingEv }) {

    const { removeToDo } = useContext(Context)
    const classes = ['listItem'];
    const colorDrag = ['todoItem', draggingEv]


    if(todo.completed) {
        classes.push('done')
    }
  return (
       <li className={colorDrag.join(' ')} >
      <span className={classes.join(' ')} style={styles.input}
          onChange={() => onChange(todo.id)}>
        <strong>{index}</strong>
        &nbsp;
        {todo.title}
      </span>
      <button className="rm" onClick={removeToDo.bind(null, todo.id, todo.column)}>&times;</button>
    </li>
  );
}

ToDoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default ToDoItem;
