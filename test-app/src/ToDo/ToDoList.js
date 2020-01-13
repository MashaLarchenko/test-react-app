import React from "react"

import ToDoItem from './ToDoItem'


const styles = {
    ul: {
      listStyle: 'none',
      margin: 0,
      padding: 0  
    }
    
}

export default function ToDoList(){
    return(
        <ul style={styles.ul}>
            <ToDoItem/>
            <ToDoItem/>
        </ul>
    )
}