import React, { useEffect, useState } from 'react';
import '../css/App.css';
import Main from './Main'; // импортируем компонент HomePage

function App() {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   fetch('http://localhost:8080/api/welcome')
  //     .then(response => response.text())
  //     .then(data => setMessage(data))
  //     .catch(error => console.error('Ошибка:', error));
  // }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>АО "Petrichor"</h1>
        <p>{message}</p>
      </header> */}
      
      <Main /> отображаем компонент HomePage
    </div>
  );
}

export default App;
