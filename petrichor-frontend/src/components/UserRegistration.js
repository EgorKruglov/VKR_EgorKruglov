import React, { useState } from 'react';
import '../css/UserRegistration.css';
import { useNavigate } from 'react-router-dom';

const UserRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Личные данные
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',

        // Данные компании
        companyName: '',
        companyShortName: '',
        inn: '',
        kpp: '',
        ogrn: '',
        legalAddress: '',
        actualAddress: '',

        // Банковские реквизиты
        bankAccount: '',
        bik: '',
        bankName: '',
        correspondentAccount: '',

        // Контактные лица
        contactPerson: '',
        contactPersonPosition: '',
        contactPhone: '',
        contactEmail: '',

        // Дополнительно
        industry: '',

        // Согласия
        agreeToTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }
        if (!formData.agreeToTerms) {
            alert('Необходимо согласие на обработку персональных данных');
            return;
        }
        console.log('Registration data:', formData);
        alert('Регистрация успешно отправлена на проверку');
    };

    const handleCancelClick = () => {
        navigate('/');
    };

    return (
        <div className="registration-container">
            <section className="registration-section">
                <h2>Регистрация покупателя</h2>
                <form onSubmit={handleSubmit}>
                    {/* Личные данные */}
                    <h3>Личные данные</h3>
                    <div className="form-group">
                        <label htmlFor="fullName">ФИО:</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Электронная почта:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Телефон:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Подтвердите пароль:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Данные компании */}
                    <h3>Данные компании</h3>
                    <div className="form-group">
                        <label htmlFor="companyName">Название компании (полное):</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="companyShortName">Краткое название:</label>
                        <input
                            type="text"
                            id="companyShortName"
                            name="companyShortName"
                            value={formData.companyShortName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inn">ИНН:</label>
                        <input
                            type="text"
                            id="inn"
                            name="inn"
                            value={formData.inn}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="kpp">КПП:</label>
                        <input
                            type="text"
                            id="kpp"
                            name="kpp"
                            value={formData.kpp}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ogrn">ОГРН/ОГРНИП:</label>
                        <input
                            type="text"
                            id="ogrn"
                            name="ogrn"
                            value={formData.ogrn}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="legalAddress">Юридический адрес:</label>
                        <input
                            type="text"
                            id="legalAddress"
                            name="legalAddress"
                            value={formData.legalAddress}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="actualAddress">Фактический адрес:</label>
                        <input
                            type="text"
                            id="actualAddress"
                            name="actualAddress"
                            value={formData.actualAddress}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Банковские реквизиты */}
                    <h3>Банковские реквизиты</h3>
                    <div className="form-group">
                        <label htmlFor="bankAccount">Расчетный счет:</label>
                        <input
                            type="text"
                            id="bankAccount"
                            name="bankAccount"
                            value={formData.bankAccount}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bik">БИК:</label>
                        <input
                            type="text"
                            id="bik"
                            name="bik"
                            value={formData.bik}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bankName">Название банка:</label>
                        <input
                            type="text"
                            id="bankName"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="correspondentAccount">Корреспондентский счет:</label>
                        <input
                            type="text"
                            id="correspondentAccount"
                            name="correspondentAccount"
                            value={formData.correspondentAccount}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Контактные лица */}
                    <h3>Контактные лица</h3>
                    <div className="form-group">
                        <label htmlFor="contactPerson">Контактное лицо:</label>
                        <input
                            type="text"
                            id="contactPerson"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contactPersonPosition">Должность:</label>
                        <input
                            type="text"
                            id="contactPersonPosition"
                            name="contactPersonPosition"
                            value={formData.contactPersonPosition}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contactPhone">Телефон для связи:</label>
                        <input
                            type="tel"
                            id="contactPhone"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contactEmail">Email для документооборота:</label>
                        <input
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Дополнительно */}
                    <h3>Дополнительная информация</h3>
                    <div className="form-group">
                        <label htmlFor="industry">Сфера деятельности:</label>
                        <input
                            type="text"
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Согласия */}
                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            id="agreeToTerms"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="agreeToTerms">Я согласен на обработку персональных данных</label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Зарегистрироваться</button>
                        <button type="button" onClick={handleCancelClick} className="cancel-btn">Отмена</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default UserRegistration;