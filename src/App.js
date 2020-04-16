import React, { useState } from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';

/* APP */
function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = window.localStorage.getItem('storedTodos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (e) {
      return [];
    }
  });
  // ADD NEW TODO
  const addTodo = newTodo => {
    let todoKey = uniqid();
    window.localStorage.setItem(
      'storedTodos',
      JSON.stringify([{ todo: newTodo, done: false, key: todoKey }, ...todos])
    );
    setTodos([{ todo: newTodo, done: false, key: todoKey }, ...todos]);
  };
  // DELETE TODO
  const deleteTodo = todoKey => {
    const todosToKeep = () => {
      return todos.filter(a => a.key !== todoKey);
    };
    window.localStorage.setItem('storedTodos', JSON.stringify(todosToKeep));
    setTodos(todosToKeep);
  };
  return (
    <div className="app">
      <Container>
        <h1>Add Your Todos</h1>
        <InputSentence lift={addTodo} />
        <Parag allTodos={todos} del={deleteTodo} />
      </Container>
    </div>
  );
}
const Container = styled.div`
  max-width: 500px;
  text-align: center;
  margin: 0 auto;
  padding: 0 2rem;
  h1 {
    font-size: 48px;
    color: #f3cf78;
    margin: 2rem auto 2rem auto;
    padding: 1.5rem;
    border-bottom: 20px dotted rgba(243, 207, 120, 0.04);
  }
  @media (max-width: 480px) {
    h1 {
      font-size: 30px;
      border-bottom: none;
      padding: 0;
    }
  }
`;

/* INPUT */
function InputSentence(props) {
  const [inputValue, setInputValue] = useState('');
  const handleChange = e => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = e => {
    if (e.keyCode === 13 && inputValue.trim()) {
      props.lift(e.target.value);
      setInputValue('');
    }
  };
  return (
    <InputDiv>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={inputValue}
        placeholder="Add a todo here"
      />
    </InputDiv>
  );
}
const InputDiv = styled.div`
  input {
    color: #ddd;
    font-style: italic;
    display: block;
    font-size: 17px;
    width: 100%;
    padding: 0.5rem;
    margin: 1rem auto 5rem auto;
    background: #333;
    border: none;
    border-bottom: 10px solid rgba(243, 207, 120, 0.1);
    }
  }
  @media (max-width: 480px) {
    input {
      margin: 0 auto 2rem auto;
    }
`;

/* PARAG */
function Parag(props) {
  return props.allTodos.map(todo => (
    <P
      key={todo.key}
      onClick={() => {
        props.del(todo.key);
      }}
      onTouchStart={e => {
        e.target.classList.add('active');
      }}
      onTouchEnd={e => {
        e.target.classList.remove('active');
      }}
    >
      {todo.todo}
    </P>
  ));
}
const P = styled.p`
  color: #ddd;
  position: relative;
  text-align: center;
  font-size: 1.2rem;
  padding: 0.7rem;
  margin-bottom: 1.5rem;
  border-left: 5px solid rgba(243, 207, 120, 0.1);
  border-right: 5px solid rgba(243, 207, 120, 0.1);
  background: #2c2c2c;
  user-select: none;
  &&:hover {
    color: #ccc;
    background: #2e2e2e;
  }
  &&:active {
    transform: rotate(3deg) scale(1.08);
    text-decoration: line-through;
    color: #ce5b5b;
    border-left: 5px solid #ce5b5b;
    border-right: 5px solid #ce5b5b;
  }
  &&.active {
    transform: rotate(3deg) scale(1.08);
    text-decoration: line-through;
    color: #ce5b5b;
    border-left: 5px solid #ce5b5b;
    border-right: 5px solid #ce5b5b;
  }
`;

export default App;
