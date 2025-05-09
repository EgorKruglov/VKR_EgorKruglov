import React, { useState } from 'react';
import '../css/UserLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPopup({ isOpen, onClose, onLoginSuccess }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Замените URL на ваш эндпоинт Spring Boot
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);
            
            // Предполагаем, что бэкенд возвращает токен и информацию о пользователе
            const { token, user } = response.data;
            
            // Сохраняем токен (например, в localStorage или контексте)
            localStorage.setItem('authToken', token);
            
            // Вызываем колбэк успешной авторизации
            onLoginSuccess(user);
            
            // Закрываем попап
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка авторизации');
            console.error('Login error:', err);
        }
    };

    const handleRegisterClick = () => {
        onClose(); // Закрываем текущее окно
        navigate('/registration'); // Переход на страницу регистрации
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <h2>Авторизация</h2>
                {error && <div className="error-message">{error}</div>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <label>
                        Почта:
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </label>
                    <label>
                        Пароль:
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                        />
                    </label>
                    <div className="button-group">
                        <button type="submit">Войти</button>
                        <button type="button" onClick={handleRegisterClick}>
                            Регистрация
                        </button>
                    </div>
                </form>
                <button className="close-button" onClick={onClose}>×</button>
            </div>
        </div>
    );
}