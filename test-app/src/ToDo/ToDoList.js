import React from "react"

import ToDoItem from './ToDoItem'


const styles = {
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    }

}

export default function ToDoList(props) {
    return (
        <ul style={styles.ul}>
            {props.todos.map((todo, index) => {
                return <ToDoItem todo={todo} index={index+1} key={todo.id} />
            }
            )
            }
        </ul>
    )
}