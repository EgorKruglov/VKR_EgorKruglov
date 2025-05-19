import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Удаляем токен из localStorage
    localStorage.removeItem('authToken');
    // Перенаправляем на главную страницу
    navigate('/');
    // Для полного обновления состояния (можно заменить на более сложную логику)
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <h2>Профиль пользователя</h2>
      <div className="profile-info">
        <p>Добро пожаловать в ваш профиль!</p>
        <p>Здесь вы можете просмотреть и изменить свои данные.</p>
        
        <button 
          onClick={handleLogout}
          className="logout-button"
        >
          Выход
        </button>
      </div>
    </div>
  );
}