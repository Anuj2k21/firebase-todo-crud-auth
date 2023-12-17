import React from "react";
import { db } from "../firebase";
import { useEffect } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "@firebase/firestore";
import { useState } from "react";
import "./TodoList.css"

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("")
    const [editing, setEditing] = useState(null)
    const [editingText, setEditingText] = useState("")

    useEffect(() => {
        const todoCollection = collection(db, "todos");
        onSnapshot(todoCollection, (Snapshot) => {
            console.log(Snapshot.docs);
            const newData = Snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTodos(newData);
        });
    }, []);


    const handleinputChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleAddTodos = async () => {
        if (inputValue !== "") {
            await addDoc(collection(db, "todos"), { text: inputValue, completed: false })
            setInputValue(" ")
        }
    }

    const handleToggleChange = async (id) => {
        const todoRef = doc(db, "todos", id)
        const todo = todos.find((todo) => todo.id === id);
        await updateDoc(todoRef, { ...todo, completed: !todo.completed })

    }

    const handleRemoveTodo = async (id) => {
        const todoRef = doc(db, "todos", id);
        await deleteDoc(todoRef)

    }
    const handleEditTodo = async (id, text) => {
        if (editing === id && editingText) {//save the edited text
            const todoRef = doc(db, "todos", id)
            await updateDoc(todoRef, { text: editingText })
            setEditing(null)
            setEditingText(" ");
        }
        else {   //enbleling ediiting mode

            setEditing(id);
            setEditingText(text)
        }

    }

    return (<div style={{ margintop: "10px" }}>

        <div className="todo-container">

            <h1>Todo List Firebase</h1>
            <div className="todo-input">
                <input type="text" placeholder="Add Todo..." value={inputValue} onChange={handleinputChange} />
                <button onClick={handleAddTodos}>Add</button>
            </div>

            <ul className="todo-list">

                {todos.map((todo) => (
                    <li className={`todo-item ${todo.completed === true ? 'completed' : ""}`} key={todo.id}>
                        <input type="checkbox" onChange={() => { handleToggleChange(todo.id) }} checked={todo.completed} />


                        {
                            editing === todo.id ? (<input type="text" value={editingText} onChange={(e) => { setEditingText(e.target.value) }} />) :
                                (<span className="todo-text">{todo.text}</span>)
                        }

                        <button style={{ marginLeft: '10px', marginRight: '10px', backgroundColor: editing === todo.id ? "green" : "blue" }}
                            onClick={() => handleEditTodo(todo.id, todo.text)}>
                            {editing === todo.id ? "Save" : "Edit"}</button>

                        <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    </div >);
};

export default TodoList;
