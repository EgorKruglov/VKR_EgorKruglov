package org.example.order.model;

import lombok.experimental.UtilityClass;

@UtilityClass
public class OrderDtoMapper {
        public Order dtoToOrder(OrderDto orderDto) {
        if (orderDto == null) {
            return null;
        }

        return Order.builder()
                .id(orderDto.getId())
                .userId(orderDto.getId())
                .deliveryAddress(orderDto.getDeliveryAddress())
                .deliveryDate(orderDto.getDeliveryDate())
                .coalType(orderDto.getCoalType())
                .quantity(orderDto.getQuantity())
                .status(orderDto.getStatus())
                .createdAt(orderDto.getCreatedAt())
                .updatedAt(orderDto.getUpdatedAt())
                .build();
    }

    public OrderDto orderToDto(Order order) {
        if (order == null) {
            return null;
        }

        return OrderDto.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .deliveryAddress(order.getDeliveryAddress())
                .deliveryDate(order.getDeliveryDate())
                .coalType(order.getCoalType())
                .quantity(order.getQuantity())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }
}
