import React, { useState, useEffect } from 'react';
import '../css/Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const response = await fetch('http://localhost:8080/orders', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const activeOrders = orders.filter(order =>
        order.status === 'PENDING' ||
        order.status === 'APPROVED'
    );

    const deliveredOrders = orders.filter(order =>
        order.status === 'DELIVERED'
    );

    const otherOrders = orders.filter(order =>
        order.status === 'REJECTED' ||
        order.status === 'CANCELLED'
    );

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU');
    };

    const translateStatus = (status) => {
        const statusMap = {
            'PENDING': 'На рассмотрении',
            'APPROVED': 'Подтвержден',
            'REJECTED': 'Отклонен',
            'DELIVERED': 'Доставлен',
            'CANCELLED': 'Отменен'
        };
        return statusMap[status] || status;
    };

    if (loading) return <div className="loading">Загрузка заказов...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;

    return (
        <div className="orders-page">
            <h2>Мои заказы</h2>
            <p className="page-description">Здесь вы можете просматривать статус своих заявок на уголь</p>
            
            <section className="orders-section">
                <h2>Актуальные заявки</h2>
                {activeOrders.length > 0 ? (
                    <div className="orders-vertical">
                        {activeOrders.map(order => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                ) : (
                    <p className="no-orders">Нет активных заявок</p>
                )}
            </section>

            <section className="orders-section">
                <h2>Доставленные заказы</h2>
                {deliveredOrders.length > 0 ? (
                    <div className="orders-vertical">
                        {deliveredOrders.map(order => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                ) : (
                    <p className="no-orders">Нет доставленных заказов</p>
                )}
            </section>

            <section className="orders-section">
                <h2>Архивные заказы</h2>
                {otherOrders.length > 0 ? (
                    <div className="orders-vertical">
                        {otherOrders.map(order => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                ) : (
                    <p className="no-orders">Нет архивных заказов</p>
                )}
            </section>
        </div>
    );
};

const OrderCard = ({ order }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU');
    };

    const translateStatus = (status) => {
        const statusMap = {
            'PENDING': 'На рассмотрении',
            'APPROVED': 'Подтвержден',
            'REJECTED': 'Отклонен',
            'DELIVERED': 'Доставлен',
            'CANCELLED': 'Отменен'
        };
        return statusMap[status] || status;
    };

    return (
        <div className="order-card-vertical">
            <div className="order-header">
                <h3>Заказ #{order.id}</h3>
                <span className={`status-badge status-${order.status.toLowerCase()}`}>
                    {translateStatus(order.status)}
                </span>
            </div>
            
            <div className="order-content">
                <div className="order-details">
                    <div className="detail-row">
                        <span className="detail-label">Тип угля:</span>
                        <span className="detail-value">{order.coalType}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Количество:</span>
                        <span className="detail-value">{order.quantity} тонн</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Адрес доставки:</span>
                        <span className="detail-value">{order.deliveryAddress}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Дата доставки:</span>
                        <span className="detail-value">{formatDate(order.deliveryDate)}</span>
                    </div>
                </div>
                
                {order.comments && (
                    <div className="order-comments">
                        <h4>Комментарии</h4>
                        <p>{order.comments}</p>
                    </div>
                )}
                
                <div className="order-meta">
                    <div className="meta-row">
                        <span className="meta-label">Создан:</span>
                        <span className="meta-value">{formatDate(order.createdAt)}</span>
                    </div>
                    {order.updatedAt && (
                        <div className="meta-row">
                            <span className="meta-label">Обновлен:</span>
                            <span className="meta-value">{formatDate(order.updatedAt)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;