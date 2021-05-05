import React, {useState, useReducer} from 'react';
import './App.css';
//import './Todo';
import Todo from './Todo';


export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO:'toggle-todo',
  DELETE_TODO: 'delete-todo'
};

const reducer = (todos, action) => {
  console.log(action.type);
  switch (action.type){
    case ACTIONS.ADD_TODO:
      // console.log('add');
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      // console.log("toggle");
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete};
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter( todo => todo.id !== action.payload.id);
    default:
      return todos;
  }    
};

const newTodo = (todo) => {
  return {id: Date.now(), name: todo, complete: false}
};


function App() {

  const [todo, changetodo] = useState('');
  const [todos, dispatch] = useReducer(reducer,[]);

  
  const todoSubmit = (event) =>{
    event.preventDefault();
    if (todo !== '') {
      dispatch({type: ACTIONS.ADD_TODO, payload: {name: todo} });
    // console.log(todos);
    changetodo('');
    }
  };

  const inputTodoHandler = (event) => {
    //event.preventDefault();
    // console.log(event.target.value);
    changetodo(event.target.value);
  };
  console.log(todos);
  return (
    <>
    <form onSubmit={todoSubmit}>
      <input type='text' onChange={inputTodoHandler} value={todo}></input>
    </form>
    {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch}/> 
      })}
    </>
  );
}

export default App;
