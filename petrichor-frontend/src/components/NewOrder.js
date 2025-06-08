import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import coalProducts from '../data/coalProducts';
import '../css/NewOrder.css';

export default function NewOrder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Проверка аутентификации при монтировании компонента
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/');
    }
  }, [navigate]);
  
  const productId = searchParams.get('productId');
  const product = coalProducts.find(p => p.id === Number(productId));
  
  const [quantity, setQuantity] = useState(
    product ? parseInt(product.minOrder.split(' ')[0]) : 100
  );
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const authToken = localStorage.getItem('authToken');
      
      // Преобразуем дату в формат ISO 8601 с временем (например: "2023-12-31T00:00:00")
    const formattedDeliveryDate = deliveryDate 
      ? `${deliveryDate}T00:00:00` // Добавляем время, если нужно конкретное
      : null;

      const orderData = {
        coalType: product.name,  // Используем название продукта как coalType
        quantity: Number(quantity),
        deliveryAddress,
        deliveryDate: formattedDeliveryDate,
        comments
      };

      const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка сервера');
      }

      const result = await response.json();
      console.log('Заказ создан:', result);
      
      alert(`Заказ на ${product.name} успешно создан!`);
      navigate('/orders');
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      setError(error.message || 'Произошла ошибка при создании заказа');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) {
    return (
      <div className="new-order-container error">
        <h2>Продукт не найден</h2>
        <p>Пожалуйста, выберите продукт из списка:</p>
        <button 
          onClick={() => navigate('/products')}
          className="back-button"
        >
          ← Вернуться к продукции
        </button>
      </div>
    );
  }

  const minQuantity = parseInt(product.minOrder.split(' ')[0]);

  return (
    <div className="new-order-container">
      <h2>Формирование заказа</h2>
      
      {error && (
        <div className="error-message">
          {error}
          {error.includes('авторизация') && (
            <button 
              onClick={() => navigate('/login')}
              className="auth-button"
            >
              Войти
            </button>
          )}
        </div>
      )}
      
      <div className="order-layout">
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="product-description">{product.description}</p>
          
          <div className="product-specs">
            <h4>Характеристики:</h4>
            <ul>
              {product.characteristics.map((char, index) => (
                <li key={index}>{char}</li>
              ))}
            </ul>
          </div>
          
          <div className="product-pricing">
            <p><strong>Цена:</strong> {product.price}</p>
            <p><strong>Минимальный заказ:</strong> {product.minOrder}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label htmlFor="quantity">Количество (тонн):</label>
            <input
              type="number"
              id="quantity"
              min={minQuantity}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(minQuantity, e.target.value))}
              required
            />
            <small className="hint">Минимальный заказ: {product.minOrder}</small>
          </div>

          <div className="form-group">
            <label htmlFor="deliveryAddress">Адрес доставки:</label>
            <input
              type="text"
              id="deliveryAddress"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
              placeholder="Город, улица, дом, склад/площадка"
            />
          </div>

          <div className="form-group">
            <label htmlFor="deliveryDate">Желаемая дата доставки:</label>
            <input
              type="date"
              id="deliveryDate"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="comments">Дополнительные комментарии:</label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows="4"
              placeholder="Особые условия доставки, контактное лицо, реквизиты и т.д."
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate('/products')}
              disabled={isSubmitting}
            >
              Отмена
            </button>
            <button 
              type="submit" 
              className="submit-order"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Обработка...
                </>
              ) : 'Подтвердить заказ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}