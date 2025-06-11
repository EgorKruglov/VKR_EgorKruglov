import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Очищаем данные аутентификации
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');

    // Перенаправляем на главную страницу
    navigate('/');

    // Принудительно обновляем страницу (если нужно сбросить состояние приложения)
    window.location.reload();
  }, [navigate]);

  return null; // Компонент ничего не рендерит
};

export default Logout;