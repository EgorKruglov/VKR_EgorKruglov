import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/NewOrder.css';

export default function NewOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(100);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [comments, setComments] = useState('');

  // Получаем ID продукта из URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('productId');
    
    // Здесь должен быть запрос к API для получения информации о продукте
    // Для примера используем моковые данные
    const selectedProduct = coalTypes.find(p => p.id === parseInt(productId));
    setProduct(selectedProduct);
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки заказа на сервер
    alert('Заказ успешно создан!');
    navigate('/orders');
  };

  if (!product) {
    return <div>Загрузка информации о продукте...</div>;
  }

  return (
    <div className="new-order-container">
      <h2>Формирование заказа</h2>
      <div className="order-layout">
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className="product-specs">
            <h4>Характеристики:</h4>
            <ul>
              {product.characteristics.map((char, index) => (
                <li key={index}>{char}</li>
              ))}
            </ul>
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
              min={product.minOrder.split(' ')[0]}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="deliveryAddress">Адрес доставки:</label>
            <input
              type="text"
              id="deliveryAddress"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="comments">Дополнительные комментарии:</label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows="4"
            />
          </div>

          <button type="submit" className="submit-order">
            Подтвердить заказ
          </button>
        </form>
      </div>
    </div>
  );
}

// Моковые данные (должны быть такие же как в Products.js)
const coalTypes = [
  // ... те же данные что и в Products.js
];