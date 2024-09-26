import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoApp from './TodoApp';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const saveTodos = async (newTodos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
      setTodos(newTodos);
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  return (
    <div className="App">
      <div className="stars">
        {[...Array(100)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
        {[...Array(20)].map((_, i) => (
          <div
            key={`falling-star-${i}`}
            className="falling-star"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={`moving-star-${i}`}
            className="moving-star"
            style={{
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 20}s`
            }}
          ></div>
        ))}
      </div>
      <div className="todo-wrapper">
        <TodoApp todos={todos} saveTodos={saveTodos} />
      </div>
    </div>
  );
}

export default App;