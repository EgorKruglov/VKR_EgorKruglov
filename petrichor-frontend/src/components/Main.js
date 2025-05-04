import React from "react";
import "../css/Main.css";
import logo from "../svg.svg";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="header">
        <div className="branding">
          <img src={logo} alt="Petrichor Logo" className="logo" />
          <h1>АО «Petrichor»</h1>
        </div>
        <p className="tagline">Надёжный поставщик угля по всей России и СНГ</p>
      </header>

      <nav className="nav">
        <a href="/">Главная</a>
        <a href="/products">Продукция</a>
        <a href="/about">О компании</a>
        <a href="/contact">Контакты</a>
      </nav>

      <main className="main-content">
        <section className="about">
          <h2>О компании</h2>
          <p>
            АО «Petrichor» занимается добычей, переработкой и реализацией угля
            различных марок. Мы гарантируем высокое качество продукции,
            стабильные поставки и индивидуальный подход к каждому клиенту.
          </p>
        </section>

        <section className="products">
          <h2>Наши сорта угля</h2>
          <ul>
            <li>Антрацит</li>
            <li>Каменный уголь</li>
            <li>Бурый уголь</li>
            <li>Длиннопламенный уголь</li>
          </ul>
        </section>

        <section className="contact">
          <h2>Связаться с нами</h2>
          <p>Email: info@petrichor.ru</p>
          <p>Телефон: +7 (495) 123-45-67</p>
          <p>Адрес: г. Новокузнецк, ул. Промышленная, 12</p>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 АО «Petrichor». Все права защищены.</p>
      </footer>
    </div>
  );
};

export default HomePage;
