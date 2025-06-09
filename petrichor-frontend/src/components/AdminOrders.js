import React, { useState, useEffect } from 'react';
import '../css/AdminOrders.css';

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

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [period, setPeriod] = useState('week');
    const [customStart, setCustomStart] = useState('');
    const [customEnd, setCustomEnd] = useState('');

    const getDateRange = () => {
        const now = new Date();
        const start = new Date();

        switch (period) {
            case 'day':
                start.setDate(now.getDate() - 1);
                console.log(start)
                console.log(now)
                break;
            case 'week':
                start.setDate(now.getDate() - 7);
                break;
            case 'month':
                start.setMonth(now.getMonth() - 1);
                break;
            case 'quarter':
                start.setMonth(now.getMonth() - 3);
                break;
            case 'year':
                start.setFullYear(now.getFullYear() - 1);
                break;
            case 'custom':
                return {
                    start: customStart,
                    end: customEnd
                };
            default:
                start.setDate(now.getDate() - 7);
        }

        return {
            start: start.toISOString(),
            end: now.toISOString()
        };
    };

    const fetchOrdersByPeriod = async () => {
        try {
            setLoading(true);
            const { start, end } = getDateRange();

            if (period === 'custom' && (!customStart || !customEnd)) {
                throw new Error('Укажите обе даты для пользовательского периода');
            }

            const authToken = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8080/admin/orders?start=${start}&end=${end}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Не удалось загрузить заявки');
            }

            const data = await response.json();
            setOrders(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrdersByPeriod();
    }, []);

    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const authToken = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8080/admin/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                throw new Error('Не удалось обновить статус');
            }

            setOrders(orders.map(item =>
                item.orderDto.id === orderId
                    ? { ...item, orderDto: { ...item.orderDto, status: newStatus } }
                    : item
            ));
        } catch (err) {
            alert(`Ошибка: ${err.message}`);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm('Вы уверены, что хотите удалить эту заявку?')) return;

        try {
            const authToken = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8080/admin/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Не удалось удалить заявку');
            }

            setOrders(orders.filter(item => item.orderDto.id !== orderId));
        } catch (err) {
            alert(`Ошибка: ${err.message}`);
        }
    };

    const filteredOrders = selectedStatus
        ? orders.filter(item => item.orderDto.status === selectedStatus)
        : orders;

    const ordersByStatus = orders.reduce((acc, item) => {
        const status = item.orderDto.status;
        if (!acc[status]) acc[status] = [];
        acc[status].push(item);
        return acc;
    }, {});

    if (loading) return <div className="admin-loading">Загрузка заявок...</div>;
    if (error) return <div className="admin-error">Ошибка: {error}</div>;

    return (
        <div className="admin-orders-page">
            <h1>Управление заявками</h1>
            <p className="admin-page-description">Панель администратора для управления заявками на уголь</p>

            <div className="admin-controls">
                <div className="period-filter">
                    <label htmlFor="period-filter">Период:</label>
                    <select
                        id="period-filter"
                        value={period}
                        onChange={handlePeriodChange}
                    >
                        <option value="day">За день</option>
                        <option value="week">За неделю</option>
                        <option value="month">За месяц</option>
                        <option value="quarter">За квартал</option>
                        <option value="year">За год</option>
                        <option value="custom">Выбрать даты</option>
                    </select>
                </div>

                {period === 'custom' && (
                    <div className="custom-dates">
                        <div className="date-input">
                            <label>С:</label>
                            <input
                                type="datetime-local"
                                value={customStart}
                                onChange={(e) => setCustomStart(e.target.value)}
                            />
                        </div>
                        <div className="date-input">
                            <label>По:</label>
                            <input
                                type="datetime-local"
                                value={customEnd}
                                onChange={(e) => setCustomEnd(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                <div className="status-filter">
                    <label htmlFor="status-filter">Фильтр по статусу:</label>
                    <select
                        id="status-filter"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="">Все заявки</option>
                        <option value="PENDING">На рассмотрении</option>
                        <option value="APPROVED">Подтвержденные</option>
                        <option value="REJECTED">Отклоненные</option>
                        <option value="DELIVERED">Доставленные</option>
                        <option value="CANCELLED">Отмененные</option>
                    </select>
                </div>

                <button
                    className="refresh-btn"
                    onClick={fetchOrdersByPeriod}
                >
                    Обновить
                </button>
            </div>

            {!selectedStatus ? (
                Object.entries(ordersByStatus).map(([status, statusOrders]) => (
                    <div key={status} className="status-group">
                        <h2 className="status-group-title">
                            {translateStatus(status)} ({statusOrders.length})
                        </h2>
                        <div className="admin-orders-list">
                            {statusOrders.map(item => (
                                <AdminOrderCard
                                    key={item.orderDto.id}
                                    order={item.orderDto}
                                    user={item.userDto}
                                    onStatusChange={handleStatusChange}
                                    onDelete={handleDeleteOrder}
                                />
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="admin-orders-list">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map(item => (
                            <AdminOrderCard
                                key={item.orderDto.id}
                                order={item.orderDto}
                                user={item.userDto}
                                onStatusChange={handleStatusChange}
                                onDelete={handleDeleteOrder}
                            />
                        ))
                    ) : (
                        <p className="admin-no-orders">Нет заявок по выбранному фильтру</p>
                    )}
                </div>
            )}
        </div>
    );
};

const AdminOrderCard = ({ order, user, onStatusChange, onDelete }) => {
    const [currentStatus, setCurrentStatus] = useState(order.status);
    const [isEditing, setIsEditing] = useState(false);
    const [comments, setComments] = useState(order.comments || '');

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU');
    };

    const handleSave = () => {
        onStatusChange(order.id, currentStatus);
        setIsEditing(false);
    };

    return (
        <div className="admin-order-card">
            <div className="admin-order-header">
                <div>
                    <h3>Заявка #{order.id}</h3>
                    <p className="user-info">
                        {user.companyName} ({user.contactPerson}, {user.contactEmail})
                    </p>
                </div>
                <div className="admin-order-actions">
                    {!isEditing ? (
                        <>
                            <button
                                className="admin-edit-btn"
                                onClick={() => setIsEditing(true)}
                            >
                                Изменить
                            </button>
                            <button
                                className="admin-delete-btn"
                                onClick={() => onDelete(order.id)}
                            >
                                Удалить
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="admin-save-btn"
                                onClick={handleSave}
                            >
                                Сохранить
                            </button>
                            <button
                                className="admin-cancel-btn"
                                onClick={() => setIsEditing(false)}
                            >
                                Отмена
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="admin-order-content">
                <div className="admin-order-details">
                    <div className="admin-detail-row">
                        <span className="admin-detail-label">Тип угля:</span>
                        <span className="admin-detail-value">{order.coalType}</span>
                    </div>
                    <div className="admin-detail-row">
                        <span className="admin-detail-label">Количество:</span>
                        <span className="admin-detail-value">{order.quantity} тонн</span>
                    </div>
                    <div className="admin-detail-row">
                        <span className="admin-detail-label">Адрес доставки:</span>
                        <span className="admin-detail-value">{order.deliveryAddress}</span>
                    </div>
                    <div className="admin-detail-row">
                        <span className="admin-detail-label">Дата доставки:</span>
                        <span className="admin-detail-value">{formatDate(order.deliveryDate)}</span>
                    </div>
                </div>

                <div className="admin-order-status">
                    <div className="admin-detail-row">
                        <span className="admin-detail-label">Статус:</span>
                        {isEditing ? (
                            <select
                                value={currentStatus}
                                onChange={(e) => setCurrentStatus(e.target.value)}
                                className="admin-status-select"
                            >
                                <option value="PENDING">На рассмотрении</option>
                                <option value="APPROVED">Подтвержден</option>
                                <option value="REJECTED">Отклонен</option>
                                <option value="DELIVERED">Доставлен</option>
                                <option value="CANCELLED">Отменен</option>
                            </select>
                        ) : (
                            <span className={`admin-status-badge status-${order.status.toLowerCase()}`}>
                                {translateStatus(order.status)}
                            </span>
                        )}
                    </div>

                    <div className="admin-detail-row">
                        <span className="admin-detail-label">Комментарии:</span>
                        {isEditing ? (
                            <textarea
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                className="admin-comments-input"
                            />
                        ) : (
                            <span className="admin-detail-value">
                                {order.comments || 'нет комментариев'}
                            </span>
                        )}
                    </div>
                </div>

                <div className="admin-order-meta">
                    <div className="admin-meta-row">
                        <span className="admin-meta-label">Создана:</span>
                        <span className="admin-meta-value">{formatDate(order.createdAt)}</span>
                    </div>
                    {order.updatedAt && (
                        <div className="admin-meta-row">
                            <span className="admin-meta-label">Обновлена:</span>
                            <span className="admin-meta-value">{formatDate(order.updatedAt)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;