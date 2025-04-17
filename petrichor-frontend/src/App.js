import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/welcome')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Ошибка:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>АО "Petrichor"</h1>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;