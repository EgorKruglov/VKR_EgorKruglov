import React from 'react';

const Contacts = () => {
  return (
    <div className="homepage-container">
      <main className="main-content">
        <section>
          <h2>Контактная информация</h2>
          <p>Мы всегда рады ответить на ваши вопросы и помочь с оформлением заказов.</p>
          
          <h3>Основные контакты</h3>
          <ul>
            <li><strong>Телефон:</strong> +7 (985) 555-55-55</li>
            <li><strong>Email:</strong> info@coalcompany.ru</li>
            <li><strong>Адрес:</strong> 654000, Россия, Кемеровская область, г. Новокузнецк, ул. Горняцкая, 15</li>
          </ul>
          
          <h3>Отдел продаж</h3>
          <ul>
            <li><strong>Телефон:</strong> +7 (985) 87-15-55</li>
            <li><strong>Email:</strong> sales@petrichor-company.ru</li>
            <li><strong>Часы работы:</strong> Пн-Пт: 9:00 - 18:00 (по московскому времени)</li>
          </ul>
          
          <h3>Техническая поддержка</h3>
          <ul>
            <li><strong>Телефон:</strong> +7 (985) 755-75-55</li>
            <li><strong>Email:</strong> support@petrichor-company.ru</li>
          </ul>
        </section>
        
        <section>
          <h2>Реквизиты компании</h2>
          <ul>
            <li><strong>Название:</strong> АО "Петрикор"</li>
            <li><strong>ИНН:</strong> 4205206743</li>
            <li><strong>КПП:</strong> 420501001</li>
            <li><strong>ОГРН:</strong> 1184205009876</li>
            <li><strong>Банк:</strong> ПАО "Сбербанк России"</li>
            <li><strong>Расчётный счёт:</strong> 40702810500000001234</li>
            <li><strong>Корр. счёт:</strong> 30101810400000000225</li>
            <li><strong>БИК:</strong> 044525225</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Contacts;