import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Products.css';

// Моковые данные о видах угля
const coalTypes = [
  {
    id: 1,
    name: 'Каменный уголь (марка Д)',
    description: 'Высококачественный энергетический уголь с высокой теплотворной способностью.',
    characteristics: [
      'Теплота сгорания: 6500-7000 ккал/кг',
      'Зольность: 8-12%',
      'Влага: 10-12%',
      'Сера: 0.5-0.8%'
    ],
    price: 'от 4 500 ₽/тонна',
    minOrder: '100 тонн'
  },
  {
    id: 2,
    name: 'Антрацит (марка А)',
    description: 'Уголь высшего качества с максимальной теплотворной способностью.',
    characteristics: [
      'Теплота сгорания: 7500-8000 кcal/кг',
      'Зольность: 5-8%',
      'Влага: 5-7%',
      'Сера: 0.3-0.6%'
    ],
    price: 'от 6 200 ₽/тонна',
    minOrder: '50 тонн'
  },
  {
    id: 3,
    name: 'Бурый уголь (марка Б)',
    description: 'Экономичный вариант для промышленного использования.',
    characteristics: [
      'Теплота сгорания: 4000-4500 ккал/кг',
      'Зольность: 15-20%',
      'Влага: 15-20%',
      'Сера: 1.0-1.5%'
    ],
    price: 'от 2 800 ₽/тонна',
    minOrder: '200 тонн'
  }
];

function ProductCard({ product, isAuthenticated }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="product-description">{product.description}</p>
      
      <div className="product-details">
        <h4>Характеристики:</h4>
        <ul>
          {product.characteristics.map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
        
        <div className="product-pricing">
          <p><strong>Цена:</strong> {product.price}</p>
          <p><strong>Минимальный заказ:</strong> {product.minOrder}</p>
        </div>
      </div>
      
      {isAuthenticated ? (
        <Link to={`/new-order?productId=${product.id}`} className="order-button">
          Заказать
        </Link>
      ) : (
        <button className="order-button-disabled" disabled>
          Авторизуйтесь для заказа
        </button>
      )}
    </div>
  );
}

export default function Products() {
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  return (
    <div className="products-page">
      <h2>Наша продукция</h2>
      <p className="page-description">
        Мы предлагаем широкий ассортимент угля различных марок, соответствующий ГОСТам РФ.
        Выберите подходящий вариант и оформите заказ.
      </p>
      
      <div className="products-grid">
        {coalTypes.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            isAuthenticated={isAuthenticated} 
          />
        ))}
      </div>
    </div>
  );
}