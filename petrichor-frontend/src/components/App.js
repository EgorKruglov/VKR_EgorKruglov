import React, { useEffect, useState } from 'react';
import '../css/App.css';
import logo from "../svg.svg";
import Main from './Main'; // импортируем компонент Main
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

function Nav() {
  return (
    <nav className="nav">
      <Link to="/">Главная</Link>
      <Link to="/about">О компании</Link>
      <Link to="/products">Продукция</Link>
      <Link to="/contact">Контакты</Link>
      <Link to="/login">Авторизоваться</Link>
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
  return (
    <div className="app">
      <Router>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/company" element={<Company />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<login />} /> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
