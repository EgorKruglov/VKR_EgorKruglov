import React from 'react';
import '../css/Main.css';

const Main = () => {
    return (
        <div className="homepage-container">
            <div className="main-content">
                {/* О компании */}
                <section>
                    <h2>О компании</h2>
                    <p>
                        АО «Petrichor» — это современное предприятие, специализирующееся на добыче, обогащении и поставках угля
                        промышленным потребителям по всей России и за рубеж. Наши месторождения расположены в Кузнецком угольном бассейне,
                        что гарантирует высокое качество сырья.
                    </p>
                    <p>
                        Мы используем передовые технологии добычи и строгий контроль качества на всех этапах производства,
                        что позволяет нам предлагать нашим клиентам уголь с оптимальными характеристиками для различных отраслей промышленности.
                    </p>
                </section>

                {/* Наша деятельность */}
                <section>
                    <h2>Наша деятельность</h2>
                    <ul>
                        <li>Добыча каменного и бурого угля открытым и шахтным способами</li>
                        <li>Обогащение угля на современных обогатительных фабриках</li>
                        <li>Логистика и поставки железнодорожным и водным транспортом</li>
                        <li>Разработка индивидуальных решений для промышленных потребителей</li>
                        <li>Экологически ответственная добыча с рекультивацией земель</li>
                    </ul>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-number">15+</span>
                            <span className="stat-label">лет на рынке</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">5 млн+</span>
                            <span className="stat-label">тонн в год</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">200+</span>
                            <span className="stat-label">клиентов</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">1000+</span>
                            <span className="stat-label">сотрудников</span>
                        </div>
                    </div>
                </section>

                {/* Наши преимущества */}
                <section>
                    <h2>Почему выбирают нас</h2>
                    <div className="advantages-grid">
                        <div className="advantage-card">
                            <h3>Качество продукции</h3>
                            <p>Строгий многоступенчатый контроль качества на всех этапах производства</p>
                        </div>
                        <div className="advantage-card">
                            <h3>Надежность поставок</h3>
                            <p>Гарантированные сроки и объемы поставок благодаря собственной логистике</p>
                        </div>
                        <div className="advantage-card">
                            <h3>Гибкие условия</h3>
                            <p>Индивидуальный подход к каждому клиенту и гибкие условия сотрудничества</p>
                        </div>
                        <div className="advantage-card">
                            <h3>Экологичность</h3>
                            <p>Современные технологии, минимизирующие воздействие на окружающую среду</p>
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

                {/* Контакты */}
                <section>
                    <h2>Контакты</h2>
                    <div className="contacts-grid">
                        <div>
                            <h3>Адрес</h3>
                            <p>650000, Россия, Кемеровская область, г. Кемерово, ул. Шахтерская, 15</p>
                        </div>
                        <div>
                            <h3>Телефон</h3>
                            <p>+7 (3842) 55-55-55</p>
                        </div>
                        <div>
                            <h3>Email</h3>
                            <p>info@sibcoal.ru</p>
                        </div>
                        <div>
                            <h3>Часы работы</h3>
                            <p>Пн-Пт: 9:00 - 18:00</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Main;