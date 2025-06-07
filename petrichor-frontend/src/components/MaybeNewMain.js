import React from 'react';
import '../css/MaybeNewMain.css';

const MaybeNewMain = () => {
    return (
        <div className="homepage-container">
            <div className="main-content">
                {/* Герой-секция с призывом к действию */}
                <section className="hero-section">
                    <div className="hero-content">
                        <h1>Надежные поставки угля для вашего бизнеса</h1>
                        <p className="hero-subtitle">Высококачественный уголь с доставкой по всей России и за рубеж</p>
                        <button className="cta-button">Оставить заявку</button>
                    </div>
                </section>

                {/* Быстрые ссылки */}
                <div className="quick-links">
                    <div className="quick-link-card">
                        <h3>Создать заказ</h3>
                        <p>Оформите заявку на поставку угля</p>
                    </div>
                    <div className="quick-link-card">
                        <h3>Наша продукция</h3>
                        <p>Узнайте о видах и характеристиках угля</p>
                    </div>
                    <div className="quick-link-card">
                        <h3>Логистика</h3>
                        <p>Варианты доставки и сроки</p>
                    </div>
                </div>

                {/* О компании кратко */}
                <section className="about-teaser">
                    <h2>Сибирская Угольная Компания</h2>
                    <p>
                        Мы - ведущий производитель и поставщик угля в России с более чем 15-летним опытом работы.
                        Наше производство оснащено современным оборудованием, что гарантирует стабильное качество продукции.
                    </p>
                    <div className="stats-bar">
                        <div className="stat-item">
                            <span className="stat-number">5+</span>
                            <span className="stat-label">месторождений</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">работаем</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">гарантия качества</span>
                        </div>
                    </div>
                </section>

                {/* Преимущества */}
                <section>
                    <h2>Наши преимущества</h2>
                    <div className="advantages-grid">
                        <div className="advantage">
                            <div className="advantage-icon">✓</div>
                            <div>
                                <h3>Конкурентные цены</h3>
                                <p>Прямые поставки с месторождений без посредников</p>
                            </div>
                        </div>
                        <div className="advantage">
                            <div className="advantage-icon">✓</div>
                            <div>
                                <h3>Гибкие условия</h3>
                                <p>Индивидуальный подход к каждому клиенту</p>
                            </div>
                        </div>
                        <div className="advantage">
                            <div className="advantage-icon">✓</div>
                            <div>
                                <h3>Надежность</h3>
                                <p>Гарантированные объемы и сроки поставок</p>
                            </div>
                        </div>
                        <div className="advantage">
                            <div className="advantage-icon">✓</div>
                            <div>
                                <h3>Качество</h3>
                                <p>Многоступенчатый контроль на всех этапах</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Как работать с нами */}
                <section className="steps-section">
                    <h2>Как сделать заказ</h2>
                    <div className="steps-grid">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3>Регистрация</h3>
                            <p>Создайте аккаунт на нашем сайте</p>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h3>Заявка</h3>
                            <p>Заполните форму заказа</p>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h3>Подтверждение</h3>
                            <p>Мы свяжемся для уточнения деталей</p>
                        </div>
                        <div className="step">
                            <div className="step-number">4</div>
                            <h3>Доставка</h3>
                            <p>Получите уголь в оговоренные сроки</p>
                        </div>
                    </div>
                </section>

                {/* Специальное предложение */}
                <section className="special-offer">
                    <h2>Специальное предложение для новых клиентов</h2>
                    <p>
                        При первом заказе от 1000 тонн - <strong>бесплатная консультация</strong> по оптимальному выбору угля
                        для вашего производства и <strong>скидка 5%</strong> на первую поставку.
                    </p>
                    <button className="offer-button">Узнать подробности</button>
                </section>
            </div>
        </div>
    );
};

export default MaybeNewMain;