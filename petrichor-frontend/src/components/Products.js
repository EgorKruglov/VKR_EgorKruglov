import React from 'react';
import { Link } from 'react-router-dom';
import coalProducts from '../data/coalProducts';
import '../css/Products.css';

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
        <Link
          to={`/new-order?productId=${product.id}`}
          className="order-button"
        >
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
        {coalProducts.map(product => (
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