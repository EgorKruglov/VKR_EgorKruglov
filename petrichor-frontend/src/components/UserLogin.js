import React, { useState, useEffect } from 'react';
import '../css/UserLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPopup({ isOpen, onClose, onLoginSuccess }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        form: ''
    });
    const navigate = useNavigate();

    // Эффект для очистки формы при открытии
    useEffect(() => {
        if (isOpen) {
            setFormData({
                email: '',
                password: ''
            });
            setErrors({
                email: '',
                password: '',
                form: ''
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Очищаем ошибку при изменении поля
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            email: '',
            password: '',
            form: ''
        };

        // Валидация email
        if (!formData.email) {
            newErrors.email = 'Email обязателен для заполнения';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Введите корректный email';
            isValid = false;
        }

        // Валидация пароля
        if (!formData.password) {
            newErrors.password = 'Пароль обязателен для заполнения';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен содержать минимум 6 символов';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Валидация формы перед отправкой
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/users/auth/login', formData);
            // console.log(response.data);
            const { token, user } = response.data;
            localStorage.setItem('authToken', token);
            onLoginSuccess(user);
            onClose();
        } catch (err) {
            setErrors(prev => ({
                ...prev,
                form: err.response?.data?.message || 'Ошибка авторизации'
            }));
            console.error('Login error:', err);
        }
    };

    const handleRegisterClick = () => {
        onClose();
        navigate('/registration');
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <h2>Авторизация</h2>
                {errors.form && <div className="error-message">{errors.form}</div>}
                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    <label>
                        Почта:
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="field-error">{errors.email}</div>}
                    </label>
                    <label>
                        Пароль:
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="field-error">{errors.password}</div>}
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