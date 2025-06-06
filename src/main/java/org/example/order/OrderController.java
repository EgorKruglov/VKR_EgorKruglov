package org.example.order;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.order.model.OrderDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@Slf4j
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@Valid @RequestBody OrderDto orderDto) {
        log.info("POST запрос на создание заявки: {}", orderDto);
        OrderDto createdOrder = orderService.createOrder(orderDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrdersForCurrentUser() {
        log.info("GET запрос на получение заявок пользователя");
        List<OrderDto> orders = orderService.getUserOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
        log.info("GET запрос на получение заявки по id: {}", id);
        OrderDto order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDto> updateOrder(
            @PathVariable Long id,
            @Valid @RequestBody OrderDto orderDto) {
        log.info("PUT запрос на обновление данных заявки: {}", orderDto);
        OrderDto updatedOrder = orderService.updateOrder(id, orderDto);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        log.info("DELETE запрос на удаление заявки по id: {}", id);
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
