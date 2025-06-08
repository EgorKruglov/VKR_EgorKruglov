import React from 'react';
import { Link } from 'react-router-dom';

const Contacts = () => {
  return (
    <div className="homepage-container">
      <main className="main-content">
        <section>
          <h2>Контактная информация</h2>
          <p>Мы всегда рады ответить на ваши вопросы и помочь с оформлением заказов.</p>
          
          <h3>Основные контакты</h3>
          <ul>
            <li><strong>Телефон:</strong> +7 (XXX) XXX-XX-XX</li>
            <li><strong>Email:</strong> info@coalcompany.ru</li>
            <li><strong>Адрес:</strong> Российская Федерация, Кемеровская область, г. Кемерово, ул. Шахтерская, 1</li>
          </ul>
          
          <h3>Отдел продаж</h3>
          <ul>
            <li><strong>Телефон:</strong> +7 (XXX) XXX-XX-XX (доб. 101)</li>
            <li><strong>Email:</strong> sales@coalcompany.ru</li>
            <li><strong>Часы работы:</strong> Пн-Пт: 9:00 - 18:00 (по московскому времени)</li>
          </ul>
          
          <h3>Техническая поддержка</h3>
          <ul>
            <li><strong>Телефон:</strong> +7 (XXX) XXX-XX-XX (доб. 102)</li>
            <li><strong>Email:</strong> support@coalcompany.ru</li>
          </ul>
        </section>
        
        <section>
          <h2>Реквизиты компании</h2>
          <ul>
            <li><strong>Название:</strong> ООО "Угольная компания"</li>
            <li><strong>ИНН:</strong> XXXXXXXXXX</li>
            <li><strong>КПП:</strong> XXXXXXXXX</li>
            <li><strong>ОГРН:</strong> XXXXXXXXXXXXX</li>
            <li><strong>Банк:</strong> ПАО "Сбербанк"</li>
            <li><strong>Р/с:</strong> XXXXXXXXXXXXXXXXXXXXX</li>
            <li><strong>К/с:</strong> XXXXXXXXXXXXXXXXXXXXX</li>
            <li><strong>БИК:</strong> XXXXXXXX</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Contacts;