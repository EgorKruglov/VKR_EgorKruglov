package org.example.admin;

import lombok.RequiredArgsConstructor;
import org.example.order.OrderRepository;
import org.example.order.model.FullOrderDto;
import org.example.order.model.Order;
import org.example.order.model.OrderDto;
import org.example.order.model.OrderDtoMapper;
import org.example.order.model.OrderStatus;
import org.example.user.UserRepository;
import org.example.user.model.User;
import org.example.user.model.UserDtoMapper;
import org.example.util.exception.extraExceptions.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminOrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<FullOrderDto> getOrders(LocalDateTime startDate, LocalDateTime endDate) {
        List<Order> orders = orderRepository.findByCreatedAtBetween(startDate, endDate);

        return orders.stream()
                .map(order -> {
                    User user = userRepository.findById(order.getUserId())
                            .orElseThrow(() -> new NotFoundException("User not found with id: " + order.getUserId()));

                    return FullOrderDto.builder()
                            .orderDto(OrderDtoMapper.orderToDto(order))
                            .userDto(UserDtoMapper.userToDto(user))
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDto updateOrder(Long id, OrderDto orderDto) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Заявка не найдена id: " + id));

        // Обновляем только изменяемые поля
        existingOrder.setCoalType(orderDto.getCoalType());
        existingOrder.setQuantity(orderDto.getQuantity());
        existingOrder.setDeliveryAddress(orderDto.getDeliveryAddress());
        existingOrder.setDeliveryDate(orderDto.getDeliveryDate());
        existingOrder.setComments(orderDto.getComments());
        existingOrder.setUpdatedAt(java.time.LocalDateTime.now());

        Order updatedOrder = orderRepository.save(existingOrder);
        return OrderDtoMapper.orderToDto(updatedOrder);
    }

    @Transactional
    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Заявка не найдена id: " + id));

        orderRepository.delete(order);
    }

    @Transactional
    public void updateOrderStatus(Long id, OrderStatus statusUpdate) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Заявка не найдена id: " + id));

        existingOrder.setStatus(statusUpdate);
        existingOrder.setUpdatedAt(java.time.LocalDateTime.now());
        orderRepository.save(existingOrder);
    }
}
