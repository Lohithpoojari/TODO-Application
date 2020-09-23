import React, { useState,useEffect } from "react";
import "./App.css";

//Importing components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {


  
  //state
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos,setFilteredTodos] = useState([]);

  //useEffect
  useEffect(()=>{
    getLocalTodos();
  }, [] );
useEffect(()=>{
    filterHandler();
    saveLocalTodos();
    
}, [todos,status] );

//save to local storage
const saveLocalTodos = () =>{
  
  localStorage.setItem("todos",JSON.stringify(todos));
  
}

const getLocalTodos =()=>{
  if(localStorage.getItem("todos")===null){
    localStorage.setItem("todos",JSON.stringify([]));
  }else{
   let localTodos= JSON.parse(localStorage.getItem("todos",JSON.stringify(todos)));
   setTodos(localTodos);
  }
}

  
  //functions
  const filterHandler = ()=>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo=> todo.completed === true) );
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo=> todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;        
        
    }

  }

  return (
    <div className="App">
      <header>Todo's List</header>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList setTodos={setTodos} todos={todos} filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
