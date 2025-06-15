import React, { useEffect, useState } from 'react';
import '../css/App.css';
import logo from "../svg.svg";
import Main from './Main';
import Company from './Company';
import Contacts from './Contacts';
import Products from './Products';
import UserLogin from './UserLogin';
import UserRegistration from './UserRegistration';
import Orders from './Orders';
import Profile from './Profile';
import Notification from './Notification';
import NewOrder from './NewOrder';
import AdminOrders from './AdminOrders';
import Logout from './Logout';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="branding">
        <Link to="/">
          <img src={logo} alt="Petrichor Logo" className="logo" />
        </Link>
        <h1>АО «Petrichor»</h1>
      </div>
      <p className="tagline">Надёжный поставщик угля по всей России и СНГ</p>
    </header>
  );
}

function Nav({ onLoginClick, isAuthenticated, userRole }) {
  return (
    <nav className="nav">
      <Link to="/">Главная</Link>
      <Link to="/about">О компании</Link>
      <Link to="/contacts">Контакты</Link>
      <Link to="/products">Продукция</Link>
      {isAuthenticated ? (
        <>
          <Link to="/orders" className="nav-link">Мои заказы</Link>
          {userRole === '[ROLE_ADMIN]' && (
            <Link to="/adminorders" className="nav-link">Администрирование</Link>
          )}
          <Link to="/profile" className="nav-link">Профиль</Link>
        </>
      ) : (
        <button className="nav-link" onClick={onLoginClick}>Авторизоваться</button>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 АО «Petrichor». Все права защищены.</p>
    </footer>
  );
}

export default function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [notification, setNotification] = useState(null);

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);

  const handleLoginSuccess = () => {
    const role = localStorage.getItem('userRole');
    setIsAuthenticated(true);
    setUserRole(role);
    setNotification('Добро пожаловать!');
    setTimeout(() => setNotification(null), 3000);
  };

  // Функция для обработки выхода
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
    setNotification('Вы успешно вышли из аккаунта');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="app">
      <Router>
        <Header />
        <Nav 
          onLoginClick={() => setLoginOpen(true)} 
          isAuthenticated={isAuthenticated} 
          userRole={userRole}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<Company />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/products" element={<Products />} />
          <Route path="/registration" element={<UserRegistration />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/adminorders" element={<AdminOrders />} />
          <Route 
            path="/profile" 
            element={<Profile onLogout={handleLogout} />} 
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
        <UserLogin 
          isOpen={isLoginOpen} 
          onClose={() => setLoginOpen(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
        {/* Отображаем уведомление, если оно есть */}
        {notification && (
          <Notification 
            message={notification} 
            onClose={() => setNotification(null)} 
          />
        )}
      </Router>
    </div>
  );
}
