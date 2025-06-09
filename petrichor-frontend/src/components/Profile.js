import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:8080/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Не удалось загрузить данные профиля');
        }

        const data = await response.json();
        setUserData(data);
        setFormData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Не удалось обновить данные');
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');
    window.location.reload();
  };

  if (isLoading) {
    return <div className="profile-container">Загрузка...</div>;
  }

  if (error) {
    return <div className="profile-container">Ошибка: {error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-section">
        <div className="profile-header">
          <h2>Профиль компании</h2>
          <button onClick={handleLogout} className="logout-btn">
            Выйти из аккаунта
          </button>
        </div>

        {!isEditing ? (
          <div className="profile-view">
            <div className="profile-info-group">
              <h3>{userData.companyName}</h3>
              <p><strong>Краткое название:</strong> {userData.companyShortName}</p>
              <p><strong>ИНН:</strong> {userData.inn}</p>
              <p><strong>КПП:</strong> {userData.kpp}</p>
              <p><strong>ОГРН:</strong> {userData.ogrn}</p>
            </div>

            <div className="profile-info-group">
              <h4>Адреса</h4>
              <p><strong>Юридический адрес:</strong> {userData.legalAddress}</p>
              <p><strong>Фактический адрес:</strong> {userData.actualAddress}</p>
            </div>

            <div className="profile-info-group">
              <h4>Банковские реквизиты</h4>
              <p><strong>Расчетный счет:</strong> {userData.bankAccount}</p>
              <p><strong>БИК:</strong> {userData.bik}</p>
              <p><strong>Банк:</strong> {userData.bankName}</p>
              <p><strong>Корр. счет:</strong> {userData.correspondentAccount}</p>
            </div>

            <div className="profile-info-group">
              <h4>Контактная информация</h4>
              <p><strong>Контактное лицо:</strong> {userData.contactPerson}</p>
              <p><strong>Должность:</strong> {userData.contactPersonPosition}</p>
              <p><strong>Телефон:</strong> {userData.contactPhone}</p>
              <p><strong>Email:</strong> {userData.contactEmail}</p>
              <p><strong>Отрасль:</strong> {userData.industry}</p>
              <p><strong>Email для входа:</strong> {userData.email}</p>
            </div>

            <button onClick={() => setIsEditing(true)} className="profile-edit-btn">
              Редактировать профиль
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-form-columns">
              <div className="profile-form-column">
                <div className="profile-form-group">
                  <label>Полное название компании</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="profile-form-group">
                  <label>Краткое название</label>
                  <input
                    type="text"
                    name="companyShortName"
                    value={formData.companyShortName || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="profile-form-group">
                  <label>ИНН</label>
                  <input
                    type="text"
                    name="inn"
                    value={formData.inn || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="profile-form-group">
                  <label>КПП</label>
                  <input
                    type="text"
                    name="kpp"
                    value={formData.kpp || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="profile-form-group">
                  <label>ОГРН</label>
                  <input
                    type="text"
                    name="ogrn"
                    value={formData.ogrn || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="profile-form-column">
                <div className="profile-form-group">
                  <label>Юридический адрес</label>
                  <input
                    type="text"
                    name="legalAddress"
                    value={formData.legalAddress || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="profile-form-group">
                  <label>Фактический адрес</label>
                  <input
                    type="text"
                    name="actualAddress"
                    value={formData.actualAddress || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="profile-form-group">
                  <label>Расчетный счет</label>
                  <input
                    type="text"
                    name="bankAccount"
                    value={formData.bankAccount || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="profile-form-group">
                  <label>БИК</label>
                  <input
                    type="text"
                    name="bik"
                    value={formData.bik || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="profile-form-column">
                <div className="profile-form-group">
                  <label>Название банка</label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="profile-form-group">
                  <label>Корреспондентский счет</label>
                  <input
                    type="text"
                    name="correspondentAccount"
                    value={formData.correspondentAccount || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="profile-form-group">
                  <label>Контактное лицо</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="profile-form-group">
                  <label>Должность</label>
                  <input
                    type="text"
                    name="contactPersonPosition"
                    value={formData.contactPersonPosition || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="profile-form-column">
                <div className="profile-form-group">
                  <label>Контактный телефон</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="profile-form-group">
                  <label>Контактный email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="profile-form-group">
                  <label>Отрасль</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="profile-form-actions">
              <button type="submit" className="profile-submit-btn">
                Сохранить изменения
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="profile-cancel-btn"
              >
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;