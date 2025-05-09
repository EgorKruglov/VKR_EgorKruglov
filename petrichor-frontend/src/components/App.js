import React, { useEffect, useState } from 'react';
import '../css/App.css';
import logo from "../svg.svg";
import Main from './Main';
import Company from './Company';
import Contacts from './Contacts';
import Products from './Products';
import UserLogin from './UserLogin';
import UserRegistration from './UserRegistration';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="branding">
        <img src={logo} alt="Petrichor Logo" className="logo" />
        <h1>АО «Petrichor»</h1>
      </div>
      <p className="tagline">Надёжный поставщик угля по всей России и СНГ</p>
    </header>
  );
}

function Nav({ onLoginClick }) {
  return (
    <nav className="nav">
      <Link to="/">Главная</Link>
      <Link to="/about">О компании</Link>
      <Link to="/products">Продукция</Link>
      <Link to="/contacts">Контакты</Link>
      <button className="nav-link" onClick={onLoginClick}>Авторизоваться</button>
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

  return (
    <div className="app">
      <Router>
        <Header />
        <Nav onLoginClick={() => setLoginOpen(true)} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/products" element={<Products />} />
          <Route path="/registration" element={<UserRegistration />} />
        </Routes>
        <Footer />
        <UserLogin isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      </Router>
    </div>
  );
}
