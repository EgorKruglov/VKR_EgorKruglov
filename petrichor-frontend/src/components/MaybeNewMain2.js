import React from 'react';
import '../css/MaybeNewMain2.css';
// import coalImage from '../images/coal-main.jpg';
// import deliveryImage from '../images/delivery.jpg';
// import qualityImage from '../images/quality.jpg';

function MaybeNewMain2({ isAuthenticated }) {
  return (
    <div className="main-page">
      {/* Герой-секция с призывом к действию */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Качественный уголь для вашего бизнеса</h2>
          <p>Обеспечим надежные поставки угля в любых объемах по всей России и СНГ</p>
          {!isAuthenticated ? (
            <div className="hero-buttons">
              <a href="/registration" className="btn btn-primary">Зарегистрироваться</a>
              <a href="/products" className="btn btn-secondary">Наша продукция</a>
            </div>
          ) : (
            <div className="hero-buttons">
              <a href="/orders" className="btn btn-primary">Создать заказ</a>
              <a href="/products" className="btn btn-secondary">Каталог угля</a>
            </div>
          )}
        </div>
        <div className="hero-image">
          {/* <img src={coalImage} alt="Уголь высшего качества" /> */}
        </div>
      </section>

      {/* Преимущества компании */}
      <section className="advantages-section">
        <h2>Почему выбирают АО «Petrichor»</h2>
        <div className="advantages-grid">
          <div className="advantage-card">
            {/* <img src={qualityImage} alt="Качество" /> */}
            <h3>Гарантия качества</h3>
            <p>Весь уголь соответствует ГОСТ и проходит строгий контроль качества</p>
          </div>
          <div className="advantage-card">
            {/* <img src={deliveryImage} alt="Доставка" /> */}
            <h3>Логистика под ключ</h3>
            <p>Организуем доставку ж/д и автотранспортом в любой регион</p>
          </div>
          <div className="advantage-card">
            <div className="icon">💰</div>
            <h3>Гибкие цены</h3>
            <p>Индивидуальный подход к ценообразованию для крупных заказчиков</p>
          </div>
          <div className="advantage-card">
            <div className="icon">⏱️</div>
            <h3>Оперативность</h3>
            <p>Минимальные сроки от заявки до отгрузки продукции</p>
          </div>
        </div>
      </section>

      {/* Как это работает */}
      <section className="how-it-works">
        <h2>Как сделать заказ</h2>
        <ol className="steps">
          <li>
            <strong>Регистрация</strong>
            <p>Создайте аккаунт покупателя</p>
          </li>
          <li>
            <strong>Выбор продукции</strong>
            <p>Ознакомьтесь с ассортиментом и характеристиками угля</p>
          </li>
          <li>
            <strong>Оформление заявки</strong>
            <p>Укажите объемы, сроки и условия доставки</p>
          </li>
          <li>
            <strong>Подтверждение</strong>
            <p>Наш менеджер свяжется для уточнения деталей</p>
          </li>
          <li>
            <strong>Оплата и отгрузка</strong>
            <p>Заключаем договор и осуществляем поставку</p>
          </li>
        </ol>
      </section>

      {/* Призыв к действию */}
      <section className="cta-section">
        <h2>Готовы сделать заказ?</h2>
        <p>Оставьте заявку и наш менеджер свяжется с вами для уточнения деталей</p>
        <a 
          href={isAuthenticated ? "/orders" : "/registration"} 
          className="btn btn-large"
        >
          {isAuthenticated ? "Создать заказ" : "Начать работу"}
        </a>
      </section>
    </div>
  );
}

export default MaybeNewMain2;