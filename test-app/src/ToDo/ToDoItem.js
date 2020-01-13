import React from "react"

export default function ToDoItem({ todo, index }){
return(
<li><strong>{index}</strong>{todo.title}</li>
)
}