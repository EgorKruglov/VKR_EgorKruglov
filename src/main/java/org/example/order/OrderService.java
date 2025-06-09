package org.example.order;

import lombok.RequiredArgsConstructor;
import org.example.order.model.Order;
import org.example.order.model.OrderDto;
import org.example.order.model.OrderDtoMapper;
import org.example.order.model.OrderStatus;
import org.example.user.userAuth.SecurityUtils;
import org.example.util.exception.extraExceptions.NotFoundException;
import org.example.util.exception.extraExceptions.UnauthorizedAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final SecurityUtils securityUtils;

    @Transactional
    public OrderDto createOrder(OrderDto orderDto) {
        Long currentUserId = securityUtils.getCurrentUserId();

        Order order = OrderDtoMapper.dtoToOrder(orderDto);
        order.setUserId(currentUserId);
        order.setStatus(OrderStatus.PENDING);

        Order savedOrder = orderRepository.save(order);
        return OrderDtoMapper.orderToDto(savedOrder);
    }

    @Transactional(readOnly = true)
    public List<OrderDto> getUserOrders() {
        Long currentUserId = securityUtils.getCurrentUserId();
        return orderRepository.findByUserId(currentUserId).stream()
                .map(OrderDtoMapper::orderToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderDto getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Заказ не найден id: " + id));

        checkOrderOwnership(order);

        return OrderDtoMapper.orderToDto(order);
    }

    private void checkOrderOwnership(Order order) {
        Long currentUserId = securityUtils.getCurrentUserId();
        if (!order.getUserId().equals(currentUserId)) {
            throw new UnauthorizedAccessException("Ошибка доступа. Не авторизован.");
        }
    }
}